import {
  unstable_parseMultipartFormData,
  UploadHandler,
} from '@remix-run/node';
import S3 from 'aws-sdk/clients/s3';
import cuid from 'cuid';
import { Readable } from 'stream';

const s3 = new S3({
  region: process.env.KUDOS_BUCKET_REGION,
  accessKeyId: process.env.KUDOS_ACCESS_KEY_ID,
  secretAccessKey: process.env.KUDOS_SECRET_ACCESS_KEY,
});

// @ts-ignore
const uploadHandler: UploadHandler = async ({ name, filename, data }) => {
  const stream = Readable.from(data);
  if (name !== 'profile-pic') {
    stream.resume();
    return;
  }

  const { Location } = await s3
    .upload({
      Bucket: process.env.KUDOS_BUCKET_NAME || '',
      // @ts-ignore
      Key: `${cuid()}.${filename.split('.').slice(-1)}`,
      Body: stream,
    })
    .promise();

  return Location;
};

export async function uploadAvatar(request: Request) {
  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler
  );

  const file = formData.get('profile-pic')?.toString() || '';

  return file;
}
