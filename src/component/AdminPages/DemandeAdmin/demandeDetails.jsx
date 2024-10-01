import React from 'react';
import './demandeDetails.css';
import axiosInstance from '../../../axios';

const DemandDetails = ({ isOpen, onClose, request }) => {
    if (!isOpen) return null; // Ne rien afficher si la pop-up n'est pas ouverte

    const { id, transport, livraison, type, poids, quantite, statut } = request || {};

    const handleClosePopup = () => {
        onClose(); // Fermer la pop-up
    };

    const handleApprove = async () => {
        try {
            const response = await axiosInstance.put(`admin/approuver-demande/${id}`);
            if (response.status === 200) {
                console.log('Demande approuvée');
                handleClosePopup();
            } else {
                console.error('Erreur lors de l\'approbation de la demande');
            }
        } catch (error) {
            console.error('Erreur lors de l\'approbation de la demande', error);
        }
    };

    const handleReject = async () => {
        try {
            const response = await axiosInstance.put(`admin/rejeter-demande/${id}`);
            if (response.status === 204) {
                console.log('Demande rejetée');
                handleClosePopup();
            } else {
                console.error('Erreur lors du rejet de la demande');
            }
        } catch (error) {
            console.error('Erreur lors du rejet de la demande', error);
        }
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
                            <p>{statut === 'APPROUVEE' ? 'terminé' : 'en attente'}</p>
                        </div>
                    </div>
                </div>
                {statut !== 'APPROUVEE' || statut !== 'REJETEE'  && (
                    <div className="popup-actions">
                        <button onClick={handleApprove} className="approve-btn">Approuver</button>
                        <button onClick={handleReject} className="reject-btn">Rejeter</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DemandDetails;
