/**
 * 
 * 我的游戏区中的逻辑
 * 
 */
var Local = function(socket){

    // 游戏对象
    var game;

    // 下落时间
    var INTERVAL = 2000;
    // 定时器
    var timer = null;
    // 事件计数器
    var timeCount = 0;
    // 事件
    var time = 0;
    // 绑定键盘事件
    var bindKeyEvent = function(){
        document.onkeydown = function(e){
            if(e.keyCode == 38){// up/旋转
                game.rotate();
                socket.emit('rotate');
            }else if(e.keyCode == 39){ // right
                game.right();
                socket.emit('right');
            }else if(e.keyCode == 40){ // down
                game.down();
                socket.emit('down');
            }else if(e.keyCode == 37){ // left
                game.left();
                socket.emit('left');
            }else if(e.keyCode == 32){ // space
                game.fall();
                socket.emit('fall');
            }
        }
    }

    // 移动
    var move = function(){
        timeFunct();
        if(!game.down()){
            game.fixed();
            socket.emit('fixed');
            var line =  game.checkClear();
            if(line){
                game.addScore(line);
                socket.emit('line',line);
                // 当一次消除的行数大于1时，给对方添加干扰行
                if(line>1){
                    var bottomLines = generateBottomLine(line);
                    socket.emit('bottomLines',bottomLines);
                }
            }
            var gameOver =  game.checkGameover();

            if(gameOver){
                game.gameOver(false);
                document.getElementById('remote_gameover').innerHTML = 'You Win';
                socket.emit('lose');
                stop();
            }else{
                var t = generateType();
                var d = generateDir();
                game.performNext(t,d);
                socket.emit('next',{type:t,dir:d});
            }
        }else{
            socket.emit('down');
        }
    }

    // 计时函数
    var timeFunct = function(){
        timeCount += 1;
        if(timeCount == 2){ // 过了1s
            timeCount = 0;
            time += 1;
            game.setTime(time);
            socket.emit('time',time);
        }
    }
    // 随机生成一个方块种类(0-6)
    var generateType = function(){
        return Math.ceil(Math.random()*7) -1; 
    }
    // 随机生成一个旋转次数(0-3)
    var generateDir = function(){
        return Math.ceil(Math.random()*4) -1;
    }

    // 随机生成干扰行
    var generateBottomLine = function(lineNum){
        var lines = [];
        for(var i=0;i<lineNum;i++){
            var line = [];
            for(var j=0;j<10;j++){
                line.push(Math.ceil(Math.random()*2)-1);
            }
            lines.push(line);
        }
        return lines;
    }

    // 启动游戏
    var start = function(){
        var doms = {
            gameDiv: document.getElementById('local_game'),
            nextDiv:document.getElementById('local_next'),
            timeDiv:document.getElementById('local_time'),
            scoreDiv:document.getElementById('local_score'),
            resultDiv:document.getElementById('local_gameover')
        }
        game = new Game();

        var type = generateType();
        var dir = generateDir();
        game.init(doms,type,dir);
        socket.emit('init',{type:type,dir:dir});

        bindKeyEvent();

        var t = generateType();
        var d = generateDir();
        game.performNext(t,d);
        socket.emit('next',{type:t,dir:d});

        timer = setInterval(move,INTERVAL);
    }
    // 结束
    var stop = function(){
        if(timer){
            clearInterval(timer);
            timer = null;
        }
        document.onkeydown = null; 
    }
    socket.on('start',function(){
        document.getElementById('waiting').innerHTML = '';
        start();
    });

    socket.on('lose',function(){
        game.gameOver(true);
        stop();
    });

    socket.on('leave',function(){
        document.getElementById('local_gameover').innerHTML = '对方掉线';
        document.getElementById('remote_gameover').innerHTML = '已掉线';
        stop();
    });

    socket.on('bottomLines',function(data){
        game.addTailLines(data);
        socket.emit('addTailLines',data);
    });
    // 这个waiting事件本来是在script.js文件中的
    // 个人认为将其放在这里最为直观
    socket.on('waiting',function(str){
        document.getElementById('waiting').innerHTML = str; 
    });
}