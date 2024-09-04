import React, {useState}from "react";
import './profil.css';
import Sidebar from "../Sidebar/Sidebar";
import Menu from "../Menu/Menu";
import Parametres from "../AdminPages/AdminParametre/parametre";

function Profil ({type}) {

    const [showDetails, setShowDetails] = useState(false);
    const [role, setRole] = useState('admin');
    

    const showElement = type === 'parametres' && role === 'admin';
    return(
        <div>

            <Menu type={type} />
            <Sidebar role={role} />

           <div className="card">
           {showElement && <Parametres />}
           </div>

        </div>
    )
}

export default Profil;