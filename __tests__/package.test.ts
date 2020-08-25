// Copyright (c) 2020 Antti Kivi
// Licensed under the MIT License

import {readVersion} from "../src/package";

test("reads package correctly", async () => {
  const version = await readVersion("../__tests__/package-test.json");
  expect(version).toBe("0.1.0-dev");
});
