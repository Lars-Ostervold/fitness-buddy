import React, { useState } from 'react';
// @mui
import PropTypes from 'prop-types';
import { Card, Typography, CardHeader, CardContent } from '@mui/material';
import { Timeline, TimelineDot, TimelineItem, TimelineContent, TimelineSeparator, TimelineConnector } from '@mui/lab';
// utils
import axios from 'axios';

// ----------------------------------------------------------------------

AbsTimelineComponent.propTypes = {
    title: PropTypes.string.isRequired,
    list: PropTypes.arrayOf(PropTypes.string).isRequired, // Use PropTypes.string for the exercise names
  };

const colorOptions = ['primary', 'secondary', 'error', 'info', 'success', 'warning', 'tertiary', 'quaternary']; // Add more colors if needed


export default function AbsTimelineComponent({ title, list, ...other }) {
  
  const [exerciseList, setExerciseList] = useState(list); // Initialize the state with the initial list of exercises
  
  return (
    <Card {...other}>
      <CardHeader 
        title={title} 
        subheader = 'Ab circuit is 2 cycles. Each exercise is 45 seconds with a 15 second break between'
      />



      <CardContent
        sx={{
          '& .MuiTimelineItem-missingOppositeContent:before': {
            display: 'none',
          },
        }}
      >
        <Timeline>
          {list.map((exerciseName, index) => { // Use 'list' prop instead of 'exerciseList'
            const colorIndex = index % colorOptions.length;
            const color = colorOptions[colorIndex];

            return (
              <TimelineItem key={index}>
                <TimelineSeparator>
                  <TimelineDot color={color} />
                  {index !== list.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>
                  <Typography variant="h6" gutterBottom>
                    {exerciseName}
                  </Typography>
                </TimelineContent>
              </TimelineItem>
            );
          })}
        </Timeline>
      </CardContent>
    </Card>
  );
}

// ----------------------------------------------------------------------
