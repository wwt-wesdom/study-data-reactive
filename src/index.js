import {observe} from "./observe";
import Watcher from "./Watcher";
import defineReactive from "./defineReactive";

let obj = {
  a: {
    m: {
      n: 5
    }
  },
  b: 10,
  c: [1, 2, 3, 4]
};

observe(obj);
// obj.c.splice(2, 1, {name: 'array'});

// obj.c[2].name = 'lllll';
// 此种方式没有调用数组方法，可以改变数组，但是不会触发响应式
// obj.c[2] = {like: 'ml'};


new Watcher(obj, 'a.m.n', (val, oldVal) => {
  console.log('😃😃😃😃🎉🎉🎉❤❤', val);
  console.log('😃😃😃😃🎉🎉🎉❤❤-oldVal', oldVal);
});
// document.write(`${obj.a.m.n}`);
// obj.a.m.n = 30;
// obj.c = [{name: 1}];
//

// console.log(obj.a.m.n);

console.log(obj);
document.getElementById('setData').addEventListener('click', function () {
  obj.a.m.n = 30;
  console.log(obj);
})

defineReactive(obj, 'id', {name: 1})
