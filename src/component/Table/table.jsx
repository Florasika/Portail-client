import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import './table.css'; // Assurez-vous de créer ce fichier pour vos styles personnalisés

const TableDemande = () => {
    const rows = [
        { transport: 'Chine', livraison: 'Lomé', type: 'Élaboré', poids: '50KG', quantite: 20, statut: 'green' },
        { transport: 'Chine', livraison: 'Agoè', type: 'Non-Élaboré', poids: '50KG', quantite: 20, statut: 'red' },
        { transport: 'Chine', livraison: 'Tokoin', type: 'Périssable', poids: '50KG', quantite: 20, statut: 'green' },
        { transport: 'Chine', livraison: 'Baguida', type: 'Non-périssable', poids: '50KG', quantite: 20, statut: 'green' },
        
    ];

  

    return (
        <TableContainer component={Paper} className="table-container">
            <Table className="table-root" aria-label="simple table">
                <TableHead className="table-head">
                    <TableRow className="table-row-head">
                        <TableCell className="table-cell-head">Transport</TableCell>
                        <TableCell className="table-cell-head">Livraison</TableCell>
                        <TableCell className="table-cell-head">Type de marchandise</TableCell>
                        <TableCell className="table-cell-head">Poids</TableCell>
                        <TableCell className="table-cell-head">Quantité</TableCell>
                        <TableCell className="table-cell-head">Statut</TableCell>
                       
                    </TableRow>
                </TableHead>
                <TableBody className="table-body">
                    {rows.map((row, index) => (
                        <TableRow key={index} className="table-row-body">
                            <TableCell className="table-cell-body">{row.transport}</TableCell>
                            <TableCell className="table-cell-body">{row.livraison}</TableCell>
                            <TableCell className="table-cell-body">{row.type}</TableCell>
                            <TableCell className="table-cell-body">{row.poids}</TableCell>
                            <TableCell className="table-cell-body">{row.quantite}</TableCell>
                            <TableCell className="table-cell-body">
                                <span className={`status-icon ${row.statut}`}></span>
                            </TableCell>
                            <TableCell className="icon-button">
                                <a href="#">
                                    <FaEdit className="edit-icon"/>
                                </a>
                                <a href="#">
                                 <MdDelete className="delete-icon"/>
                                </a>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TableDemande;
