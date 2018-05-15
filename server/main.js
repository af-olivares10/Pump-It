import { Meteor } from 'meteor/meteor';
import "../imports/api/ball"
import "../imports/api/user"
import { Inject } from "meteor/meteorhacks:inject-initial";

// Se puede eliminar esto si no va a tener contenido.
Meteor.startup(() => {
  // code to run on server at startup
  Inject.rawModHtml("addLanguage", function(html) {
  return html.replace(/<html>/, '<!-- HTML 5 -->\n<html lang="en">');
});

});
