import React, { useState, useEffect } from 'react';
import { MdDelete } from "react-icons/md";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import './AdminCommande.css';
import axiosInstance from '../../../axios';

// Fonction pour formater les dates
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

const AdminCommande = () => {
    const [commandes, setCommandes] = useState([]);  // État pour stocker les commandes
    const [selectedRow, setSelectedRow] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [showDetails, setShowDetails] = useState(false);

    // Utiliser useEffect pour appeler l'API dès que le composant est monté
    useEffect(() => {
        axiosInstance.get('/admin/all-commande')
            .then((response) => {
                setCommandes(response.data);  // Mettre à jour les commandes avec la réponse de l'API
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération des commandes:', error);
            });
    }, []);

    const handleDetailsClick = (row) => {
        setSelectedRow(row);
        setShowDetails(true);
    };

    const handlePopupOpen = () => setIsPopupOpen(true);
    const handlePopupClose = () => setIsPopupOpen(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted");
        handlePopupClose();
    };

    const getButtonLabel = () => {
        if (!selectedRow) return '';

        const hasDateDepart = selectedRow.dateCommande && selectedRow.dateCommande !== '------';
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
                        <p><strong>Nom du client:</strong> {selectedRow.commandeDe}</p>
                        <p><strong>Marchandise:</strong> {selectedRow.numeroMarchandise}</p>
                    </div>
                    <div className="details-row">
                        <p><strong>Date de Commande:</strong> {formatDate(selectedRow.dateCommande)}</p>
                        <p><strong>Date de livraison:</strong> {formatDate(selectedRow.dateLivraison)}</p>
                    </div>
                    <p className='statut'><strong>Statut:</strong> {selectedRow.statut}</p>
                    <button
                        className="close-details"
                        onClick={handlePopupOpen}
                    >
                        {getButtonLabel()}
                    </button>

                    {/* Popup Dialog */}
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
                                <TableCell className='cell-head'>Numero Marchandise</TableCell>
                                <TableCell className='cell-head'>Description Marchandise</TableCell>
                                <TableCell className='cell-head'>Date de Commande</TableCell>
                                <TableCell className='cell-head'>Date de livraison</TableCell>
                                <TableCell className='cell-head'>Statut</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className='body'>
                            {commandes.map((row, index) => (
                                <TableRow key={index} className='row_body'>
                                    <TableCell className='cell_body1'>{row.commandeDe}</TableCell>
                                    <TableCell className='cell_body1'>N° {row.numeroMarchandise}</TableCell>
                                    <TableCell className='cell_body1'>{row.descriptionMarchandise}</TableCell>
                                    <TableCell className='cell_body1'>{formatDate(row.dateCommande)}</TableCell>
                                    <TableCell className='cell_body1'>{formatDate(row.dateLivraison)}</TableCell>
                                    <TableCell className='cell_body1'>
                                        <span className={`statu-icon ${row.statut}`}></span>
                                        <button className="details" onClick={() => handleDetailsClick(row)}>Détails</button>
                                        <a>
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
