import React, { useState, useEffect } from 'react';
// @mui
import PropTypes from 'prop-types';
import { Card, Typography, CardHeader, CardContent, IconButton } from '@mui/material';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { Timeline, TimelineDot, TimelineItem, TimelineContent, TimelineSeparator, TimelineConnector } from '@mui/lab';
// utils
import axios from 'axios';

// ----------------------------------------------------------------------

AppOrderTimeline.propTypes = {
  title: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
  ).isRequired,
};

const colorOptions = ['primary', 'secondary', 'error', 'info', 'success', 'warning', 'tertiary', 'quaternary']; // Add more colors if needed


export default function AppOrderTimeline({ title, list, ...other }) {
  const [exerciseList, setExerciseList] = useState([]); // Initialize the state with the initial list of exercises
  // Update exerciseList when the list prop changes
  useEffect(() => {
    setExerciseList(list);
  }, [list]);
  
  const handleRerollExercise = (exercise, exerciseIndex) => {
    const payload = {
      'exercise': exercise
    };
    const headers = {
      'Content-Type': 'application/json'
      };
    // --------------------------AWS-----------------------------------------
    const url = 'https://x4xecbx769.execute-api.us-east-1.amazonaws.com/default/reroll_workout';


    axios.post(url, payload, { headers })
      .then(response => {
        const data = response.data;       
        const newExercise = JSON.parse(data.body)

        // Create a new list with the updated exercise
        const updatedList = exerciseList.map((exerciseInfo, index) => {
          if (index === exerciseIndex) {
            return [newExercise, exerciseInfo[1], exerciseInfo[2]]; // Replace exercise name
          }
          return exerciseInfo;
        });

        setExerciseList(updatedList); // Update the state with the new list
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });
  };

  
  return (
    <Card {...other}>
      <CardHeader title={title} />



      <CardContent
        sx={{
          '& .MuiTimelineItem-missingOppositeContent:before': {
            display: 'none',
          },
        }}
      >
        <Timeline>
          {exerciseList.map((exerciseInfo, index) => {
            const colorIndex = index % colorOptions.length; // Cycling through the color options
            const color = colorOptions[colorIndex];

            return (
              <TimelineItem key={index}>
                <TimelineSeparator>
                  <TimelineDot color={color} />
                  {index !== list.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h6" gutterBottom>
                      {exerciseInfo[0]}
                    </Typography>
                    <IconButton
                      color="primary"
                      onClick={() => handleRerollExercise(exerciseInfo[0], index)}
                    >
                      <AutorenewIcon />
                    </IconButton>
                  </div>
                  <Typography variant="body1" color="textSecondary">
                    Sets: {exerciseInfo[1]}, Reps: {exerciseInfo[2]}
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
