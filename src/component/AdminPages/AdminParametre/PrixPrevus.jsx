import React, { useState } from 'react';
import TablePrix from './TablePrix';
import './parametre.css';
import axiosInstance from '../../../axios';

const PrixPrevus =  ({ onClose, onSubmit }) => {
  const [marchandise, setMarchandise] = useState('');
  const [prixPrevu, setPrixPrevu] = useState('');
  const [prixTransport, setPrixTransport] = useState('');
  const [showTable, setShowTable] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleMarchandiseChange = (e) => setMarchandise(e.target.value);
  const handlePrixPrevuChange = (e) => setPrixPrevu(e.target.value);
  const handlePrixTransportChange = (e) => setPrixTransport(e.target.value);

  const handleSubmit = async () => {
    setError(''); // Réinitialiser les erreurs
    setSuccess(''); // Réinitialiser les messages de succès

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
        setSuccess('Le tarif a été ajouté avec succès.');
      } else {
        setError("Erreur lors de l'ajout du tarif.");
      }
    } catch (error) {
      setError("Erreur de communication avec l'API.");
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

      {/* Afficher les messages d'erreur et de succès */}
      {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
      {success && <p className="success-message" style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};

export default PrixPrevus;
