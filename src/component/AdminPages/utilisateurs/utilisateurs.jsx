import React from 'react';
import { MdDelete } from "react-icons/md";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import './utilisateurs.css';

const TableUtilisateurs = () => {
    
    const rows = [
        { nom: 'KOSSI', prenoms: "Koffi", motDePasse: 'Kossikoffi',  role: "aucun"},
        { nom: 'KOSSI', prenoms: "Koffi", motDePasse: 'Kossikoffi', role: "aucun"},
        { nom: 'KOSSI', prenoms: "Koffi", motDePasse: 'Kossikoffi', role: "aucun"},
        { nom: 'KOSSI', prenoms: "Koffi", motDePasse: 'Kossikoffi',  role: "admin"},
        { nom: 'KOSSI', prenoms: "Koffi", motDePasse: 'Kossikoffi',  role: "aucun"},
        { nom: 'KOSSI', prenoms: "Koffi", motDePasse: 'Kossikoffi',  role: "aucun"},
    ];   
    
    return(
        <TableContainer component={Paper} className='table-user'>
            <Table className='table-user-root' arial-label="simple table">
                <TableHead className='header_user'>
                    <TableRow className='row-head-user'>
                        <TableCell className='cell-user-head'>Nom</TableCell>
                        <TableCell className='cell-user-head'>Prénoms</TableCell>
                        <TableCell className='cell-user-head'>Mot de passe</TableCell>
                        <TableCell className='cell-user-head'>Rôle</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody className='body-user'>
                    {rows.map((row, index) => (
                        <TableRow key={index} className='row-body-user'>
                            <TableCell className='cell-user-body'>{row.nom}</TableCell>
                            <TableCell className='cell-user-body'>{row.prenoms}</TableCell>
                            <TableCell className='cell-user-body'>{row.motDePasse}</TableCell>
                            <TableCell className='cell-user-body'>{row.role}</TableCell>
                            <TableCell className='cell-user-body'>
                                <a href="">
                                    <MdDelete className='delete-icon'/>
                                </a>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TableUtilisateurs;
