let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('./app');

chai.should();
chai.use(chaiHttp);

describe('Planets API Suite', () => {
  describe('Fetching Planet Details', () => {
    [1,2,3,4,5,6,7,8].forEach(id => {
      it(`it should fetch the planet with id ${id}`, (done) => {
        chai.request(server)
          .post('/planet')
          .send({ id })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('id').eql(id);
            done();
          });
      });
    });
  });
});

describe('Testing Other Endpoints', () => {
  it('should fetch OS details', done => {
    chai.request(server)
      .get('/os')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('should check Liveness endpoint', done => {
    chai.request(server)
      .get('/live')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('status').eql('live');
        done();
      });
  });

  it('should check Readiness endpoint', done => {
    chai.request(server)
      .get('/ready')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('status').eql('ready');
        done();
      });
  });
});
