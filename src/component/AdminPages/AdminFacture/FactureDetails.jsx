import React, { useState } from 'react';
import './FactureDetails.css';
import { IoClose } from "react-icons/io5";
import { useLocation, useNavigate } from 'react-router-dom';

const DemandDetails = ({ isOpen, onClose, request }) => {
    if (!isOpen) return null; // Ne rien afficher si la pop-up n'est pas ouverte

    const {marchandise, montant, dateEmission, clientName } = request || {};

    const handleClosePopup = () => {
        onClose(); // Fermer la pop-up
    };

    const handleApprove = () => {
        
        handleClosePopup();
    };

    const handleReject = () => {
       
        handleClosePopup();
    };

    return (
        <div className="popupDetails">
            <div className="popup-content">
            <button className="close-btn" onClick={onClose}><IoClose className='close-icon'/></button>
                <h2>Détails de la facture</h2>
                <div className="detail-container">
                    <div className="detail-row">
                        <div className="detail-group">
                            <label>Marchandise:</label>
                            <p>{marchandise}</p>
                        </div>
                        <div className="detail-group">
                            <label>Montant:</label>
                            <p>{montant}</p>
                        </div>
                    </div>
                    <div className="detail-row">
                        <div className="detail-group">
                            <label>Date d'emission:</label>
                            <p>{dateEmission}</p>
                        </div>
                        <div className="detail-group">
                            <label>Nom du cient:</label>
                            <p>{clientName}</p>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        
    );
};

export default DemandDetails;
