import {observe} from "./observe";
import Watcher from "./Watcher";

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


new Watcher(obj, 'a.m.n', (val) => {
  console.log('😃😃😃😃🎉🎉🎉❤❤', val);
});

obj.a.m.n = 30;

console.log(obj);




