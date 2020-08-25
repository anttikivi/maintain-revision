// Copyright (c) 2020 Antti Kivi
// Licensed under the MIT License

import {fileExists} from "../src/bucket";

test("file exists", async () => {
  const exists = await fileExists(
    "anthem-workflows",
    "anttikivi/maintain_revision/test.txt"
  );
  expect(exists).toBe(true);
});

test("file doesn't exist", async () => {
  const exists = await fileExists(
    "anthem-workflows",
    "anttikivi/maintain_revision/not-found.txt"
  );
  expect(exists).toBe(false);
});
