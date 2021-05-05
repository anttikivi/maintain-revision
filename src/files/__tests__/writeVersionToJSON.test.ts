// Copyright (c) 2021 Visiosto oy
// Licensed under the MIT License

import readVersionFromJSON from '../readVersionFromJSON';
import writeVersionToJSON from '../writeVersionToJSON';

describe('function to write version to JSON file', () => {
  it('correctly writes version to JSON file', async () => {
    const packageVersion = '0.2.0-dev';
    const newVersion = '0.2.0-dev.17';
    await writeVersionToJSON(packageVersion, newVersion, 'test/write-test-1.json');
    const version = await readVersionFromJSON('test/write-test-1.json');
    expect(version).toBe('0.2.0-dev.17');
  });
});
