var app = require('http').createServer();
var io = require('socket.io')(app);

var PORT = 3000;

// 客户端计数
var clientCount = 0;
// 用来存储客户端socket
var socketMap = {};
app.listen(PORT);

var bindListener = function(socket,event){
    socket.on(event,function(data){
        // 接收一个socket发送过来的信息data，然后发送给另一个socket
        if(socket.clientNum % 2 == 0){
            if(socketMap[socket.clientNum-1]){
                socketMap[socket.clientNum-1].emit(event,data);
            }
        }else{
            if(socketMap[socket.clientNum+1]){
                socketMap[socket.clientNum+1].emit(event,data);
            }
        }
    });
}

io.on('connect',function(socket){
    
    clientCount += 1;
    socket.clientNum = clientCount;
    socketMap[clientCount] = socket;

    // 两个用户，此时说明该用户是第一个进入的，等待配对
    if(clientCount % 2 == 1){
        socket.emit('waiting','waiting for another person')
    }else{
       
        if(socketMap[clientCount-1]){
            // 第二个用户
            socket.emit('start');
            // 第一个用户
            socketMap[clientCount-1].emit('start');
        }else{
            // 对方掉线
            socket.emit('leave');
        }
    }
    bindListener(socket,'init');
    bindListener(socket,'next');
    bindListener(socket,'rotate');
    bindListener(socket,'right');
    bindListener(socket,'down');
    bindListener(socket,'left');
    bindListener(socket,'fall');
    bindListener(socket,'fixed');
    bindListener(socket,'line');
    bindListener(socket,'time');
    bindListener(socket,'lose');
    bindListener(socket,'bottomLines');
    bindListener(socket,'addTailLines');

    socket.on('disconnect',function(){
        if(socket.clientNum % 2 == 0){
            if(socketMap[socket.clientNum-1]){
                socketMap[socket.clientNum-1].emit('leave');
            }
        }else{
            if(socketMap[socket.clientNum+1]){
                socketMap[socket.clientNum+1].emit('leave');
            }
        }

        delete(socketMap[socket.clientNum]);
    })
})

console.log('webSocket listening at port:'+PORT);