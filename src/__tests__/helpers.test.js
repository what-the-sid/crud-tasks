const path = require('path');
const basename = path.basename(__filename);

const { importModule } = require('../helpers')

describe('Testing helper functions:::', () => {
  it('SUCCESS:Fetching files from test folder', async () => {
    const modules = importModule(path.join(__dirname,'./fixtures/files'),'.txt',basename)
    expect(modules).toStrictEqual(["1.txt", "2.txt", "3.txt"]);
  })
});
