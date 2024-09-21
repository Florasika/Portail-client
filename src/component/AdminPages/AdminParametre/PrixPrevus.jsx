import React, { useState } from 'react';
import TablePrix from './TablePrix';
import './parametre.css';

const PrixPrevus =  ({ onClose, onSubmit }) => {
  const [marchandise, setMarchandise] = useState('');
  const [prixPrevu, setPrixPrevu] = useState('');
  const [prixTransport, setPrixTransport] = useState('');

  const handleMarchandiseChange = (e) => setMarchandise(e.target.value);
  const handlePrixPrevuChange = (e) => setPrixPrevu(e.target.value);
  const handlePrixTransportChange = (e) => setPrixTransport(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Vérification que tous les champs sont remplis avant de soumettre
    if (marchandise && prixPrevu && prixTransport) {
      onSubmit(marchandise, prixPrevu, prixTransport);
      // Réinitialiser les champs après la soumission
      setMarchandise('');
      setPrixPrevu('');
      setPrixTransport('');
      onClose(); // Fermer le formulaire après l'enregistrement
    } else {
      alert('Veuillez remplir tous les champs.');
    }
  };


  return (
   
  <div className="prix-prevus-container">
    <form onSubmit={handleSubmit}>
      <div className="form-r">
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
      </div>

      <div className="form-r">
        <div className="form-g">
          <label htmlFor="prixPrevu">Prix prévus/KG</label>
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

      <div className="form-r">
        <div className="form-g">
          <label htmlFor="prixTransport">Prix de transport/KM</label>
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

      <button type="submit" className="btn-submit" onClick={onClose}>Enregistrer</button>
    </form>
  </div>


  );
};

export default PrixPrevus;
