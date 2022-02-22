import Observer from "./Observer";

export const observe = function (value) {
  // console.log(value, 'observe');
  if (typeof value != 'object') return;
  let ob;
  if (typeof value.__ob__ !== 'undefined') {
    ob = value.__ob__;
  } else {
    ob = new Observer(value)
  }
  return ob;
};
