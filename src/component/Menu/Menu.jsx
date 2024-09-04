import React from "react";
import { IoNotifications } from "react-icons/io5";
import './Menu.css';


const Menu = ({ type }) => {
    console.log('Type:', type);

    const typeTitles = {
        demande: 'Demande',
        commande: 'Commande',
        factureC: 'Facture et paiement',
        utilisateur: 'Utilisateurs',
        // Ajoutez d'autres types ici si nécessaire
    };

    const title = typeTitles[type]; 

    return (
        <div>
            <div className="menuM">
                <div className="text">
                    <h1>{title}</h1>
                </div>
                <div className="cloche">
                    <a href="#">
                        <IoNotifications className="icons"/>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Menu;
