import {observe} from "./observe";
import Dep from "./Dep";

export default function defineReactive(data, key, val) {
  const dep = new Dep();
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
      // console.log('获取了' + key + '属性');
      // 收集依赖
      // 如果现在处于依赖收集阶段
      console.log(Dep.target, '========Dep.target.define==========');
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
        }
      }
      return val
    },
    set(newValue) {
      // 通知依赖
      // console.log('设置了' + key + '属性');
      if (val === newValue) return;
      val = newValue;
      childOb = observe(newValue);
      dep.notify();
    }
  });
}
// defineReactive(obj, 'a', 10);
// defineReactive(obj, 'b', 20);
// console.log(obj.a + obj.b);
