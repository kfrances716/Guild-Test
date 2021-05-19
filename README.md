# Guild Take Home Test

## How to run

- Install Docker
- Install docker-compose
- Install npm
- Run `npm install`
- Run `docker-compose up -d --build`
- API is listening on port `3000`

## How to teardown

- Enter ctrl+c to stop project
- Run `docker-compose down -v` for cleanup

## How to test

- Run `docker-compose up -d --build`
- API is listening on port `3000`
- Run `docker-compose down -v` for cleanup

## Endpoints

- PUT `http://localhost:3000/messages/:receiver/:sender`
    Accepts JSON `{"message":"Have a great day!"}`
    Successful Returned Value `{ "result": "Message Sent!"}`
    Error Message Example `{ "message": "No message received"}`

- GET `http://localhost:3000/messages/:receiver`
    Example Request `http://localhost:3000/messages/testuser`
    Successful Returned Value Example `{ "result": [{"_id": "60a51deef5b975004b9e77b3", "content": "HELLO", "author": "trial", "created_at": "2021-05-19T14:17:18.148Z"},,{ "_id": "60a51cf5f5b975004b9e77b1", "content": "HELLO","author":"tester", "created_at": "2021-05-19T14:13:09.118Z"}]}`
- GET `http://localhost:3000/messages/:receiver/:sender`
    Example Request `http://localhost:3000/messages/testuser/tester`
    Successful Returned Value Example `{ "result": [{ "_id": "60a51cf5f5b975004b9e77b1", "content": "HELLO","author":"tester", "created_at": "2021-05-19T14:13:09.118Z"}]}`

## How to move to production

- Create a production docker-compose.yml that includes restart and different port number
- Add RUN npm ci --only=production to Dockerfile
- Add a run command for production in package.json

## Trade Offs for Expediency

- Used a dockerized mongodb instead of an external database like mongodb Atlas since it required a new account
- Some of the variables are hard coded instead of using .env or config file for
- Replace generic status codes
- Create config file based on NODE_ENV
- Add application logging instead of console logging
- Testing has framework in place, but dummy data would be needed to adequately test the get messages requests
