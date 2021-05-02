// Copyright (c) 2021 Visiosto oy
// Licensed under the MIT License

import aws from 'aws-sdk';

export default async function readS3File(
  bucketName: string,
  path: string,
  accessKeyId?: string,
  secretAccessKey?: string,
  region?: string,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const s3 = new aws.S3({
      apiVersion: '2006-03-01',
      accessKeyId: accessKeyId === undefined ? process.env.AWS_ACCESS_KEY_ID : accessKeyId,
      secretAccessKey:
        secretAccessKey === undefined ? process.env.AWS_SECRET_ACCESS_KEY : secretAccessKey,
      region: region === undefined ? process.env.AWS_DEFAULT_REGION : region,
    });
    const params = {
      Bucket: bucketName,
      Key: path,
    };
    s3.getObject(params, (err, data) => {
      if (err) {
        // TODO
        reject(err.message);
      } else {
        resolve(data.Body!.toString());
      }
    });
  });
}
