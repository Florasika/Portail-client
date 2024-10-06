import React from 'react';
import './FacturePop.css';
import { IoClose } from "react-icons/io5";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
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
const InvoicePopup = ({ isOpen, onClose, invoice }) => {
    if (!isOpen || !invoice) return null;

    const handleDownloadPDF = () => {
        // ... (code inchangé pour le téléchargement PDF)
    };

    // Vérification et formatage des valeurs
    const soumisLe = invoice.soumisLe ? new Date(invoice.soumisLe).toLocaleDateString('fr-FR') : 'Date non disponible';
    const montantParKm = invoice.montantParKm ? invoice.montantParKm.toLocaleString() : 'N/A';
    const distanceEnKm = invoice.distanceEnKm ? invoice.distanceEnKm.toLocaleString() : 'N/A';
    const montantTotaleParKm = invoice.montantTotaleParKm ? invoice.montantTotaleParKm.toLocaleString() : 'N/A';
    const montantParKg = invoice.montantParKg ? invoice.montantParKg.toLocaleString() : 'N/A';
    const poids = invoice.poids ? invoice.poids.toLocaleString() : 'N/A';
    const montantTotaleParKg = invoice.montantTotaleParKg ? invoice.montantTotaleParKg.toLocaleString() : 'N/A';
    const montantTotale = invoice.montantTotale ? invoice.montantTotale.toLocaleString() : 'N/A';

    return (
        <div className="pop-up">
            <div className="pop-up_content" id="invoiceContent">
                <button className="close-btn" onClick={onClose}><IoClose className='close-icon'/></button>
                <div className="invoice-header2">
                    <h2>Facture N° {invoice.numeroFacture || 'N/A'}</h2>
                    <p>Date d'émission : {formatDate(invoice.soumisLe)}</p>
                </div>

                <div className="invoice-details">
                    <p><strong>Facture de :</strong> {invoice.factureDe || 'N/A'}</p>
                    <p><strong>Numéro de Marchandise :</strong> {invoice.numeroMarchandise || 'N/A'}</p>
                    <p><strong>Type de Marchandise :</strong> {invoice.typeMarchandise || 'N/A'}</p>
                    <p><strong>Description :</strong> {invoice.descriptionMarchandise || 'N/A'}</p>
                </div>

                <TableContainer component={Paper} className="invoice-container2">
                    <Table aria-label="invoice table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Libellé</TableCell>
                                <TableCell align="right">Montant par unité</TableCell>
                                <TableCell align="right">Quantité</TableCell>
                                <TableCell align="right">Total</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>Distance (km)</TableCell>
                                <TableCell align="right">{montantParKm} FCFA</TableCell>
                                <TableCell align="right">{distanceEnKm}</TableCell>
                                <TableCell align="right">{montantTotaleParKm} FCFA</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Poids (kg)</TableCell>
                                <TableCell align="right">{montantParKg} FCFA</TableCell>
                                <TableCell align="right">{poids}</TableCell>
                                <TableCell align="right">{montantTotaleParKg} FCFA</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

                <div className="invoice-total2">
                    <h3>Total : {montantTotale} FCFA</h3>
                </div>

                <button className="download-btn2" onClick={handleDownloadPDF}>
                    Télécharger en PDF
                </button>
            </div>
        </div>
    );
};

export default InvoicePopup;
