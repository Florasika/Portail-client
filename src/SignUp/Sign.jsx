import React, { useState } from 'react';  
import { IoMdMailOpen } from "react-icons/io";  
import { RiEyeCloseLine } from "react-icons/ri";
import { PiIdentificationCardLight } from "react-icons/pi";
import { MdPhone } from "react-icons/md";
import './Sign.css';  


const SignUp = () => {
    const [nom, setNom] = useState(''); // Ajout du state pour le nom
    const [prenom, setPrenom] = useState(''); // Ajout du state pour le prénom
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [number, setNumber] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); // Empêche le rechargement de la page lors de la soumission
        // Ici vous pouvez ajouter la logique pour traiter l'inscription
        console.log({ nom, prenom, email, password, number });
    };

    return(
        <div>
             <div className="total">  
                <div className="rectangle"></div>  
                <div className="rectangle2"></div>  
                <div className="wrapper">  
                    <form onSubmit={handleSubmit}>  
                            <h1>Création de compte</h1>  
                            <h4>Veuillez remplir ces informations pour vous inscrire sur la plateforme</h4> 

                            <div className="input-row"> {/* Conteneur pour aligner nom et prénom sur la même ligne */}
                                <div className="input">  
                                    <input   
                                        type="text"   
                                        required   
                                        value={nom}   
                                        onChange={(e) => setNom(e.target.value)}  
                                    />  
                                    <label>Nom</label>  
                                    <PiIdentificationCardLight className='icon' />  
                                </div> 

                                <div className="input">  
                                    <input   
                                        type="text"   
                                        required   
                                        value={prenom}   
                                        onChange={(e) => setPrenom(e.target.value)}  
                                    />  
                                    <label>Prénom</label>  
                                    <PiIdentificationCardLight className='icon' />  
                                </div> 
                            </div>

                            <div className="input">  
                                <input   
                                    type="email"   
                                    required   
                                    value={email}   
                                    onChange={(e) => setEmail(e.target.value)}   
                                />  
                                <label>Email</label>  
                                <IoMdMailOpen className='icon' />  
                            </div>
                            <div className="input">  
                                <input   
                                    type="password"   
                                    required   
                                    value={password}   
                                    onChange={(e) => setPassword(e.target.value)}   
                                />  
                                <label>Mot de passe</label>  
                            <RiEyeCloseLine className='icon' />  
                            </div>

                            <div className="input">  
                                <input   
                                    type="text"   
                                    required   
                                    value={number}   
                                    onChange={(e) => setNumber(e.target.value)}     
                                />  
                                <label>Numéro de telephone</label>  
                                <MdPhone  className='icon' />  
                            </div>   

                            <div className="souvenir">  
                                <label> <input type="checkbox" />Se souvenir de moi</label>    
                            </div>  

                            <button type="submit" className='inscrire'>Créer un compte</button> 
                            <p className='lien'>Si vous avez déjà un compte, veuillez vous <strong>Connecter</strong></p>
                    </form>  
                </div>  
            </div>        

        </div>
    )
}

export default SignUp;