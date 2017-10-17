/**
 * 轻量级路由插件
 * 
 * 监听URL变化
 * $.listen('page/**',function(url,params){
 * 	  $('#container').load(url);
 * });
 * 
 * 触发URL变化
 * $.url('page/pnr.html?user=taobao');
 * 
 * 请求页面片段并触发URL变化
 * $('#container').loadPage(url); 
 * 
 * auther: weiguoxing
 */
!function($){
	
	var Router={
		routes:{},
		mode:(function(){return history.pushState?'history':'hash';})(),
		listen:function(path,callback){
	    	this.routes[path]=callback||function(){};
	    	return this;
	    },
	    page:function(selector,page){
	    	$(selector).load(page);
	    	this.url(this.map(page));
	    },
	    map:function(page,flag){
	    	var url=null;
	    	if(flag){
	    		url=page+'.html';
	    	}else{
	    		url=page.replace('.html','');
	    	}
	    	return url;
	    },
	    url:function(path){
	    	if(this.mode==='history'){
	            window.history.pushState(null,null,path);
	            this.refresh();
	        } else {
	            window.location.hash=path;
	        }
	        return this;
	    },
	    params:function(params){
	    	var url=this.location();
			if(params){
	    		var q='';
	    		for(var k in params){
	    			var v=params[k];
	    			if(k&&v){
	    			   q+=k+'='+v+'&';
	    			}
	    		}
	    		if(q){
	    			url=url.path+'?'+q.replace(/&$/g,'');
	    		}else{
	    			url=url.path;
	    		}
	    		if(this.model!=='history'){
	    			var i=url.indexOf('#');
	    			if(i>-1){
	    				url=url.substr(i+1,url.length);// hash
	    			}
	    		}
	    		
	    		this.searchchange=true;
	    		this.url(url);
	    		this.searchchange=false;
	    	}else{
	    		return url.params;
	    	}
			
	    },
	    refresh:function(){
	    	if(this.searchchange){
	    		return;
	    	}
	    	var url=this.location();
	    	var path=url.path;
	    	var params=url.params;
		  	for(var rule in this.routes){
		  		for(var r in rule.split(',')){
			  		var match=path.match(this.compile(rule));
			  		if(match){
			  			this.routes[rule](this.map(match[0],true),params);
			  			return this;
			  		}
		  		}
		  	}
		  	return this;
	    },
	    init:function(){
	 	 	var evt=this.mode=='history'?'popstate':'hashchange';
	 		$(window).on('load',this.refresh.bind(this));
	 	 	$(window).on(evt,this.refresh.bind(this));
	 	 	return this;
		},
		compile:function(rule){
		    if(rule.match('^(rgx:).*')){
		        rule=rule.replace('rgx:','');
		    }else{
		        // 转义特殊字符
		        rule=rule.replace(/([/?.])/g,'\\$1');
		        // 转化成正则表达式
		        rule=rule.replace(/\*\*/g,'.*?').replace(/[*][^?]|[*]$/g,'[^/]*?').replace(/(\*\?)$/g,'*');
		    }
		    return new RegExp(rule);
		},
		location:function(){
			var url=window.location.href;
			var path=url;
			var search='';
			var s=path.indexOf('?');
			if(s>-1){
				search=url.substr(s+1,url.length);
				path=url.substr(0,s);
			}
			var params={};
		    var segs=search.split('&');
		    for(var i in segs){  
		        var s=segs[i].split('='); 
		        if(s[1]){
		        	params[s[0]]=s[1];
		        }
		    }  
			return {  
					 path:path, 
					 params:params
			};
		}
	};
	// 监听
	Router.init();
	
	// 接口
	$.url=Router.url.bind(Router);                     // 变更浏览器URL  
	$.params=Router.params.bind(Router);                 // 解析浏览器URL,获取查询参数
	$.listen=Router.listen.bind(Router);               // 监听指定规则的URL,并回掉对应函数
  	$.loadPage=Router.page.bind(Router);               // 加载页面片段,并触发URL变化
	$.fn.loadPage=function(url){$.loadPage(this,url);} // 同上
	
}(jQuery);
