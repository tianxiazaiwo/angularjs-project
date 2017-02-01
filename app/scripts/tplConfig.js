var myApp=angular.module("myApp",["ngRoute","myCtrl","myDirec"]);
myApp.config(function($routeProvider){
	$routeProvider.when("/welcome",{
		templateUrl:"views/welcome.html",
		controller:"welcomeCtrl"
	}).when("/grade",{
		templateUrl:"views/grade.html",
		controller:"gradeCtrl"
	}).when("/grade_out",{
		templateUrl:"views/grade_out.html",
		controller:"gradeOutCtrl" 
	}).when("/news_line",{
		templateUrl:"views/news_line.html",
		controller:"newsLineCtrl"
	}).when("/comment",{
		templateUrl:"views/comment.html",
		controller:"commentCtrl"
	}).when("/load_success",{
		templateUrl:"views/load_success.html",
		controller:"loadSuccessCtrl"
	}).otherwise({
		redirectTo:"/welcome"
	})
});
//tplModule.run(function($location){
//	var timer=null;
//	setTimeout(function(){
//		//console.log("执行跳转");
//		$location.path("/grade");
//		clearTimeout(timer);
//		timer=null;
//	},5000)
//});
