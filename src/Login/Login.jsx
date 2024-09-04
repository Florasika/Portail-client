import React from 'react';
import './Login.css';
import '../index.css';
import { FaAddressCard } from "react-icons/fa";
import { IoMdMailOpen } from "react-icons/io";
import { RiEyeCloseLine } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";


const Login = () => {
    return (
        <div>
            <div className="total">
                <div class="rectangle"></div>
                <div className="rectangle2"></div>
                <div className="wrapper">
                    <form action="">
                        <h1>Login</h1>
                        <h4>Veuillez remplir ces informations pour vous connectez</h4>

                        {/*--<div className="social">
                            <button>
                            <FcGoogle className='L1'/>
                            </button>
                            <button>
                            <FaApple className='L1'/>
                            </button>
                        </div>*/}

                        <div className="input">
                            <input type="text" required/>
                            <label>Nom</label>
                            <FaAddressCard className='icon'/>
                        </div>
                        <div className="input">
                            <input type="text"  required/>
                            <label>Prénoms</label>
                            <FaAddressCard className='icon'/>
                        </div>
                        <div className="input">
                            <input type="mail" required/>
                            <label>Email</label>
                            <IoMdMailOpen className='icon'/>
                        </div>
                        <div className="input">
                            <input type="password" required/>
                            <label>Mot de passe</label>
                            <RiEyeCloseLine className='icon'/>
                        </div>

                        <div className="souvenir">
                            <label> <input type="checkbox"/>Se souvenir de moi</label>
                            <a href="#">Mot de passe oublié?</a>
                        </div>

                        <button type="submit" className='login'>Se connecter</button>
                        
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;