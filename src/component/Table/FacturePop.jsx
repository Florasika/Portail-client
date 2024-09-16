import React from 'react';
import './FacturePop.css';
import { IoClose } from "react-icons/io5";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const InvoicePopup = ({ isOpen, onClose, invoice }) => {
    console.log('Invoice:', invoice);
    if (!isOpen || !invoice) return null;

    
    
    // Calcul du total de toutes les lignes
   // Calcul du total pour chaque facture
   {/*rows.forEach(row => {
    const calculatedTotal = row.items.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
    }, 0);
    
    // Formatage du total en Fcfa avec espaces pour les milliers
    row.total = `${calculatedTotal.toLocaleString()}Fcfa`;
});

console.log(rows);*/}




const handleDownloadPDF = () => {
    const downloadBtn = document.querySelector('.download-btn2');
    if (downloadBtn) downloadBtn.style.display = 'none';

    html2canvas(document.querySelector('#invoiceContent'), { scale: 2 }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
            orientation: 'portrait', // ou 'landscape' si vous préférez
            unit: 'mm',
            format: [210, 297] // Taille A4 en mm
        });

        // Ajustez les dimensions de l'image ajoutée si nécessaire
        pdf.addImage(imgData, 'PNG', 0, 0, 210, canvas.height * 210 / canvas.width);
        pdf.save('facture.pdf');

        if (downloadBtn) downloadBtn.style.display = 'block';
    });
};

    const paymentInfo = invoice.paymentInfo || {};
    const items = Array.isArray(invoice.items) ? invoice.items : [];

    console.log('Invoice data:', invoice);
    console.log('Payment info:', paymentInfo);

    return (
        <div className="pop-up">
            <div className="pop-up_content" id="invoiceContent">
                <button className="close-btn" onClick={onClose}><IoClose className='close-icon'/></button>
                <div className="invoice-header2">
                    <div className="header-section2">
                        <h2>Facture N°{invoice.number}</h2>
                        <p>Date: {invoice.dateEmission}</p>
                    </div>
                    <div className="header-section">
                        <p>M. {invoice.clientName}</p>
                        <p>{invoice.clientAddress}</p>
                    </div>
                </div>

                <TableContainer component={Paper} className="invoice-container2">
                    <Table className="invoice-table-root2" aria-label="invoice table">
                        <TableHead className="invoice-header2">
                            <TableRow className="invoice-row-head2">
                                <TableCell className="invoice-cell-head2">N°</TableCell>
                                <TableCell className="invoice-cell-head2">Description</TableCell>
                                <TableCell className="invoice-cell-head2">Prix</TableCell>
                                <TableCell className="invoice-cell-head2">Quantité</TableCell>
                                <TableCell className="invoice-cell-head2">Total</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className="invoice-body2">
                            {items.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="no-data-cell">
                                        Aucune donnée disponible
                                    </TableCell>
                                </TableRow>
                            ) : (
                                items.map((item, index) => (
                                    <TableRow key={index} className="invoice-row-body2">
                                        <TableCell className="cell-body2">{index + 1}</TableCell>
                                        <TableCell className="cell-body2">{item.description}</TableCell>
                                        <TableCell className="cell-body2">{item.price.toLocaleString()} Fcfa</TableCell>
                                        <TableCell className="cell-body2">{item.quantity}</TableCell>
                                        <TableCell className="cell-body2">{(item.price * item.quantity).toLocaleString()} Fcfa</TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                <div className="invoice-summary2">
                    <h2>Information de paiement</h2>
                    <p>Tmoney: {paymentInfo.tmoney || 'Non spécifié'}</p>
                    <p>Flooz: {paymentInfo.flooz || 'Non spécifié'}</p>
                    <p>Numéro de compte bancaire: {paymentInfo.bank || 'Non spécifié'}</p>
                </div>

                <div className="invoice-total2">
                    <h3>Somme totale : {invoice.total || 'Non spécifié'}</h3>
                </div>

                {/* Bouton à l'intérieur de la pop-up_content */}
                <button className="download-btn2" onClick={handleDownloadPDF}>
                    Télécharger en PDF
                </button>
            </div>
        </div>
    );
};

export default InvoicePopup;

