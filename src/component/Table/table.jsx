import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios'; 
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress, Button } from '@mui/material';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import './table.css';  
import { useNavigate } from 'react-router-dom'; 
import { format } from 'date-fns';



const fetchDemandes = async (utilisateurId, setRows, setLoading, setError) => {
    try {
        setLoading(true);  // Déclenche le chargement
        const token = localStorage.getItem('token'); // Récupérer le token d'authentification

        const response = await axiosInstance.get(`/user/demande-par-utilisateur/${utilisateurId}`, {
            headers: {
                Authorization: `Bearer ${token}` // Ajouter le token à l'en-tête
            }
        });

        setRows(response.data);
    } catch (error) {
        if (error.response) {
            // Réponse reçue avec un code d'erreur
            setError(`Erreur lors de la récupération des données : ${error.response.data.message || 'Erreur inconnue'}`);
            console.error('Erreur lors de la récupération des données :', error.response.data);
        } else if (error.request) {
            // La requête a été envoyée mais aucune réponse n'a été reçue
            setError('Aucune réponse reçue du serveur');
            console.error('Aucune réponse reçue du serveur :', error.request);
        } else {
            // Une erreur s'est produite lors de la configuration de la requête
            setError('Erreur lors de la configuration de la requête');
            console.error('Erreur lors de la configuration de la requête :', error.message);
        }
    } finally {
        setLoading(false);  // Arrête le chargement
    }
};



    

const TableDemande = () => {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState(null); 
    const navigate = useNavigate(); 

    const utilisateurId = localStorage.getItem('userId'); 

    useEffect(() => {
        if (utilisateurId) {
            fetchDemandes(utilisateurId, setRows, setLoading, setError);
        } else {
            setError('Aucun utilisateur connecté');
            console.error('Aucun utilisateur connecté');
        }
    }, [utilisateurId]);

    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`/user/demande/${id}`); 
            setRows(rows.filter(row => row.id !== id));
            console.log(`Demande avec l'ID ${id} supprimée avec succès.`);
        } catch (error) {
            setError('Erreur lors de la suppression de la demande');
            console.error('Erreur lors de la suppression de la demande :', error);
        }
    };

    const handleEdit = (id) => {
        navigate(`/demande/edit/${id}`);
    };

    const formatDate = (dateString) => {
        if (!dateString) return "Date inconnue";
        
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return "Date invalide";
        }
    
        return format(date, 'dd/MM/yyyy HH:mm:ss');
    };

    return (
        <TableContainer component={Paper} className="table-container">
            {loading ? (
                <div className="loading-indicator">
                    <CircularProgress />
                    <Typography>Chargement des données...</Typography>
                </div>
            ) : error ? (
                <Typography align="center" color="error">{error}</Typography>
            ) : (
                <Table className="table-root" aria-label="table des demandes">
                    <TableHead className="table-head">
                        <TableRow className="table-row-head">
                            <TableCell className="table-cell-head">Type de marchandise</TableCell>
                            <TableCell className="table-cell-head">Description</TableCell>
                            <TableCell className="table-cell-head">Poids (kg)</TableCell>
                            <TableCell className="table-cell-head">Statut</TableCell>
                            <TableCell className="table-cell-head">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className="table-body">
                        {rows.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="no-data-cell">
                                    <Typography align="center">Aucune demande disponible</Typography>
                                </TableCell>
                            </TableRow>
                        ) : (
                            rows.map((row, index) => (
                                <TableRow key={index} className="table-row-body">
                                    <TableCell className="table-cell-body">{row.typeMarchandise}</TableCell>
                                    <TableCell className="table-cell-body">{row.descriptionMarchandise}</TableCell>
                                    <TableCell className="table-cell-body">{row.poids}</TableCell>
                                    <TableCell className="table-cell-body">
                                        <span className={`status-icon`}>{row.statut.toLowerCase()}</span>
                                    </TableCell>
                                     <TableCell className="icon-button">
                                        <a onClick={() => handleEdit(row.id)} variant="contained" color="primary" startIcon={<FaEdit className='edit-icon'/>}>
                                            
                                        </a>
                                        <a onClick={() => handleDelete(row.id)} variant="contained" color="secondary" startIcon={<MdDelete className='delete-icon'/>}>
                                            
                                        </a>
                                    </TableCell> 
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            )}
        </TableContainer>
    );
};

export default TableDemande;
