import React, { useState } from 'react';
import TablePrix from './TablePrix';
import './parametre.css';
import axiosInstance from '../../../axios';
import Swal from 'sweetalert2'; // Importer SweetAlert2

const PrixPrevus =  ({ onClose, onSubmit }) => {
  const [marchandise, setMarchandise] = useState('');
  const [prixPrevu, setPrixPrevu] = useState('');
  const [prixTransport, setPrixTransport] = useState('');
  const [showTable, setShowTable] = useState(false);
  const [data, setData] = useState([]);

  const handleMarchandiseChange = (e) => setMarchandise(e.target.value);
  const handlePrixPrevuChange = (e) => setPrixPrevu(e.target.value);
  const handlePrixTransportChange = (e) => setPrixTransport(e.target.value);

  const handleSubmit = async () => {
    const newTarif = {
      typeMarchandise: marchandise,
      montantParKg: parseFloat(prixPrevu),
      montantParKm: parseFloat(prixTransport),
    };

    try {
      // Utilisation d'Axios pour l'appel POST
      const response = await axiosInstance.post('/admin/ajouter', newTarif);

      if (response.status === 201) {
        const result = response.data;
        setData([...data, {
          type: result.typeMarchandise,
          kg: '1kg', // Exemple, à ajuster
          price: result.montantParKg,
        }]);
        setShowTable(true); // Afficher le tableau après avoir ajouté les données

        // Afficher une alerte de succès avec SweetAlert2
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'Le tarif a été ajouté avec succès.',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        // Gestion spécifique du duplicata de marchandise
        Swal.fire({
          icon: 'error',
          title: 'Erreur de duplication',
          text: error.response.data, // Afficher le message personnalisé renvoyé par le backend
          confirmButtonText: 'OK',
        });
      } else {
        // Gestion d'erreurs générales
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: "Une erreur s'est produite lors de l'ajout du tarif.",
          confirmButtonText: 'OK',
        });
      }
    }
  };

  const handleDelete = (index) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
    if (newData.length === 0) setShowTable(false);
  };

  const handleUpdate = (index) => {
    const itemToUpdate = data[index];
    const newType = prompt('Modifier le type de marchandise:', itemToUpdate.type);
    const newPrice = prompt('Modifier le prix:', itemToUpdate.price);

    const updatedData = data.map((item, i) =>
      i === index ? { ...item, type: newType || item.type, price: newPrice || item.price } : item
    );
    setData(updatedData);
  };

  if (showTable) {
    return <TablePrix data={data} onDelete={handleDelete} onUpdate={handleUpdate} />;
  }

  return (
    <div className="prix-prevus-container">
      <div className="form-g">
        <label htmlFor="marchandise">Type de marchandise</label>
        <select 
          id="marchandise" 
          value={marchandise} 
          onChange={handleMarchandiseChange}
          className="form-control"
        >
          <option value="" disabled>Sélectionner</option>
          <option value="PERISSABLES">Périssable</option>
          <option value="NON_PERISSABLES">Non périssable</option>
          <option value="DANGEREUSES">Dangereuses</option>
          <option value="VOLUMINEUSES">Volumineuses</option>
          <option value="FRAGILES">Fragiles</option>
        </select>
      </div>

      <div className="form-g">
        <label htmlFor="prixPrevu">Prix prévus/KG</label>
        <div className="input-group">
          <input 
            type="text" 
            id="prixPrevu" 
            value={prixPrevu} 
            onChange={handlePrixPrevuChange}
            className="form-control"
          />
           <button className="btn-prix">Prix</button>
        </div>
      </div>

      <div className="form-g">
        <label htmlFor="prixTransport">Prix de transport/KM</label>
        <div className="input-group">
          <input 
            type="text" 
            id="prixTransport" 
            value={prixTransport} 
            onChange={handlePrixTransportChange} 
            className="form-control"
          />
           <button className="btn-prix">Prix</button>
        </div>
      </div>

      <button className="btn-submit" onClick={handleSubmit}>Enregistrer</button>
    </div>
  );
};

export default PrixPrevus;
