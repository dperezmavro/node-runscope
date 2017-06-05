const expect = require('expect');
const req = require('app-root-path').require;

const index = req('index.js');

describe('Index', () => {
  it('Should exist', () => {
    expect(index).toExist();
    expect(index).toNotEqual({});
  })

  it('Should have clients', () => {
    expect(
      Object.keys(index).length
    ).toBeGreaterThan(0);
  })
});
