import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import './AdminDemande.css';
import axiosInstance from '../../../axios';

const formatDate = (dateArray) => {
    if (!dateArray) return 'Pas de date'; // Gérer les dates nulles

    if (Array.isArray(dateArray) && dateArray.length >= 6) {
        const [year, month, day, hours, minutes, seconds, nanoseconds] = dateArray;

        // Créer un objet Date en utilisant ces valeurs
        const date = new Date(year, month - 1, day, hours, minutes, seconds, Math.floor(nanoseconds / 1000000));

        // Vérifier si la date est valide
        if (isNaN(date.getTime())) {
            return 'Date invalide'; // Gérer les dates invalides
        }

        // Formater la date et l'heure
        return date.toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }) + ' ' + date.toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit',
        });
    }

    return 'Date invalide'; // Gérer les cas imprévus
};

const convertArrayToDate = (dateArray) => {
    if (Array.isArray(dateArray) && dateArray.length >= 6) {
        const [year, month, day, hours, minutes, seconds, nanoseconds] = dateArray;
        return new Date(year, month - 1, day, hours, minutes, seconds, Math.floor(nanoseconds / 1000000));
    }
    return null;
};

const AdminDemande = () => {
    const [demandes, setDemandes] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: 'dateDemande', direction: 'desc' });

    // Utilisation de useEffect pour effectuer un appel à l'API lors du chargement du composant
    useEffect(() => {
        axiosInstance.get('admin/all-demande')
            .then(response => {
                setDemandes(response.data); // Mise à jour du state avec les données de l'API
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des données :", error);
            });
    }, []);

    // Fonction pour gérer le tri des données
    const sortData = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    // Fonction pour trier les données en fonction de la configuration de tri
    const sortedDemandes = [...demandes].sort((a, b) => {
        if (sortConfig.key === 'dateDemande') {
            const dateA = convertArrayToDate(a.dateDemande);
            const dateB = convertArrayToDate(b.dateDemande);

            if (!dateA || !dateB) return 0; // Si une des dates est null, ne rien changer
            return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA;
        } else if (sortConfig.key === 'demandePar') {
            const nomA = a.demandePar.toLowerCase();
            const nomB = b.demandePar.toLowerCase();
            if (nomA < nomB) return sortConfig.direction === 'asc' ? -1 : 1;
            if (nomA > nomB) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        }
        return 0;
    });

    return (
        <TableContainer component={Paper} className="table-container">
            <Table className="table-root" aria-label="simple table">
                <TableHead className="table-head">
                    <TableRow className="table-row-head">
                        <TableCell className="table-cell-head" onClick={() => sortData('dateDemande')}>
                            Date de demande {sortConfig.key === 'dateDemande' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                        </TableCell>
                        <TableCell className="table-cell-head">Type de marchandise</TableCell>
                        <TableCell className="table-cell-head">Description de marchandise</TableCell>
                        <TableCell className="table-cell-head">Poids de la marchandise</TableCell>
                        <TableCell className="table-cell-head" onClick={() => sortData('demandePar')}>
                            Demander par {sortConfig.key === 'demandePar' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                        </TableCell>
                        <TableCell className="table-cell-head">Statut</TableCell>
                        <TableCell className="table-cell-head">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody className="table-body-container">
                    {sortedDemandes.map((demande, index) => (
                        <TableRow key={index} className="table-row-body">
                            <TableCell className="table-cell-body">{formatDate(demande.dateDemande)}</TableCell>
                            <TableCell className="table-cell-body">{demande.typeMarchandise}</TableCell>
                            <TableCell className="table-cell-body">{demande.descriptionMarchandise}</TableCell>
                            <TableCell className="table-cell-body">{demande.poids} KG</TableCell>
                            <TableCell className="table-cell-body">{demande.demandePar}</TableCell>
                            <TableCell className="table-cell-body">
                                <span className={`status-icon ${demande.statut === 'APPROUVEE' ? 'green' : 'red'}`}></span>
                            </TableCell>
                            <TableCell className="icon-button">
                                <a href="#">
                                    <FaEdit className="edit-icon" />
                                </a>
                                <a href="#">
                                    <MdDelete className="delete-icon" />
                                </a>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default AdminDemande;
