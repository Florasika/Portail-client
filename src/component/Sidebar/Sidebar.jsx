import React from "react";
import './Sidebar.css';  // Un seul fichier CSS pour les deux sidebars
import { RiHandCoinFill } from "react-icons/ri";
import { FaClipboardList } from "react-icons/fa";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { IoChatbubbles } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { PiUserLight } from "react-icons/pi";
import { ImStatsBars } from "react-icons/im";
import { AiOutlineLogout } from "react-icons/ai";
import Search from "../Search/Search";
import TableUtilisateurs from "../AdminPages/utilisateurs/utilisateurs";

const Sidebar = ({ role }) => {
    return (
        <div>
            <div className="container">
                <div className="sidebar-logo">LOGO</div>
                
                <div className="sidebar-menu">
                    <a href="/demande" className="item">
                        <RiHandCoinFill className="icon" />
                        Demande
                    </a>
                    <a href="/commande" className="item">
                        <FaClipboardList className="icon" />
                        Commande
                    </a>
                    <a href="/facture_client" className="item">
                        <FaFileInvoiceDollar className="icon" />
                        Facture
                    </a>
                    <a href="#" className="item">
                        <IoChatbubbles className="icon" />
                        Chats
                    </a>
                    
                    {role === 'admin' && (
                        <>
                            <a href="#" className="item">
                                <ImStatsBars className="icon" />
                                Rapports
                            </a>
                            <a href="/utilisateurs" className="item">
                                <PiUserLight className="icon" />
                                Utilisateurs
                            </a>
                        </>
                    )}

                    <div className="profile-card">
                        <img 
                            src="../"  
                            className="profile-pic" 
                        />
                        <h3>KOSSI Marie</h3>
                        <a href="/parametre" className="profile-item">
                            Paramètres
                            <IoSettingsOutline className="icon1" />
                        </a>
                        <a href="#" className="profile-item">
                            Déconnexion
                            <AiOutlineLogout className="icon1" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
