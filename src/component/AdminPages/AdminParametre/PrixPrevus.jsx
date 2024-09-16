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

  // Si `showTable` est vrai, afficher le tableau, sinon afficher le formulaire
  if (showTable) {
    return <TablePrix data={data} />;
  }

  return (
    <div className="prix-prevus-container">
      <div className="form-group">
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

      <div className="form-group">
        <label htmlFor="prixPrevu">Prix prévus/KG</label>
        <div className="input-group">
          <input 
            type="text" 
            id="prixPrevu" 
            value={prixPrevu} 
            onChange={handlePrixPrevuChange}
            placeholder="Prix" 
            className="form-control"
          />
          <button className="btn-prix">Prix</button>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="prixTransport">Prix de transport/KM</label>
        <div className="input-group">
          <input 
            type="text" 
            id="prixTransport" 
            value={prixTransport} 
            onChange={handlePrixTransportChange}
            placeholder="Prix" 
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
