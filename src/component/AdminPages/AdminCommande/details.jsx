import React, { useState } from "react";
import './details.css';


function Details() {
  const [lieuLivraison, setLieuLivraison] = useState('');

  const handleLivraisonTerminee = () => {
    // Ici, vous ajouteriez la logique pour marquer la livraison comme terminée
    // Par exemple, une requête API pour mettre à jour le statut dans une base de données
    console.log('Livraison terminée');
  };

  return (
    <div className="livraison-container">
      <h2>Détails de la marchandise</h2>
      <div className="detail">
        <p>Lieu de transport : France</p>
        <p>Type de marchandise : Périssable</p>
        <p>Lieu de livraison : <input type="text" value={lieuLivraison} onChange={(e) => setLieuLivraison(e.target.value)} /></p>
        <p>Nom du client : KOSSI Jean</p>
        <p>Poids : 40KG</p>
        <p>Quantité : 20</p>
        <p>N° de facture : 236541</p>
        <p>État : En cours</p>
        <p>Date de départ : -------</p>
        <p>Date d'arrivée : -------</p>
      </div>
      <button onClick={handleLivraisonTerminee}>Terminé la livraison</button>
    </div>
  );
}

export default Details;