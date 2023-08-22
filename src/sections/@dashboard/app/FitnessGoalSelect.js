import React from 'react';
import { Typography, Select, MenuItem } from '@mui/material';

function FitnessGoalSelect({ value, onChange }) {
  return (
    <>
      <Select
        name="fitnessGoal"
        value={value}
        onChange={onChange}
      >
        <MenuItem value="1">Strength</MenuItem>
        <MenuItem value="2">Body Building</MenuItem>
        <MenuItem value="3">Lean</MenuItem>
      </Select>
      <Typography variant="h6">Fitness Goal</Typography>
    </>
  );
}

export default FitnessGoalSelect;
