import "./styles.css";
import { waitForElement } from "./waitForElement";
import $ from "jquery";

var FAKE_INSERT_ELEMENT_TIMEOUT = setTimeout(function() {
  $("#app").append("<div id='eso'>Hola</div>");
}, 3000);

const handlers = (function() {
  var myH = {};
  myH.handleOk = argumentos => console.log(argumentos.data);
  myH.handleOk2 = argumentos => console.log("Another message");
  myH.handleError = argumentos => console.log(argumentos.error);

  return myH;
})();

waitForElement({
  element: "#eso",
  testingTimeout: FAKE_INSERT_ELEMENT_TIMEOUT,
  maxTimeWaiting: 3600,
  handleOk: [handlers.handleOk, handlers.handleOk2],
  handleError: handlers.handleError
});

//IF WE DON'T SEND ANY HANDLE FOR THE PROMISE TO BE EXECUTE ON RESOLVE

// waitForElement({
//     element: "#eso",
//     testingTimeout: FAKE_INSERT_ELEMENT_TIMEOUT,
//     maxTimeWaiting: 2600 }
// )
// .then(argumentos => {
//     argumentos.ok ? handleOk(argumentos) : handleError(argumentos);
//     return argumentos;
//   }
// )
// .then( () =>
//   console.log("Execute always personal")
// );
