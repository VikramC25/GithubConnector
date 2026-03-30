const axios = require('axios');

const githubApi = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github.v3+json',
  },
});

// Interceptor to add the Authorization header if PAT is available
githubApi.interceptors.request.use((config) => {
  const token = process.env.GITHUB_PAT;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

class GithubService {
  
  //Fetch repositories for a specific user
  async getUserRepositories(username) {
    try {
      const response = await githubApi.get(`/users/${username}/repos?sort=updated`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  //List issues from a specific repository
  async getRepositoryIssues(owner, repo) {
    try {
      const response = await githubApi.get(`/repos/${owner}/${repo}/issues`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  //Create an issue in a repository
  async createIssue(owner, repo, title, body) {
    try {
      if (!process.env.GITHUB_PAT) {
        throw new Error('Authentication required: GITHUB_PAT is missing.');
      }
      
      const response = await githubApi.post(`/repos/${owner}/${repo}/issues`, {
        title,
        body,
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  handleError(error) {
    // If it's an Axios error, extract the GitHub API message and status
    if (error.response) {
      const apiError = new Error(error.response.data.message || 'GitHub API Error');
      apiError.status = error.response.status;
      throw apiError;
    }
    // Network or other errors
    const customError = new Error(error.message);
    customError.status = 500;
    throw customError;
  }
}

module.exports = new GithubService();
