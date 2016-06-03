/**
 * 问题1： 常用js类定义的方法有哪些？
 * 
 * 参考答案：主要有构造函数原型和对象创建两种方法， 原型是通用老方法，对象创建是ES5推荐使用方法，目前来看，原型使用更加普遍
 * 以下为参考代码：
 */
console.log("-------------------------start---------------------------");
//代码演示1：构造函数方法定义
function PersonProt() {
    this.name = 'prototype';
}
PersonProt.prototype.sayName = function () {
    console.log(this.name);
}
var person1 = new PersonProt();
person1.sayName();

//代码演示2：对象创建
var PersonObj = {
    name: 'object',
    sayName: function () {
        console.log(this.name);
    }
}
//使用Object.create()生成实例，不需要使用new；目前各大浏览器的最新版本（包括IE9）都部署了这个方法，如果遇到老式浏览器，可以用以下代码自行部署
if(!Object.create){
    Object.create = function (o) {
        function F() {
        }
        F.prototype = o;
        return new F();
    }
}
var person2 = Object.create(PersonObj);
person2.sayName();
//代码演示3：极简主义法
//它也是用一个对象模拟“类”，在这个类里面，定义一个createNew(),用来生成实例
var Cat = {
    createNew:function () {
        var cat = {};
        cat.name = 'cat',
        cat.sayName = function () {
            console.log(this.name);
        }
        return cat;
    }
}
var cat = Cat.createNew();
cat.sayName();
console.log("-------------------------end---------------------------");

/**
 * ------------------------------扩展知识------------------------------------
 */