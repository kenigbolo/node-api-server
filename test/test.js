process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

/*
  * Test the /GET route
  */
describe('/GET currency rate', () => {
  it('it should recieve a 200 response for valid get request', done => {
    chai
      .request(server)
      .get('/latest?base=USD')
      .end((_, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

describe('/GET currency rate', () => {
  it('it should respond with a json for valid params', done => {
    chai
      .request(server)
      .get('/latest?base=USD')
      .end((_, res) => {
        res.should.be.json;
        done();
      });
  });
});

describe('/GET invalid parameters', () => {
  it('it should respond with a json file object', done => {
    chai
      .request(server)
      .get('/rttyfty67')
      .end((_, res) => {
        res.should.be.json;
        done();
      });
  });
});
