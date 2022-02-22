import {def} from './utils'
import defineReactive from "./defineReactive";
import {arrayMethods} from "./arrary";
import {observe} from "./observe";

export default class Observer {
  constructor(value) {
    console.log('构造器触发');
    def(value, '__ob__', this, false);
    console.log(value);
    if (Array.isArray(value)) {
      // 如果是数组，要非常强行的蛮干；将这个数组的原型，指向arrayMethods
      Object.setPrototypeOf(value, arrayMethods);
      // 让这个数组变的observe, 即数组中的项变成响应式的
      this.observeArray(value)
    } else {
      this.walk(value);
    }
  }
  // 遍历
  walk(value) {
    for (let k in value) {
      defineReactive(value, k);
    }
  }
  // 数组的特殊遍历
  observeArray(arr) {
    for (let i = 0; i < arr.length; i++) {
      observe(arr[i])
    }
  }
}
