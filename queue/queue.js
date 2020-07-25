//封装队列类
function Queue() {
    //队列的属性
    this.items = [];
    //队列的方法
    // 1.将元素添加到队列中
    Queue.prototype.enqueue = function (element) {
        this.items.push(element);
    }
    // 2.移除并返回队列的第一项
    Queue.prototype.dequeue = function () {
        return this.items.shift();
    }
    // 3.查看队列前端的元素

    Queue.prototype.front = function () {
        return this.items[0];
    }
    // 4.查看队列是否为空
    Queue.prototype.isEmpty = function () {
        return this.items.length == 0;
    }
    // 5.查看队列中的元素个数
    Queue.prototype.size = function () {
        return this.items.length;
    }
    // 6.toString方法
    Queue.prototype.toString = function () {
        var rs = "";
        for (var i = 0; i < this.items.length; i++) {
            rs += this.items[i] + '';
        }
        return rs;
    }
}
//使用队列
// var queue = new Queue();
// queue.enqueue('aaa');
// queue.enqueue('bbb');
// queue.enqueue('ccc');
// queue.enqueue('ddd');
// queue.dequeue();
// console.log(queue.toString());
//约瑟夫环 
function passGame(nameList, num) {
    var queue = new Queue()
    for (let i = 0; i < nameList.length; i++) {
        queue.enqueue(nameList[i])
    }
    while (queue.size() > 1) {
        for (let i = 0; i < num - 1; i++) {
            queue.enqueue(queue.dequeue())
        }
        queue.dequeue()
        console.log(queue)
    }
    console.log(queue)
    var endName = queue.front()
    return nameList.indexOf(endName);
}
names=['aaa','bbb','ccc','ddd','eee'];
console.log(passGame(names,3))
