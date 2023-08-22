import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Select, MenuItem } from '@mui/material';

function DaysPerWeekSelect({ value, onChange, availableOptions }) {
  return (
    <>
      <Select
        name="daysPerWeek"
        value={value}
        onChange={onChange}
    >
        {availableOptions.map((option) => (
        <MenuItem key={option} value={option}>
            {option}
        </MenuItem>
        ))}
    </Select>
    <Typography variant="h6">Days per Week</Typography>
    </>
  );
}

DaysPerWeekSelect.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    availableOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

export default DaysPerWeekSelect;