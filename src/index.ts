// Copyright (c) 2020 Antti Kivi
// Licensed under the MIT License

import * as core from "@actions/core";
import * as json from "./json-file";
import {run, upload} from "./main";
import * as stateHelper from "./state-helper";

if (!stateHelper.IS_POST) {
  const projectType = core.getInput("project-type");

  if (projectType === "json") {
    run(json.readVersion, json.writeVersion);
  }
} else {
  upload();
}
