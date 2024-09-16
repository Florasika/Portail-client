import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios'; 
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import './table.css';  
import { useNavigate } from 'react-router-dom'; 

const TableDemande = () => {  
    const [rows, setRows] = useState([]);
    const navigate = useNavigate(); 

    const utilisateurId = localStorage.getItem('userId'); 

    useEffect(() => {
        if (utilisateurId) { 
            const fetchDemandes = async () => {
                try {
                    const response = await axiosInstance.get(`/demande-par-utilisateur/${utilisateurId}`);
                    console.log('Réponse reçue du backend :', response.data);  
                    setRows(response.data);
                } catch (error) {
                    console.error('Erreur lors de la récupération des données :', error);
                }
            };
    
            fetchDemandes();
        } else {
            console.error('Aucun utilisateur connecté');
        }
    }, [utilisateurId]); 

    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`/user/demande/${id}`); 
            setRows(rows.filter(row => row.id !== id));
            console.log(`Demande avec l'ID ${id} supprimée avec succès.`);
        } catch (error) {
            console.error('Erreur lors de la suppression de la demande :', error);
        }
    };

    const handleEdit = (id) => {
        navigate(`/demande/edit/${id}`);
    };

    return (
        <TableContainer component={Paper} className="table-container">
            <Table className="table-root" aria-label="table des demandes">
                <TableHead className="table-head">
                    <TableRow className="table-row-head">
                        <TableCell className="table-cell-head">Type de marchandise</TableCell>
                        <TableCell className="table-cell-head">Poids (kg)</TableCell>
                        <TableCell className="table-cell-head">Statut</TableCell>
                        <TableCell className="table-cell-head">Demandé par</TableCell>
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
                                <TableCell className="table-cell-body">{row.typeMarchandise}</TableCell> {/* Type de marchandise */}
                                <TableCell className="table-cell-body">{row.poids}</TableCell> {/* Poids */}
                                <TableCell className="table-cell-body">
                                    <span className={`status-icon ${row.statut.toLowerCase()}`}></span> {/* Statut */}
                                </TableCell>
                                <TableCell className="table-cell-body">{row.demandePar}</TableCell> {/* Utilisateur */}
                                <TableCell className="icon-button">
                                    <button onClick={() => handleEdit(row.id)} className="edit-button">
                                        <FaEdit className="edit-icon"/> {/* Éditer */}
                                    </button>
                                    <button onClick={() => handleDelete(row.id)} className="delete-button">
                                        <MdDelete className="delete-icon"/> {/* Supprimer */}
                                    </button>
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
