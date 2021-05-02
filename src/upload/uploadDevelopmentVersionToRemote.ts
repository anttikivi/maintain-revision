// Copyright (c) 2021 Visiosto oy
// Licensed under the MIT License

import putFileToS3 from '../s3/putFileToS3';

import { S3 } from '../services';

export default async function uploadDevelopmentVersionToRemote(
  service: string,
  bucketName: string,
  filePath: string,
  versionNumber: number,
): Promise<void> {
  if (service === S3) {
    putFileToS3(bucketName, filePath, String(versionNumber));
  }
}
