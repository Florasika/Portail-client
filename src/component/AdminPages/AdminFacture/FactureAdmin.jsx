import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axiosInstance from '../../../axios';
import FactureDetails from "./FactureDetails";
import './FactureAdmin.css';

const formatDate = (dateArray) => {
    if (!dateArray) return 'Pas de date'; // Gérer les dates nulles

    if (Array.isArray(dateArray) && dateArray.length >= 6) {
        const [year, month, day, hours, minutes, seconds, nanoseconds] = dateArray;

        // Créer un objet Date en utilisant ces valeurs
        const date = new Date(year, month - 1, day, hours, minutes, seconds, Math.floor(nanoseconds / 1000000));

        // Vérifier si la date est valide
        if (isNaN(date.getTime())) {
            return 'Date invalide'; // Gérer les dates invalides
        }

        // Formater la date et l'heure
        return date.toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }) + ' ' + date.toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit',
        });
    }

    return 'Date invalide'; // Gérer les cas imprévus
};

const TableFactureAdmin = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [rows, setRows] = useState([]); // État pour stocker les factures

    const openPopup = (request) => {
        setSelectedRequest(request);
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
        setSelectedRequest(null);
    };

    // Fonction pour récupérer les factures
    const fetchFactures = async () => {
        try {
            const response = await axiosInstance.get('/admin/all-facture'); 
            setRows(response.data); 
        } catch (error) {
            console.error("Erreur lors de la récupération des factures:", error);
        }
    };

    // Utiliser useEffect pour récupérer les données lors du premier rendu du composant
    useEffect(() => {
        fetchFactures(); // Appeler la fonction pour récupérer les factures
    }, []);

    return (
        <>
            <TableContainer component={Paper} className="invoice-c">
                <Table className="invoice-table-r" aria-label="simple table">
                    <TableHead className="invoice-h">
                        <TableRow className="invoice-row-h">
                            <TableCell className="invoice-cell-h">Marchandise</TableCell>
                            <TableCell className="invoice-cell-h">Montant</TableCell>
                            <TableCell className="invoice-cell-h">Date d'Emission</TableCell>
                            <TableCell className="invoice-cell-h">Nom du client</TableCell>
                            <TableCell className="invoice-cell-h">Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody className="invoice-b">
                        {rows.map((row, index) => (
                            <TableRow key={index} className="invoice-row-b">
                                <TableCell className="cell-b">{row.numeroMarchandise}</TableCell>
                                <TableCell className="cell-b">{row.montantTotale}</TableCell>
                                <TableCell className="cell-b">{formatDate(row.soumisLe)}</TableCell> {/* Utiliser formatDate ici */}
                                <TableCell className="cell-b">{row.factureDe}</TableCell>
                                <TableCell className="cell-b">
                                    <button className="detail" onClick={() => openPopup(row)}>Détails</button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Affichage de la pop-up personnalisée */}
            {isPopupOpen && (
                <FactureDetails isOpen={isPopupOpen} onClose={closePopup} request={selectedRequest} />
            )}
        </>
    );
};

export default TableFactureAdmin;
