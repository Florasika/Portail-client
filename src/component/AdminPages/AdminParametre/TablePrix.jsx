import React from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import './TablePrix.css';

const TablePrix = ({data, onDelete, onUpdate}) => {
  return (
    <TableContainer component={Paper} className="table-prix">
      <Table className="root-prix" aria-label="simple table">
        <TableHead className="table-head-prix">
          <TableRow className="row-head-prix">
            <TableCell className="cell-head-prix">Type de marchandise</TableCell>
            <TableCell className="cell-head-prix">KG</TableCell>
            <TableCell className="cell-head-prix">Prix /KG</TableCell>
            <TableCell className="cell-head-prix">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className="table-body-prix">
          {data.map((row, index) => (
            <TableRow key={index} className="table-row-prix">
              <TableCell className="cell-prix">{row.type}</TableCell>
              <TableCell className="cell-prix">{row.kg}</TableCell>
              <TableCell className="cell-prix">{row.price}</TableCell>
              <TableCell className="cell-prix">
              <button 
                  className="update-btn"
                  
                >
                  Update
                </button>
                <button 
                  className="delete-btn"
                  onClick={() => onDelete(index)}
                >
                  Supprimer
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TablePrix;
