// Dep 发布订阅模式
let uid = 0;
export default class Dep {
  constructor() {
    console.log('我是Dep类的构造器');
    // 用数组存储自己的订阅者 subscribes/订阅者
    // 数组中存放的是Watcher的实例
    this.id = uid ++;
    this.subs = [];
  }

  // 添加订阅
  addSub(sub) {
    this.subs.push(sub)
  }

  // 添加依赖
  depend() {
    // Dep.target就是我们自己指定的全局的位置，你用window.target也行，只要是全局唯一，没有歧义就行
    if (Dep.target) {
      this.addSub(Dep.target);
    }
  }

  // 通知Watcher更新组件
  notify() {
    const subs = this.subs.slice();
    for (let i = 0; i < subs.length; i++) {
      // subs[i] 为 Watcher 实例，所有update方法在Watcher中
      subs[i].update()
    }
  }
}
