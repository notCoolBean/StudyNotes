/*
 * @Author: Bean
 * @LastEditors: Bean
 * @Date: 2020-07-16 10:14:49
 * @LastEditTime: 2020-07-17 08:39:53
 * @Description: file content
 * @FilePath: /github/StudyNotes/Js/promise.js
 */ 

class MyPromise {
  constructor(executor) {

    this.response = '';
    this.errResponse = '';
    this.status = 'padding';

    try {
      executor(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      console.log('error', error)
    }
  }

  resolve(res) {
    if (this.status === 'padding') {
      this.response = res;
      this.status = 'fulfilled'
    }
  }

  reject(err) {
    if (this.status === 'padding') {
      this.errResponse = err;
      this.status = 'rejected'
    }
  }

  then(onFulfilled,onRejected) {
    let result;
    let res = new MyPromise((resolve, reject) => {
      resolve();
    });
    if (this.status === 'fulfilled') {
      result = onFulfilled.call(this, this.response);
    } else if (this.status === 'rejected') {
      result = onRejected.call(this, this.errResponse);
    }

    if (result && result instanceof MyPromise) {
      res = result;
    }

    return res;
  }
}

let a = new MyPromise((resolve, reject) => {
  resolve(111);
})
console.log('a', a);
let b = a.then(res => {
  return new MyPromise((resolve, reject) => {
    resolve(222);
  })
}).then(res => {
  console.log(res);
  return new MyPromise((resolve, reject) => {
    reject(222);
  })
}).then(res => {
  console.log(res);
}, err => {
  console.log('333err', err)
})
console.log('b', b);
