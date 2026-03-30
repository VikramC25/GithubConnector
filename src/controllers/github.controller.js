const githubService = require('../services/github.service');

exports.getUserRepositories = async (req, res, next) => {
  try {
    const { username } = req.params;
    
    if (!username) {
      return res.status(400).json({ status: 'error', message: 'Username is required' });
    }

    const repos = await githubService.getUserRepositories(username);
    res.status(200).json({ status: 'success', data: repos });
  } catch (error) {
    next(error);
  }
};

exports.getRepositoryIssues = async (req, res, next) => {
  try {
    const { owner, repo } = req.params;
    
    if (!owner || !repo) {
      return res.status(400).json({ status: 'error', message: 'Owner and repo are required' });
    }

    const issues = await githubService.getRepositoryIssues(owner, repo);
    res.status(200).json({ status: 'success', data: issues });
  } catch (error) {
    next(error);
  }
};

exports.createIssue = async (req, res, next) => {
  try {
    const { owner, repo } = req.params;
    const { title, body } = req.body;
    
    if (!owner || !repo) {
      return res.status(400).json({ status: 'error', message: 'Owner and repo are required' });
    }

    if (!title) {
      return res.status(400).json({ status: 'error', message: 'Issue title is required' });
    }

    const issue = await githubService.createIssue(owner, repo, title, body);
    res.status(201).json({ status: 'success', data: issue });
  } catch (error) {
    next(error);
  }
};
