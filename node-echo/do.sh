#! /bin/bash

# 赋予权限
chmod +x ./bin/node-echo.js

# 获取当前脚本所在目录
basepath=$(cd `dirname $0`; pwd);

# 构建命令行程序脚本所在的绝对路径
path=${basepath}/bin/node-echo.js

# 建立软链接
sudo ln -s  ${path}   /usr/local/bin/node-echo
