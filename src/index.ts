// Copyright (c) 2020 Antti Kivi
// Licensed under the MIT License

import * as core from "@actions/core";
import * as json from "./json-file";
import {run} from "./main";
import * as npm from "./npm";
import * as python from "./python";
import * as txt from "./txt-file";

const projectType = core.getInput("type");

if (projectType === "json") {
  run(json.readVersion, json.writeVersion);
} else if (projectType === "txt") {
  run(txt.readVersion, txt.writeVersion);
} else if (projectType === "npm") {
  run(npm.readVersion, npm.writeVersion, true);
} else if (projectType === "python") {
  run(python.readVersion, python.writeVersion);
} else {
  core.error(
    "The selected project type isn't supported. The currently supported " +
      "types are 'npm', 'python', 'json' and 'txt'"
  );
}
