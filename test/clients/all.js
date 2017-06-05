const expect = require('expect');

const clients = require('../../dist/all.js');

describe('All', () => {
  it('Should exist',() => {
    expect(clients).toExist();
    expect(
      clients
    ).toNotEqual({})
  });
});
