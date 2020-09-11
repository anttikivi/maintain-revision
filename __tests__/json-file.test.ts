// Copyright (c) 2020 Antti Kivi
// Licensed under the MIT License

import {readVersion} from "../src/json-file";

test("reads JSON file correctly", async () => {
  const version = await readVersion("../__tests__/file-test.json");
  expect(version).toBe("0.1.0-dev");
});
