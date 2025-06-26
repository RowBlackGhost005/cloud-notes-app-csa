import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { ScanCommand, DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

//Change the region you're in
const db = DynamoDBDocumentClient.from(new DynamoDBClient({ region: 'us-east-1' }));

export const handler = async () => {
    try {
        //Calls SCAN (Returns all entries)
        const result = await db.send(new ScanCommand({
            TableName: process.env.NOTES_TABLE_NAME
        }));

        return {
            statusCode: 200,
            body: JSON.stringify(result.Items),
        };

    } catch (err) {
        console.error('Error scanning table:', err);
        return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Failed to fetch notes' }),
        };
    }
};