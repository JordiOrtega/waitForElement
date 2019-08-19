import { sureThing } from "./utils";
import $ from "jquery";

export const waitForElement = function(values) {
  var maxTimeWaiting = values.maxTimeWaiting || false;
  var elementToWaitFor = values.element || false;
  var isTestingMode = values.testingTimeout || false;
  var handleOk = values.handleOk || false;
  var handleError = values.handleError || false;
  var promiseFullfilled;
  var promiseRejected;

  if (elementToWaitFor === false) {
    console.log("Exit.\nNo Element to wait for");
    return;
  }

  var waitPromise = new Promise((resolve, reject) => {
    //función que devuelve otra f(x) pendiente del parámetro para aceptar o rechazar la promesa.
    var ejecutaPromesa = aceptar_o_rechazar => actions =>
      aceptar_o_rechazar(actions);
    promiseFullfilled = ejecutaPromesa(resolve);
    promiseRejected = ejecutaPromesa(reject);
  });

  (function lookingForElement() {
    !$(elementToWaitFor).length
      ? window.requestAnimationFrame(lookingForElement)
      : promiseFullfilled("done");
  })();

  var rejectPromise = () => {
    var reject = () => {
      isTestingMode && clearTimeout(isTestingMode);
      promiseRejected(
        `We wait ${maxTimeWaiting / 1000} seconds and no data was retrieved`
      );
    };
    setTimeout(reject, maxTimeWaiting);
  };

  maxTimeWaiting && rejectPromise();
  var handleResult = argumentos => {
    if (Array.isArray(handleOk)) {
      argumentos.ok
        ? handleOk.forEach(e => e(argumentos))
        : handleError(argumentos);
    } else {
      argumentos.ok ? handleOk(argumentos) : handleError(argumentos);
    }
  };
  sureThing(waitPromise)
    .then(argumentos => {
      handleResult(argumentos);
      return argumentos;
    })
    .then(() => console.log("Execute always"));

  return handleOk ? true : sureThing(waitPromise);
};
