import React, {useState}from "react";
import './profil.css';
import Sidebar from "../Sidebar/Sidebar";
import Menu from "../Menu/Menu";
import Parametres from "../AdminPages/AdminParametre/parametre";
import ParametresUser from "../ParametresUser/ParametresUser";

function Profil ({type, role}) {

    const showElement = type === 'parametres' && role === 'admin';
    return(
        <div>

            <Menu type={type} />
            <Sidebar role={role} />

           <div className="card">
           {role === 'admin' ? <Parametres /> : <ParametresUser />}
           </div>

        </div>
    )
}

export default Profil;