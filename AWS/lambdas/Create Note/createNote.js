import { v4 as uuidv4 } from 'uuid';
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

export const handler = async (event) => {
    const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
    const noteId = uuidv4();
    const createdAt = new Date().toISOString();
    let fileUrl = body.fileUrl || null;

    //Manages the DynamoDB communication
    const db = new DynamoDBClient({region: 'us-east-1'});

    await db.send(new PutItemCommand({
        TableName: process.env.NOTES_TABLE_NAME,
        Item: {
            NoteID: {S: noteId},
            Title: {S: body.title},
            Content: {S: body.content},
            CreatedAt: {S: createdAt},
            ...(fileUrl ? { FileUrl: { S: fileUrl } } : {})
        }
    }))

    return { 
        statusCode: 201,
        body: JSON.stringify({
            NoteID: noteId,
            Title: body.title,
            Content: body.content,
            CreatedAt: createdAt,
            FileURL: fileUrl || null
        })
    }
};