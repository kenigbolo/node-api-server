process.env.NODE_ENV = 'test';

const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../app')
const server = app.server;
const should = chai.should();

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

/*
  * Test the /GET utility class
  */
describe('Use utility class to make request', () => {
  const fixerUtility = new app.FixerIO('some-random-api-key');
  it('it should respond back with a json object', (done) => {
    fixerUtility.request('latest').then((res) => {
      res.should.be.json;
    });
    done();
  });

  it('it should have an error key in json due to invalid api key', (done) => {
    fixerUtility.request('latest').then((res) => {
      expect(res).to.have.key("error");
    })
    done();
  });

  it('it should have an error when endpoint is missing', (done) => {
    expect(fixerUtility.request).to.throw(Error, 'Request endpoint missing');
    done();
  });
});
