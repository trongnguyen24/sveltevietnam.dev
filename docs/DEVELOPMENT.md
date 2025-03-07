# Development Setup

This document discusses necessary steps to get sveltevietnam.dev running on local development environment. Read [TECHNICAL REFERENCES](./TECHNICAL_REFERNCES.md) for an overview of the project's technical stack.

## Getting Help

For technical discussion or assistance, reach out to our maintainers at the [#site channel in Svelte Vietnam discord](https://discord.com/channels/1066621936546877450/1140975675235389562).

## Prerequisites

| Dependency    | Installation                            | Description                     |
| ------------- | --------------------------------------- | ------------------------------- |
| [node] >= 18x | [nvm], or [volta]                       | recommended `volta`             |
| [pnpm]        | [follow guide on website][pnpm.install] | alternative to `npm` and `yarn` |

At project root, run:

```bash
pnpm setup
```

## Monorepo

This is a monorepo managed with [pnpm] workspace and [turborepo]. The internal packages (sub-projects) are scoped as following:

- `/sites/*`: each package represents an isolated domain.
- `/services/*`: each package represent a service running in isolation (bot, backend domains, ...).
- `/libs/*`: each package is a collection of code reusable across monorepo.

See [package.json at root directory](./package.json) and in each package for available npm scripts. To run package-specific npm scripts, `cd` to package or use the `filter=...` flag at root. For example, to start the `sveltevietnam.dev` site, run:

```bash
pnpm dev --filter=@sites/www
# or
cd sites/www && pnpm dev
```

## Recommended VSCode Extensions

Search for `@recommended` in the Extension panel for quick installation (look for "Workspace Recommendations").

To extend the `@recommended` list, add the extension ID to the `extensions` array in [.vscode/extensions.json].

## Code standard

> [!IMPORTANT]
> Rules are to be broken. There will always be exceptions. The following guidelines are not set in stone, but rather a set of recommendations to help us work together more effectively.

### What is a Good Commit / Pull Request?

A commit should:

1. have a descriptive message that hints at what the commit is about, exceptionally helpful for other contributors and reviewers.
2. encapsulate a complete change, i.e a single feature, bug fix, or refactor that can make sense on its own.
3. ideally capture a working state of the application / site. If not, it should be marked as `[WIP]` in its commit message.
4. span a limited scope and has minimal footprint. If a commit does too much or has changes to many files, it is an indicator that the changes might be broken down into smaller commits.

Similarly, each pull request (PR) should work towards one issue or self-contained goal. If your PR contains a single commit, `merge rebase` (fast-forward). If there are multiple commits and you want to keep the merge history, prefer `merge commit` over `squash`, unless there are dirty commits in the branch.

### Commit Message Guidelines

We follow the [Conventional Commits][conventionalcommits] guidelines for writing git commit message. Please familiarize yourself with the guidelines and be consistent.

```bash
[feat | fix | chore](scope): "[message beginning with a verb: add | change | remove]"
```

### Code Style Enforcement

The project uses [eslint] and [prettier] for code linting and formatting. Make sure to install necessary plugins or integrations in your code editor.

[husky] & [lint-staged] is setup to run format and lint checks as a `pre-commit` [git hook](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks).

To bypass hook (not recommended, for admin only), run `git commit` with the `--no-verify` flag.

<!-- LOCAL -->

[.vscode/extensions.json]: ./.vscode/extensions.json

<!-- TECHNOLOGIES -->

[husky]: https://typicode.github.io/husky/
[lint-staged]: https://github.com/okonet/lint-staged
[eslint]: https://eslint.org
[prettier]: https://prettier.io
[node]: https://nodejs.org/en/
[nvm]: https://github.com/nvm-sh/nvm
[volta]: https://volta.sh/
[pnpm]: https://pnpm.io/
[pnpm.install]: https://pnpm.io/installation
[turborepo]: https://turbo.build/

<!-- OTHERS -->

[conventionalcommits]: https://www.conventionalcommits.org/en/v1.0.0/
