import { sureThing } from "./utils";
import $ from "jquery";

export const waitForElement = function(values) {
  var maxTimeWaiting = values.maxTimeWaiting || false;
  var elementToWaitFor = values.element || false;
  var isTestingMode = values.testingTimeout || false;
  var handleOk = values.handleOk || false;
  var handleError = values.handleError || false;
  var handleAlways = values.handleAlways || false;
  var promiseFulfilled;
  var promiseRejected;

  if (elementToWaitFor === false) {
    console.log("Exit.\nNo Element to wait for");
    return;
  }

  var waitPromise = new Promise((resolve, reject) => {
    //función que devuelve otra f(x) pendiente del parámetro para aceptar o rechazar la promesa.
    var ejecutaPromesa = aceptar_o_rechazar => actions =>
      aceptar_o_rechazar(actions);
    promiseFulfilled = ejecutaPromesa(resolve);
    promiseRejected = ejecutaPromesa(reject);
  });

  (function lookingForElement() {
    !$(elementToWaitFor).length
      ? window.requestAnimationFrame(lookingForElement)
      : promiseFulfilled("Promise fulfilled");
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
    argumentos.ok
      ? Array.isArray(handleOk)
        ? handleOk.forEach(e => e(argumentos))
        : handleOk(argumentos)
      : Array.isArray(handleError)
      ? handleError.forEach(e => e(argumentos))
      : handleError(argumentos);
  };

  sureThing(waitPromise)
    .then(argumentos => {
      handleResult(argumentos);
      return argumentos;
    })
    .then(() => handleAlways && handleAlways());

  return handleOk ? true : sureThing(waitPromise);
};
