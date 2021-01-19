// Copyright (c) 2020 Antti Kivi
// Licensed under the MIT License

import {fileExists, readFile} from "../src/bucket";

test("file exists", async () => {
  const exists = await fileExists(
    "anthem-workflows",
    "visiosto/maintain_revision/test.txt"
  );
  expect(exists).toBeTruthy();
});

test("file doesn't exist", async () => {
  const exists = await fileExists(
    "anthem-workflows",
    "visiosto/maintain_revision/not-found.txt"
  );
  expect(exists).toBeFalsy();
});

test("file contents got correctly", async () => {
  const contents = await readFile(
    "anthem-workflows",
    "visiosto/maintain_revision/test.txt"
  );
  expect(contents).toBe("some text here");
});
