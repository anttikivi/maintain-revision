// Copyright (c) 2021 Visiosto oy
// Licensed under the MIT License

import * as core from '@actions/core';

export default function resolveManualRevisionNumber(): number {
  return core.getInput('revision-number') ? parseInt(core.getInput('revision-number'), 10) : 0;
}
