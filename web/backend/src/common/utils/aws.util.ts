import { Logger } from "@nestjs/common";

import type { CompleteMultipartUploadCommandOutput, PutObjectCommandOutput } from "@aws-sdk/client-s3";

import { KError } from "@error/error.handler";

import {
  AbortMultipartUploadCommand,
  CompleteMultipartUploadCommand,
  CreateMultipartUploadCommand, PutObjectCommand, S3Client, UploadPartCommand
} from "@aws-sdk/client-s3";

const bucketName = process.env.AWS_BUCKET_NAME!;

async function smallFileUpload(file: Express.Multer.File): Promise<string> {
  const s3Client = new S3Client({
    region: 'ap-northeast-2',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    }
  });

  const extension = file.originalname.split('.').pop();
  const { buffer } = file;
  const key = `public/professorkim/uploads/${Date.now().valueOf()}.${extension}`;

  const uploadResult: PutObjectCommandOutput = await s3Client.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: buffer,
      ContentType: file.mimetype,
      // TODO: public-read 해도 될지?
      ACL: 'public-read'
    })
  );

  Logger.debug(uploadResult);

  if (uploadResult.$metadata.httpStatusCode !== 200) {
    throw new KError('Failed to upload file', 500);
  }

  return key;
}

async function multiPartUpload(
  file: Express.Multer.File,
): Promise<CompleteMultipartUploadCommandOutput> {
  const s3Client = new S3Client({
    region: 'ap-northeast-2',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });

  const extension = file.originalname.split('.').pop();
  const { buffer } = file;
  const key = `public/professorkim/uploads/${Date.now().valueOf()}.${extension}`;

  let uploadId: string | undefined;

  try {
    const multipartUpload = await s3Client.send(
      new CreateMultipartUploadCommand({
        Bucket: bucketName,
        Key: key,
        ContentType: file.mimetype,
        ACL: 'public-read',
      }),
    );

    uploadId = multipartUpload.UploadId;

    const uploadPromises = [];
    // Multipart uploads require a minimum size of 5 MB per part.
    let partCount = Math.ceil(buffer.length / 5242880);
    partCount = partCount > 1 ? partCount - 1 : 1;
    const partSize = Math.ceil(buffer.length / partCount);

    // Upload each part.
    for (let i = 0; i < partCount; i += 1) {
      const start = i * partSize;
      const end = start + partSize;
      uploadPromises.push(
        s3Client
          .send(
            new UploadPartCommand({
              Bucket: bucketName,
              Key: key,
              UploadId: uploadId,
              Body: buffer.subarray(start, end),
              PartNumber: i + 1,
            }),
          )
          .then((d) => {
            Logger.debug('Part', i + 1, 'uploaded');
            return d;
          }),
      );
    }

    const uploadResults = await Promise.all(uploadPromises);

    return await s3Client.send(
      new CompleteMultipartUploadCommand({
        Bucket: bucketName,
        Key: key,
        UploadId: uploadId,
        MultipartUpload: {
          Parts: uploadResults.map(({ ETag }, i) => ({
            ETag,
            PartNumber: i + 1,
          })),
        },
      }),
    );
  } catch (err) {
    if (uploadId) {
      const abortCommand = new AbortMultipartUploadCommand({
        Bucket: bucketName,
        Key: key,
        UploadId: uploadId,
      });

      await s3Client.send(abortCommand);
    }
    Logger.error(err);
    throw new KError('Failed to upload file', 500);
  }
}

async function uploadFile(file: Express.Multer.File): Promise<string> {
  const fileSize = file.size;
  if (fileSize < 5 * 1024 * 1024) {
    const uploadResult = await smallFileUpload(file);
    return uploadResult;
  }

  const multiPartUploadResult = await multiPartUpload(file);
  if (multiPartUploadResult.$metadata.httpStatusCode !== 200) {
    throw new KError('Failed to upload file', 500);
  }
  return multiPartUploadResult.Key!;
}

function makeUrl(key: string): string {
  const region = 'ap-northeast-2';
  return `https://${bucketName}.s3.${region}.amazonaws.com/${key}`;
}

export { makeUrl, uploadFile };
