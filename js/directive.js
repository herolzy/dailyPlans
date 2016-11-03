/**
 * Created by Grim on 2016/10/30.
 */
//todoApp获取焦点的自定义指令
(function (angular) {
	var app=angular.module('todoApp.directive',[]);
	app.directive('todoFocus',function () {
		return {
			link:function (scope,ele,attr) {
				//添加一个双击事件
				ele.on('dblclick',function () {
					//console.log(this);
					angular.element(this).find('input').eq(1)[0].focus();
					//console.log(angular.element(this).find('input').eq(1)[0]);
				})
			}
		}
	})
})(angular);
