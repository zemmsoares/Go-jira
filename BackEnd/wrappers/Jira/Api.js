const config = require('../../settings/config.json')

class Api {
    constructor() {
        this.host = config.jira.host;
        this.version = '2';
        this.protocol = 'http';
        this.apiType = 'rest/api'
        this.greenhopper = 'rest/greenhopper'
        this.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${config.jira.token}`,
        }

        this.availableMethods = {
            GET: 'GET',
            POST: 'POST'
        }
    }

    getissueEndpoint(issueId) {
        const action = 'issue';

        return {
            path: `${this.protocol}://${this.host}/${this.apiType}/${this.version}/${action}/${issueId}`,
            method: this.availableMethods.GET
        }
    }

    getuserEndpoint(userId) {
        const action = 'user?username=';

        return {
            path: `${this.protocol}://${this.host}/${this.apiType}/${this.version}/${action}${userId}`,
            method: this.availableMethods.GET

        }
    }

    getprojectEndpoint(projectId) {
        const action = 'project';

        return {
            path: `${this.protocol}://${this.host}/${this.apiType}/${this.version}/${action}/${projectId}`,
            method: this.availableMethods.GET
        }
    }

    getrapidviewEndpoint() {
        var action = 'latest/rapidviews/list';

        return {
            path: `${this.protocol}://${this.host}/${this.greenhopper}/${action}/`,
            method: this.availableMethods.GET
        }
    }

    getsprintsEndpoint(rapidviewId) {
        const action = 'latest/sprintquery';
        const action2 = '?includeHistoricSprints=true&includeFutureSprints=true';

        return {
            path: `${this.protocol}://${this.host}/${this.greenhopper}/${action}/${rapidviewId}${action2}`,
            method: this.availableMethods.GET
        }
    }

    getissuessprintEndpoint(rapidviewId, sprintId) {
        const action = 'latest/rapid/charts/sprintreport?rapidViewId=';
        const action2 = '&sprintId=';


        return {
            path: `${this.protocol}://${this.host}/${this.greenhopper}/${action}${rapidviewId}${action2}${sprintId}`,
            method: this.availableMethods.GET
        }


    }

    getAllUsersEndpoint(projectId) {
        const action = 'user/assignable/search?';
        const action2 = 'project=';


        return {
            path: `${this.protocol}://${this.host}/${this.apiType}/${this.version}/${action}${action2}${projectId}`,
            method: this.availableMethods.GET
        }


    }


        getIssuesAssignedUserEndpoint(userId) {
        const action = 'search?jql=assignee=';


        return {
            path: `${this.protocol}://${this.host}/${this.apiType}/${this.version}/${action}${userId}`,
            method: this.availableMethods.GET
        }


    }

            getAllProjectsEndpoint() {
        const action = 'project';


        return {
            path: `${this.protocol}://${this.host}/${this.apiType}/${this.version}/${action}`,
            method: this.availableMethods.GET
        }


    }

}

module.exports = Api;