# Contributing to Akira UI

Thanks for your interest in contributing.

## Bugs and feature requests

Open an issue at https://github.com/akira-io/akira-ui/issues. Include:

- What you expected to happen.
- What actually happened.
- A minimal reproduction.
- Versions: `@akira-io/ui`, React, and the browser or runtime.

## Working on a pull request

1. Fork the repo and create a branch from `main`.
2. Install dependencies with `bun install`.
3. Add or update tests for the change (`bun run test`).
4. Run `bun run typecheck` and `bun run build` before pushing.
5. Run `bun run format` (Prettier) so the diff matches the project's formatting.
6. Use conventional commit messages: the changelog is generated from them via
   [git-cliff](https://git-cliff.org).
7. Open the PR against `main`. Keep the diff focused: refactors, feature work, and dependency bumps belong
   in separate PRs.

## Style

- Match the existing project conventions (Prettier's output is the source of truth for formatting).
- No drive-by refactors in feature PRs.
- No emojis in code, copy, commit messages, or PR descriptions.
- Adding or updating a component goes through the shadcn CLI first (`bunx --bun shadcn@latest add <component>`);
  see [Development & Release](docs/06-development.md).

## License

By contributing, you agree that your contributions will be licensed under the MIT License, as described in
[LICENSE](LICENSE).
