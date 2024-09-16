import React, { useState } from 'react';
import TablePrix from './TablePrix';
import './parametre.css';

const PrixPrevus = () => {
  const [marchandise, setMarchandise] = useState('');
  const [prixPrevu, setPrixPrevu] = useState('');
  const [prixTransport, setPrixTransport] = useState('');
  const [showTable, setShowTable] = useState(false);
  const [data, setData] = useState([]); // Stocker les données pour le tableau

  const handleMarchandiseChange = (e) => setMarchandise(e.target.value);
  const handlePrixPrevuChange = (e) => setPrixPrevu(e.target.value);
  const handlePrixTransportChange = (e) => setPrixTransport(e.target.value);

  const handleSubmit = () => {
    // Ajouter les nouvelles données au tableau
    setData([
      ...data,
      {
        type: marchandise,
        kg: '1kg', // Vous pouvez ajuster ce champ selon les besoins
        price: prixPrevu // Vous pouvez aussi utiliser prixTransport ici si besoin
      }
    ]);
    setShowTable(true); // Afficher le tableau après avoir appuyé sur Enregistrer
  };

  const handleDelete = (index) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
    if (newData.length === 0) setShowTable(false); // Si le tableau est vide, masquer la table
  };

  const handleUpdate = (index) => {
    const itemToUpdate = data[index];
    // Exemple de mise à jour avec un prompt (vous pouvez améliorer cela avec un formulaire plus convivial)
    const newType = prompt('Modifier le type de marchandise:', itemToUpdate.type);
    const newPrice = prompt('Modifier le prix:', itemToUpdate.price);

    const updatedData = data.map((item, i) =>
      i === index ? { ...item, type: newType || item.type, price: newPrice || item.price } : item
    );
    setData(updatedData);
  };

  // Si `showTable` est vrai, afficher le tableau, sinon afficher le formulaire
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
          <option value="Périssable">Périssable</option>
          <option value="Transformé">Transformé</option>
          <option value="Non-Transformé">Non-Transformé</option>
          <option value="Elaboré">Élaboré</option>
          <option value="Non périssable">Non périssable</option>
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
