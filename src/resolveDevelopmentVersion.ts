// Copyright (c) 2021 Visiosto oy
// Licensed under the MIT License

import * as core from '@actions/core';

import resolveDevelopmentVersionFromS3 from './s3/resolveDevelopmentVersionFromS3';

import { S3 } from './services';

export default async function resolveDevelopmentVersion(
  service: string,
  bucketName: string,
  path: string,
): Promise<number> {
  if (service === S3) {
    return resolveDevelopmentVersionFromS3(bucketName, path);
  }

  core.error(`The storage service is invalid: '${service}'`);

  return -1;
}
