import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import './historique.css';
import { MdDelete } from "react-icons/md";

const TableHistorique = () => {
    const rows = [
        { facture: 'N°1253', datePaiement: '15-05-24', methode: 'Carte' },
        { facture: 'N°1253', datePaiement: '15-05-24', methode: 'Carte' },
        { facture: 'N°1253', datePaiement: '15-05-24', methode: 'Espèces' },
        { facture: 'N°1253', datePaiement: '15-05-24', methode: 'Carte' },
        { facture: 'N°1253', datePaiement: '15-05-24', methode: 'Carte' },
        { facture: 'N°1253', datePaiement: '15-05-24', methode: 'Espèces' },
    ];

    return (
        <TableContainer component={Paper} className="historique-container">
            <div className="header">
                <h2>Historiques des paiements</h2>
                <a href="">
                    <MdDelete className="delete-icon" />
                </a>
            </div>
            <Table className="historique-root" aria-label="simple table">
                <TableHead className="historique-header">
                    <TableRow className="historique-row-head">
                        <TableCell className="historique-cell-head">Facture</TableCell>
                        <TableCell className="historique-cell-head">Date Paiement</TableCell>
                        <TableCell className="historique-cell-head">Méthode</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody className="historique-body">
                    {rows.map((row, index) => (
                        <TableRow key={index} className="historique-row-body">
                            <TableCell className="cell-body">{row.facture}</TableCell>
                            <TableCell className="cell-body">{row.datePaiement}</TableCell>
                            <TableCell className="cell-body">{row.methode}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TableHistorique;