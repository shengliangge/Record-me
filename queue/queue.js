//封装队列类
function Queue() {
    //队列的属性
    this.items = [];
    //队列的方法
    // 1.将元素添加到队列中
    Queue.prototype.enqueue = function(element) {
            this.items.push(element);
        }
        // 2.移除并返回队列的第一项
    Queue.prototype.dequeue = function() {
            return this.items.shift();
        }
        // 3.查看队列前端的元素
    Queue.prototype.front
        // 4.查看队列是否为空
        // 5.查看队列中的元素个数
        // 6.toString方法
}
//使用队列
var queue = new Queue();