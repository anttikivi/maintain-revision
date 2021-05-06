// Copyright (c) 2021 Visiosto oy
// Licensed under the MIT License

import readVersionFromPython from '../readVersionFromPython';

describe('function to read version from Python file', () => {
  it('correctly reads version from Python file', async () => {
    const version = await readVersionFromPython('test/version_test.py');
    expect(version).toBe('0.3.2-dev');
  });

  it('correctly reads version from Python file by using different variable', async () => {
    const version = await readVersionFromPython('test/version_test.py', 'version_variable');
    expect(version).toBe('1.4.5-dev');
  });
});
