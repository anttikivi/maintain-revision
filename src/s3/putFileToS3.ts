// Copyright (c) 2021 Visiosto oy
// Licensed under the MIT License

import aws from 'aws-sdk';
import * as core from '@actions/core';

export default async function putFileToS3(
  bucketName: string,
  path: string,
  content: string,
  accessKeyId?: string,
  secretAccessKey?: string,
  region?: string,
): Promise<void> {
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
      Body: content,
    };
    s3.putObject(params, (err) => {
      if (err) {
        core.warning(
          `The upload of the file ${path} with the content ${content} failed: ${err.code}`,
        );
        reject();
      } else {
        core.debug(`The latest development version was uploaded to bucket ${bucketName}`);
        resolve();
      }
    });
  });
}
