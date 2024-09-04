import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import React from "react";
import { MdDelete } from "react-icons/md";
import './tableCommande.css';

const TableCommande = () => {
    const rows = [
        { transport: 'Chine', type: 'Elaboré', date:'21-20-23' },
        { transport: 'Chine', type: 'Elaboré', date:'21-20-23' },
        { transport: 'Chine', type: 'Elaboré', date:'21-20-23' },
        { transport: 'Chine', type: 'Elaboré', date:'21-20-23' },
    ]

    return(
        <TableContainer component ={Paper} className="table-commande">
            <Table className="table_root" arial-label="simple table">
                <TableHead className="header_table">
                    <TableRow className="row_head">
                        <TableCell className="cell_head">Transport</TableCell>
                        <TableCell className="cell_head">Type de marchandise</TableCell>
                        <TableCell className="cell_head">Date de départ</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody className="body">
                    {rows.map((row, index) => (
                        <TableRow className="row_body">
                            <TableCell className="cell_body">{row.transport}</TableCell>
                            <TableCell className="cell_body">{row.type}</TableCell>
                            <TableCell className="cell_body">{row.date}</TableCell>
                            <TableCell className="cell_body">
                                <button className="livrer">Livré</button>
                                <a href="">
                                 <MdDelete className='delete-icon'/>
                                </a>
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            
        </TableContainer>

        
    )
}
export default TableCommande;