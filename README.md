# route

### 轻量级路由插件
 
### 监听URL变化
```javascript
$.rule('page/**',function(url,param){
  	  $('#container').load(url);
});
 ```
 
### 触发URL变化
```javascript
$.url('page/pnr.html?user=taobao');
```

### 请求页面片段并触发URL变化
```javascript
$('#container').loadPage(url); 
```
