/**
 * 
 * 对方游戏区中的逻辑
 * 
 */
var Remote = function(socket){
    var game;

    var bindEvents = function(){
        // 让每个客户端自己游戏区域的 init区域执行
        socket.on('init',function(data){
            // 执行Remote对象的start方法
            start(data.type,data.dir);
        });
        // 每个客户端自己游戏区域的 next区域执行
        socket.on('next',function(data){
            game.performNext(data.type,data.dir);
        });

        socket.on('rotate',function(data){
            game.rotate();
        });

        socket.on('right',function(data){
            game.right();
        });

        socket.on('down',function(data){
            game.down();
        });

        socket.on('left',function(data){
            game.left();
        });

        socket.on('fall',function(data){
            game.fall();
        });

        socket.on('fixed',function(data){
            game.fixed();
        });

        socket.on('line',function(data){
            game.checkClear();
            game.addScore(data);
        });

        socket.on('time',function(data){
           game.setTime(data);
        });

        socket.on('lose',function(data){
            game.gameOver(false);
         });

         socket.on('addTailLines',function(data){
            game.addTailLines(data);
         });
    }

    var start = function(type,dir){
        var doms = {
            gameDiv:document.getElementById('remote_game'),
            nextDiv:document.getElementById('remote_next'),
            timeDiv:document.getElementById('remote_time'),
            scoreDiv:document.getElementById('remote_score'),
            resultDiv:document.getElementById('remote_gameover'),
        }
        game = new Game();
        game.init(doms,type,dir);
    }
    bindEvents();
}