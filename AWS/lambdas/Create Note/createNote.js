import {v4 as uuidv4} from 'uuid';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

export const handler = async (event) => {
    const noteId = uuidv4();
    const createdAt = new Date().toISOString();

    //Manages the file IF present
    if(event.body.attachment){
        const buffer = Buffer.from(event.body.attachment, 'base64');
        const fileKey = `notes/${noteId}/${event.body.filename}`;

        await S3Client.send(new PutObjectCommand({
            Bucket: process.env.BUCKET_NAME,
            Key: fileKey,
            Body: buffer,
            ContentType: event.body.mimetype
        }));

        fileUrl = `https://${process.env.NOTES_BUCKET_NAME}.s3.amazonaws.com/${fileKey}`;
    }

    //Manages the DynamoDB communication

    //Change the region you're in
    const db = new DynamoDBClient({region: 'us-east-1'});

    await db.send(new PutItemCommand({
        TableName: process.env.NOTES_TABLE_NAME,
        Item: {
            NoteId: {S: noteId},
            Title: {S: event.body.title},
            Content: {S: event.body.content},
            CreatedAt: {S: createdAt},
            ...(fileUrl && {FileUrl: {S: fileUrl}})
        }
    }))

    return { 
        statusCode: 201,
        body: JSON.stringify({
            NoteID: noteId,
            Title: event.body.title,
            Content: event.body.content,
            CreatedAt: createdAt,
            FileURL: fileUrl || null
        })
    }
};