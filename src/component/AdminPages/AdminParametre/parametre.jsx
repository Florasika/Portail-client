import React, { useState, useRef, useEffect } from 'react';
import './parametre.css';
import Profil from '../AdminParametre/Profil';
import PrixPrevus from './PrixPrevus';
import TablePrix from './TablePrix';

const Parametres = () => {
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState(false);
  const [profileImage, setProfileImage] = useState('profile-image-url');
  const [activePage, setActivePage] = useState('profil');
  const fileInputRef = useRef(null);
  const [data, setData] = useState([]);
  const [isPrixPopupOpen, setIsPrixPopupOpen] = useState(false);

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

  const handleClickOpen = () => {
    setIsPrixPopupOpen(true);
  };

  const handleClose = () => {
    setIsPrixPopupOpen(false);
  };

  const handleSubmitPrix = (marchandise, prixPrevu, prixTransport) => {
    setData([...data, { type: marchandise, kg: '1kg', price: prixPrevu, transport: prixTransport }]);
    setIsPrixPopupOpen(false);
  };

  const handleDelete = (index) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
  };

  const handleUpdate = (index) => {
    const itemToUpdate = data[index];
    const newType = prompt('Modifier le type de marchandise:', itemToUpdate.type);
    const newPrice = prompt('Modifier le prix:', itemToUpdate.price);

    const updatedData = data.map((item, i) =>
      i === index ? { ...item, type: newType || item.type, price: newPrice || item.price } : item
    );
    setData(updatedData);
  };

  const handleClick = (page) => {
    setActivePage(page);

    // Après un court délai, supprimer la classe active
    setTimeout(() => {
      setActivePage(null);
    }, 1000); // 1 seconde avant de retirer la bordure
  };

  return (
    <div className="parametres-container">
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
        {activePage === 'prix-prevus' ? (
          <>
            <button className="price" onClick={handleClickOpen}>Entrer un prix</button>
          {isPrixPopupOpen && (
            <PrixPrevus
              onClose={handleClose}
              onSubmit={handleSubmitPrix}
            />
          )}
      
          </>
        ) : (
          <button className="save-btn">Enregistrer</button>
        )}
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
            handleEditButtonClick={() => fileInputRef.current.click()}
            fileInputRef={fileInputRef}
          />
        )}

        {activePage === 'prix-prevus' && (
          <TablePrix
          data={data}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
        )}
      </div>
    </div>
  );
};

export default Parametres;
