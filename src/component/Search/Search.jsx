import React, { useState } from 'react';
import { RiSearchLine } from "react-icons/ri";
import "./Search.css";
import Sidebar from "../Sidebar/Sidebar";
import Menu from "../Menu/Menu";
import TableDemande from "../Table/table";
import { SlOptions } from "react-icons/sl";
import TableCommande from '../Table/tableCommande';
import TableFactureC from '../Table/tableFacture';
import { TfiReload } from "react-icons/tfi";
import TableHistorique from '../Table/HistoriqueTable';
import { MdLocalPhone } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import TableUtilisateurs from '../AdminPages/utilisateurs/utilisateurs';
import AdminCommande from '../AdminPages/AdminCommande/AdminCommande';
import AdminDemande from '../AdminPages/DemandeAdmin/AdminDemande';
import axiosInstance from '../../axios';



function Search({ type }) {
    const [showDetails, setShowDetails] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isUserPopupOpen, setIsUserPopupOpen] = useState(false);
    
    const role = localStorage.getItem('role');

    const [formData, setFormData] = useState({
        lieuTransport: '',
        lieuLivraison: '',
        typeMarchandise: '',
        poids: '',
        quantite: '',
        descPoids: '',
        descLieuLivraison: '',
        livreA: ''
    });
    const [userFormData, setUserFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        tel: '' // Ajoutez le champ numéro ici
    });

    const handleUserChange = (e) => {
        const { id, value } = e.target;
        setUserFormData((prevUserFormData) => ({
            ...prevUserFormData,
            [id]: value,
        }));
    };

    const handleUserSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post('/auth/createUser', userFormData, {
                timeout: 30000 
            });

            console.log('Utilisateur créé avec succès:', response.data);

            // Fermer la popup après succès
            setIsUserPopupOpen(false);
        } catch (error) {
            console.error("Erreur lors de la création de l'utilisateur :", error.response?.data || error.message);
        }
    };
    const [selectedRow, setSelectedRow] = useState(null);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [id]: value
        }));
    };

    const handleRowSelect = (row) => {
        setSelectedRow(row);
        setShowDetails(true);
    };

    const handleCloseDetails = () => {
        setSelectedRow(null);
        setShowDetails(false);
    };

    // Fonction pour soumettre la demande
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const [lieuTransportLatitude, lieuTransportLongitude] = formData.lieuTransport.split(',').map(coord => parseFloat(coord.trim()));
    
        const [lieuLivraisonLatitude, lieuLivraisonLongitude] = formData.lieuLivraison.split(',').map(coord => parseFloat(coord.trim()));
    
        const demandeData = {
            lieuTransport: {
                latitude: lieuTransportLatitude,
                longitude: lieuTransportLongitude
            },
            lieuLivraison: {
                latitude: lieuLivraisonLatitude,
                longitude: lieuLivraisonLongitude
            },
            typeMarchandise: formData.typeMarchandise,
            poids: formData.poids,
            descriptionMarchandise: formData.descriptionMarchandise,
            descPoids: formData.descPoids,
            descLieuLivraison: formData.descLieuLivraison,
            telLivreA: formData.livreA,
            utilisateur: { id: localStorage.getItem('userId') }
        };
    
        try {
            const response = await axiosInstance.post(`/user/add-demmande/${localStorage.getItem('userId')}`, demandeData);
            console.log('Demande créée avec succès:', response.data);
            setIsOpen(false); // Ferme la popup après la création
        } catch (error) {
            console.error('Erreur lors de la création de la demande :', error);
        }
    };
    

    let TableComponent = null;
    let showElement = false;

    switch (type) {
        case 'demande':
            TableComponent = role === 'user' ? TableDemande : AdminDemande;
            showElement = true;
            break;
        case 'commande':
            TableComponent = role === 'user' ? TableCommande : AdminCommande;
            showElement = true;
            break;
        case 'factureC':
            TableComponent = TableFactureC;
            showElement = true;
            break;
        case 'utilisateur':
            TableComponent = TableUtilisateurs;
            showElement = true;
            break;
        default:
           showElement = false;
    }

    console.log("TableComponent:", TableComponent);
    console.log("Type:", type);
    console.log("Role:", role);
    console.log("ShowElement:", showElement);
    console.log("ShowDetails:", showDetails);

    return (
        <div>
            <Menu type={type} />
            <Sidebar role={role} />
            <div className="search">
                <input type="text" placeholder="rechercher......." />
                <a href="#" className="recherche">
                    <RiSearchLine className="search_icon" />
                </a>

                {type === 'demande' && role === 'user' && showElement && (
                    <>
                        <div className="status-container">
                            <div className="status-item">
                                <span className="status-circle green"></span>
                                <span className="status-text">Terminé</span>
                            </div>
                            <div className="status-item">
                                <span className="status-circle red"></span>
                                <span className="status-text">En attente</span>
                            </div>
                        </div>
                        <button className='search-button'>
                            Approuver
                        </button>
                        <button className='search-button1' onClick={() => setIsOpen(true)}>
                            Créer une demande
                        </button>
                        <h1>Listes des demandes</h1>
                        <div className="custom-select">
                            <select>
                                <option value="option1">Option 1</option>
                                <option value="option2">Option 2</option>
                            </select>
                        </div>
                    </>
                )}

                {type === 'demande' && role === 'admin' && showElement && (
                    <>
                        <div className="status-container">
                            <div className="status-item">
                                <span className="status-circle green"></span>
                                <span className="status-text">Terminé</span>
                            </div>
                            <div className="status-item">
                                <span className="status-circle red"></span>
                                <span className="status-text">En attente</span>
                            </div>
                        </div>
                        <button className='search-button'>
                            Approuver
                        </button>
                        <h1>Listes des demandes des clients</h1>
                        {/* Ajoutez ici d'autres parties spécifiques à l'admin */}
                    </>
                )}

                {type === 'commande' && role === 'user' && showElement &&(
                    <>
                    <div className="commande_container">
                        <h1>Listes des commandes</h1>

                        <button className="reload">
                            <TfiReload  className="reload_icon"/>
                            <h2>Actualiser</h2>
                        </button>
                    </div>

                    <div className="notif-list">
                        <h1>Notifications en temps réel</h1>
                        <div className="notif-item">
                            <div className="notif-left">
                                <div className="notif-icon"></div>
                            </div>
                            <div className="notif-content">
                            <div className="notif-header">
                                <span className="notif-title">Marchandise</span>
                                <span className="time">2min</span>
                            </div>
                            <div className="notif-body">
                                Lorem ipsum dolor sit amet consectetur. Nulla commodo sit tellus ipsum sem eu eu aenean.
                            </div>
                            <div className="notif-footer">
                                <a href="#" className="notif-link">En savoir plus</a>
                            </div>
                            </div>
                            <div className="notif-options">
                            <SlOptions className='option'/>
                            </div>
                        </div>

                        <div className="notif-item">
                            <div className="notif-left">
                                <div className="notif-icon"></div>
                            </div>
                            <div className="notif-content">
                            <div className="notif-header">
                                <span className="notif-title">Marchandise</span>
                                <span className="time">2min</span>
                            </div>
                            <div className="notif-body">
                                Lorem ipsum dolor sit amet consectetur. Nulla commodo sit tellus ipsum sem eu eu aenean.
                            </div>
                            <div className="notif-footer">
                                <a href="#" className="notif-link">En savoir plus</a>
                            </div>
                            </div>
                            <div className="notif-options">
                            <SlOptions className='option'/>
                            </div>
                        </div>

                        <div className="notif-item">
                            <div className="notif-left">
                                <div className="notif-icon"></div>
                            </div>
                            <div className="notif-content">
                            <div className="notif-header">
                                <span className="notif-title">Marchandise</span>
                                <span className="time">2min</span>
                            </div>
                            <div className="notif-body">
                                Lorem ipsum dolor sit amet consectetur. Nulla commodo sit tellus ipsum sem eu eu aenean.
                            </div>
                            <div className="notif-footer">
                                <a href="#" className="notif-link">En savoir plus</a>
                            </div>
                            </div>
                            <div className="notif-options">
                            <SlOptions className='option'/>
                            </div>
                        </div>


                        

                        {/* Répéter les sections comme ci-dessus autant de fois que nécessaire */}
                    </div>
                    </>
                )}

                {type === 'commande' && role === 'admin' && showElement && !showDetails && (
                    <>
                        <div className="admin-container">
                            <h1>Listes des commandes</h1>
                            <div className="admin-status">
                                <span className="circle pink"></span>
                                <span className="text">Terminé</span>
                            </div>
                            <div className="admin-status">
                                <span className="circle coffee"></span>
                                <span className="text">En cours</span>
                            </div>
                            <div className="admin-status">
                                <span className="circle blue"></span>
                                <span className="text">En attente</span>
                            </div>
                        </div>
                        <button className='search-button'>
                            Voir l'historique
                        </button>
                    </>
                )}
              
            

            

                {type === 'factureC' && role ==='user' && showElement && !showDetails &&(
                    <>
                    <div className="facture-container">
                        <h1>Listes des factures</h1>
                    </div>
                    <TableHistorique /></>
                    
                )}


                {type === 'utilisateur' && role === 'admin' && showElement && (
                    <>
                        <div className="user-container">
                            <button className='search-user'>
                                Actualiser
                            </button>
                            <button className='search-user1' onClick={() => setIsUserPopupOpen(true)}>
                                Nouveau compte
                            </button>
                            <h1>Listes des utilisateurs</h1>
                        </div>
                    </>
                )}

                

                
            </div>

            {TableComponent && <TableComponent onRowSelect={handleRowSelect} />}

            {isOpen && (
                    <div className="popup">
                        <h2>Création de demande</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group small">
                                    <label htmlFor="lieuTransport">Lieu de transport</label>
                                    <div className="input-with-icon">
                                        <input
                                            type="text"
                                            id="lieuTransport"
                                            value={formData.lieuTransport}
                                            onChange={handleChange}
                                        />
                                        <a
                                            href="https://maps.google.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="icon-link"
                                        >
                                            <FaLocationDot className="icon" />
                                        </a>
                                    </div>
                                </div>
                                <div className="form-group small">
                                    <label htmlFor="lieuLivraison">Lieu de livraison</label>
                                    <div className="input-with-icon">
                                        <input
                                            type="text"
                                            id="lieuLivraison"
                                            value={formData.lieuLivraison}
                                            onChange={handleChange}
                                        />
                                        <a
                                            href="https://maps.google.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="icon-link"
                                        >
                                            <FaLocationDot className="icon" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group small">
                                    <label htmlFor="typeMarchandise">Type de marchandise</label>
                                    <select
                                        id="typeMarchandise"
                                        value={formData.typeMarchandise}
                                        onChange={handleChange}
                                        required
                                        >
                                        <option value="">Sélectionnez un type de marchandise</option>
                                        <option value="PERISSABLES">Périssables</option>
                                        <option value="NON_PERISSABLES">Non Périssables</option>
                                        <option value="DANGEREUSES">Dangereuses</option>
                                        <option value="VOLUMINEUSES">Volumineuses</option>
                                        <option value="FRAGILES">Fragiles</option>
                                    </select>

                                </div>
                                <div className="form-group small">
                                    <label htmlFor="poids">Poids (kg)</label>
                                    <input
                                        type="number"
                                        id="poids"
                                        value={formData.poids}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group small">
                                    <label htmlFor="descriptionMarchandise">Description marchandise</label>
                                    <input
                                        type="text"
                                        id="descriptionMarchandise"
                                        value={formData.descriptionMarchandise}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group small">
                                    <label htmlFor="descPoids">Description du lieu de livraison</label>
                                    <input
                                        type="text"
                                        id="descPoids"
                                        value={formData.descPoids}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="form-group full">
                                <label htmlFor="livreA">Personne à prévenir</label>
                                <div className="input-with-icon">
                                    <input
                                        type="tel"
                                        id="livreA"
                                        value={formData.livreA}
                                        onChange={handleChange}
                                    />
                                    <a href="tel:" className="icon-link">
                                        <MdLocalPhone className="icon" />
                                    </a>
                                </div>
                            </div>
                            <button type="submit" className="submit-btn">Soumettre</button>
                        </form>
                    </div>
                )}

{isUserPopupOpen && (
                <div className="popup">
                    <h2>Nouveau compte</h2>
                    <form onSubmit={handleUserSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="nom">Nom</label>
                                <input
                                    type="text"
                                    id="nom"
                                    value={userFormData.nom}
                                    onChange={handleUserChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="prenom">Prénom</label>
                                <input
                                    type="text"
                                    id="prenom"
                                    value={userFormData.prenom}
                                    onChange={handleUserChange}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={userFormData.email}
                                    onChange={handleUserChange}
                                />
                            </div>
                            <div className="form-group num">
                                <label htmlFor="num">Numéro</label>
                                <div className="input-with-icon">
                                    <input
                                        type="tel"
                                        id="tel"
                                        value={userFormData.tel}
                                        onChange={handleUserChange}
                                    />
                                    <a href="tel:" className="icon-link">
                                        <MdLocalPhone className="icon" />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="submit-btn">Soumettre</button>
                        <button type="button" className="delete-btn" onClick={() => setIsUserPopupOpen(false)}>Annuler</button>
                    </form>
                </div>
            )}

        </div>
        
    );
}

export default Search;
