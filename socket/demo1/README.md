# HTML5的websocket基础

npm install nodejs-websocket

+ 服务器端核心<br/>
    ws.createServer(function(conn){
        conn.on('text',...);
        conn.on('close',...);
        conn.on('error',...);
    });

+ 客户端核心<br/>
    var websocket = new WebSocket('ws://IP:PORT/');

    websocket.onopen = function(){...};
    websocket.onclose = function(){...};
    websocket.onmessage = function(e){...};
