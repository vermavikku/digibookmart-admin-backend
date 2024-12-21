require = require("esm")(module);
const chai = require("chai");
const sinon = require('sinon');
const {role_master} = require("../../src/controllers/index");
const expect = chai.expect;

describe("Role Master",()=>{
    it("need to return array of object containing role information",()=>{
        const result = role_master.getRoleMasterInfo();
        // Use Chai assertions to check if the result is an array
    expect(result).to.be.an('array');

    // Check if each element in the array is an object
    result.forEach((obj) => {
      expect(obj).to.be.an('object');
    });
    })
})