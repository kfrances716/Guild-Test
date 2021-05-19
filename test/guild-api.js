const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;

chai.use(chaiHttp);
chai.should();

describe('Guild Test API', () => {
    describe('Create message', () => {
        it('should create message for receiver', async () => {
            const response = await chai.request('http://localhost:3000')
                .put('/api/messages/testreceiver/testsender')
                .send({ message: 'This is my messsage' });

            expect(response).to.have.status(200);
            expect(response.body.result).to.include('Message Sent!');
        });

        it('should throw when receiver is not a parameter', async () => {
            const response = await chai.request('http://localhost:3000')
                .put('/api/messages/testreceiver/testsender');

            expect(response.status).to.equal(500);
            expect(response.body.message).to.include('No message received');
        });
    });

    describe.skip('Retrieve All Messages', () => {
        it("should retrieve no more than 100 messages from every sender in the last 30 days",
            async () => {
                const response = await chai.request('http://localhost:3000')
                    .get('/messages/testreceiver/testsender');

                expect(response).to.have.status(200);
            });

        it('should throw error when deleteUser has an error', async () => {
            const response = await chai.request('http://localhost:3000')
                .get('/messages/testreceiver/testsender');

            expect(response).to.have.status(400);
        });
    });

    describe.skip('Retrieve Messages from Specific User', () => {
        it("should retrieve no more than 100 messages from the last 30 days", async () => {
            const response = await chai.request('http://localhost:3000')
                .get('/messages/testreceiver');

            expect(response).to.have.status(200);
        });

        it('should throw error when deleteUser has an error', async () => {
            const response = await chai.request('http://localhost:3000')
                .get('/messages/testreceiver');

            expect(response).to.have.status(400);
        });
    });
});
