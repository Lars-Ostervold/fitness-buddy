import React from 'react';
import { Typography, Select, MenuItem } from '@mui/material';

function TimePerSessionSelect({ value, onChange }) {
  return (
    <>
      <Select
        name="timePerSession"
        value={value}
        onChange={onChange}
      >
        <MenuItem value="15">15</MenuItem>
        <MenuItem value="30">30</MenuItem>
        <MenuItem value="45">45</MenuItem>
        <MenuItem value="60">60</MenuItem>
    </Select>
    <Typography variant="h6">Time per Session</Typography>
    </>
  );
}

export default TimePerSessionSelect;
