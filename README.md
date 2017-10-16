# 轻量级前端路由


### 一、监听URL变化
```javascript
$.rule('page/**',function(url,param){
  	  $('#container').load(url);
});
 ```
 
### 二、触发URL变化
```javascript
$.url('page/pnr.html?user=taobao');
```

### 三、请求页面片段并触发URL变化
```javascript
$('#container').loadPage(url); 
```
