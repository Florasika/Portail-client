import React, { useEffect, useState } from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import './TablePrix.css';
import axiosInstance from '../../../axios';

const TablePrix = ({ data = [], onDelete, onUpdate }) => {
  return (
    <TableContainer component={Paper} className="table-prix">
      <Table className="root-prix" aria-label="simple table">
        <TableHead className="table-head-prix">
          <TableRow className="row-head-prix">
            <TableCell className="cell-head-prix">Type de marchandise</TableCell>
            <TableCell className="cell-head-prix">Prix /KG</TableCell>
            <TableCell className="cell-head-prix">Prix /Km</TableCell>
            <TableCell className="cell-head-prix">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className="table-body-prix">
          {data.length > 0 ? (
            data.map((row, index) => (
              <TableRow key={index} className="table-row-prix">
                <TableCell className="cell-prix">{row.typeMarchandise}</TableCell>
                <TableCell className="cell-prix">{row.montantParKg}</TableCell>
                <TableCell className="cell-prix">{row.montantParKm}</TableCell>
                <TableCell className="cell-prix">
                  <button 
                    className="update-btn"
                    onClick={() => onUpdate(index)}
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
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="cell-prix">
                Aucune donnée disponible
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axiosInstance.get('admin/all-tarif')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  const handleDelete = (index) => {
    // Logique pour supprimer une ligne
  };

  const handleUpdate = (index) => {
    // Logique pour mettre à jour une ligne
  };

  return (
    <div>
      <TablePrix data={data} onDelete={handleDelete} onUpdate={handleUpdate} />
    </div>
  );
};

export default App;
