import React, { useEffect, useState } from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import './TablePrix.css';
import PrixPrevus from './PrixPrevus';
import axiosInstance from '../../../axios';

const TablePrix = ({ onDelete, onUpdate }) => {
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

  const [isPrixPopupOpen, setIsPrixPopupOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState(null); // Nouvelle variable pour stocker la ligne actuelle à modifier

  const handleClickOpen = (row, index) => {
    setCurrentRow({ ...row, index }); // Stocke la ligne et l'index
    setIsPrixPopupOpen(true);
  };

  const handleClose = () => {
    setIsPrixPopupOpen(false);
    setCurrentRow(null); // Réinitialise la ligne actuelle après la fermeture
  };

  const handleSubmitPrix = (marchandise, prixPrevu, prixTransport) => {
    onUpdate(currentRow.index, marchandise, prixPrevu, prixTransport); // Appelle la fonction de mise à jour
    setIsPrixPopupOpen(false);
  };

  return (
    <TableContainer component={Paper} className="table-prix" data={data} onDelete={handleDelete} onUpdate={handleUpdate}>
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
                    onClick={() => handleClickOpen(row, index)} // Passe la ligne et l'index
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

      {isPrixPopupOpen && (
        <PrixPrevus
          onClose={handleClose}
          onSubmit={handleSubmitPrix}
          initialData={currentRow} // Passe les données actuelles au formulaire
        />)}
    </TableContainer>
  );
};

{/*const App = () => {
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

 

  return (
    <div>
      <TablePrix data={data} onDelete={handleDelete} onUpdate={handleUpdate} />
    </div>
  );
};*/}

export default TablePrix;
