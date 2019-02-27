var Game = function(){
    // DOM元素
    var gameDiv;
    var nextDiv;
    var timeDiv;
    var scoreDiv;
    var resultDiv;

    // 当前分数
    var score= 0;
    // 游戏矩阵
    var gameData = [
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0]
    ];

    //当前方块
    var cur;
    // 下一个方块
    var next;


    // divs
    var gameDivs = [];
    var nextDivs = [];

    
    /**
     * Function: 初始化元div,绘制游戏区域和提示区域
     * 
     * @param {*} container : DOM元素 
     * @param {*} data :  游戏区域或提示区域的矩阵数据
     * @param {*} divs :  三维数组，每个数组元素表示一个20*20的div，即组成俄罗斯方块的元div数据
     */
    var initDiv = function(container,data,divs){
        for(var i=0;i<data.length;i++){
            var div = [];
            for(var j=0;j<data[0].length;j++){
                var newNode = document.createElement('div');
                newNode.className = 'none';
                newNode.style.top = (i*20)+'px';
                newNode.style.left = (j*20)+'px';
                container.appendChild(newNode);
                div.push(newNode);
            }
            divs.push(div);
        }
    }

    /**
     * Function: 通过判断矩阵数据中的每一个数据的值(0|1|2)，设置className属性(即赋予不同的div样式颜色等)
     * 
     * @param {*} data : 游戏区域或提示区域的矩阵数据
     * @param {*} divs : 三维数组，每个数组元素表示一个20*20的div，即组成俄罗斯方块的元div数据
     */
    var refreshDiv = function(data,divs){
        for(var i=0;i<data.length;i++){
            for(var j=0;j<data[0].length;j++){
                if(data[i][j] == 0){
                    divs[i][j].className = 'none';
                }else if(data[i][j] == 1){
                    divs[i][j].className = 'done';
                }else if(data[i][j] == 2){
                    divs[i][j].className = 'current';
                }
            }
        }
    }

    /**
     * Function: 检测图形的位置是否超出了游戏区域的边界
     * 
     * @param {*} pos : 
     * @param {*} x   : 
     * @param {*} y   : 
     */
    var check = function(pos,x,y){
        if(pos.x+x<0){ // 超出上边界
            return false;
        }else if(pos.x+x >=gameData.length){// 超出下边界
            return false;
        }else if(pos.y+y<0){
            return false;
        }else if(pos.y+y>=gameData[0].length){
            return false;
        }else if(gameData[pos.x+x][pos.y+y] == 1){
            return false;
        }else{
            return true;
        }
    }

    // 检测数据是否合法
    var isValid = function(pos,data){
        for(var i=0;i<data.length;i++){
            for(var j=0;j<data[0].length;j++){
                if(data[i][j]!=0){
                    if(!check(pos,i,j)){//遇到不合法的情况了，即方块到达游戏区边界了
                        return false;
                    }
                }
            }
        }
        return true;
    }

    // 清除变化之前的数据
    var clearData = function(){
        for(var i=0;i<cur.data.length;i++){
            for(var j=0;j<cur.data[0].length;j++){
                if(check(cur.origin,i,j)){
                    gameData[cur.origin.x+i][cur.origin.y+j] = 0;
                }
                
            }
        }
    }

    //设置数据
    var setData = function(){
        for(var i=0;i<cur.data.length;i++){
            for(var j=0;j<cur.data[0].length;j++){
                if(check(cur.origin,i,j)){
                    gameData[cur.origin.x+i][cur.origin.y+j] = cur.data[i][j];
                }
            }
        }
    }

    // 旋转函数
    var rotate = function(){
        if(cur.canRotate(isValid)){
            clearData();
            cur.rotate();
            setData();
            refreshDiv(gameData,gameDivs);
        }
    }

    // 左移函数
    var left = function(){
        if(cur.canLeft(isValid)){
            clearData();
            cur.left();
            setData();
            refreshDiv(gameData,gameDivs);
        }
    }

     // 右移函数
    var right = function(){
        if(cur.canRight(isValid)){
            clearData();
            cur.right();
            setData();
            refreshDiv(gameData,gameDivs);
        }
    }

    // 下移函数
    var down = function(){
        if(cur.canDown(isValid)){
            clearData();
            cur.down();
            setData();
            refreshDiv(gameData,gameDivs);
            return true;
        }else{
            return false;
        }
    }

    // 方块到底部则固定
    var fixed = function(){
        for(var i = 0;i<cur.data.length;i++){
            for(var j=0;j<cur.data[0].length;j++){
                if(check(cur.origin,i,j)){
                    if(gameData[cur.origin.x+i][cur.origin.y+j] == 2){
                        gameData[cur.origin.x+i][cur.origin.y+j] = 1;
                    }
                }
            }
        }

        refreshDiv(gameData,gameDivs);
    }

    // 消行
    var checkClear = function(){
        var line = 0;
        for(var i = gameData.length-1;i>=0;i--){
            // 表示整行全部为1 ，可以消除
            var clear = true;
            for(var j=0;j<gameData[0].length;j++){
                if(gameData[i][j]!=1){
                    clear = false;
                    break;
                }
            }

            // 可以消除行
            if(clear){
                line += 1;
                for(var m=i;m>0;m--){
                    // 下移一行
                    for(var n=0;n<gameData[0].length;n++){
                        gameData[m][n] = gameData[m-1][n];
                    }
                }
                // 清除第一行
                for(var n=0;n<gameData[0].length;n++){
                    gameData[0][n] = 0;
                }
                // 因为上方m--了，如果不加1会影响最外层的i循环  
                i++;
            }
        }
        return line;
    }
    // 判断游戏结束
    var checkGameover = function(){
        var gameOVer = false;
        for(var i=0;i<gameData[0].length;i++){
            if(gameData[0][i] == 1){
                gameOVer = true;
            }
        }
        return gameOVer;
    }
    /**
     * Function: 游戏区使用提示区的方块，提示区随机重新创建方块
     * 
     * @param {*} type : 其中方块的索引 7种
     * @param {*} dir  : 方块变换的方向 4种
     */
    var performNext = function(type,dir){
        cur = next ;
        setData();
        next = SquareFactory.prototype.make(type,dir);
        refreshDiv(gameData,gameDivs);
        refreshDiv(next.data,nextDivs);
    }

    // 页面上设置游戏进行时间
    var setTime = function(time){
        timeDiv.innerHTML = time;
    }
    // 得分计算 参数line： 一次消的行数
    var addScore = function(line){
        var s = 0;
        switch(line){
            case 1:
                s=10;
                break;
            case 2:
                s=30;
                break;
            case 3:
                s=60;
                break;
            case 4:
                s=90;
                break;
            case 5:
                s=130;
                break;
            case 6:
                s=200;
                break;
            default:
                break;
        }
        score += s;
        scoreDiv.innerHTML =score;
    }

    // 游戏结束提示
    var gameOver = function(win){
        if(win){
            resultDiv.innerHTML = "You Win !"
        }else{
            resultDiv.innerHTML = "You Lost !"
        }
    }

    // 增加底部行,其余整体上移
    var addTailLines = function(lines){
        for(var i=0;i<gameData.length-lines.length;i++){
            gameData[i] = gameData[i+lines.length];
        }

        for(var i=0;i<lines.length;i++){
            gameData[gameData.length-lines.length+i] = lines[i];
        }

        cur.origin.x -= lines.length;
        if(cur.origin.x < 0){
            cur.origin.x = 0
        }

        refreshDiv(gameData,gameDivs);
    }
    // 初始化
    var init = function(doms,type,dir){
        gameDiv = doms.gameDiv;
        nextDiv = doms.nextDiv; 
        timeDiv = doms.timeDiv;
        scoreDiv = doms.scoreDiv;
        resultDiv = doms.resultDiv;

        next = SquareFactory.prototype.make(type,dir);

        initDiv(gameDiv,gameData,gameDivs);
        initDiv(nextDiv,next.data,nextDivs);

        refreshDiv(next.data,nextDivs);
    }
    // 导出API，不然外部访问不到该init方法
    this.init = init;
    this.down = down;
    this.left = left;
    this.right = right;
    this.rotate = rotate;

    this.fall = function(){
        while(down()){}
    };

    this.fixed = fixed;
    this.performNext = performNext;
    this.checkClear = checkClear;
    this.checkGameover = checkGameover;
    this.setTime = setTime;
    this.addScore = addScore;
    this.gameOver = gameOver;
    this.addTailLines = addTailLines;
}