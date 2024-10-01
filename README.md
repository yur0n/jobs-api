## Description

Nestjs job managment REST API.

## Setup

The Nestjs server is reverse proxied through Nginx server at ```api.localhost``` (port 80) by default.

You can edit nginx.conf and compose.yml if needed.

## Build and run the app

```bash
$ docker compose up --build -d
```

## Non-standard API endpoints

### Employers

**URL:** ```/employers/:id/workers```

**Method:** GET

**Description:** obtaining a list of all workers of the employer

**Response:** 

```
[
	{
		"_id": "66fac3be62385a555d46f004",
		"name": "Jane Doe",
		"salary": 2500,
		"history": [
			{
				"_id": "66fad4d796cdb48b2f831c9b",
				"event": "hired",
				"job": 66fac743549062f640df7f49,
				"date": "2024-09-30T16:41:59.925Z"
			},
		],
		"owner": "66fac731549062f640df7f47",
		"job": "66fac743549062f640df7f49",
		"__v": 0
	}
]
```

### Jobs

**URL:** ```/jobs/date-period```

**Method:** GET

**Description:** receiving all jobs for a certain period of time

**Query:** 

```
start: 2024-08-30T15:44:03.108Z 
end: 2024-10-30T15:44:03.109Z
```

**Response:**

```
[
    {
        "_id": "66fac743549062f640df7f49",
        "name": "Developer",
        "status": "draft",
        "salary": 2500,
        "workers": ['66fac3be62385a555d46f004'],
        "owner": "66fac731549062f640df7f47",
        "creationDate": "2024-09-30T15:44:03.108Z",
        "__v": 0
    }
]
```

### Jobs

**URL:** ```/jobs/:id/archive```

**Method:** PUT

**Description:** archiving job

**Response:**

```
{
	"_id": "66fac743549062f640df7f49",
	"name": "Developer",
	"status": "archive",
	"salary": 2500,
	"workers": ['66fac3be62385a555d46f004'],
	"owner": "66fac731549062f640df7f47",
	"creationDate": "2024-09-30T15:44:03.108Z",
	"__v": 0
}
```

### Workers

**URL:** ```/workers/:id/matched-jobs```

**Method:** GET

**Description:** displaying a list of active jobs with the salary level not lower than the expected level of the worker

**Response:**

```
[
	{
		"_id": "66fac743549062f640df7f49",
		"name": "Developer",
		"status": "active",
		"salary": 2500,
		"workers": ['66fac3be62385a555d46f004'],
		"owner": "66fac731549062f640df7f47",
		"creationDate": "2024-09-30T15:44:03.108Z",
		"__v": 0
	}
]
```

### Workers

**URL:** ```/workers/:id/new-employer```

**Method:** PUT

**Description:** worker is hired by new employer or fired

**Query:**

```
employer: 66fac731549062f640df7f47
event: hired
```

**Response:**

```
{
	"_id": "66fac3be62385a555d46f004",
	"name": "Jane Doe",
	"salary": 2500,
	"history": [
		{
			"_id": "66fad4d796cdb48b2f831c9b",
			"event": "hired",
			"job": 66fac743549062f640df7f49,
			"date": "2024-09-30T16:41:59.925Z"
		},
	],
	"owner": "66fac731549062f640df7f47",
	"job": "66fac743549062f640df7f49",
	"__v": 0
}
```
