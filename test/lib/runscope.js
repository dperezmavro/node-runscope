const expect = require('expect');

const {Runscope} = require('../../index.js');

describe('Runscope', () => {
  it('Should exist', () => {
    expect(Runscope).toExist();
    expect(Runscope).toNotEqual({});
  })
});
