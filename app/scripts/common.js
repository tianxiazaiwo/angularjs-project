// 获取页面宽高
function view(){
	return {
		h:document.documentElement.clientHeight,
		w:document.documentElement.clientWidth
	}
}
// 通过id获取元素
function getId(_id){
	return document.getElementById(_id);
}
// 时间绑定函数
function bind(obj,ev,fn){
	if(obj.addEventListener){
		return obj.addEventListener(ev,fn,false);
	}else{
		return obj.attachEvent("on"+ev,function(){
			fn.call(obj);
		})
	}
}
// 添加class
function addClass(obj,aClass){
	var cName=obj.className.split(" ");
	if(!obj.className){
		obj.className=aClass;
		return;
	}
	for(var i=0,len=cName.length;i<len;i++){
		if(cName[i] === aClass){
			return;
		}
	}
	obj.className+=" "+aClass;
}
// 移除class
function removeClass(obj,rClass){
	var cName=obj.className.split(" ");
	if(!obj.className){
		return;
	}
	for(var i=0,len=cName.length;i<len;i++){
		if(cName[i] === rClass){
			cName.splice(i,1);
			obj.className=cName.join(" ");
			return;
		}
	}
}


