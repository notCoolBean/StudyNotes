/*
 * @Author: Bean
 * @LastEditors: Bean
 * @Date: 2020-07-16 10:14:49
 * @LastEditTime: 2020-07-18 16:09:31
 * @Description: file content
 * @FilePath: /StudyNotes/Js/promise.js
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

function all(iterator) {
  let count = 0;//用于计数，当等于len时就resolve
  let len = iterator.length;
  let result = new Array(len);//用于存放结果
  return new Promise((resolve,reject) => {
    for (let i = 0; i < len; i++) {
      iterator[i].then(res => {
        count++;
        result[i] = res;
        if (count === len) {
          resolve(result);
        }
      }, err => {
        reject(err);
      })
    }
  })
}

let a = new Promise((resolve, reject) => {
  resolve(111);
})

let b = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(222);
  }, 1000);
})

all([b, a]).then(res => console.log(res));

Promise.all([b, a]).then(res => console.log(res));
