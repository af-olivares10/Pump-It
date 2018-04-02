import {Mongo} from "meteor/mongo";

/* Seria bueno utilizar methods y publish para mejorar la seguridad */
export const User = new Mongo.Collection("users");
