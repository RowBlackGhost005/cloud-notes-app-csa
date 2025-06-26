# Cloud Based Notes App

Small notes app that uses AWS Lambda and DynamoDB for serving and persisting notes created by users and has the ability to store attached files.

# Functionalities
- Create notes and optionally attach a file.
- Fetch all notes
- Fetch a single note
- Deletion of a Note alongside its attecehd files from the services.

# Setup Process
To achieve this we will need a few things:
- Setup a DynamoDB table.
- Setup an S3 bucket for storing atteched files.
- Setup an AWS Lambda Functions to:
    - Create Notes.
    - Fetch All Notes.
    - Get a Specific Note.
    - Delete a Note.
- Setup IAM Roles to grant permissions to the lambdas.
- Setup an API Gateway to forward calls to each lambda.
- Setup a Front-end to interact with the API Gateway.

#
