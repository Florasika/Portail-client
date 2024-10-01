import React from 'react';
import './FactureDetails.css';
import { IoClose } from "react-icons/io5";

const FactureDetails = ({ isOpen, onClose, request }) => {
    if (!isOpen) return null;

    const { numeroMarchandise, montantTotale, dateEmission, FactureDe } = request || {};

    return (
        <div className="popupDetails">
            <div className="popup-content">
                <button className="close-btn" onClick={onClose}><IoClose className='close-icon'/></button>
                <h2>Détails de la facture</h2>
                <div className="detail-container">
                    <div className="detail-row">
                        <div className="detail-group">
                            <label>Marchandise:</label>
                            <p>{numeroMarchandise}</p>
                        </div>
                        <div className="detail-group">
                            <label>Montant:</label>
                            <p>{montantTotale}</p>
                        </div>
                    </div>
                    <div className="detail-row">
                        <div className="detail-group">
                            <label>Date d'émission:</label>
                            <p>{dateEmission}</p>
                        </div>
                        <div className="detail-group">
                            <label>Nom du client:</label>
                            <p>{FactureDe}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FactureDetails;
