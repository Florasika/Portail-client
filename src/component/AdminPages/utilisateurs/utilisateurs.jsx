import React, { useEffect, useState } from 'react';
import { MdDelete } from "react-icons/md";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import './utilisateurs.css';
import axiosInstance from '../../../axios';

const TableUtilisateurs = () => {
    const [users, setUsers] = useState([]);

    // Fonction pour récupérer les utilisateurs
    const fetchUsers = async () => {
        try {
            const response = await axiosInstance.get('/admin/all-user');
            setUsers(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des utilisateurs", error);
        }
    };

    // Fonction pour supprimer un utilisateur
    const handleDelete = async (userId) => {
        try {
            await axiosInstance.delete(`/admin/users/${userId}`);
            // Mettre à jour la liste des utilisateurs après suppression
            setUsers(users.filter(user => user.id !== userId));
        } catch (error) {
            console.error("Erreur lors de la suppression de l'utilisateur", error);
        }
    };

    // Hook useEffect pour récupérer les utilisateurs au montage du composant
    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <TableContainer component={Paper} className='table-user'>
            <Table className='table-user-root' arial-label="simple table">
                <TableHead className='header_user'>
                    <TableRow className='row-head-user'>
                        <TableCell className='cell-user-head'>Nom</TableCell>
                        <TableCell className='cell-user-head'>Prénoms</TableCell>
                        <TableCell className='cell-user-head'>Email</TableCell>
                        <TableCell className='cell-user-head'>État</TableCell>
                        <TableCell className='cell-user-head'>Rôle</TableCell>
                        <TableCell className='cell-user-head'>Actions</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody className='body-user'>
                    {users.map((user, index) => (
                        <TableRow key={index} className='row-body-user'>
                            <TableCell className='cell-user-body'>{user.nom}</TableCell>
                            <TableCell className='cell-user-body'>{user.prenom}</TableCell>
                            <TableCell className='cell-user-body'>{user.email}</TableCell>
                            <TableCell className='cell-user-body'>{user.etat ? 'actif' : 'inactif'}</TableCell>
                            <TableCell className='cell-user-body'>{user.userRole}</TableCell>
                            <TableCell className='cell-user-body'>
                                <button className="actions">
                                    {user.etat ? 'Bloquer' : 'Débloquer'}
                                </button>
                                <IconButton onClick={() => handleDelete(user.id)}>
                                    <MdDelete className='delete-icon'/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TableUtilisateurs;
