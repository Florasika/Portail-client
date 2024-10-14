import React, { useState } from 'react';  
import { useNavigate, Link } from 'react-router-dom'; 
import { IoMdMailOpen } from "react-icons/io";  
import { RiEyeCloseLine } from "react-icons/ri";
import { PiIdentificationCardLight } from "react-icons/pi";
import { MdPhone } from "react-icons/md";
import Swal from 'sweetalert2';  // Importation de SweetAlert2
import './Sign.css';  
import axiosInstance from '../axios';


const SignUp = () => {
    const [nom, setNom] = useState(''); 
    const [prenom, setPrenom] = useState(''); 
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [number, setNumber] = useState('');
    const [isLoading, setIsLoading] = useState(false);  // État de chargement

    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const signupData = {
            nom: nom,
            prenom: prenom,
            email: email,
            tel: number,  
            password: password
        };

        setIsLoading(true); 

        try {
            const response = await axiosInstance.post('/auth/register', signupData);
            
            Swal.fire({
                icon: 'success',
                title: 'Inscription réussie !',
                text: 'Vous serez redirigé vers la page de connexion.',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
            });

            setTimeout(() => {
                navigate('/login'); 
            }, 2000); 

        } catch (error) {
            if (error.response && error.response.data) {
                Swal.fire({
                    icon: 'error',
                    title: 'Erreur',
                    text: error.response.data || 'Une erreur est survenue lors de l\'inscription.',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Erreur',
                    text: 'Une erreur est survenue lors de l\'inscription.',
                });
            }
        } finally {
            setIsLoading(false); 
        }
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

                        <div className="input-row"> 
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
                            <label>Numéro de téléphone</label>  
                            <MdPhone className='icon' />  
                        </div>   

                        <div className="souvenir">  
                            <label> <input type="checkbox" /> Se souvenir de moi</label>    
                        </div>  

                        <button type="submit" className='inscrire' disabled={isLoading}>
                            {isLoading ? 'Création en cours...' : 'Créer un compte'}
                        </button> 

                        <p className='lien'>
                            Si vous avez déjà un compte, veuillez vous <strong>
                                <Link to="/login">Connecter</Link>
                            </strong>
                        </p>
                    </form>  
                </div>  
            </div>        
        </div>
    );
}

export default SignUp;
