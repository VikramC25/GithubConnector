# GitHub Connector

A modular, secure ExpressJS-based cloud connector that integrates with the GitHub API.

## Setup Instructions

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone <repository-url>
   cd githubconnector
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory of the project and add the following variables:
   ```env
   # Your GitHub Personal Access Token (Required for creating issues, optional for listing public data)
   GITHUB_PAT=your_github_personal_access_token
   
   # Optional: Port for the server to run on (default is 3000)
   PORT=3000
   ```

## How to Run the Project

You can run the project in production or development mode:

- **Production Mode** (runs the standard node server):
  ```bash
  npm start
  ```

- **Development Mode** (runs with nodemon, auto-reloads on file changes):
  ```bash
  npm run dev
  ```

The server will start, and by default, it will be accessible at `http://localhost:3000`.

## API Endpoints

All API endpoints are prefixed with `/api/github`.

### 1. Get User Repositories
- **URL**: `/api/github/users/:username/repos`
- **Method**: `GET`
- **Description**: Fetches a list of repositories for a specific GitHub user, sorted by the last updated time.
- **Example Response**: Returns an array of repository objects.

### 2. Get Repository Issues
- **URL**: `/api/github/repos/:owner/:repo/issues`
- **Method**: `GET`
- **Description**: Lists issues from a specific repository.
- **Example Response**: Returns an array of issue objects.

### 3. Create an Issue
- **URL**: `/api/github/repos/:owner/:repo/issues`
- **Method**: `POST`
- **Description**: Creates a new issue in a specified repository.
- **Authentication**: Requires a valid `GITHUB_PAT` configured in the `.env` file.
- **Request Body** (JSON):
  ```json
  {
    "title": "Your issue title here",
    "body": "Your optional issue description here"
  }
  ```
- **Example Response**: Returns the created issue object.
