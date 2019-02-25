var ws = require('nodejs-websocket');

var clientCount = 0;
var server = ws.createServer(function(conn){
    console.log('New Connection');
    clientCount++;
    conn.nickname = 'user'+clientCount;
    broadcast(conn.nickname+'comes in');

    var msg = {};
    msg.type="enter";
    msg.data=conn.nickname +"comes in";
    broadcast(JSON.stringify(msg));

    conn.on('text',function(str){
        console.log('received'+str);
        
        var msg = {};
        msg.type="message";
        msg.data=conn.nickname +' says: '+str;

        broadcast(JSON.stringify(msg));
    })

    conn.on('close',function(code,reason){
        console.log('COnnection closed');
        
        var msg = {};
        msg.type="left";
        msg.data=conn.nickname+'left';

        broadcast(JSON.stringify(msg));
    })

    conn.on('error',function(err){
        console.log('Handle error');
        console.log(err);
    })
})

server.listen(8001);
console.log('server running at port 8001');

function broadcast(str){
    server.connections.forEach(function(connection){
        connection.sendText(str);
    })
}

