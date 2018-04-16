import {Meteor} from "meteor/meteor";
import { assert } from 'meteor/practicalmeteor:chai';
import {shallow} from "enzyme";
import React from "react";
import Enter from "./Enter";

if(!Meteor.isServer){
describe("Button", () => {
    it("should render", () => {
      const enter = shallow(<Enter/>);

      assert.equal(enter.find("button").length,0);
    });
  });
}
