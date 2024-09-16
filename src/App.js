/*import logo from './logo.svg';
import './App.css';
import {Routes, Route}  from 'react-router-dom';
import Login from '../src/Login/Login';
import Search from "../src/component/Search/Search";


function App() {
  return (
    <div>
          <Routes>
            <Route path='/demande' element={<Search type = "demande"/>}/>
            <Route path='/commande' element={<Search type="commande"/>}/>
            <Route path='/facture_client' element={<Search type="factureC"/>}/>
            <Route path='/' element={<Login/>}/>
          </Routes>
      
    </div>
  );
}

export default App;*/

import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from '../src/Login/Login.jsx';
import Search from "../src/component/Search/Search.jsx";
import Profil from "../src/component/settingpages/profil.jsx";
import DemandeDetails from './component/AdminPages/DemandeAdmin/DemandeDetails.jsx';



function App() {
  return (
    <div>
      <Routes>
        <Route path='/demande' element={<Search type="demande" />} />
        <Route path="/demande/:id" element={<DemandeDetails />} />
        <Route path='/commande' element={<Search type="commande" />} />
        <Route path='/facture_client' element={<Search type="factureC" />} />
        <Route path='/utilisateurs' element={<Search type="utilisateur"/>} />
        <Route path='/parametre' element={<Profil type="parametres"/>} />
        <Route path='/' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;

