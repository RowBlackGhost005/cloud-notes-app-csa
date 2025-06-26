import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

//Be sure to change this region to your own
const s3 = new S3Client({ region: "us-east-1" });

export async function handler(event) {
    const { fileName, fileType } = JSON.parse(event.body);

    //States the file that its going to be uploaded
    const command = new PutObjectCommand({
      Bucket: process.env.NOTES_BUCKET_NAME,
      Key: fileName,
      ContentType: fileType,
    });

    //Creates the URL based on the command created above containing the metadata.
    const url = await getSignedUrl(s3, command, { expiresIn: 300 });

    return {
      statusCode: 200,
      body: JSON.stringify({ uploadUrl: url }),
    };
}