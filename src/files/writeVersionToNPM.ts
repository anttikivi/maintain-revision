// Copyright (c) 2021 Visiosto oy
// Licensed under the MIT License

import writeVersionToJSON from './writeVersionToJSON';

export default async function writeVersionToNPM(
  packageVersion: string,
  newVersion: string,
): Promise<void> {
  writeVersionToJSON(packageVersion, newVersion, 'package.json');
}
