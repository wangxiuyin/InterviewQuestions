/**
 * JavaScript 高级话题(面向对象，作用域，闭包，设计模式等)
 * 
 * 收录时间：2016-06-02
 */

/**
 * 问题1： 常用js类定义的方法有哪些？
 * 
 * 参考答案：主要有构造函数原型和对象创建两种方法， 原型是通用老方法，对象创建是ES5推荐使用方法，目前来看，原型使用更加普遍
 * 以下为参考代码：
 */
console.log("-------------------------问题1---------------------------");
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

/**
 * 问题2：js类继承的方法有哪些？
 * 
 * 参考答案：原型链法、属性复制法和构造器应用法，另外，由于每个对象可以是一个类，这些方法也可以用于对象类的继承
 * 以下为参考代码：
 */
console.log("----------------------问题2--------------------------");
//代码演示1：原型链法
function Car() {
    this.name = 'Car';
}
Car.prototype.sayName = function () {
    console.log(this.name);
}
function Sedan() {
    this.name = 'Sedan';
}
Sedan.prototype = new Car();   //继承Car
//或者
//Sedan.prototype = Car.prototype;  //继承Car
var sedan = new Sedan();
sedan.sayName();
/**
 * -------------------扩展知识-----------------------
 */
//确定原型链与构造函数的关系
//第一种方法： 用instanceof操作符
console.log('----------instanceof操作符-------------');
console.log(sedan instanceof Object);
console.log(sedan instanceof Sedan);
console.log(sedan instanceof Car);
//第二种方法: 用isPrototypeOf()方法
console.log('----------isPrototypeOf()-------------');
console.log(Object.prototype.isPrototypeOf(sedan));
console.log(Sedan.prototype.isPrototypeOf(sedan));
console.log(Car.prototype.isPrototypeOf(sedan));
console.log('---------------------------------------');
//子类型重写超类型中的某个方法，或者添加一个不存在的方法，但不管怎样，给原型添加方法的代码一定要放在替换原型的语句之后[如果在继承前添加了方法，那么继承后会覆盖添加的方法]。（JavaScript高级程序设计）

function SuperType() {
    this.property = true;
}
SuperType.prototype.getSuperValue = function () {
    return this.property;
};
function SubType() {
    this.subProperty = false;
}
SubType.prototype = new SuperType();
SubType.prototype.getSubValue = function () {
    return this.subProperty;
};
SubType.prototype.getSuperValue = function () {
    return false;
}
var instance = new SubType();
console.log(instance.getSubValue());
console.log(instance.getSuperValue());
//注意：在通过原型链继承时，不能使用对象字面量创建原型对象，这样会重写原型链
// function Super() {
//     this.name = 'super';
// }
// Super.prototype.getSuperValue = function () {
//     console.log(this.name);
// };
// function Sub() {
//     this.name = 'Sub';
// }
// Sub.prototype = new Super();
// Sub.prototype = {
//     getSubValue: function () {
//         return this.name;
//     },
//     someOtherMethod: function () {
//         return false;
//     }
// };
// var sub = new Sub();
// console.log(sub.getSuperValue());  //报错 Error
//原型链的问题
function Color() {
    this.colors = ["red", "blue", "green"];
}
function SubColor() {
}
SubColor.prototype = new Color();
var c1 = new Color();
console.log(c1.colors);  //输出["red", "blue", "green"]
var c2 = new SubColor();
console.log(c2.colors);  //输出["red", "blue", "green"]

/**
 * -------------------扩展知识-----------------------
 */
console.log('----------------------------------------');
//代码演示2：属性复制法
function Car1() {
    this.name = "Car1";
}
Car1.prototype.sayName = function () {
    console.log(this.name);
}
function Sedan1() {
}
for (var prop in Car1.prototype) {
    Sedan1.prototype[prop] = Car1.prototype[prop];
}
var sedan1 = new Sedan1();
console.log(sedan1.sayName());  //undefined

console.log('---------------------------------');
//代码演示3：构造器应用法
function Car2() {
    this.name = "Car2";
}
Car2.prototype.sayName = function () {
    console.log(this.name);
}
function Sedan2() {
    //继承属性 不继承方法 Sedan2.prototype = new Car2(); 继承方法
    Car2.call(this);    //使用apply, call, bind 方法都可以，细微区别
}
var s = new Sedan2();
console.log(s.name); //输出Car2
//console.log(s.sayName());  //报错

/**
 * 问题3： js类多重继承的实现方法是怎么样的？
 * 
 * 参考答案：就是用类继承中的属性复制来实现，因为当所有所有父类的prototype属性被复制后，子类自然就拥有类似行为的属性
 */