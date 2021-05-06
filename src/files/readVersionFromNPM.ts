// Copyright (c) 2021 Visiosto oy
// Licensed under the MIT License

import path from 'path';

import readVersionFromJSON from './readVersionFromJSON';

// TODO Catch errors and reject the promise if the function fails
export default async function readVersionFromNPM(filename: string, variable?: string): Promise<string> {
  const workspace = process.env.GITHUB_WORKSPACE as string;
  return readVersionFromJSON(path.join(workspace, 'package.json'), 'version');
}
