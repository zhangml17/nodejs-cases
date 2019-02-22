var http = require('http');
// cheerio模块提取HTML页面的内容
var cheerio = require('cheerio');

http.get('http://tuijian.hao123.com/hotrank',function(res){
    var data = '';
    res.on('data',function(chunk){
        data+=chunk;
    });
    res.on('end',function(){
        filter(data);
    })
});

function filter(data){
  var result = [];
  // 将页面源码data转换为$对象
  var $ = cheerio.load(data);
  var temp_div = $('.top-wrap');

  var temp_title = [];
  
  temp_div.each(function(index,item){
    // 将标题存入temp_title数组
    temp_title.push($(item).find('h2').text());
    var temp_arr= $(item).find('.point-bd').find('.point-title');

    var innerResult = result[temp_title[index]] = [];
    temp_arr.each(function(_index,_item){
      innerResult.push($(_item).text());
    });
  });
  console.log(result);
}
