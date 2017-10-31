const expect = require('expect');
const sinon = require('sinon');
const uuid = require('uuid');

const {
  Result,
  Runscope
} = require('../../index.js');

describe('Result', () => {
  it('Should exist',() => {
    expect(Result).toExist();
    expect(Result).toNotEqual({});
  });
});
