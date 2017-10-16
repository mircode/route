# 轻量级前端路由


### 一、特点
支持hash，history两种模式，自动检测兼容。url参数变化，不触发url变更。适合页面片段ajax请求，后页面片段内又有ajax请求。

![截图说明][1]

[1]: https://raw.githubusercontent.com/mircode/route/master/doc/img/route.png

### 二、监听URL变化
```javascript
$.rule('page/**',function(url,param){
  $('#container').load(url);
});
 ```
 
### 三、触发URL变化
```javascript
$.url('page/pnr.html?user=taobao');
```

### 四、请求页面片段并触发URL变化
```javascript
$('#container').loadPage(url); 
```
