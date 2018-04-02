import {Mongo} from "meteor/mongo";

/* Seria bueno utilizar methods y publish para mejorar la seguridad */
export const Ball = new Mongo.Collection("Ball");
