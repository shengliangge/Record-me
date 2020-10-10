// 封装栈
function Stack() {
    // 栈的属性
    this.item = [];
    //栈的操作
    // 1.将元素压入栈
    Stack.prototype.push = function (element) {
        this.item.push(element)
    }
    // 2.从栈中取出元素
    Stack.prototype.pop = function () {
        if (this.isEmpty()) { // 先判断栈是否为空
            console.log('栈为空');
            return null;
        }
        return this.item.pop();
    }
    // 3.查看栈顶元素
    Stack.prototype.peek = function () {
        if (this.isEmpty()) { // 先判断栈是否为空
            console.log('栈为空');
            return null;
        }
        return this.item[this.item.length - 1]
    }
    // 4.判断栈是否为空
    Stack.prototype.isEmpty = function () {
        if (this.item.length <= 0) {
            return true;
        }
        return false;
    }
    // 5. 获取栈中元素的个数
    Stack.prototype.size = function () {
        return this.item.length;
    }

    // 6.toString方法
    Stack.prototype.toString = function () {
        var resultString = '';
        for (var i of this.item) {
            resultString += i;
        }
        return resultString;
    }
}
//栈的使用

// var s = new Stack();
// s.push(2);
// s.push(4);
// s.push(6);
// console.log(s.size()); //输出3
// console.log(s.toString()); //输出246
// s.pop();
// console.log(s.peek()); //输出4
// console.log(s.toString()); //输出24

//函数：将十进制正整数转换成二进制
function dec2bin(num) {
    //定义栈对象
    var s = new Stack();
    while (num > 0) { //当num大于0时，则还可以继续做运算
        s.push(num % 2); //将num除2的余数存入栈中
        num = Math.floor(num / 2); //注意，这里除2要向下取整
    }
    console.log(s.toString());
    //从栈中取出0、1
    var binaryString = '';
    while (!s.isEmpty()) {
        binaryString += s.pop();
    }
    return binaryString;
}
var binary = dec2bin(28);
console.log(binary); //输出11100