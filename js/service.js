/**
 * Created by Grim on 2016/10/30.
 */
//创建storage的服务
(function (angular) {
	//创建todoApp.service模块
	var app=angular.module('todoApp.service',[]);
	//创建服务
	app.service('storageService',function ($window,$filter) {
		//测试外部能不能使用
		//this.test='storageService';
		var Storage=$window.localStorage;//window.localStorage
		//将json字符串变成json数组
		//"[{"text":"1231111","completed":true},{"text":"4444123232323","completed":false}]"
		var todoList=JSON.parse(Storage.getItem('todoList')||'[]');
		// var todoList=[
		// 	{text:'css',completed:true},
		// 	{text:'js',completed:false},
		// 	{text:'storageService',completed:false},
		// ];
		//获取todoList数据
		this.get=function () {
			return todoList;
		};
		//添加数据
		this.add=function (text) {
			todoList.push({text:text,completed:false});
			this.save();
		};
		//保存数据
		this.save=function () {
			Storage.setItem('todoList',JSON.stringify(todoList));
		};
		//删除数据
		this.del=function (todo) {
			//获取到todo对应的下标
			var index=todoList.indexOf(todo);
			//删除数组中的某一项数据
			todoList.splice(index,1);
			//保存数据
			this.save();
		};
		//修改todo
		this.edit=function () {
			this.save();
		};
		//全选的切换
		this.changeToggleAll=function (toggleAll) {
			todoList.forEach(function (item) {
				item.completed=toggleAll;
			});
			this.edit();
		};
		//删除已完成的todo
		this.clearCompleted=function () {
			//过滤数据
			var tempList=$filter('filter')(todoList,{completed: false});
			//这样的删除数据不会修改引用的地址
			todoList.splice(0,todoList.length);
			//todoList=[];
			//todoList=tempList
			 //1foreach for
			//todoList.push()
			//2 merge 用来合并数据todoList<-tempList
			//这个merge操作不会修改地址
			//merge内部也是用到了for或者foreach循环添加数据
			angular.merge(todoList,tempList);
			this.save();
			//错误代码
			// todoList=$filter('filter')(todoList,{completed: false});
			// this.save();
		}
	});
})(angular);
