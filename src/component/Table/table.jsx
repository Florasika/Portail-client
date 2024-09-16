import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios'; // Assurez-vous que le chemin vers axiosInstance est correct
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import './table.css';  

const TableDemande = () => {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const fetchDemandes = async () => {
            try {
                const response = await axiosInstance.get('admin/all-demande');
                console.log('Réponse reçue du backend :', response.data);  // Affichez la réponse pour vérifier les données
                setRows(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des données :', error);
            }
        };

        fetchDemandes();
    }, []);

    return (
        <TableContainer component={Paper} className="table-container">
            <Table className="table-root" aria-label="table des demandes">
                <TableHead className="table-head">
                    <TableRow className="table-row-head">
                        <TableCell className="table-cell-head">Transport</TableCell>
                        <TableCell className="table-cell-head">Livraison</TableCell>
                        <TableCell className="table-cell-head">Type de marchandise</TableCell>
                        <TableCell className="table-cell-head">Poids</TableCell>
                        <TableCell className="table-cell-head">Statut</TableCell>
                        <TableCell className="table-cell-head">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody className="table-body">
                    {rows.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="no-data-cell">
                                <Typography align="center">Aucune demande disponible</Typography>
                            </TableCell>
                        </TableRow>
                    ) : (
                        rows.map((row, index) => (
                            <TableRow key={index} className="table-row-body">
                                <TableCell className="table-cell-body">{row.transport}</TableCell> {/* Assurez-vous que ce champ correspond */}
                                <TableCell className="table-cell-body">{row.livraison}</TableCell> {/* Assurez-vous que ce champ correspond */}
                                <TableCell className="table-cell-body">{row.type}</TableCell> {/* Assurez-vous que ce champ correspond */}
                                <TableCell className="table-cell-body">{row.poids}</TableCell> {/* Assurez-vous que ce champ correspond */}
                                <TableCell className="table-cell-body">
                                    <span className={`status-icon ${row.statut.toLowerCase()}`}></span> {/* Gérer les statuts */}
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
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TableDemande;
