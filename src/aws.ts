// Copyright (c) 2020 Antti Kivi
// Licensed under the MIT License

import * as exec from "@actions/exec";
import * as io from "@actions/io";
import * as toolCache from "@actions/tool-cache";

export async function install(): Promise<string> {
  return new Promise((resolve, reject) => {
    toolCache
      .downloadTool(
        "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip",
        "awscliv2.zip"
      )
      .then(
        downloadResult => {
          toolCache.extractZip(downloadResult).then(
            directory => {
              exec.exec(directory + "/install").then(result => {
                result == 0 ? resolve("/usr/local/bin/aws") : reject(NaN);
              });
            },
            reason => {
              reject(reason);
            }
          );
        },
        reason => {
          reject(reason);
        }
      )
      .finally(() => {
        io.rmRF("awscliv2.zip");
      });
  });
}
