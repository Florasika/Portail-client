import React, { useState } from 'react';  
import './Login.css';  
import '../index.css';  
import { IoMdMailOpen } from "react-icons/io";  
import { RiEyeCloseLine } from "react-icons/ri";  
import axiosInstance from '../axios';  // Importer axiosInstance

const Login = () => {  
    const [email, setEmail] = useState('');  
    const [password, setPassword] = useState('');  
    const [message, setMessage] = useState('');  
    const [error, setError] = useState('');  
    
    const handleLogin = async (e) => {  
        e.preventDefault();  
        setMessage('');  
        setError('');  
    
        try {  
            const response = await axiosInstance.post('/auth/login', {  
                email,  
                password  
            });  
    
            if (response.data.message === "Authentication successful") {  
                // Store user data in local storage
                localStorage.setItem('userId', response.data.userId);
                localStorage.setItem('jwt', response.data.token);
                localStorage.setItem('refreshToken', response.data.refreshToken);
                localStorage.setItem('expiresAt', response.data.expiresAt);
                localStorage.setItem('email', response.data.email);
                localStorage.setItem('role', response.data.role);
    
                setMessage('Connexion réussie !');  

                setTimeout(() => {  
                    window.location.href = '/demande'; 
                }, 2000);  
            } else {  
                setError('Erreur de connexion : ' + (response.data.message || 'Identifiants incorrects.'));  
            }  
        } catch (err) {  
            if (err.response) {  
                setError('Erreur de connexion : ' + (err.response.data.message || 'Veuillez vérifier vos identifiants.'));  
            } else if (err.request) {  
                setError('Erreur de connexion : Aucune réponse du serveur.');  
            } else {  
                setError('Erreur de connexion : ' + err.message);  
            }
            // Reload the page after 5 seconds
            setTimeout(() => {
                window.location.reload();
            }, 5000);
        }  
    };  
    
    return (  
        <div>  
            <div className="total">  
                <div className="rectangle"></div>  
                <div className="rectangle2"></div>  
                <div className="wrapper">  
                    <form onSubmit={handleLogin}>  
                        <h1>Login</h1>  
                        <h4>Veuillez remplir ces informations pour vous connecter</h4>  

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

                        <div className="souvenir">  
                            <label> <input type="checkbox" />Se souvenir de moi</label>  
                            <a href="#">Mot de passe oublié?</a>  
                        </div>  

                        <button type="submit" className='login'>Se connecter</button>  
                        
                        {message && <div className="popup success">{message}</div>}  
                        {error && <div className="popup error">{error}</div>}  
                    </form>  
                </div>  
            </div>  
        </div>  
    );  
}  

export default Login;
