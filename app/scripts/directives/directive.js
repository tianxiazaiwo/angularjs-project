var direcModule=angular.module("myDirec",[]);
//评分页面
direcModule.controller("gradeCtrl",["$scope","$location",function($scope,$location){
	$scope.imgs=["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg"];
	$scope.pj=["好失望","没有想象的那么差","很一般","良好","棒极了"];
	//$scope.slideBox();
	$scope.stars=['1','2','3','4','5'];
	$scope.isScore=false;
	$scope.isTag=false;
	$scope.isSubmit=false;
	$scope.score=function(){
		$scope.isScore=true;
		if($scope.isTag && $scope.isScore){
			$scope.addSubmit=true;
		}
	}
	$scope.addTag=function(){
		$scope.isTag=true;
		if($scope.isTag && $scope.isScore){
			$scope.isSubmit=true;
		}
	}
	$scope.gradeSubmit=function(){
		if($scope.isScore){
			if($scope.isTag){
				$location.path("/grade_out");
			}else{
				$scope.alertTxt="请给景区添加标签";
			}
		}else{
			$scope.alertTxt="请给景区评分";
		}
	}
	$scope.slideBox=function(){
		var tabCon=getId("tabPic");
		var oList=getId("picList");
		var btns=getId("index").getElementsByTagName("nav")[0].children;
		var clientW=view().w;
		var startTouchX=0;
		var curTouchX=0;
		var startPageX=0;
		var curPageX=0;
		var moveX=0;
		var timer=null;
		var index=0;
		bind(tabCon,"touchstart",fnStart);
		bind(tabCon,"touchmove",fnMove);
		bind(tabCon,"touchend",fnEnd);
		autoPlay();
		function fnStart(e){
			oList.style.webkitTransition=oList.style.transition="none";
		 	var ev=e.changedTouches[0];
			startTouchX=ev.pageX;//获取首次手指的位置
			startPageX=curPageX;
			clearInterval(timer);
		}
		function fnMove(e){
			var ev=e.changedTouches[0];
			curTouchX=ev.pageX;//获取当前手指的位置
			moveX=curTouchX-startTouchX;//移动的距离
			curPageX=startPageX+moveX;
			oList.style.webkitTransform=oList.style.transform="translateX("+curPageX+"px)";
		}
		function fnEnd(){
			index=-Math.round(curPageX/clientW);		
			if(index > btns.length-1){
				index=btns.length-1;
			}
			if(index <0){
				index= 0;
			}
			tab();
			autoPlay();
		}
		//自动切换
		function autoPlay(){
			tab(index);
			timer=setInterval(function(){
				index++;
				if(index < 0){
					index=0;
				}
				if(index > btns.length-1){
					index=0;
				}
				tab();
			},2000)
		}
					//小圆点函数
			function tab(){
				oList.style.webkitTransition="0.8s";
				oList.style.webkitTransform=oList.style.transform="translateX("+(-clientW*index)+"px)";
			for(var i=0,len=btns.length;i<len;i++){
				removeClass(btns[i],"active");
			}
			addClass(btns[index],"active");
		}
	}
	$scope.slideBox();
}]);
direcModule.directive("star",function(){
	return {
		restrict:"AEMC",
		template:"",
		replace:true,
		link:function(scope,elem,attrs){
			elem.bind("click",function(){
				var index=this.dataset.i;
				var stars=this.parentElement.getElementsByTagName("a");
				var input=this.parentElement.parentElement.getElementsByTagName("input")[0];
var inputs=this.parentElement.parentElement.parentElement.getElementsByTagName("input");
				for(var i=0,len=stars.length;i<len;i++){
					if(i <= index){
						stars[i].className+=" active";
					}else{
						stars[i].className="ng-scope";
					}
				}
				(function(){
					input.value=scope.pj[index];
					for(var i=0,len=inputs.length;i<len;i++){
						 if(inputs[i].value == "0"){
						 	scope.isScore=false;
						 	return;
						 }
					}
					scope.isScore=true;
				})();
				scope.score();
			})
		}
	}
});


//新闻线索页面
direcModule.controller("newsLineCtrl",["$scope","$location","$interval",function($scope,$location,$interval){
	$scope.isVideo=false;
	$scope.isImg=false;
	$scope.isTxt=false;
	$scope.alertTxt='';
	$scope.video=function(){
		var timer=null;
		timer=$interval(function(){
			if($scope.isVideo || $scope.isImg){
				$scope.isVideo=false;
				$scope.isImg=false;
				$interval.cancel(timer);
				timer=null;
				$scope.isTxt=false;
				$location.path("/comment");
			}
		},1000)
	}
	$scope.video();
}])
direcModule.directive("video",function(){
	return {
		restrict:"AEMC",
		template:"",
		replace:true,
		link:function(scope,elem,attrs){
			elem.bind("change",function(){
				scope.isTxt=false;
				var videoType=/(mp4|swf|flv|rmvb)/gi;
				var loadVideo=elem[0].files[0].type.split("/")[1];//获取上传视频类型
				if(videoType.test(loadVideo)){
					elem.value="";
					scope.isVideo=true;
					//scope.video();
				}else{
					scope.alertTxt="请上传正确的视频文件";
					scope.isTxt=true;
				}
			})
		}
	}
})
direcModule.directive("img",function(){
	return {
		restrict:"AEMC",
		template:"",
		replace:true,
		link:function(scope,elem,attrs){
			elem.bind("change",function(){
				var imgType=/(jpeg|png|gif|jpg)/gi;
				var loadImg=elem[0].files[0].type.split("/")[1];//获取上传图片类型
				if(imgType.test(loadImg)){
					elem.value="";
					scope.isImg=true;
					//scope.video();
				}else{
					scope.alertTxt="请上传正确的图片文件";
					scope.isTxt=true;
				}
			})
		}
	}
})
