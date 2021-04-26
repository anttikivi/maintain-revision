// Copyright (c) 2020 Antti Kivi
// Licensed under the MIT License

import path from 'path';
import core from '@actions/core';
import * as bucket from './bucket';
import * as version from './version';

const uploadDevelopmentVersion = async (
  bucketName: string,
  filePath: string,
  versionNumber: number,
): Promise<void> => bucket.putFile(bucketName, filePath, String(versionNumber));

export const run = async (
  readVersion: Function,
  writeVersion: Function,
  isNpm: boolean = false,
  isPython: boolean = false,
): Promise<void> => {
  try {
    const workspace = process.env.GITHUB_WORKSPACE as string;
    const versionFile = path.join(workspace, core.getInput('file'));
    const shouldDownload = core.getInput('download') === 'true';
    const manualRevisionNumber = version.resolveManualRevisionNumber();

    core.info(`Reading local version data from ${versionFile}`);

    core.debug(`The workspace of this run is ${workspace}`);

    if (shouldDownload) {
      core.debug('The revision number should be downloaded from the remote');
    } else {
      core.debug("The revision number won't be downloaded from the remote");
    }

    core.debug(`The manual revision number is set to ${manualRevisionNumber}`);

    const projectVersion = isNpm ? await readVersion() : await readVersion(versionFile);

    core.debug(`The package version is ${projectVersion}`);

    if (!shouldDownload && !manualRevisionNumber) {
      core.debug("The revision number won't be set to the project");
      core.setOutput('version', projectVersion);
      core.setOutput('revision-number', 0);
    } else {
      const service = core.getInput('service');
      const bucketName = core.getInput('bucket');
      const pathInput = core.getInput('path');
      const suffix = core.getInput('suffix');
      const suffixVariable = core.getInput('suffix-variable');
      const filePath = pathInput === '' ? await bucket.getDefaultPath(projectVersion) : pathInput;

      const versionNumber = await version.resolveDevelopmentVersion(service, bucketName, filePath);

      core.info(`The development version number for the current run is ${versionNumber}`);

      const fullVersion: string = projectVersion.replace('-dev', `-dev.${versionNumber}`);

      core.debug(`The version for this run is ${fullVersion}`);

      if (isNpm) {
        core.debug('Going to write the version to an npm project');
        await writeVersion(projectVersion, fullVersion);
      } else if (isPython) {
        core.debug('Going to write the version to a Python project');

        if (suffix) {
          core.debug(`The version suffix is ${suffix}`);

          const newSuffix = `${suffix}.${versionNumber}`;

          core.debug(`The new version suffix is ${newSuffix}`);

          if (suffixVariable) {
            core.debug(`The version suffix variable is ${suffixVariable}`);

            await writeVersion(
              projectVersion,
              fullVersion,
              versionFile,
              suffix,
              newSuffix,
              suffixVariable,
            );
          } else {
            await writeVersion(projectVersion, fullVersion, versionFile, suffix, newSuffix);
          }
        } else {
          await writeVersion(projectVersion, fullVersion, versionFile);
        }
        await writeVersion(projectVersion, fullVersion);
      } else {
        await writeVersion(projectVersion, fullVersion, versionFile);
      }

      core.saveState('filePath', filePath);
      core.saveState('versionNumber', versionNumber);

      core.setOutput('version', fullVersion);
      core.setOutput('revision-number', versionNumber);
    }
  } catch (error) {
    core.debug('There was an error in the run');
    core.setFailed(error.message);
  }
};

export const upload = async () => {
  const shouldUpload = core.getInput('upload') === 'true';

  if (shouldUpload) {
    const bucketName = core.getInput('bucket');
    const filePath = core.getState('filePath');
    const versionNumber = parseInt(core.getState('versionNumber'), 10);

    uploadDevelopmentVersion(bucketName, filePath, versionNumber);
  } else {
    core.info('Uploading the next development version number is disabled');
  }
};
