// Copyright (c) 2021 Visiosto oy
// Licensed under the MIT License

import readVersionFromJSON from './readVersionFromJSON';

// TODO Catch errors and reject the promise if the function fails
export default async function readVersionFromNPM(): Promise<string> {
  return readVersionFromJSON('package.json');
}
