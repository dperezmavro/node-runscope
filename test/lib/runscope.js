const expect = require('expect');

const {Runscope} = require('../../index.js');

describe('Runscope', () => {
  it('Should exist', () => {
    expect(Runscope).toExist();
    expect(Runscope).toNotEqual({});
  })

  it('Should instantiate', () => {
    let a

    a = new Runscope()
    expect(a).toExist()
  })
});
