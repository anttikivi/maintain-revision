// Copyright (c) 2020 Antti Kivi
// Licensed under the MIT License

import {install} from "../src/aws";
import * as exec from "@actions/exec";

test("install is successful", async () => {
  const awsLocation = await install();
  expect(awsLocation).toBe("/usr/local/bin/aws");
});

/*
test("AWS is installed successfully", async () => {
  const awsLocation = await install();
  const returnCode = await exec.exec(awsLocation + " --version");
  expect(returnCode).toBe(0);
});

test("AWS can be called from PATH", async () => {
  await install();
  const returnCode = await exec.exec("aws --version");
  expect(returnCode).toBe(0);
});
*/
