import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import './DemandeDetails.css';
import axiosInstance from '../../../axios';

const DemandeDetails = () => {
    const { id } = useParams(); // Récupère l'ID de la demande depuis l'URL
    const [demande, setDemande] = useState(null);
    const [distance, setDistance] = useState(0); // Pour stocker la distance calculée
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDemandeDetails = async () => {
            try {
                const response = await axiosInstance.get(`/admin/demandebyId/${id}`);
                setDemande(response.data);

                // Calculer la distance ici (Haversine ou Google Maps Distance API)
                const dist = calculateDistance(
                    response.data.lieuTransport.latitude,
                    response.data.lieuTransport.longitude,
                    response.data.lieuLivraison.latitude,
                    response.data.lieuLivraison.longitude
                );
                setDistance(dist);
            } catch (error) {
                console.error("Erreur lors de la récupération des détails de la demande:", error);
            }
        };
        fetchDemandeDetails();
    }, [id]);

    // Fonction pour calculer la distance entre deux points (utilisation de la formule Haversine)
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Rayon de la Terre en kilomètres
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a = 
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance en kilomètres
    };

    // Fonction pour gérer l'approbation ou le rejet de la demande
    const handleApproval = async (approve) => {
        try {
            if (approve) {
                // Appel de l'API pour approuver la demande
                await axiosInstance.put(`/admin/approuver-demande/${id}`);
            } else {
                // Appel de l'API pour rejeter la demande
                await axiosInstance.put(`/admin/rejeter-demande/${id}`);
            }
            // Redirige vers la liste des demandes après approbation/rejet
            navigate('/admin/demandes');
        } catch (error) {
            console.error("Erreur lors de la mise à jour de la demande:", error);
        }
    };

    if (!demande) {
        return <div>Chargement...</div>; // Affichage en attendant que les données soient récupérées
    }

    return (
        <div className="demande-details-container">
            <h2>Détails de la demande</h2>
            <p><strong>Type de marchandise :</strong> {demande.typeMarchandise}</p>
            <p><strong>Poids :</strong> {demande.poids} kg</p>
            <p><strong>Statut :</strong> {demande.statut}</p>
            <p><strong>Demandé par :</strong> {demande.demandePar}</p>
            <p><strong>Téléphone du livreur :</strong> {demande.telLivreA}</p>
            <p><strong>Description du lieu de livraison :</strong> {demande.descriptionLieuxLivraison}</p>
            <p><strong>Date de la demande :</strong> {new Date(demande.dateDemande).toLocaleDateString()}</p>
            <p><strong>Date de traitement :</strong> {demande.dateTraitement ? new Date(demande.dateTraitement).toLocaleDateString() : "Non traitée"}</p>
            <p><strong>Distance à parcourir :</strong> {distance.toFixed(2)} km</p>

            {/* Affichage de la carte Google Maps */}
            <LoadScript googleMapsApiKey="VOTRE_API_KEY_GOOGLE_MAPS">
                <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '400px' }}
                    center={{ lat: demande.lieuTransport.latitude, lng: demande.lieuTransport.longitude }}
                    zoom={10}
                >
                    {/* Marker pour le lieu de transport */}
                    <Marker position={{ lat: demande.lieuTransport.latitude, lng: demande.lieuTransport.longitude }} label="Transport" />
                    {/* Marker pour le lieu de livraison */}
                    <Marker position={{ lat: demande.lieuLivraison.latitude, lng: demande.lieuLivraison.longitude }} label="Livraison" />
                </GoogleMap>
            </LoadScript>

            <div className="actions">
                <button onClick={() => handleApproval(true)}>Approuver</button>
                <button onClick={() => handleApproval(false)}>Rejeter</button>
            </div>
        </div>
    );
};

export default DemandeDetails;
