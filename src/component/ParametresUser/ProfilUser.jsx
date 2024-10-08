import React, { useState,useRef } from 'react';
import './ParametresUser.css';

const ProfilUser = () => {
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState(false);

  const [profileImage, setProfileImage] = useState('profile-image-url');
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  
  return (

    
    <div className='profil'>
      <div className="theme-section">
        <p>Thème de l'application</p>
        <div className="theme-toggle">
          <label className="switch">
            <input type="checkbox" onChange={() => setTheme(theme === 'light' ? 'dark' : 'light')} />
            <span className="slider"></span>
          </label>
        </div>
      </div>

      <div className="notifications-section">
        <p>Activer les notifications en temps réel</p>
        <div className="theme-toggle">
          <label className="switch">
            <input type="checkbox" onChange={() => setTheme(theme === 'light' ? 'dark' : 'light')} />
            <span className="slider"></span>
          </label>
        </div>
      </div>

      <div className="profile-information">
        <h3>Profil</h3>
        <div className="form-groupe">
          <input type="text" placeholder="Nom" />
          <input type="text" placeholder="Prénoms" />
          <input type="password" placeholder="Mot de passe" />
          <input type="password" placeholder="Confirmer" />
          <input type="text" placeholder="Téléphone" />
          <input type="text" placeholder="Rôle" />
        </div>
        <div className="profile-image1">
          <img src={profileImage} alt="Profil" />
          <div className="image-actions">
            <button className="edit-btn" onClick={handleEditButtonClick}>Modifier</button>
            <button className="delete-btn" onClick={() => setProfileImage('')}>Supprimer</button>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              style={{ display: 'none' }} 
            />
          </div>
        </div>
      </div>

      <div className="footer">
        <div className="privacy-section">
          <h3>Confidentialité et sécurité</h3>
          <p>Lorem ipsum dolor sit amet consectetur. Id integer elementum platea urna vel nunc.</p>
          <label className="switch">
            <input type="checkbox" />
            <span className="slider"></span>
          </label>
        </div>
        <div className="faq-section">
          <h3>FAQ</h3>
          <div className="question">
            <p>Questions</p>
            <p>Lorem ipsum dolor sit amet consectetur. Id integer elementum platea urna vel nunc.</p>
          </div>

          <div className="question">
            <p>Questions</p>
            <p>Lorem ipsum dolor sit amet consectetur. Id integer elementum platea urna vel nunc.</p>
          </div>
        </div>
      </div>

      <div className="more-info">
        <a href="#">Aller sur le site pour accéder à plus d'informations</a>
      </div>
    </div>
  );
};

export default ProfilUser;
