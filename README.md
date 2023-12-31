# HelpMeOut
A chrome extension screen recorder

This is a `Node.js / Express` project.

## Getting Started

First, install dependencies:
You should have node and handbrake-CLI running on the latest version <br>
Download node: https://nodejs.org/en/download <br> Download handbrake-CLI: https://handbrake.fr/downloads2.php
```bash
npm install
```
# Commit Standards

## Branches

- **dev** -> pr this branch for everything `frontend` & `backend` related
- **main** -> **dont touch** this branch, this is what is running in production.
## Testing

To test using postman, you should have postman installed (can be easily dont in VSCode)
- Go to postman, New Http Request, method: POST to localhost:yourPreferredPort/upload || localhost:3000/upload
- Body should be form-data with a key video and value should be a video file
  ![image](https://github.com/Oluwademiladeogo/HelpMeOut/assets/103854587/bd716f00-601c-40af-9c60-780a8af42fe0)
- It then redirects you to e.g., baseuri/videos?name=newvid.mp4 where the video can be played
- Transcript will be found at baseuri/videos/transcript?name=newvid.json

## Contributions

HelpMeOut is open to contributions, but I recommend creating an issue or replying in a comment to let us know what you are working on first that way we don't overwrite each other.

## Contribution Guidelines

1. Clone the repo `git clone https://github.com/Oluwademiladeogo/HelpMeOut`.
2. Open your terminal & set the origin branch: `git remote add origin https://github.com/Oluwademiladeogo/HelpMeOut.web.git`
3. Pull origin `git pull origin dev`
4. Create a new branch for the task you were assigned to, eg : `git checkout -b this-task`
5. After making changes, do `git add .`
6. Commit your changes with a descriptive commit message : `git commit -m "your commit message"`.
7. Push changes to your new branch, run `git push -u origin this-task`.
8. Create a pull request to the `dev` branch not `main`.
9. Ensure to describe your pull request.

### _Commit CheatSheet_

| Type     |                          | Description                                                                                                 |
| -------- | ------------------------ | ----------------------------------------------------------------------------------------------------------- |
| feat     | Features                 | A new feature                                                                                               |
| fix      | Bug Fixes                | A bug fix                                                                                                   |
| docs     | Documentation            | Documentation only changes                                                                                  |
| style    | Styles                   | Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)      |
| refactor | Code Refactoring         | A code change that neither fixes a bug nor adds a feature                                                   |
| perf     | Performance Improvements | A code change that improves performance                                                                     |
| test     | Tests                    | Adding missing tests or correcting existing tests                                                           |
| build    | Builds                   | Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)         |
| ci       | Continuous Integrations  | Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs) |
| chore    | Chores                   | Other changes that don't modify backend, frontend or test files                                             |
| revert   | Reverts                  | Reverts a previous commit                                                                                   |

> _Sample Commit Messages_

- `chore: Updated README file` := `chore` is used because the commit didn't make any changes to the backend, frontend or test folders in any way.
- `feat: Added plugin info endpoints` := `feat` is used here because the feature was non-existent before the commit.
