import React from 'react';
import { Typography, Select, MenuItem } from '@mui/material';

function UserExperienceSelect({ value, onChange }) {
  return (
    <>
      <Select
        name="userExperience"
        value={value}
        onChange={onChange}
        >
            <MenuItem value="1">Beginner</MenuItem>
            <MenuItem value="2">Intermediate</MenuItem>
            <MenuItem value="3">Advanced</MenuItem>
    </Select>
    <Typography variant="h6">Gym Experience</Typography>
    </>
  );
}

export default UserExperienceSelect;
