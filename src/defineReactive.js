import {observe} from "./observe";

export default function defineReactive(data, key, val) {
  if (arguments.length === 2) {
    val = data[key];
  }
  let childOb = observe(val);
  Object.defineProperty(data, key, {
    // 可枚举
    enumerable: true,
    // 可删除
    configurable: true,
    get() {
      console.log('获取了'+ key +'属性');
      return val
    },
    set(newValue) {
      console.log('设置了'+ key +'属性');
      if (val === newValue) return;
      val = newValue;
      childOb = observe(newValue);
    }
  });
}
// defineReactive(obj, 'a', 10);
// defineReactive(obj, 'b', 20);
// console.log(obj.a + obj.b);
