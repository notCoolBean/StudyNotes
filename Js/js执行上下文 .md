# JS执行上下文

1. 首先通过一个双层闭包来进入今天的主题；
    ```javascript
    function first () {
      var num = 0;
      function second () {
        num++;
        var message = `current num is ${num}`;
        console.log(`current num is ${num}`);
        function third () {
        console.log(message);
        }
        return third;
      }
      return second;
    }

    // 分别写出以下的执行输出：
    let f1 = first();
    let f11 = f1(); // current num is 1
    let f12 = f1(); // current num is 2
    let f13 = f1(); // current num is 3
    f11(); // current num is 1
    f12();
    f13();
    ```
这里很有可能会有人问为什么f11执行的输出是1而不是3呢？那我们接下来带着问题继续往下看：

JS的执行上下文其实说白了就是了解js引擎如何解析js代码的过程：
1. 解析生成执行栈；
2. 初始化变量、函数等生成scope作用域链；
3. 执行代码段、函数进行VO、AO的创建，确定this指向；
