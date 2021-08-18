const { works } = require('./data');
const Work = require('../db/models/work');

class FakeDB {

  async clean() {
    await Work.deleteMany({});
  }

  async addData() {
    await Work.create(works);
  }

  async populate() {
    await this.clean();
    await this.addData();
  }
}

module.exports = new FakeDB();