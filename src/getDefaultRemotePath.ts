// Copyright (c) 2021 Visiosto oy
// Licensed under the MIT License

export default function getDefaultRemotePath(version: string): string {
  const repository = process.env.GITHUB_REPOSITORY?.replace('-', '_');
  const path = `${repository}/${version}_version.txt`;
  return path;
}
