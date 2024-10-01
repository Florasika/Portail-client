import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
    Typography,
} from '@mui/material';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import './AdminDemande.css';
import axiosInstance from '../../../axios';
import DemandDetails from './demandeDetails';

// Utility function to format the date
const formatDate = (dateArray) => {
    if (!dateArray) return 'Pas de date'; // Handle null dates

    if (Array.isArray(dateArray) && dateArray.length >= 6) {
        const [year, month, day, hours, minutes, seconds, nanoseconds] = dateArray;

        // Create a Date object using the array values
        const date = new Date(year, month - 1, day, hours, minutes, seconds, Math.floor(nanoseconds / 1000000));

        // Check if the date is valid
        if (isNaN(date.getTime())) {
            return 'Date invalide'; // Handle invalid dates
        }

        // Format the date and time
        return date.toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }) + ' ' + date.toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit',
        });
    }

    return 'Date invalide'; // Handle unexpected cases
};

// Utility function to convert array to Date object
const convertArrayToDate = (dateArray) => {
    if (Array.isArray(dateArray) && dateArray.length >= 6) {
        const [year, month, day, hours, minutes, seconds, nanoseconds] = dateArray;
        return new Date(year, month - 1, day, hours, minutes, seconds, Math.floor(nanoseconds / 1000000));
    }
    return null;
};

const AdminDemande = () => {
    const [demandes, setDemandes] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: 'dateDemande', direction: 'desc' });
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to close the popup
    const closePopup = () => {
        setIsPopupOpen(false);
        setSelectedRequest(null);
    };

    // Function to open the popup with the selected request
    const openPopup = (request) => {
        setSelectedRequest(request);
        setIsPopupOpen(true);
    };

    // Function to handle sorting
    const sortData = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    // Function to sort the demandes based on sortConfig
    const sortedDemandes = React.useMemo(() => {
        if (!Array.isArray(demandes)) return [];

        return [...demandes].sort((a, b) => {
            if (sortConfig.key === 'dateDemande') {
                const dateA = convertArrayToDate(a.dateDemande);
                const dateB = convertArrayToDate(b.dateDemande);

                if (!dateA || !dateB) return 0; // If either date is invalid, consider them equal

                return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA;
            } else if (sortConfig.key === 'demandePar') {
                const nomA = a.demandePar.toLowerCase();
                const nomB = b.demandePar.toLowerCase();
                if (nomA < nomB) return sortConfig.direction === 'asc' ? -1 : 1;
                if (nomA > nomB) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            }
            return 0;
        });
    }, [demandes, sortConfig]);

    // Fetch data from the API when the component mounts
    useEffect(() => {
        const fetchDemandes = async () => {
            try {
                const response = await axiosInstance.get('admin/all-demande');

                // Check if response.data is an array
                if (Array.isArray(response.data)) {
                    setDemandes(response.data);
                } else if (Array.isArray(response.data.demandes)) { 
                    setDemandes(response.data.demandes);
                } else {
                    console.error("Unexpected data format:", response.data);
                    setError("Format de données inattendu.");
                }
            } catch (err) {
                console.error("Erreur lors de la récupération des données :", err);
                setError("Erreur lors de la récupération des données.");
            } finally {
                setLoading(false);
            }
        };

        fetchDemandes();
    }, []);

    // Function to handle deleting a demande
    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`admin/delete-demande/${id}`);
            setDemandes((prevDemandes) => prevDemandes.filter((demande) => demande.id !== id));
        } catch (error) {
            console.error('Erreur lors de la suppression de la demande', error);
            setError('Erreur lors de la suppression de la demande');
        }
    };

    // Render loading state
    if (loading) {
        return (
            <div className="loading-container">
                <CircularProgress />
                <Typography variant="h6" style={{ marginTop: '10px' }}>
                    Chargement des demandes...
                </Typography>
            </div>
        );
    }

    // Render error state
    if (error) {
        return (
            <div className="error-container">
                <Typography variant="h6" color="error">
                    {error}
                </Typography>
            </div>
        );
    }

    return (
        <div className="admin-demande-container">
            <TableContainer component={Paper} className="table-container">
                <Table className="table-root" aria-label="table des demandes">
                    <TableHead className="table-head">
                        <TableRow className="table-row-head">
                            <TableCell
                                className="table-cell-head sortable"
                                onClick={() => sortData('dateDemande')}
                            >
                                Date de demande {sortConfig.key === 'dateDemande' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                            </TableCell>
                            <TableCell className="table-cell-head">Type de marchandise</TableCell>
                            <TableCell className="table-cell-head">Description de marchandise</TableCell>
                            <TableCell className="table-cell-head">Poids de la marchandise</TableCell>
                            <TableCell
                                className="table-cell-head sortable"
                                onClick={() => sortData('demandePar')}
                            >
                                Demande par {sortConfig.key === 'demandePar' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                            </TableCell>
                            <TableCell className="table-cell-head">Statut</TableCell>
                            <TableCell className="table-cell-head">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className="table-body-container">
                        {sortedDemandes.length > 0 ? (
                            sortedDemandes.map((demande, index) => (
                                <TableRow key={demande.id || index} className="table-row-body">
                                    <TableCell className="table-cell-body">{formatDate(demande.dateDemande)}</TableCell>
                                    <TableCell className="table-cell-body">{demande.typeMarchandise}</TableCell>
                                    <TableCell className="table-cell-body">{demande.descriptionMarchandise}</TableCell>
                                    <TableCell className="table-cell-body">{demande.poids} KG</TableCell>
                                    <TableCell className="table-cell-body">{demande.demandePar}</TableCell>
                                    <TableCell className="table-cell-body">
                                        <span className={`status-icon ${demande.statut === 'APPROUVEE' ? 'green' : 'red'}`}>
                                            {demande.statut}
                                        </span>
                                    </TableCell>
                                    <TableCell className="table-cell-body">
                                        <button className="detail" onClick={() => openPopup(demande)}>Détails</button>
                                        <button className="delete" onClick={() => handleDelete(demande.id)}><MdDelete /></button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} align="center">
                                    <Typography variant="body1">Aucune demande disponible.</Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Affichage de la pop-up personnalisée */}
            {isPopupOpen && selectedRequest && (
                <DemandDetails
                    isOpen={isPopupOpen}
                    onClose={closePopup}
                    request={selectedRequest}
                />
            )}
        </div>
    );
};

export default AdminDemande;
