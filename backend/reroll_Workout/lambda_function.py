#Send w/ 'amplify push -y'
import json
from reroll import main as reroll

def lambda_handler(event, context):
    newExercise = reroll(event.get('exercise'))
    
    return {
    "statusCode": 200,
    "headers": {
        "Content-Type": "application/json"
    },
    "body": json.dumps(newExercise)
    }
