/**
 * 问题2：js类继承的方法有哪些？
 * 
 * 参考答案：原型链法、属性复制法和构造器应用法，另外，由于每个对象可以是一个类，这些方法也可以用于对象类的继承
 * 以下为参考代码：
 */
console.log("-------------------------start--------------------------");
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
console.log('---------------------------------------------');

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

console.log('----------------------------------------------');

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
console.log('-------------------------------end----------------------------------');


 /**
 * 问题3： js类多重继承的实现方法是怎么样的？
 * 
 * 参考答案：就是用类继承中的属性复制来实现，因为当所有所有父类的prototype属性被复制后，子类自然就拥有类似行为的属性
 */


/**
 * ---------------------------------------原型链 扩展知识 start-----------------------------------
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
 * ---------------------------------------原型链 扩展知识 end-----------------------------------
 */

