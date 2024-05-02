import React, { useState } from 'react';
import { Typography, Button, Select, MenuItem } from '@mui/material';

const Settings = ({ toggleDarkMode }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const handleToggleDarkMode = () => {
    toggleDarkMode(true);
  };

  const handleToggleDefaultMode = () => {
    toggleDarkMode(false);
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  return (
    <div>
      <Typography variant="h6">Settings</Typography>
      <div style={{ marginBottom: '10px' }}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          sx={{
            width: '140px', 
            height: '40px', 
            borderRadius: '20px', 
            marginRight: '10px',
            boxShadow: 'none', 
            display: 'inline-flex', 
            fontWeight:"bold"
          }}
          onClick={handleToggleDarkMode}
        >
           Change Mode
        </Button>
      </div>
      <div style={{ color: '#333' }}>
        <Typography variant="subtitle1" style={{ marginBottom: '5px' }}>
          Select Language
        </Typography>
        <Select value={selectedLanguage} onChange={handleLanguageChange}>
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="fr">French</MenuItem>
          <MenuItem value="es">Spanish</MenuItem>
          <MenuItem value="et">Germany</MenuItem>
          <MenuItem value="ey">Urdu</MenuItem>
          <MenuItem value="ss">Bengali(Bangladesh)</MenuItem>
          <MenuItem value="sb">Bengali(India)</MenuItem>
          <MenuItem value="er">Hindi</MenuItem>
        </Select>
      </div>
    </div>
  );
};

export default Settings;
