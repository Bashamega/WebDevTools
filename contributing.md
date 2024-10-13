# Contributing to WebDevTools

Thank you for considering contributing to WebDevTools! We welcome contributions from everyone. Here’s a guide to help you get started.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [How to Contribute](#how-to-contribute)
   - [Reporting Bugs](#reporting-bugs)
   - [Suggesting Features](#suggesting-features)
   - [Submitting Code Changes](#submitting-code-changes)
3. [Development Workflow](#development-workflow)
4. [Style Guides](#style-guides)
   - [Code Style](#code-style)
   - [Documentation Style](#documentation-style)
   - [Tool Naming Convention](#tool-naming-convention)
5. [Getting Help](#getting-help)

## Code of Conduct

This project adheres to a [Code of Conduct](CODE_OF_CONDUCT.md) to foster an open and welcoming environment. By participating, you agree to uphold this code. Report any issues to [adam.webtools@gmail.com](mailto:adam.webtools@gmail.com).

## How to Contribute

### Reporting Bugs

To report a bug, please open an issue with:

- A clear and descriptive title.
- Steps to reproduce the issue.
- Expected vs. actual results.
- Screenshots or logs if available.

### Suggesting Features

To suggest a feature, please:

1. Search for existing suggestions.
2. If none exist, open an issue with:
   - A clear title and detailed description.
   - The problem it solves.
   - Examples or references.

### Submitting Code Changes

For code contributions:

1. Fork the repository.
2. Create a branch (`git checkout -b feature/your-feature-name`).
3. Make your changes.
4. Test thoroughly.
5. Add your feature(if it is a tool) to the `src/db/tools.json`
6. Commit and push (`git commit -am 'Add new feature'` and `git push origin feature/your-feature-name`).
7. Open a pull request.

## Development Workflow

1. **Fork and Clone**:
   ```bash
   git clone https://github.com/Bashamega/WebDevTools.git
   cd WebDevTools
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Run Development Server**:
   ```bash
   npm run dev
   ```

## Style Guides

### Code Style

- Follow the existing coding standards.
- Use meaningful names for variables and functions.
- Keep functions small and focused.
- New tools must follow the tool naming convention outlined below.

### Documentation Style

- Write clear comments.
- Document important functions and classes.
- Update README.md as necessary.

### Tool Naming Convention

When adding tools to db/tools.json, the tool name must be spelt correctly, and capitalized according to the following rules. Apply the rules in order, top to bottom (so that later rules, overrule previous ones if conflicting).

| Rule                                                                                                                                                         | :white_check_mark: Good Example | :x: Bad example      |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------- | -------------------- |
| Names must be title case ([more info](https://en.wikipedia.org/wiki/Title_case#:~:text=Title%20case%20or%20headline%20case,last%20word%20of%20the%20title.)) | Box Shadow Generator            | Box shadow generator |
| Acronyms must be uppercase                                                                                                                                   | API                             | Api                  |
| Coding languages must be named correctly                                                                                                                     | Markdown                        | Mark down            |
| Coding languages must have their official capitalization                                                                                                     | JavaScript                      | Javascript           |
| If coding language has unknown/inconsistent capitalization, it's a proper noun so capitalize it                                                              | Tailwind                        | tailwind             |

**Why we use this naming convention:**

- Names are uniform, and therefore look better on homepage.
- Accessability is improved as users know in what format to expect the names. This mitigates errors in visually scanning a page.
  - For example, those with dyslexia (or other similar impairments) are prone to errors recognizing capital and lowercase letters (such as 'G' and 'g') as interchangeable. This could lead to not finding 'Json' because they were expecting 'JSON'.

## Getting Help

For help, you can:

- Review the documentation.
- Check existing issues and pull requests.
- Reach out via discussions.

Thank you for contributing to WebDevTools! Your help is greatly appreciated.
