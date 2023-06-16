# Simulation Mock

This is a TypeScript REST API project that serves as a basic implementation of the real ADT-Simulation-Mock from the product ScenarioPlatform® of BTC Embedded Systems company.
It provides actions such as creating test cases, test suites, starting runs, retreving results of a run and more.

## Prerequisites

Before you can compile and run this project, ensure that you have the following prerequisites installed on your system:

- Node.js (version 16.5.1)
- Yarn (package manager)

## Installation

To install the necessary dependencies, follow these steps:

1. Clone this repository to your local machine.

```bash
git clone https://github.com/AndreeaTrailescu/Simulation-Mock.git
```

2. Navigate to the project's root directory.
3. Open a terminal and run the following command to install the dependencies:

```bash
yarn install
```

## Compilation

To compile the TypeScript code into JavaScript, use the following command:

```bash
yarn build
```

## Launching the project

To start the API server, execute the following command:

```bash
yarn start
```

The server will be running on http://localhost:3000 by default. You can access the API endpoints using this base URL.

## Testing the API

To test the functionality of the Simulation Mock API, you can use tools like Postman. Follow the steps below to perform API testing:

1. Launch Postman (or any other API testing tool).
2. Set the HTTP method, URL, according to the desired API endpoint. For example, to create a new test suite, use the `POST /suites` endpoint. If you perform `GET /suites`, you will notice that the data store is prefilled with a test suite.
3. Use `POST /testcases` to create test cases for the suite already exists.
4. Use `POST /runs` to execute the suite.
5. Take the `runId` from response of creating a run and make `GET /runs/runId/results`. Here the results from any execution of a test case can be visualised.
6. To see the results from rule evaluation use `POST /execute`.

Note: This project makes use (exactly likr the real project) of my npm library https://www.npmjs.com/package/swagger-express-middleware-wrapper-lib.
