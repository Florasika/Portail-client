import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { FaInfoCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'; // Pour la navigation vers la page de détails
import './AdminDemande.css';
import axiosInstance from '../../../axios';

const AdminDemande = () => {
    const [rows, setRows] = useState([]);
    const navigate = useNavigate(); // Hook pour naviguer vers d'autres pages

    const fetchDemandes = async () => {
        try {
            const response = await axiosInstance.get('admin/all-demande');
            setRows(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des demandes:", error);
        }
    };

    useEffect(() => {
        fetchDemandes();
    }, []);

    return (
        <TableContainer component={Paper} className="table-container">
            <Table className="table-root" aria-label="simple table">
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
                    {rows.map((row, index) => (
                        <TableRow key={index} className="table-row-body">
                            <TableCell className="table-cell-body">{row.typeMarchandise}</TableCell>
                            <TableCell className="table-cell-body">{row.poids}</TableCell>
                            <TableCell className="table-cell-body">{row.statut}</TableCell>
                            <TableCell className="table-cell-body">{row.demandePar}</TableCell>
                            <TableCell className="icon-button">
                                <button 
                                    onClick={() => navigate(`/demande/${row.id}`)} 
                                    className="detail-icon-button">
                                    <FaInfoCircle className="detail-icon" /> Détails
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default AdminDemande;
