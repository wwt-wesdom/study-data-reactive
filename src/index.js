import {observe} from "./observe";

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
obj.c.splice(2, 1, {name: 'array'});

obj.c[2].name = 'lllll';
// 此种方式没有调用数组方法，可以改变数组，但是不会触发响应式
obj.c[2] = {like: 'ml'};
console.log(obj);




