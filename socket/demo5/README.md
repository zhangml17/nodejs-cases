# websocket实现多人对战俄罗斯方块

# 功能
+ left: 左移
+ right: 右移 
+ down: 下移
+ rotate: 旋转
+ fall: 坠落
+ fixed: 固定在底部
+ performNext: 游戏区使用提示区的方块，提示区随机生成一个方块
+ checkClear: 检查是否可以清除方块行
+ checkGameOver:  检查游戏是否结束
+ setTime: 设置游戏进行时间
+ addScore: 设置游戏得分
+ addTailLines: 向游戏区最底部添加方块行，增加干扰向，提高游戏难度
+ gameOver: 游戏结束提示语

wsServer.js: 服务器
game.js: 该游戏的核心文件，定义了游戏中操作的基本方法

流程：
启动服务器:node wsServer.js
    |
执行io.on('connect')
    |
第一个进来的用户，触发waiting事件，在local.js中接收该事件，显示文本
    |
第二个用户进来，触发start事件,在local.js中接收该事件，执行Local对象的start()方法
    |
在执行start方法时触发init事件，Remote远端接收init事件，执行自己的start(type,dir)方法   
    |
当前游戏区绑定键盘操作事件，触发next事件，远端接收next事件并执行
