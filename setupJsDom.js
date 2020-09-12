import jsdom from "jsdom";

const {JSDOM} = jsdom;
const {document} = new JSDOM(
  "<!doctype html><html><body></body></html>",
).window;
global.document = document;
global.window = document.defaultView;
global.window.innerHeight = 100;
global.window.pageYOffset = 100;

global.window.scrollTo = ({top}) => {
  global.window.scrollY = top;
};
