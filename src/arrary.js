import {def} from "./utils";

const methodsNeedChange = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];
const arrayPrototype = Array.prototype;

// o.__prototype__ =  arrayMethods; arrayMethods.__prototype__ = arrayPrototype
export const arrayMethods = Object.create(arrayPrototype);
console.log(arrayMethods);

methodsNeedChange.forEach(methodName => {
  // 备份原来的方法
  const original = arrayPrototype[methodName];
  // 定义新的方法, 数组原型上的属性是一个个的方法function,这里对这些方法做了一层封装，
  //  相当于外层调用时外层包裹了一个函数
  def(arrayMethods, methodName, function () {
    const ob = this.__ob__;
    // 有三种方法，push/unshift/splice能够 插入新项，现在要把新项也变为observe的
    let inserted = [];
    switch (methodName) {
      case 'push':
      case 'unshift':
        inserted = [...arguments];
        break;
      case 'splice':
        // splice格式是splice(下标，数量，插入的新项，插入的新项，插入的新项)
        inserted = [...arguments].slice(2);
        break
    }
    // 判断有没有要插入的新项，让新项也变为响应的
    if (inserted && inserted.length > 0) {
      ob.observeArray(inserted)
    }
    console.log('包装好的数组的方法被调用了');
    // 调用数组方法时也要调用notify通知更新
    ob.dep.notify();
    // 返回返回值，当数组的方法有返回值的时候需要返回
    return original.apply(this, arguments);
  }, false)
});

