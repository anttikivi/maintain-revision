// Copyright (c) 2020 Antti Kivi
// Licensed under the MIT License

import { readVersion } from '../src/txt-file';

test('reads text file correctly', async () => {
  const version = await readVersion('./__tests__/file-test.txt');
  expect(version).toBe('0.2.0-dev');
});
