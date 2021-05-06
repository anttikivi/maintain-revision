// Copyright (c) 2021 Visiosto oy
// Licensed under the MIT License

import * as core from '@actions/core';

import readVersionFromJSON from './files/readVersionFromJSON';
import readVersionFromNPM from './files/readVersionFromNPM';
import readVersionFromPython from './files/readVersionFromPython';
import readVersionFromTXTFile from './files/readVersionFromTXTFile';
import run from './run';

const projectType = core.getInput('type');

if (projectType === 'json') {
  run(readVersionFromJSON);
} else if (projectType === 'txt') {
  run(readVersionFromTXTFile);
} else if (projectType === 'npm') {
  run(readVersionFromNPM);
} else if (projectType === 'python') {
  run(readVersionFromPython);
} else {
  core.error(
    "The selected project type isn't supported. The currently supported types are 'npm', 'python', 'json', and 'txt'",
  );
}
