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

#### Generating your ENCODED_TOKEN:
- Generate an API token for Jira using your Atlassian Account: https://id.atlassian.com/manage/api-tokens.
- Build a string of the form email:api_token.
- BASE64 encode the string.

Change **host** and **token** at `GO-JIRA/Backend/settings/config.json`
```
{
	"jira" : {
		"host" : "your-atlassian.jira.com",
		"token" : "ENCODED_TOKEN"
	}
}
```

####
- projectkey (Your Atlassian project Key)
- server (GOJIRA Backend URL)
- storypointsfield (the storypoint field is different between installations, we have to specify customfield_ID)

#### Find customfield_ID
Select Issues>  Fields > Custom Fields to open the Custom Fields page, hover Configure and the following status will appear at bottom left corner:
`http://id.atlassian.com/secure/**/TranslateCustomfield!default.jspa?id=10013`
on this example, storypointsfield will be customfield_10013

Change **projectkey**, **server** and **storypointsfield** at `GO-JIRA/Frontend/src/config.json`
```
{
	"jira" : {
		"projectkey" : "TES",
		"server" : "http://localhost:8000",
		"storypointsfield" : "customfield_10002"
	}
}
```

