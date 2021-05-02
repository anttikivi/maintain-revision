// Copyright (c) 2021 Visiosto oy
// Licensed under the MIT License

import s3FileExists from '../s3FileExists';

describe('function to check whether file exists in S3', () => {
  it('correctly detects existing file', async () => {
    const exists = await s3FileExists('anthem-workflows', 'visiosto/maintain_revision/test.txt');
    expect(exists).toBeTruthy();
  });

  it("correctly detects that a file doesn't exist", async () => {
    const exists = await s3FileExists(
      'anthem-workflows',
      'visiosto/maintain_revision/not-found.txt',
    );
    expect(exists).toBeFalsy();
  });
});
