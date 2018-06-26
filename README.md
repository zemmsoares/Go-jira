<img src="https://github.com/zemmsoares/GO-JIRA/blob/master/FrontEnd/src/img/logo.png" width="350"/>


## Getting Started

These instructions will get you a copy of the project up and running.

### Prerequisites

A Jira API Token must be generated. [Follow these steps to generate your token](https://developer.atlassian.com/cloud/jira/platform/jira-rest-api-basic-authentication/)


### Cloning the Repository

Clone the repository to your local machine
```
$ git clone https://github.com/zemmsoares/GO-JIRA.git
```

### Configuration

Change **host** and **token** at `GO-JIRA/Backend/settings/config.json`
```
{
	"jira" : {
		"host" : "zemmsoares.jira.com",
		"token" : "TOKEN"
	}
}
```

Change **storypointsfield** and **url** at `GO-JIRA/Frontend/src/config.json`
```
{
	"jira" : {
		"storypointsfield" : "customfield_10002"
	},
	"backend" : {
		"url" : "http://localhost:8000"
	}
}
```

