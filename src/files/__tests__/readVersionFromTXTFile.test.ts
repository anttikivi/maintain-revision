// Copyright (c) 2021 Visiosto oy
// Licensed under the MIT License

import readVersionFromTXTFile from '../readVersionFromTXTFile';

describe('function to read version from text file', () => {
  it('correctly reads version from text file', async () => {
    const version = await readVersionFromTXTFile('test/file-test.txt');
    expect(version).toBe('0.2.0-dev');
  });
});
