import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { RiDownloadCloud2Line } from "react-icons/ri";
import './tableFacture.css';
import InvoicePopup from './FacturePop'; 
import axiosInstance from '../../axios'; 

const TableFactureC = () => {
    const [factures, setFactures] = useState([]); // État pour stocker les factures
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState(null); // Gérer la facture sélectionnée
    const [loading, setLoading] = useState(true); // État de chargement
    const [error, setError] = useState(null); // Gérer les erreurs

    // Fonction pour ouvrir la popup avec les détails de la facture
    const openPopup = (invoice) => {
        setSelectedInvoice(invoice);
        setIsPopupOpen(true);
    };

    // Fonction pour fermer la popup
    const closePopup = () => {
        setIsPopupOpen(false);
        setSelectedInvoice(null);
    };

    // Fonction pour récupérer les factures de l'utilisateur depuis l'API

    const utilisateurId = localStorage.getItem('userId');

    useEffect(() => {

        if (!utilisateurId) {
            setError("L'ID utilisateur est manquant.");
            setLoading(false);
            return;
        }

        const fetchFactures = async () => {
            try {
                const response = await axiosInstance.get(`/user/factureby-utilisateur/${utilisateurId}`);
                setFactures(response.data);
                setLoading(false); 
            } catch (err) {
                setError('Erreur lors de la récupération des factures');
                setLoading(false); 
            }
        };

        fetchFactures(); // Appel à l'API lors du chargement du composant
    }, [utilisateurId]);

    // Affichage du message de chargement ou d'erreur
    if (loading) {
        return <p>Chargement des factures...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <>
            <TableContainer component={Paper} className="invoice-container">
                <Table className="invoice-table-root" aria-label="simple table">
                    <TableHead className="invoice-header">
                        <TableRow className="invoice-row-head">
                            <TableCell className="invoice-cell-head">Marchandise</TableCell>
                            <TableCell className="invoice-cell-head">Montant Total</TableCell>
                            <TableCell className="invoice-cell-head">Date d'émission</TableCell>
                            <TableCell className="invoice-cell-head">Télécharger</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody className="invoice-body">
                        {factures.map((facture, index) => (
                            <TableRow key={index} className="invoice-row-body">
                                <TableCell className="cell-body">{facture.descriptionMarchandise}</TableCell>
                                <TableCell className="cell-body">{facture.montantTotal} FCFA</TableCell>
                                <TableCell className="cell-body">{new Date(facture.dateEmission).toLocaleDateString()}</TableCell>
                                <TableCell className="cell-body">
                                    <button className='telecharger' onClick={() => openPopup(facture)}>
                                        <RiDownloadCloud2Line className="download-icon" />
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Afficher la popup pour les détails de la facture */}
            <InvoicePopup isOpen={isPopupOpen} onClose={closePopup} invoice={selectedInvoice} />
        </>
    );
};

export default TableFactureC;
