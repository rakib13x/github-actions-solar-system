let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('./app');

chai.should();
chai.use(chaiHttp);

describe('Planets API Suite', () => {
  describe('Fetching Planet Details', () => {
    // Test for each planet ID from 1 to 8
    [1, 2, 3, 4, 5, 6, 7, 8].forEach(id => {
      it(`it should fetch the planet with id ${id}`, (done) => {
        chai.request(server)
          .post('/planet')
          .send({ id })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an('object');
            res.body.should.have.property('id').eql(id);
            res.body.should.have.property('name');
            done();
          });
      });
    });
  });
});

describe('Testing Other Endpoints', () => {
  describe('it should fetch OS Details', () => {
    it('it should fetch OS details', (done) => {
      chai.request(server)
        .get('/os')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe('it should fetch Live Status', () => {
    it('it checks Liveness endpoint', (done) => {
      chai.request(server)
        .get('/live')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('status').eql('liveeeeeee');
          done();
        });
    });
  });

  describe('it should fetch Ready Status', () => {
    it('it checks Readiness endpoint', (done) => {
      chai.request(server)
        .get('/ready')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('status').eql('ready');
          done();
        });
    });
  });
});