import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { GetCommand, DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

//Change the region you're in
const db = DynamoDBDocumentClient.from(new DynamoDBClient({ region: 'us-east-1' }));

export const handler = async (event) => {
    //Expects and gets both params from the URL
    //This due to our setup of dynamoDB requiring both parts of the ID
    const noteId = event.pathParameters.id;
    const createdAt = event.queryStringParameters?.createdAt;

    if (!noteId) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'A valid ID of a Note is required' }),
        };
    }

    try {
        const result = await db.send(new GetCommand({
            TableName: process.env.NOTES_TABLE_NAME,
            Key: {
                NoteID: noteId,
                CreatedAt: createdAt
              }              
        }));

        if (!result.Item) {
            return {
            statusCode: 404,
            body: JSON.stringify({ message: 'No Note with such ID was found' }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(result.Item),
        };
    } catch (err) {
        console.error('Error fetching note:', err);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to fetch note' }),
        };
    }
};