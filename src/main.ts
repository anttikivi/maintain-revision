// Copyright (c) 2020 Antti Kivi
// Licensed under the MIT License

import * as core from "@actions/core";
import * as pkg from "./package";

const IS_WINDOWS = process.platform === "win32";
const IS_MAC = process.platform === "darwin";

export async function run(): Promise<void> {
  if (IS_MAC) {
    core.setFailed("Unfortunately Maintain Revision doesn't support macOS yet");
  } else if (IS_WINDOWS) {
    core.setFailed(
      "Unfortunately Maintain Revision doesn't support Windows yet"
    );
  }

  try {
    // TODO
  } catch (error) {
    core.setFailed(error.message);
  }
}
