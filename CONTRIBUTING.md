# Contributing to AI-Powered Company Intelligence Dashboard

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing.

## Getting Started

1. Fork the repository
2. Clone your fork locally
3. Create a new branch for your changes
4. Make your changes
5. Test your changes
6. Commit and push to your fork
7. Submit a pull request

## Development Setup

```bash
# Install dependencies
npm install

# Start development servers
npm run dev
```

## Code Style

- Follow the existing code style
- Use TypeScript for type safety
- Use meaningful variable and function names
- Write comments for complex logic
- Run linters before committing

## Testing

- Write tests for new features
- Ensure all tests pass before submitting PR
- Aim for good code coverage

## Commit Messages

Use clear, descriptive commit messages:

```
type(scope): subject

body

footer
```

Types: feat, fix, docs, style, refactor, perf, test, chore

Example:
```
feat(chat): add message export functionality

Adds ability to export chat messages as JSON or CSV files.

Fixes #123
```

## Pull Request Process

1. Update documentation as needed
2. Add tests for new functionality
3. Ensure CI/CD checks pass
4. Request review from maintainers
5. Address review comments
6. Squash commits if requested
7. Merge when approved

## Reporting Issues

When reporting bugs:

1. Describe what you expected to happen
2. Describe what actually happened
3. Steps to reproduce the issue
4. Screenshots or error logs if applicable
5. Your environment details (OS, Node version, etc.)

## License

By contributing, you agree that your contributions will be licensed under the project's MIT License.
