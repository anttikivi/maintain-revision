// Copyright (c) 2021 Visiosto oy
// Licensed under the MIT License

import * as core from '@actions/core';
import aws from 'aws-sdk';

export default async function s3FileExists(
  bucketName: string,
  path: string,
  accessKeyId?: string,
  secretAccessKey?: string,
  region?: string,
): Promise<boolean> {
  return new Promise((resolve) => {
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
    s3.headObject(params, (err) => {
      if (err && err.code === 'NotFound') {
        core.debug(`File ${path} doesn't exist in bucket ${bucketName}`);
        // Return false as the file doesn't exist.
        resolve(false);
      } else {
        core.debug(`File ${path} exists in bucket ${bucketName}`);
        resolve(true);
      }
    });
  });
}
