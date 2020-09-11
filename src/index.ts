// Copyright (c) 2020 Antti Kivi
// Licensed under the MIT License

import {run, upload} from "./main";
import * as stateHelper from "./state-helper";

if (!stateHelper.IS_POST) {
  run();
} else {
  upload();
}
