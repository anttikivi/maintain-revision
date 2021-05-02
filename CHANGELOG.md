# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com), and this project adheres to [Semantic Versioning](https://semver.org).

## [Unreleased]

### Changed

- Name of the storage service option from `storage` to `service`.

## [0.13.0] - 2021-05-02

### Added

- Option for selecting the storage service.
- Unit tests for the files of the new project structure.

### Changed

- Project structure to match the coding standards, i.e. each module contains exactly the import of its name.

### Removed

- General file tests.

### Fixed

- JSON files having the workspace twice in their path.

## [0.12.2] - 2021-05-02

### Fixed

- JSON files having the workspace twice in their path.
- `CHANGELOG` for `v0.12.1`.

## [0.12.1] - 2021-04-26

### Added

- Error logging when reading JSON files.

### Changed

- npm packages files to use the same logic as other JSON files.
- JSON to use `resolve` to find the files.

## [0.12.0] - 2021-04-26

### Changed

- Project to use Yarn Classic instead of npm.
- JSON files to be read using `fs` instead of requiring them.

### Removed

- Default name of the bucket as users should enter it themselves.
- Action input `release`.

## [0.11.0] - 2021-04-25

### Changed

- Default name of the bucket.

## [0.10.1] - 2021-01-23

### Added

- More debug logging for the inputs of the action.
- Documentation for the restrictions of the manual revision number.

### Fixed

- Default value for downloading the revision number from `false` to `true`.

## [0.10.0] - 2021-01-23

### Added

- Input for disabling the download of the revision number from the remote file.
- Input for giving the revision number manually.
- Output that contains the revision number that is used.

### Removed

- Input for telling whether the build is release.
- Some community health files from this repository as they were moved to `visiosto/.github`.

## [0.9.5] - 2021-01-23

### Added

- More debug logging.

### Changed

- Python functionality to convert paths explicitly to strings before reading and writing.

## [0.9.4] - 2021-01-23

### Fixed

- Distribution files.

## [0.9.3] - 2021-01-23

### Added

- More debug logging.

## [0.9.2] - 2021-01-22

### Fixed

- Comparison that is used to check which S3 path is used.

## [0.9.1] - 2021-01-22

### Added

- Default value for the S3 file path.

## [0.9.0] - 2021-01-22

### Added

- Elementary support for Python projects.
- Parameter for inputting the pre-release suffix of the version separately to the writing functions.
- Options for adding the suffix and Python variable where the suffix is.

### Changed

- Action inputs’ descriptions to be more descriptive.

## [0.8.2] - 2020-10-29

### Removed

- Support for Yarn and revert back to npm.

## [0.8.1] - 2020-10-29

### Fixed

- Latest version number in the `README`.

## [0.8.0] - 2020-10-29

### Added

- Code scanning by using CodeQL.
- Option to use simpler configuration in projects that use npm.

### Changed

- Project’s package manager to Yarn.

## [0.7.1] - 2020-10-17

### Fixed

- Error in the description of the release option.

## [0.7.0] - 2020-10-17

### Added

- Option that disables the upload of the development version.
- Option for reading the version for release deployment.

## [0.6.0] - 2020-09-11

### Changed

- Logic of main action and POST action to separate files.

## [0.5.2] - 2020-09-11

### Added

- Branding for the action.

## [0.5.1] - 2020-09-11

### Changed

- Smallest supported version to 0.5.

## [0.5.0] - 2020-09-11

### Added

- Ability to run the action on macOS and Windows.

## [0.4.0] - 2020-09-11

### Changed

- Style of the project’s code to ES6.
- Names of the inputs.

## [0.3.0] - 2020-09-11

### Added

- Input for specifying the type of the project’s version file.
- Input for specifying path to the project’s version file.
- Support for text version files.

### Changed

- Place of the version upload to POST action.

## [0.2.3] - 2020-09-11

### Added

- Info message about the package.json file of the project.

### Fixed

- Missing distribution file of the release.

## [0.2.2] - 2020-09-11

### Fixed

- Incorrect path to the package.json file of the project.

## [0.2.1] - 2020-08-25

### Fixed

- Action not working for missing distribution files.

## [0.2.0] - 2020-08-25

### Added

- `version` output containing the full version number of the current run.

## [0.1.1] - 2020-08-25

### Fixed

- Version tagging of the project.

## [0.1.0] - 2020-08-25

### Added

- README telling the basic information about the project and its usage.
- Build scripts and package information using Node.js.
- Functionality for handling the version number increments in projects that use Node.js.

[unreleased]: https://github.com/visiosto/maintain-revision/compare/v0.13.0...HEAD
[0.13.0]: https://github.com/visiosto/maintain-revision/compare/v0.12.2...v0.13.0
[0.12.2]: https://github.com/visiosto/maintain-revision/compare/v0.12.1...v0.12.2
[0.12.1]: https://github.com/visiosto/maintain-revision/compare/v0.12.0...v0.12.1
[0.12.0]: https://github.com/visiosto/maintain-revision/compare/v0.11.0...v0.12.0
[0.11.0]: https://github.com/visiosto/maintain-revision/compare/v0.10.1...v0.11.0
[0.10.1]: https://github.com/visiosto/maintain-revision/compare/v0.10.0...v0.10.1
[0.10.0]: https://github.com/visiosto/maintain-revision/compare/v0.9.5...v0.10.0
[0.9.5]: https://github.com/visiosto/maintain-revision/compare/v0.9.4...v0.9.5
[0.9.4]: https://github.com/visiosto/maintain-revision/compare/v0.9.3...v0.9.4
[0.9.3]: https://github.com/visiosto/maintain-revision/compare/v0.9.2...v0.9.3
[0.9.2]: https://github.com/visiosto/maintain-revision/compare/v0.9.1...v0.9.2
[0.9.1]: https://github.com/visiosto/maintain-revision/compare/v0.9.0...v0.9.1
[0.9.0]: https://github.com/visiosto/maintain-revision/compare/v0.8.2...v0.9.0
[0.8.2]: https://github.com/visiosto/maintain-revision/compare/v0.8.1...v0.8.2
[0.8.1]: https://github.com/visiosto/maintain-revision/compare/v0.8.0...v0.8.1
[0.8.0]: https://github.com/visiosto/maintain-revision/compare/v0.7.1...v0.8.0
[0.7.1]: https://github.com/visiosto/maintain-revision/compare/v0.7.0...v0.7.1
[0.7.0]: https://github.com/visiosto/maintain-revision/compare/v0.6.0...v0.7.0
[0.6.0]: https://github.com/visiosto/maintain-revision/compare/v0.5.2...v0.6.0
[0.5.2]: https://github.com/visiosto/maintain-revision/compare/v0.5.1...v0.5.2
[0.5.1]: https://github.com/visiosto/maintain-revision/compare/v0.5.0...v0.5.1
[0.5.0]: https://github.com/visiosto/maintain-revision/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/visiosto/maintain-revision/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/visiosto/maintain-revision/compare/v0.2.3...v0.3.0
[0.2.3]: https://github.com/visiosto/maintain-revision/compare/v0.2.2...v0.2.3
[0.2.2]: https://github.com/visiosto/maintain-revision/compare/v0.2.1...v0.2.2
[0.2.1]: https://github.com/visiosto/maintain-revision/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/visiosto/maintain-revision/compare/v0.1.1...v0.2.0
[0.1.1]: https://github.com/visiosto/maintain-revision/compare/0.1.0...v0.1.1
[0.1.0]: https://github.com/visiosto/maintain-revision/releases/tag/0.1.0
