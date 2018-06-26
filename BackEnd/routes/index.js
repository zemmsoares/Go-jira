var express = require('express');
var router = express.Router();
var Api = require('../wrappers/Jira/Api');

const fetch = require('node-fetch');

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.get('/', function(req,res,next){
    res.render('index', {title: 'Página Inicial'});
});

router.get('/issues', function(req,res,next){
// http://localhost:3000/issues/GO-1800
	res.render('issues', {title: 'Issues'});
});

router.get('/sprints', function(req,res,next){
// http://localhost:3000/sprints/1
	res.render('sprints', {title: 'Sprints'});
});

router.get('/test', function(req,res,next){
    res.render('test', {title: 'Teste1'});
});

// GET ISSUE BY ID
router.get('/issue/:issueId', function(req, res, next) {

    const issueId = req.params.issueId;

    const api = new Api();
    const endpoint = api.getissueEndpoint(issueId);
    console.log(endpoint)
    fetch(endpoint.path, {
            method: endpoint.method,
            headers: api.headers
        })
        .then(resFetch => resFetch.json())
        .then(json => res.send(json));
});

// GET USER BY ID

router.get('/user/:userId', function(req, res, next) {

    const userId = req.params.userId;

    const api = new Api();
    const endpoint = api.getuserEndpoint(userId);

    fetch(endpoint.path, {
            method: endpoint.method,
            headers: api.headers
        })
        .then(resFetch => resFetch.json())
        .then(json => res.send(json));
});


// GET PROJECT BY ID

router.get('/project/:projectId', function(req, res, next) {

    const projectId = req.params.projectId;

    const api = new Api();
    const endpoint = api.getprojectEndpoint(projectId);

    fetch(endpoint.path, {
            method: endpoint.method,
            headers: api.headers
        })
        .then(resFetch => resFetch.json())
        .then(json => res.send(json));
});

// GET RAPIDVIEW ID´S (BOARDS)
 
router.get('/rapidview', function(req, res, next) {

	const api = new Api();
	const endpoint = api.getrapidviewEndpoint();

    fetch(endpoint.path, {
            method: endpoint.method,
            headers: api.headers
        })
        .then(resFetch => resFetch.json())
        .then(json => res.send(json));
});


// GET SPRINTS BY RAPIDVIEWID

router.get('/sprints/:rapidviewId', function(req, res, next) {

	const rapidviewId = req.params.rapidviewId;

	const api = new Api();
	const endpoint = api.getsprintsEndpoint(rapidviewId);

    fetch(endpoint.path, {
            method: endpoint.method,
            headers: api.headers
        })
        .then(resFetch => resFetch.json())
        .then(json => res.send(json));
});

// GET SPRINTS ISSUES BY RAPIDVIEW ID & SPRINT ID

router.get('/sprints/:rapidviewId/:sprintId', function(req, res, next) {

	const rapidviewId = req.params.rapidviewId;
	const sprintId = req.params.sprintId;

	const api = new Api();
	const endpoint = api.getissuessprintEndpoint(rapidviewId,sprintId);

    fetch(endpoint.path, {
            method: endpoint.method,
            headers: api.headers
        })
        .then(resFetch => resFetch.json())
        .then(json => res.send(json));
});

router.get('/users/:projectId', function(req, res, next) {

    const projectId = req.params.projectId;

    const api = new Api();
    const endpoint = api.getAllUsersEndpoint(projectId);

    fetch(endpoint.path, {
            method: endpoint.method,
            headers: api.headers
        })
        .then(resFetch => resFetch.json())
        .then(json => res.send(json));
});

router.get('/issues/assigned/:userId', function(req, res, next) {

    const userId = req.params.userId;

    const api = new Api();
    const endpoint = api. getIssuesAssignedUserEndpoint(userId);

    fetch(endpoint.path, {
            method: endpoint.method,
            headers: api.headers
        })
        .then(resFetch => resFetch.json())
        .then(json => res.send(json));
});

router.get('/projects', function(req, res, next) {

    const api = new Api();
    const endpoint = api.  getAllProjectsEndpoint();

    fetch(endpoint.path, {
            method: endpoint.method,
            headers: api.headers
        })
        .then(resFetch => resFetch.json())
        .then(json => res.send(json));
});

router.get('/issue/:issueId/changelog', function(req, res, next) {

    const issueId = req.params.issueId;

    const api = new Api();
    const endpoint = api.  getIssueChangeLogEndpoint(issueId)

    fetch(endpoint.path, {
            method: endpoint.method,
            headers: api.headers
        })
        .then(resFetch => resFetch.json())
        .then(json => res.send(json));
});

module.exports = router;