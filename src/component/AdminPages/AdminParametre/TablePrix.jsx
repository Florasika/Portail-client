import React, { useEffect, useState } from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import Swal from 'sweetalert2'; // Importer SweetAlert2
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
                    onClick={() => onUpdate(row, index)} // Passer les données et l'index pour mise à jour
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
  const [selectedTarif, setSelectedTarif] = useState(null); // Stocker les données du tarif sélectionné pour la mise à jour
  const [formData, setFormData] = useState({
    typeMarchandise: '',
    montantParKg: '',
    montantParKm: ''
  });

  useEffect(() => {
    // Récupérer les données depuis l'API
    axiosInstance.get('admin/all-tarif')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données !', error);
      });
  }, []);

  const handleDelete = (index) => {
    const tarifId = data[index].id;

    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Cette action est irréversible !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer !',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance.delete(`admin/supprimertarif/${tarifId}`)
          .then(response => {
            if (response.status === 204) {
              setData(data.filter((_, i) => i !== index));
              Swal.fire('Supprimé !', 'Le tarif a été supprimé.', 'success');
            }
          })
          .catch(error => {
            Swal.fire('Erreur !', 'Une erreur est survenue lors de la suppression.', 'error');
          });
      }
    });
  };

  const handleUpdate = (row, index) => {
    setSelectedTarif(row); // Enregistrer les données de la ligne sélectionnée
    setFormData({
      typeMarchandise: row.typeMarchandise,
      montantParKg: row.montantParKg,
      montantParKm: row.montantParKm
    });

    Swal.fire({
      title: 'Modifier le tarif',
      html: `
        <input id="typeMarchandise" class="swal2-input" value="${row.typeMarchandise}" placeholder="Type de marchandise">
        <input id="montantParKg" class="swal2-input" value="${row.montantParKg}" placeholder="Prix par Kg">
        <input id="montantParKm" class="swal2-input" value="${row.montantParKm}" placeholder="Prix par Km">
      `,
      focusConfirm: false,
      preConfirm: () => {
        return {
          typeMarchandise: document.getElementById('typeMarchandise').value,
          montantParKg: document.getElementById('montantParKg').value,
          montantParKm: document.getElementById('montantParKm').value
        };
      },
      showCancelButton: true,
      confirmButtonText: 'Mettre à jour',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedTarif = {
          typeMarchandise: result.value.typeMarchandise,
          montantParKg: result.value.montantParKg,
          montantParKm: result.value.montantParKm
        };

        // Envoyer la requête PUT pour mettre à jour le tarif
        axiosInstance.put(`admin/modifiertarif/${row.id}`, updatedTarif)
          .then(response => {
            const newData = [...data];
            newData[index] = response.data; // Mettre à jour la ligne dans les données locales
            setData(newData);

            Swal.fire('Mis à jour !', 'Le tarif a été mis à jour avec succès.', 'success');
          })
          .catch(error => {
            Swal.fire('Erreur !', 'Une erreur est survenue lors de la mise à jour.', 'error');
          });
      }
    });
  };

  return (
    <div>
      <TablePrix data={data} onDelete={handleDelete} onUpdate={handleUpdate} />
    </div>
  );
};

export default App;
