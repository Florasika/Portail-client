import React, { useState, useRef, useEffect } from 'react';
import './parametre.css';
import Profil from '../AdminParametre/Profil';
import PrixPrevus from '../AdminParametre/PrixPrevus';

const Parametres = () => {
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState(false);
  const [profileImage, setProfileImage] = useState('profile-image-url');
  const [activePage, setActivePage] = useState('profil');
  const fileInputRef = useRef(null);

  // Appliquer la classe de thème au niveau du body
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

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

  const handleDeleteButtonClick = () => {
    setProfileImage(''); // Réinitialiser l'image de profil
  };

  const handleClick = (page) => {
    setActivePage(page);

    // Après un court délai, supprimer la classe active
    setTimeout(() => {
      setActivePage(null);
    }, 1000); // 1 seconde avant de retirer la bordure
  };

  return (
    <div className="profile-settings">
      <div className="header-setting">
        <h2
          className={activePage === 'profil' ? 'active' : ''}
          onClick={() => setActivePage('profil')}
        >
          Profil
        </h2>
        <h3
          className={activePage === 'prix-prevus' ? 'active' : ''}
          onClick={() => setActivePage('prix-prevus')}
        >
          Prix prévus
        </h3>
        <button className="save-btn">Enregistrer</button>
      </div>

      <div className="content">
        {activePage === 'profil' && (
          <Profil
            theme={theme}
            setTheme={setTheme}
            notifications={notifications}
            setNotifications={setNotifications}
            profileImage={profileImage}
            handleFileChange={handleFileChange}
            handleEditButtonClick={handleEditButtonClick}
            fileInputRef={fileInputRef} // Assurez-vous que Profil reçoit fileInputRef si nécessaire
          />
        )}

        {activePage === 'prix-prevus' && (
          <PrixPrevus />
        )}
      </div>
    </div>
  );
};

export default Parametres;