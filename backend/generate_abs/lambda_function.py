#Send w/ 'amplify push -y'
import json
import random
from exercise_lists import *

def lambda_handler(event, context):
    ab_routine = generate_ab_routine()
    return {
    "statusCode": 200,
    "headers": {
        "Content-Type": "application/json"
    },
    "body": json.dumps(ab_routine)
    }

def generate_ab_routine():
    #Pick how many ab exercises
    num_of_exercises = random.randint(5,10)
    
    possible_exercises = []
    #Loop through the daily_workout_skeleton, find matching workouts in the exercise_db, then pick a random matching exercise

    for exercise in exercise_db:
        if ( #Code below avoids error with NULL values
            'abdominals' in (exercise['muscle_group'].lower() if exercise['muscle_group'] else '') 
        ):
                possible_exercises.append(exercise['variation_group'])
    
    ab_workout = []
    for j in range(int(num_of_exercises/2)):
        exercise = random.choice(possible_exercises)
        while exercise in ab_workout:
            exercise = random.choice(possible_exercises)
        ab_workout.append(exercise)
    
    return ab_workout

lambda_handler('0', '0')