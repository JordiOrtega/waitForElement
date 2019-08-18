import "./styles.css";
import $ from "jquery";

document.getElementById("app").innerHTML = `
<h1>Wait For Element to be inserted on the DOM</h1>
<div>
Using requestAnimationFrame 
</div>
`;

var FAKE_INSERT_ELEMENT_TIMEOUT;
var waitForElement = function(values) {
  var maxTimeWaiting = values.maxTimeWaiting ? values.maxTimeWaiting : false;
  var elementToWaitFor = values.element;
  var promiseFullfilled;
  var promiseRejected;

  var waitPromise = new Promise((resolve, reject) => {
    //función que devuelve otra f(x) pendiente del parámetro para aceptar o rechazar la promesa.
    var ejecutaPromesa = aceptar_o_rechazar => actions =>
      aceptar_o_rechazar(actions);
    promiseFullfilled = ejecutaPromesa(resolve);
    promiseRejected = ejecutaPromesa(reject);
  });

  (function lookingForElement() {
    // console.log(elementToWaitFor);
    !$(elementToWaitFor).length
      ? window.requestAnimationFrame(lookingForElement)
      : promiseFullfilled("done");
  })();

  var rejectPromise = () => {
    var reject = () => {
      clearTimeout(FAKE_INSERT_ELEMENT_TIMEOUT);
      promiseRejected(
        "We wait " +
          maxTimeWaiting / 1000 +
          " seconds and no data was retrieved"
      );
    };
    setTimeout(reject, maxTimeWaiting);
  };

  maxTimeWaiting && rejectPromise();

  waitPromise
    .then(argumentos => {
      console.log(argumentos);
      return argumentos;
    })
    .catch(argumentos => {
      console.log(argumentos);
      return argumentos;
    })
    .then(argumentos => console.log("pepito flores " + argumentos));
};

waitForElement({
  element: "#eso",
  maxTimeWaiting: 2600
});

FAKE_INSERT_ELEMENT_TIMEOUT = setTimeout(function() {
  $("#app").append("<div id='eso'>Hola</div>");
}, 3000);

// JQUERY WAY
/*
(function aabbcc() {
    if (!$("#eso").size()) {
        window.requestAnimationFrame(aabbcc);
    } else {
        jQueryPromise.resolve("done");//4
    }
})();

var jQueryPromise = jQuery.Deferred(); // 1,2
jQueryPromise //3
    .then((arguments) => console.log(arguments))
    // .fail((arguments) => arguments.forEach(e => e()));

$(document.body).append("<div id='eso'></div>");
*/
