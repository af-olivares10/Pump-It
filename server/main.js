import { Meteor } from 'meteor/meteor';
import "../imports/api/ball"
import "../imports/api/user"
import { Inject } from "meteor/meteorhacks:inject-initial";

/*
La pagina genera una violacion en aXe por no tener definido un lenguage, se sugiere agregarlo
por ejemplo con WebApp.addHtmlAttributeHook
*/
Meteor.startup(() => {
  // code to run on server at startup
  Inject.rawModHtml("addLanguage", function(html) {
  return html.replace(/<html>/, '<!-- HTML 5 -->\n<html lang="en">');
});

});
