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
          sx={{ width: '120px', borderRadius: '8px', marginRight: '10px' }}
          onClick={handleToggleDarkMode}
        >
          Dark mode
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          sx={{ width: '120px', borderRadius: '8px' }}
          onClick={handleToggleDefaultMode}
        >
          Light mode
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
