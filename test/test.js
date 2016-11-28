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
    it('it should recieve a 200 response for valid get request', (done) => {
      chai.request(server)
          .get('/latest?base=USD')
          .end((err, res) => {
              res.should.have.status(200);
              // res.should.be.json;
            done();
          });
    });
});

describe('/GET currency rate', () => {
    it('it should respond with a json', (done) => {
      chai.request(server)
          .get('/latest?base=USD')
          .end((err, res) => {
              res.should.be.json;
            done();
          });
    });
});

describe('/GET invalid parameters', () => {
    it('it should respond with a json', (done) => {
      chai.request(server)
          .get('/latest?base=USD')
          .end((err, res) => {
              res.should.be.json;
            done();
          });
    });
});

describe('/GET invalid parameters', () => {
    it('it should respond with an error not found', (done) => {
      chai.request(server)
          .get('/fuygbi5876')
          .end((err, res) => {
              var not_found = {"error":"Not found"};
              res.body.should.eql(not_found);
            done();
          });
    });
});
