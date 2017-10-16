//@ sourceURL=form.js
!function($){
	var param=$.param();
	
	function init(){
		if(param){
			$('input').each(function(){
				var k=$(this).attr('name');
				if(param[k]){
					$(this).val(param[k]);
				}
			});		
		}
	}
	function getParam(){
		var param={};
		$('input').each(function(){
			var v=$(this).val();
			var k=$(this).attr('name');
			if(v&&k){
				param[k]=v;
			}
		});
		return param;
	}
	
	function search(){
		var param=getParam();
		$.param(param);
	}
	// 初始化
	init();

	$('button').on('click',search);
}(jQuery);

