import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { GetCommand, DeleteCommand, DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';

//Change the region you're in
const db = DynamoDBDocumentClient.from(new DynamoDBClient({ region: 'us-east-1' }));
const s3 = new S3Client({ region: 'us-east-1' });

export const handler = async (event) => {
    const noteId = event.pathParameters?.id;

    if (!noteId) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'A valid ID of a Note is required' }),
        };
    }

    try {
        // Attempts to fetch the Note
        const { Item } = await db.send(new GetCommand({
            TableName: process.env.NOTES_TABLE_NAME,
            Key: { NoteID: noteId }
        }));

        if (!Item) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Note not found' }),
            };
        }

        // Delets the Note attachment from S3 IF exists.
        if (Item.FileURL) {
            const url = new URL(Item.FileURL);
            const key = decodeURIComponent(url.pathname.slice(1));

            await s3.send(new DeleteObjectCommand({
                Bucket: process.env.NOTES_BUCKET_NAME,
                Key: key
            }));
        }

    // Deletes the entry from DynamoDB
    await db.send(new DeleteCommand({
        TableName: process.env.NOTES_TABLE_NAME,
        Key: { NoteID: noteId }
    }));

    return {
        statusCode: 200,
        body: JSON.stringify({ message: `Note ${noteId} and associated file deleted.` }),
        };
    } catch (err) {
        console.error('Delete error:', err);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to delete note or file' }),
        };
    }
};