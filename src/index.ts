// Copyright (c) 2020 Antti Kivi
// Licensed under the MIT License

import * as core from "@actions/core";
import * as json from "./json-file";
import {run, upload} from "./main";
import * as stateHelper from "./state-helper";
import * as txt from "./txt-file";

if (!stateHelper.IS_POST) {
  const projectType = core.getInput("type");

  if (projectType === "json") {
    run(json.readVersion, json.writeVersion);
  } else if (projectType === "txt") {
    run(txt.readVersion, txt.writeVersion);
  } else {
    core.error(
      "The selected project type isn't supported. The currently supported " +
        "types are 'json' and 'txt'"
    );
  }
} else {
  upload();
}
