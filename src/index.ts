// Copyright (c) 2021 Visiosto oy
// Licensed under the MIT License

import * as core from '@actions/core';

import readVersionFromJSON from './files/readVersionFromJSON';
import readVersionFromNPM from './files/readVersionFromNPM';
import readVersionFromPython from './files/readVersionFromPython';
import readVersionFromTXTFile from './files/readVersionFromTXTFile';
import run from './run';
import writeVersionToJSON from './files/writeVersionToJSON';
import writeVersionToNPM from './files/writeVersionToNPM';
import writeVersionToPython from './files/writeVersionToPython';
import writeVersionToTXTFile from './files/writeVersionToTXTFile';

const projectType = core.getInput('type');

if (projectType === 'json') {
  run(readVersionFromJSON, writeVersionToJSON);
} else if (projectType === 'txt') {
  run(readVersionFromTXTFile, writeVersionToTXTFile);
} else if (projectType === 'npm') {
  run(readVersionFromNPM, writeVersionToNPM, true);
} else if (projectType === 'python') {
  run(readVersionFromPython, writeVersionToPython, false);
} else {
  core.error(
    "The selected project type isn't supported. The currently supported types are 'npm', 'python', 'json', and 'txt'",
  );
}
