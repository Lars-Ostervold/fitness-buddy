import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import { useState } from 'react';
import axios from 'axios';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Select, MenuItem, FormControlLabel, Checkbox, FormGroup, Button } from '@mui/material';
// components
import Iconify from '../components/iconify';
// sections
import {
  AppOrderTimeline,
  AppWidgetSummary,
  DaysPerWeekSelect,
  FitnessGoalSelect,
  TimePerSessionSelect,
  UserExperienceSelect,
  AbsTimelineComponent,
  // tester,
} from '../sections/@dashboard/app';



// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();

  // To map the day index
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const [daysPerWeekOption, setdaysPerWeekOption] = useState('2');
  const [timePerSessionOption, settimePerSessionOption] = useState('45');
  const [fitnessGoalOption, setfitnessGoalOption] = useState('2'); // Body Building default
  const [userExperienceOption, setuserExperienceOption] = useState('1'); // Beginner default
  const [addAbs, setAddAbs] = useState(false);
  const [exerciseData, setExerciseData] = useState([]);
  const [availableDaysPerWeekOptions, setAvailableDaysPerWeekOptions] = useState([
    "1", "2", "3", "4", "5", "6", "7"
  ]);
  const [absExercises, setAbsExercises] = useState([]);
  const handleUserExperienceChange = (e) => {
    const selectedValue = e.target.value;
    setuserExperienceOption(selectedValue);
  
    // Update the available options for "Days per Week" based on the selected value
    if (selectedValue === "1") {
      setAvailableDaysPerWeekOptions(["1", "2", "3"]);
    } else if (selectedValue === "2") {
      setAvailableDaysPerWeekOptions(["2", "3", "4", "5"]);
    } else {
      setAvailableDaysPerWeekOptions(["2", "3", "4", "5", "6", "7"]);
    }
  };

  // Full workout API call-------------------------------------------------------------------
  const handleGenerateWorkout = async () => {

    const payload = {
      daysPerWeek: daysPerWeekOption,
      timePerSession: timePerSessionOption,
      fitnessGoal: fitnessGoalOption,
      userExperience: userExperienceOption,
      abs_bool: addAbs
    };
    
    const headers = {
      'Content-Type': 'application/json'
      };

    const url = 'https://zzswbozn7g.execute-api.us-east-1.amazonaws.com/production';

    axios.post(url, payload, { headers })
      .then(response => {
        const data = response.data;
        const statusCheck = data.statusCode;
        const exerciseArray = JSON.parse(data.body);

        if (statusCheck === 400 || statusCheck === 500) {
          setExerciseData(data.body.replace(/"/g, ''));
        } else { 
          setExerciseData(exerciseArray);
        }
        console.log(exerciseData)
        setExerciseData([])
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });
  };
  // -------------------------------------------------------------------------------------------------------

  // --AB Workout API Call-----------------------------------------------------------------------------------------
  const handleAbWorkout = async () => {
    const headers = {
      'Content-Type': 'application/json'
      };
    const url = 'https://pwgq1nf3v4.execute-api.us-east-1.amazonaws.com/default/generate_ab_routine'
    
    axios.get(url, { headers })
      .then(response => {
        const data = response.data;
        const statusCheck = data.statusCode;
        const abWorkout = JSON.parse(data.body);
        setAbsExercises(abWorkout);
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });
  };
  // -------------------------------------------------------------------------------------------------------------------

  return (
    <>
      <Helmet>
        <title> Dashboard | Workout Generator </title>
      </Helmet>

      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={9} md={10}>
            <Typography variant="h4" >
              Hi, welcome to our workout generator! 😀
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3} md={2}>
            <Button variant="contained" onClick={handleGenerateWorkout}>
              Generate Workout
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Possible Workouts" total={714000} icon={'ant-design:sliders-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Likes" total={1} color="info" icon={'ant-design:like-twotone'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Users" total={1} color="warning" icon={'ant-design:skin-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Bug Reports" total={6548205} color="error" icon={'ant-design:bug-filled'} />
          </Grid>

          <Grid item xs={12} sm={4} md={2.5}>
            <FitnessGoalSelect
              value={fitnessGoalOption}
              onChange={(e) => setfitnessGoalOption(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={4} md={2.5}>
           <UserExperienceSelect
              value={userExperienceOption}
              onChange={handleUserExperienceChange}
            />
          </Grid>

          <Grid item xs={12} sm={4} md={2.5}>
            <DaysPerWeekSelect
              value={daysPerWeekOption}
              onChange={(e) => setdaysPerWeekOption(e.target.value)}
              availableOptions={availableDaysPerWeekOptions}
            />
          </Grid>

          <Grid item xs={12} sm={4} md={2.5}>
            <TimePerSessionSelect
              value={timePerSessionOption}
              onChange={(e) => settimePerSessionOption(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={4} md={2}>
            <Button variant="contained" onClick={handleAbWorkout}>
                Feeling Spicy? Roll an ab workout!
            </Button>
          </Grid>
          
          {typeof exerciseData === 'string' ? (
            <Typography variant="h3" color="error">
              An error occurred. The database needs to be updated with more exercises. For now, try selecting less than 5 days per week.
            </Typography>
          ) : (
            Object.keys(exerciseData).map((index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <AppOrderTimeline
                  title={daysOfWeek[index]}
                  list={exerciseData[index]}
                />
              </Grid>
            ))
          )}

          <Grid item xs={12} md={6} lg={4}>
            {absExercises.length > 0 && (
              <AbsTimelineComponent title="🌶️Spicy Daily Abs🌶️" list={absExercises} />
            )}
          </Grid>
                  
        </Grid>
      </Container>
    </>
  );
}
