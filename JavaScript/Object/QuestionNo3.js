/**
 * 问题3： js里的作用域是什么样子的？
 * 
 * 参考答案：大多数语言里边都是块作作用域，以{}进行限额, js里边不是， js里边叫函数作用域，也就是一个变量在全函数里有效，
 *         比如一个在最后一行定义一个变量p，在第一行也可以用，只是它的值为undefined.
 * 以下为参考代码：
 */

//代码演示：
var color = 'red';
function changeColor() {
    var anotherColor = 'blue';
    function swapColor(){
        var tempColor = anotherColor;
        anotherColor = color;
        color = tempColor;
        
        // 这里可以访问 color、anotherColor 和 tempColor
        console.log(color+'--'+anotherColor+'--'+tempColor);
    }
    swapColor();
    // 这里可以访问 color和anotherColor
    console.log(color+'--'+anotherColor);
}
changeColor();
// 这里可以访问 color
console.log(color);