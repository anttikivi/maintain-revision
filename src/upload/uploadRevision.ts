// Copyright (c) 2021 Visiosto oy
// Licensed under the MIT License

import * as core from '@actions/core';

import uploadDevelopmentVersionToRemote from './uploadDevelopmentVersionToRemote';

export default async function uploadRevision() {
  const shouldUpload = core.getInput('upload') === 'true';

  if (shouldUpload) {
    const service = core.getInput('service');
    const bucketName = core.getInput('bucket');
    const filePath = core.getState('filePath');
    const versionNumber = parseInt(core.getState('revisionNumber'), 10);

    uploadDevelopmentVersionToRemote(service, bucketName, filePath, versionNumber);
  } else {
    core.info('Uploading the next development version number is disabled');
  }
}
