# Maintain Revision

![Main workflow](https://github.com/anttikivi/maintain-revision/workflows/Main%20workflow/badge.svg)

Maintain Revision is a GitHub Actions action for keeping the remote development version numbers of [Obliging Ode](https://github.com/anttikivi/unsung-anthem), [Unsung Anthem](https://github.com/anttikivi/unsung-anthem), and their related projects up to date. It reads and sets the version for the current run of the projects on GitHub Actions by reading the last development version number from S3 and uploads the new development version to the same S3 bucket.

## Usage

You can use the current development version of this action by adding the following step to your workflow.

```yml
uses: anttikivi/maintain-revision@develop
```

See the [documentation for GitHub Actions](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#jobsjob_idstepsuses) for more information on how to use actions in your workflows.

Please note that there are no released versions of Maintain Revision yet.

## Contributing

Contributions to Maintain Revision are welcome and encouraged! There are many ways to [contribute](https://github.com/anttikivi/maintain-revision/blob/develop/CONTRIBUTING.md#how-can-i-contribute) to it. You can find the guidelines for contributing in [CONTRIBUTING](CONTRIBUTING.md).

This project adheres to the Contributor Covenant [Code of Conduct](https://github.com/anttikivi/maintain-revision/blob/develop/CODE_OF_CONDUCT.md). By participating, you’re expected to uphold this code. Please report unacceptable behaviour to antti.kivi@visiosto.fi.

## Licence

Maintain Revision is licensed under the [MIT License](LICENCE).
