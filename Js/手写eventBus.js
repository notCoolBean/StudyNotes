/*
 * @Author: Bean
 * @LastEditors: Bean
 * @Date: 2020-07-02 10:52:11
 * @LastEditTime: 2020-07-02 11:28:05
 * @Description: 手写实现EventBus
 * @FilePath: /StudyNotes/Js/手写eventBus.js
 */ 
class EventBus {
  constructor() {
    this.subs = {};
    this.onceSub = {};
  }
}

EventBus.prototype.$on = function (type, cb) {
  if (!(type in this.subs)) {
    this.subs[type] = []
  }
  this.subs[type].push(cb);
}

EventBus.prototype.$once = function (type, fn) {
  if (!(type in this.onceSub)) {
    this.onceSub[type] = []
  }
  this.onceSub[type].push(fn);
}

EventBus.prototype.$emit = function (type) {
  if (!(type in this.subs) && !(type in this.onceSub)) {
    console.log('emit没有注册此事件');
    return;
  }

  if (type in this.onceSub) {
    this.onceSub[type].forEach(cb => {
      cb.apply();
    });
    delete this.onceSub[type];
    return;
  }

  this.subs[type].forEach(cb => {
    cb.apply();
  });
}

EventBus.prototype.$off = function (type, fn) {
  if (!(type in this.subs) && !(type in this.onceSub)) {
    console.log('off没有注册此事件');
    return;
  }

  if (type in this.onceSub) {
    if (fn) {
      let idx = this.onceSub[type].findIndex(cb => cb === fn);
      this.onceSub[type].splice(idx, 1);
      if (this.onceSub[type].length === 0) {
        delete this.onceSub[type];
      }
      console.log(this.onceSub[type])
      return;
    }
    delete this.onceSub[type];
    return;
  }

  if (fn) {
    let idx = this.subs[type].findIndex(cb => cb === fn);
    this.subs[type].splice(idx, 1);
    if (this.subs[type].length === 0) {
      delete this.subs[type];
    }
    return;
  }
  delete this.subs[type];
}

let a = new EventBus();

function aaa() {
  console.log(11111);
}

function bbb() {
  console.log(22222);
}

a.$once('aaa', aaa);
a.$once('aaa', bbb);

a.$emit('aaa', bbb);
console.log(33333);
a.$off('aaa', aaa);
a.$emit('aaa');


