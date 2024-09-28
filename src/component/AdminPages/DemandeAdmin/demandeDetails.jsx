import React, { useState } from 'react';
import './demandeDetails.css';
import { useLocation, useNavigate } from 'react-router-dom';

const DemandDetails = ({ isOpen, onClose, request }) => {
    if (!isOpen) return null; // Ne rien afficher si la pop-up n'est pas ouverte

    const { transport, livraison, type, poids, quantite, statut } = request || {};

    const handleClosePopup = () => {
        onClose(); // Fermer la pop-up
    };

    const handleApprove = () => {
        console.log('Demande approuvée');
        handleClosePopup();
    };

    const handleReject = () => {
        console.log('Demande rejetée');
        handleClosePopup();
    };

    return (
        <div className="popupDetails">
            <div className="popup-content">
                <h2>Détails de la demande</h2>
                <div className="detail-container">
                    <div className="detail-row">
                        <div className="detail-group">
                            <label>Transport:</label>
                            <p>{transport}</p>
                        </div>
                        <div className="detail-group">
                            <label>Livraison:</label>
                            <p>{livraison}</p>
                        </div>
                    </div>
                    <div className="detail-row">
                        <div className="detail-group">
                            <label>Type de marchandise:</label>
                            <p>{type}</p>
                        </div>
                        <div className="detail-group">
                            <label>Poids:</label>
                            <p>{poids}</p>
                        </div>
                    </div>
                    <div className="detail-row">
                        <div className="detail-group">
                            <label>Quantité:</label>
                            <p>{quantite}</p>
                        </div>
                        <div className="detail-group">
                            <label>Statut:</label>
                            <p>{statut === 'green' ? 'terminé' : 'en attente'}</p>
                        </div>
                    </div>
                </div>
                <div className="popup-actions">
                    <button onClick={handleApprove} className="approve-btn">Approuver</button>
                    <button onClick={handleReject} className="reject-btn">Rejeter</button>
                </div>
            </div>
        </div>
        
    );
};

export default DemandDetails;
