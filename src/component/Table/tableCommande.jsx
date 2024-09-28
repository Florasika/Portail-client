import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { MdDelete } from "react-icons/md";
import './tableCommande.css';
import axiosInstance from "../../axios";

const TableCommande = () => {
    const [rows, setRows] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    // Récupérer l'ID utilisateur à partir du localStorage
    const utilisateurId = localStorage.getItem('userId');

    useEffect(() => {
        // Vérifier si utilisateurId est valide avant d'appeler l'API
        if (!utilisateurId) {
            setError("L'ID utilisateur est manquant.");
            setLoading(false);
            return;
        }

        const fetchCommandes = async () => {
            try {
                const response = await axiosInstance.get(`/user/commandeBy-utilisateur/${utilisateurId}`);
                setRows(response.data); 
                setLoading(false); 
            } catch (err) {
                setError('Erreur lors de la récupération des commandes');
                setLoading(false); 
            }
        };

        fetchCommandes(); // Appel de la fonction lors du montage
    }, [utilisateurId]);

    if (loading) {
        return <p>Chargement en cours...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <TableContainer component={Paper} className="table-commande">
            <Table className="table_root" aria-label="simple table">
                <TableHead className="header_table">
                    <TableRow className="row_head">
                        <TableCell className="cell_head">Transport</TableCell>
                        <TableCell className="cell_head">Type de marchandise</TableCell>
                        <TableCell className="cell_head">Date de départ</TableCell>
                        <TableCell className="cell_head">Actions</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody className="body">
                    {rows.map((row, index) => (
                        <TableRow key={index} className="row_body">
                            <TableCell className="cell_body">{row.transport}</TableCell>
                            <TableCell className="cell_body">{row.typeMarchandise}</TableCell>
                            <TableCell className="cell_body">{row.date}</TableCell>
                            <TableCell className="cell_body">
                                <button className="livrer">Livré</button>
                                <IconButton>
                                    <MdDelete className="delete-icon" />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TableCommande;
