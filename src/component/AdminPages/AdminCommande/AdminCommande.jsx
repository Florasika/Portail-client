import React, { useState } from 'react';
import { MdDelete } from "react-icons/md";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import './AdminCommande.css';

const AdminCommande = () => {
    const [selectedRow, setSelectedRow] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [dialogAction, setDialogAction] = useState('');
    const [showDetails, setShowDetails] = useState(false);

    const handlePopupOpen = () => setIsPopupOpen(true);
    const handlePopupClose = () => setIsPopupOpen(false);

    const rows = [
        { nomClient: 'KOSSI', marchandise: "N°25641", dateDepart: '21-10-23', dateLivraison: '25-11-23', statut: "pink" },
        { nomClient: 'KOSSI', marchandise: "N°25641", dateDepart: '21-10-23', dateLivraison: '25-11-23', statut: "coffee" },
        { nomClient: 'KOSSI', marchandise: "N°25641", dateDepart: '------', dateLivraison: '25-11-23', statut: "blue" },
        { nomClient: 'KOSSI', marchandise: "N°25641", dateDepart: '21-10-23', dateLivraison: '25-11-23', statut: "coffee" },
        { nomClient: 'KOSSI', marchandise: "N°25641", dateDepart: '21-10-23', dateLivraison: '------', statut: "pink" },
        { nomClient: 'KOSSI', marchandise: "N°25641", dateDepart: '21-10-23', dateLivraison: '25-11-23', statut: "pink" },
    ];

    const handleDetailsClick = (row) => {
        setSelectedRow(row);
        setShowDetails(true);
    };

    const handleCloseDetails = () => {
        setSelectedRow(null);
        setShowDetails(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted");
        handlePopupClose();
    };

    const getButtonLabel = () => {
        if (!selectedRow) return '';

        const hasDateDepart = selectedRow.dateDepart && selectedRow.dateDepart !== '------';
        const hasDateLivraison = selectedRow.dateLivraison && selectedRow.dateLivraison !== '------';

        if (!hasDateLivraison) {
            return 'Terminer la livraison';
        } else if (!hasDateDepart) {
            return 'Débuter la livraison';
        } else {
            return 'Terminer la livraison';
        }
    };

    return (
        <div className="admin-commande-container">
            {showDetails && selectedRow ? (
                <div className="details-container">
                    <h2>Détails du client</h2>
                    <div className="details-row">
                        <p><strong>Nom du client:</strong> {selectedRow.nomClient}</p>
                        <p><strong>Marchandise:</strong> {selectedRow.marchandise}</p>
                    </div>
                    <div className="details-row">
                        <p><strong>Date de départ:</strong> {selectedRow.dateDepart}</p>
                        <p><strong>Date de livraison:</strong> {selectedRow.dateLivraison}</p>
                    </div>
                    <p className='statut'><strong>Statut:</strong> {selectedRow.statut}</p>
                    <button
                        className="close-details"
                        onClick={handlePopupOpen}
                    >
                        {getButtonLabel()}
                    </button>

                    {/* Dialog */}
                    {isPopupOpen && (
                        <div className="custom-dialog">
                            <div className="custom-dialog-title">Entrez la date de la livraison</div>
                            <div className="custom-dialog-content">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-row">
                                        
                                        <div className="form-group">
                                            <label htmlFor="deliveryDate">Date de livraison</label>
                                            <input
                                                type="date"
                                                id="deliveryDate"
                                            />
                                        </div>
                                    </div>
                                    <div className="custom-dialog-actions">
                                        <button
                                            type="submit"
                                            className="custom-dialog-button-confirm"
                                        >
                                            Enregistrer
                                        </button>
                                        
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <TableContainer component={Paper} className='admin-commande'>
                    <Table className='table-root' aria-label="simple table">
                        <TableHead className='header_table'>
                            <TableRow className='row_head'>
                                <TableCell className='cell-head'>Nom du client</TableCell>
                                <TableCell className='cell-head'>Marchandise</TableCell>
                                <TableCell className='cell-head'>Date de départ</TableCell>
                                <TableCell className='cell-head'>Date de livraison</TableCell>
                                <TableCell className='cell-head'>Statut</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className='body'>
                            {rows.map((row, index) => (
                                <TableRow key={index} className='row_body'>
                                    <TableCell className='cell_body1'>{row.nomClient}</TableCell>
                                    <TableCell className='cell_body1'>{row.marchandise}</TableCell>
                                    <TableCell className='cell_body1'>{row.dateDepart}</TableCell>
                                    <TableCell className='cell_body1'>{row.dateLivraison}</TableCell>
                                    <TableCell className='cell_body1'>
                                        <span className={`statu-icon ${row.statut}`}></span>
                                        <button className="details" onClick={() => handleDetailsClick(row)}>Détails</button>
                                        <a >
                                            <MdDelete className='delete-icon' />
                                        </a>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
}

export default AdminCommande;
