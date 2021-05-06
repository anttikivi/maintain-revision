# Maintain Revision

![Main workflow](https://github.com/visiosto/maintain-revision/workflows/Main%20workflow/badge.svg)

Maintain Revision is a GitHub Actions action for keeping the remote development version numbers of projects up to date. It creates the version for the current run of the project on GitHub Actions by reading the last development version number from S3 and uploads the new development version to the same S3 bucket.

## Usage

You can use the latest version of this action by adding the following step to your workflow.

```yml
uses: visiosto/maintain-revision@v0.15.0
```

See the [documentation for GitHub Actions](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#jobsjob_idstepsuses) for more information on how to use actions in your workflows.

## Build

Before building Maintain Revision, please ensure that you have [Node.js](https://nodejs.org) and [Yarn](https://yarnpkg.com) installed. Please note that this project uses the [Yarn Classic](https://classic.yarnpkg.com).

First, clone the GitHub repository of Maintain Revision.

**Via HTTPS:** If you’re checking out sources as read-only, HTTPS works best.

    git clone https://github.com/visiosto/maintain-revision.git

**Via SSH:** If you’re planning on regularly making direct commits, cloning over SSH may provide a better experience (it requires [uploading SSH keys to GitHub](https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/))

    git clone git@github.com:visiosto/maintain-revision.git

**Via GitHub CLI:** If you work chiefly with GitHub, using the official [GitHub CLI](https://cli.github.com) may provide the best experience.

    gh repo clone visiosto/maintain-revision

After cloning the source, make sure to change to the cloned directory.

    cd maintain-revision

Then install the dependencies for the build.

    yarn install

Finally, build the project.

    yarn build

The built action is in the `dist` directory.

## Contributing

Contributions to Maintain Revision are welcome and encouraged! There are many ways to [contribute](https://github.com/visiosto/.github/blob/main/CONTRIBUTING.md#how-can-i-contribute) to it. You can find the guidelines for contributing in [CONTRIBUTING.md](https://github.com/visiosto/.github/blob/main/CONTRIBUTING.md).

This project adheres to the Contributor Covenant [Code of Conduct](https://github.com/visiosto/.github/blob/main/CODE_OF_CONDUCT.md). By participating, you’re expected to uphold this code. Please report unacceptable behaviour to antti.kivi@visiosto.fi.

## Licence

Maintain Revision is licensed under the [MIT License](LICENCE).
