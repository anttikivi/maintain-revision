// Copyright (c) 2021 Visiosto oy
// Licensed under the MIT License

import { readVersion } from '../src/python';

test('reads Python file correctly', async () => {
  const version = await readVersion('./__tests__/version_test.py');
  expect(version).toBe('0.3.2-dev');
});
