import React from 'react';
import './FactureDetails.css';
import { IoClose } from "react-icons/io5";


const formatDate = (dateArray) => {
    if (!dateArray) return 'Pas de date'; // Gérer les dates nulles

    if (Array.isArray(dateArray) && dateArray.length >= 6) {
        const [year, month, day, hours, minutes, seconds, nanoseconds] = dateArray;

        // Créer un objet Date en utilisant ces valeurs
        const date = new Date(year, month - 1, day, hours, minutes, seconds, Math.floor(nanoseconds / 1000000));

        // Vérifier si la date est valide
        if (isNaN(date.getTime())) {
            return 'Date invalide'; // Gérer les dates invalides
        }

        // Formater la date et l'heure
        return date.toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }) + ' ' + date.toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit',
        });
    }

    return 'Date invalide'; // Gérer les cas imprévus
};

const FactureDetails = ({ isOpen, onClose, request }) => {
    if (!isOpen) return null;

    const { numeroMarchandise, montantTotale, soumisLe, factureDe } = request || {};

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
                            <p>{formatDate(soumisLe)}</p>
                        </div>
                        <div className="detail-group">
                            <label>Nom du client:</label>
                            <p>{factureDe}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FactureDetails;
