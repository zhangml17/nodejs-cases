# linux下利用node编写命令行程序

+ 构建目录结构

+ 在脚本中添加nodejs解析(/node-echo/bin/node-echo.js),其中/usr/bin/env node为固定写法

#! /usr/bin/env node

+ 赋予node-echo.js文件执行权限

chmod +x /node-echo/bin/node-echo.js

+ 建立软链接(源目录一定要用绝对路径)，方便任何目录下使用node-echo命令

sudo ln -s /home/command-line-pro/node-echo/bin/node-echo.js /usr/local/bin/node-echo

+ 效果

$ node-echo  Hello World

    Hello World
# 参考
+ http://nqdeng.github.io/7-days-nodejs/#1.4.1
+ https://segmentfault.com/q/1010000000753040
