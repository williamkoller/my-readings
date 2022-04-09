[![Codacy Badge](https://app.codacy.com/project/badge/Grade/aab1812bcc984ff9aebc4fd9d0160669)](https://www.codacy.com/gh/williamkoller/my-readings/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=williamkoller/my-readings&amp;utm_campaign=Badge_Grade)
[![CodeQL](https://github.com/williamkoller/my-readings/workflows/CodeQL/badge.svg)](https://github.com/williamkoller/my-readings/actions?query=workflow%3ACodeQL)
![GitHub top language](https://img.shields.io/github/languages/top/williamkoller/my-readings)
![GitHub package.json version (subfolder of monorepo)](https://img.shields.io/github/package-json/v/williamkoller/my-readings)
![GitHub issues](https://img.shields.io/github/issues/williamkoller/my-readings)
![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/williamkoller/my-readings)

<img src="./img/books.png" height="220" width="290" align="right"/>

## My Readings

step by step for configuration with docker

**OBS**: *required docker and docker-compose*

- `cp -r .env.sample .env`

- `docker-compose up`

#### example what the body has to be to add a new book
- method: `POST`
- statusCode: `201`
- endpoint: `http://localhost:3001/api/books`

body
```
{
  "name": "De zero a Um",
  "description": "O que aprender sobre empreendedorismo com o vale do silicio",
  "author": "Peter Thiel e Blake Masters",
  "status": "pending",
  "url": "https://url-fake/img.png"
}
```
response
```
{
  "id": "624e2085a25ae260f044098a",
  "name": "De zero a Um",
  "description": "O que aprender sobre empreendedorismo com o vale do silicio",
  "author": "Peter Thiel e Blake Masters",
  "status": "pending",
  "url": "https://url-fake/img.png",
  "createdAt": "2022-04-06T23:21:41.216Z",
  "updatedAt": "2022-04-06T23:21:41.216Z"
}
```

#### example of how the response of already registered books has to be
- method: `GET`
- statusCode: `200`
- endpoint: `http://localhost:3001/api/books`

response
```
[
  {
    "id": "624e2085a25ae260f044098a",
    "name": "De zero a Um",
    "description": "O que aprender sobre empreendedorismo com o vale do silicio",
    "author": "Peter Thiel e Blake Masters",
    "status": "pending",
    "url": "https://url-fake/img.png",
    "createdAt": "2022-04-06T23:21:41.216Z",
    "updatedAt": "2022-04-06T23:21:41.216Z"
  }
]
```

#### example of how the answer of the books has to be, looking for the _id
- method: `GET`
- statusCode: `200`
- endpoint: `http://localhost:3001/api/books/:_id`

response
```
{
  "id": "624e2085a25ae260f044098a",
  "name": "De zero a Um",
  "description": "O que aprender sobre empreendedorismo com o vale do silicio",
  "author": "Peter Thiel e Blake Masters",
  "status": "pending",
  "url": "https://url-fake/img.png",
  "createdAt": "2022-04-06T23:21:41.216Z",
  "updatedAt": "2022-04-06T23:21:41.216Z"
}
```

#### example of what the response has to be when updating a book by _id
- method: `PUT`
- statusCode: `200`
- endpoint: `http://localhost:3001/api/books/:_id`

body
```
{
  "url": "https://url-fake.com/img.png"
}
```
response
```
{
  "_id": "624e2085a25ae260f044098a",
  "name": "De zero a Um",
  "description": "O que aprender sobre empreendedorismo com o vale do silicio",
  "author": "Peter Thiel e Blake Masters",
  "status": "pending",
  "url": "https://url-fake.com/img.png",
  "createdAt": "2022-04-06T23:21:41.216Z",
  "updatedAt": "2022-04-06T23:21:41.216Z",
  "__v": 0
}
```

#### example of what the response should be when deleting a book
- method: `DELETE`
- statusCode: `200`
- endpoint: `http://localhost:3001/api/books/:_id`

response
```
{
  "message": "Book deleted with successfully"
}
```

Next step:
- [x] add nginx for proxy reverse
- [x] add authentication with JWT
- [x] add routes authenticated
- [x] add makefile for automatization commands
- [ ] add AWS S3 for Upload files
- [ ] add Redis for cache some endpoints
- [ ] add logs module
- [ ] add GraphQL
- [ ] add file procfile for deploy heroku

Made with 🖤 by [williamkoller](https://github.com/williamkoller) :wave: