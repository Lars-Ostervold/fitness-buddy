import random
from exercise_lists import *

#This function takes in the name of an exercise and returns a new exercise of the same type
#It will have to take the exercise_name, find it in the list of exercises, generate a new list
#of exercises of the same type, and return a random exercise from that list
def find_new_exercise(exercise_name: str):
    type = []
    print(f'This is exercise_name: {exercise_name}')
    #Find the exercise in the list of exercises
    for exercise in exercise_db:
        if exercise['variation_group'].lower() == exercise_name.lower():
            #Get muscle group and type of exercise
            muscle_group = exercise['muscle_group'].lower()
            type = exercise['type'].lower()
    print(f'This is the found type: {type}')
    #Find all exercises of the same type
    same_type_exercises = []
    for exercise in exercise_db:
        if exercise['type'] is not None and exercise['type'].lower() == type and exercise['muscle_group'].lower() == muscle_group and exercise['variation_group'].lower() != exercise_name.lower():
            same_type_exercises.append(exercise['variation_group'])
    print(f'This is similar exercises: {same_type_exercises}')

    #Choose a random exercise from the list of same type exercises
    new_exercise = random.choice(same_type_exercises)
    return new_exercise


def main(exercise: str):
    new_exercise = find_new_exercise(exercise)

    return new_exercise