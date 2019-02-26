var app = require('http').createServer();
var io = require('socket.io')(app);

var PORT = 3000;

// 客户端计数
var clientCount = 0;
// 用来存储客户端socket
var socketMap = {};
app.listen(PORT);

io.on('connect',function(socket){
    clientCount += 1;
    socket.clientNum = clientCount;
    socketMap[clientCount] = socket;

    // 两个用户，此时说明该用户是第一个进入的，等待配对
    if(clientCount % 2 == 1){
        socket.emit('waiting','waiting for another person')
    }else{
        socket.emit('start');
        // 另一个用户
        socketMap[clientCount-1].emit('start');
    }
    
    socket.on('disconnect',function(){

    })
})

console.log('webSocket listening at port:'+PORT);