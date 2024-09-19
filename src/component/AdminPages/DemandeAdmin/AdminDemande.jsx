import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import './AdminDemande.css';
import DemandDetails from './demandeDetails'; // Import de la pop-up personnalisée

const AdminDemande = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null); // Gérer la demande sélectionnée

    const openPopup = (request) => {
        setSelectedRequest(request); // Stocker la demande sélectionnée
        setIsPopupOpen(true); // Ouvrir la pop-up
    };

    const closePopup = () => {
        setIsPopupOpen(false); // Fermer la pop-up
        setSelectedRequest(null); // Réinitialiser la demande sélectionnée
    };

    const rows = [
        { id: 1, transport: 'Chine', livraison: 'Lomé', type: 'Élaboré', poids: '50KG', quantite: 20, statut: 'green' },
        { id: 2, transport: 'Chine', livraison: 'Agoè', type: 'Non-Élaboré', poids: '50KG', quantite: 20, statut: 'red' },
        { id: 3, transport: 'Chine', livraison: 'Tokoin', type: 'Périssable', poids: '50KG', quantite: 20, statut: 'green' },
        { id: 4, transport: 'Chine', livraison: 'Baguida', type: 'Non-périssable', poids: '50KG', quantite: 20, statut: 'red' },
    ];

    return (
        <>
            <TableContainer component={Paper} className="table-container">
                <Table className="table-root" aria-label="simple table">
                    <TableHead className="table-head">
                        <TableRow className="table-row-head">
                            <TableCell className="table-cell-head">Transport</TableCell>
                            <TableCell className="table-cell-head">Livraison</TableCell>
                            <TableCell className="table-cell-head">Type de marchandise</TableCell>
                            <TableCell className="table-cell-head">Poids</TableCell>
                            <TableCell className="table-cell-head">Statut</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className="table-body">
                        {rows.map((row) => (
                            <TableRow key={row.id} className="table-row-body">
                                <TableCell className="table-cell-body">{row.transport}</TableCell>
                                <TableCell className="table-cell-body">{row.livraison}</TableCell>
                                <TableCell className="table-cell-body">{row.type}</TableCell>
                                <TableCell className="table-cell-body">{row.poids}</TableCell>
                                <TableCell className="table-cell-body">
                                    <span className={`status-icon ${row.statut}`}></span>
                                    <button className="detail" onClick={() => openPopup(row)}>Détails</button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Affichage de la pop-up personnalisée */}
            {isPopupOpen && (
                <DemandDetails isOpen={isPopupOpen} onClose={closePopup} request={selectedRequest} />
            )}
        </>
    );
};

export default AdminDemande;
