import React, { useState, useRef, useEffect } from 'react';
import './ParametresUser.css';
import ProfilUser from '../ParametresUser/ProfilUser';


const ParametresUser = () => {
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState(false);
  const [profileImage, setProfileImage] = useState('profile-image-url');
  const [activePage, setActivePage] = useState('profil');
  const fileInputRef = useRef(null);
  

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

  

 



  return (
    <div className="parametres-container">
        
      <div className="content">
        {activePage === 'profil' && (
          <ProfilUser
            theme={theme}
            setTheme={setTheme}
            notifications={notifications}
            setNotifications={setNotifications}
            profileImage={profileImage}
            handleFileChange={handleFileChange}
            handleEditButtonClick={() => fileInputRef.current.click()}
            fileInputRef={fileInputRef}
          />
        )}

       
      </div>

      <button className="save-btn">Enregistrer</button>
    </div>
    
  );
};

export default ParametresUser;
