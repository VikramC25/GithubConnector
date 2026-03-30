const express = require('express');
const router = express.Router();
const githubController = require('../controllers/github.controller');

router.get('/users/:username/repos', githubController.getUserRepositories);

router.get('/repos/:owner/:repo/issues', githubController.getRepositoryIssues);

router.post('/repos/:owner/:repo/issues', githubController.createIssue);

module.exports = router;
