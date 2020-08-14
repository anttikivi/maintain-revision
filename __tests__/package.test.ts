// Copyright (c) 2020 Antti Kivi
// Licensed under the MIT License

import {readPackageVersion} from "../src/package";

test("reads package correctly", async () => {
  const readVersion = await readPackageVersion(
    "../__tests__/package-test.json"
  );
  expect(readVersion).toBe("0.1.0-dev");
});
