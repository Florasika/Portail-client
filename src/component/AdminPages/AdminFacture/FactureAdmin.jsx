import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { RiDownloadCloud2Line } from "react-icons/ri";
import './FactureAdmin.css';
import FactureDetails from "./FactureDetails";


const TableFactureAdmin = () => {

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
        {
            marchandise: "23562",
            montant: '500 000Fcfa',
            dateEmission: '22-07-24',
            clientName: 'John Doe',
           
        },
        {
            marchandise: "23562",
            montant: '500 000Fcfa',
            dateEmission: '22-07-24',
            clientName: 'John Doe',
           
        },
        {
            marchandise: "23562",
            montant: '500 000Fcfa',
            dateEmission: '22-07-24',
            clientName: 'John Doe',
           
        },
        {
            marchandise: "23562",
            montant: '500 000Fcfa',
            dateEmission: '22-07-24',
            clientName: 'John Doe',
           
        },
    
    
];


    return(
        <>
            <TableContainer component={Paper} className="invoice-c">
                <Table className="invoice-table-r" aria-label="simple table">
                    <TableHead className="invoice-h">
                    <TableRow className="invoice-row-h">
                        <TableCell className="invoice-cell-h">Marchandise</TableCell>
                        <TableCell className="invoice-cell-h">Montant</TableCell>
                        <TableCell className="invoice-cell-h">DateEmission</TableCell>
                        <TableCell className="invoice-cell-h">Nom du client</TableCell>
                        <TableCell className="invoice-cell-h">Actions</TableCell>
                    </TableRow>
                    </TableHead>

                    <TableBody className="invoice-b">
                    {rows.map((row, index) => (
                        <TableRow key={index} className="invoice-row-b">
                        <TableCell className="cell-b">{row.marchandise}</TableCell>
                        <TableCell className="cell-b">{row.montant}</TableCell>
                        <TableCell className="cell-b">{row.dateEmission}</TableCell>
                        <TableCell className="cell-b">{row.clientName}</TableCell>
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
    )
}

export default TableFactureAdmin;