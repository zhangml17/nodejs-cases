var Local = function(socket){

    // 游戏对象
    var game;

    // 下落时间
    var INTERVAL = 500;
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
            }else if(e.keyCode == 39){ // right
                game.right();
            }else if(e.keyCode == 40){ // down
                game.down();
            }else if(e.keyCode == 37){ // left
                game.left();
            }else if(e.keyCode == 32){ // space
                game.fall();
            }
        }
    }

    // 移动
    var move = function(){
        timeFunct();
        if(!game.down()){
            game.fixed();
            var line =  game.checkClear();
            if(line){
                game.addScore(line);
            }
            var gameOver =  game.checkGameover();

            if(gameOver){
                game.gameOver(false);
                stop();
            }else{
                game.performNext(generateType(),generateDir());
            }
        }
    }

    // 计时函数
    var timeFunct = function(){
        timeCount += 1;
        if(timeCount == 2){ // 过了1s
            timeCount = 0;
            time += 1;
            game.setTime(time);
            if(time % 10 == 0){
                game.addTailLines(generateBottomLine(1));
            }
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
        game.init(doms,generateType(),generateDir());
        bindKeyEvent();
        game.performNext(generateType(),generateDir());
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
    })
}