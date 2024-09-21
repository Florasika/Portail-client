import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { RiDownloadCloud2Line } from "react-icons/ri";
import './tableFacture.css';
import InvoicePopup from './FacturePop';

const TableFactureC = () => {

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState(null); // Gérer la facture sélectionnée

    const openPopup = (invoice) => {
        setSelectedInvoice(invoice);
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
        setSelectedInvoice(null);
    };

    const rows = [
        {
            number: '120520',
            marchandise: "marchandise1",
            montant: '500 000Fcfa',
            dateEmission: '22-07-24',
            clientName: 'John Doe',
            clientAddress: '123 Rue, Lomé',
            items: [
                { description: 'Marchandise périssable', price: 100000, quantity: 1 },
                { description: 'Marchandise fragile', price: 200000, quantity: 2 }
            ],
            paymentInfo: {
                tmoney: '+22812345678', // Numéro de téléphone togolais
                flooz: '+22887654321',  // Numéro de téléphone togolais
                bank: 'TG1234567890123456' // Numéro de compte bancaire
            },
            total: '500 000Fcfa'   
        },
    
    {
        number: '120518',
        marchandise: "marchandise2",
        montant: '500 000Fcfa',
        dateEmission: '22-07-24',
        clientName: 'John Doe',
        clientAddress: '123 Rue, Lomé',
        items: [
            { description: 'Marchandise élaborée', price: 100000, quantity: 5 },
            { description: 'Marchandise non périssable', price: 50000, quantity: 4 }
        ],
        paymentInfo: {
            tmoney: '+22812345678', // Numéro de téléphone togolais
            flooz: '+22887654321',  // Numéro de téléphone togolais
            bank: 'TG1234567890123456' // Numéro de compte bancaire
        },
        total: '500 000Fcfa'
    },
    {
        number: '120436',
        marchandise: "marchandise1",
        montant: '250 000Fcfa',
        dateEmission: '22-07-24',
        clientName: 'John Doe',
        clientAddress: '123 Rue, Lomé',
        items: [
            { description: 'Marchandise 1', price: 100000, quantity: 1 },
            { description: 'Marchandise 2', price: 150000, quantity: 1 }
        ],
        paymentInfo: {
            tmoney: '+22812345678', // Numéro de téléphone togolais
            flooz: '+22887654321',  // Numéro de téléphone togolais
            bank: 'TG1234567890123456' // Numéro de compte bancaire
        },
        total: '250 000Fcfa'
    },
    {
        number: '121530',
        marchandise: "marchandise1",
        montant: '600 000Fcfa',
        dateEmission: '22-07-24',
        clientName: 'John Doe',
        clientAddress: '123 Rue, Lomé',
        items: [
            { description: 'Marchandise 1', price: 100000, quantity: 2 },
            { description: 'Marchandise 3', price: 200000, quantity: 1 }
        ],
        paymentInfo: {
            tmoney: '+22812345678', // Numéro de téléphone togolais
            flooz: '+22887654321',  // Numéro de téléphone togolais
            bank: 'TG1234567890123456' // Numéro de compte bancaire
        },
        total: '600 000Fcfa'
    },
    {
        number: '120536',
        marchandise: "marchandise1",
        montant: '400 000Fcfa',
        dateEmission: '22-07-24',
        clientName: 'John Doe',
        clientAddress: '123 Rue, Lomé',
        items: [
            { description: 'Marchandise 1', price: 100000, quantity: 1 },
            { description: 'Marchandise 4', price: 300000, quantity: 1 }
        ],
        paymentInfo: {
            tmoney: '+22812345678', // Numéro de téléphone togolais
            flooz: '+22887654321',  // Numéro de téléphone togolais
            bank: 'TG1234567890123456' // Numéro de compte bancaire
        },
        total: '400 000Fcfa'
    },
    {
        number: '120536',
        marchandise: "marchandise1",
        montant: '400 000Fcfa',
        dateEmission: '22-07-24',
        clientName: 'John Doe',
        clientAddress: '123 Rue, Lomé',
        items: [
            { description: 'Marchandise 1', price: 100000, quantity: 1 },
            { description: 'Marchandise 4', price: 300000, quantity: 1 }
        ],
        paymentInfo: {
            tmoney: '+22812345678', // Numéro de téléphone togolais
            flooz: '+22887654321',  // Numéro de téléphone togolais
            bank: 'TG1234567890123456' // Numéro de compte bancaire
        },
        total: '400 000Fcfa'
    },

];


    return(
        <>
            <TableContainer component={Paper} className="invoice-container">
                <Table className="invoice-table-root" aria-label="simple table">
                    <TableHead className="invoice-header">
                    <TableRow className="invoice-row-head">
                        <TableCell className="invoice-cell-head">Marchandise</TableCell>
                        <TableCell className="invoice-cell-head">Montant</TableCell>
                        <TableCell className="invoice-cell-head">DateEmission</TableCell>
                        <TableCell className="invoice-cell-head">Télécharger</TableCell>
                    </TableRow>
                    </TableHead>

                    <TableBody className="invoice-body">
                    {rows.map((row, index) => (
                        <TableRow key={index} className="invoice-row-body">
                        <TableCell className="cell-body">{row.marchandise}</TableCell>
                        <TableCell className="cell-body">{row.montant}</TableCell>
                        <TableCell className="cell-body">{row.dateEmission}</TableCell>
                        <TableCell className="cell-body">
                            <button className='telecharger' >
                                 <RiDownloadCloud2Line className="download-icon" onClick={() => openPopup(row)} />
                            </button>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <InvoicePopup isOpen={isPopupOpen} onClose={closePopup} invoice={selectedInvoice} />
        </>
    )
}

export default TableFactureC;