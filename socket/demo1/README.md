# HTML5的websocket基础

npm install nodejs-websocket

+ 服务器端核心<br/>
    ws.createServer(function(conn){<br/>
        conn.on('text',...);<br/>
        conn.on('close',...);<br/>
        conn.on('error',...);<br/>
    });

+ 客户端核心<br/>
    var websocket = new WebSocket('ws://IP:PORT/');

    websocket.onopen = function(){...};<br/>
    websocket.onclose = function(){...};<br/>
    websocket.onmessage = function(e){...};<br/>
