// Copyright (c) 2021 Visiosto oy
// Licensed under the MIT License

import readS3File from '../readS3File';

describe('function to read files from S3', () => {
  it('correctly reads file', async () => {
    const contents = await readS3File('anthem-workflows', 'visiosto/maintain_revision/test.txt');
    expect(contents).toBe('some text here');
  });
});
