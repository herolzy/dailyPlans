(function (window) {
	//2创建项目模块和控制器
	//这个项目的模块名称一般由向项目名+App
	var app=angular.module('todoApp',[
		'todoApp.service',
		'todoApp.directive'
	]);
	app.controller('todoCtrl',function ($scope,$filter,$location,$interval,storageService) {
		//测试代码
		//console.log(storageService.test);
		//查看
		$scope.todoList=storageService.get();
		//添加
		$scope.todo='';
		$scope.addTodo=function () {
			//添加一条todo
			if($scope.todo.length>0){
				//$scope.todoList.push({text:$scope.todo,completed:false});
				storageService.add($scope.todo);
				//清空添加完成的数据
				$scope.todo='';
			}
		};
		// 删除
		$scope.delTodo=function (todo) {
			storageService.del(todo);
			// //获取到todo对应的下标
			// var index=$scope.todoList.indexOf(todo);
			// //删除数组中的某一项数据
			// $scope.todoList.splice(index,1);
		};
		// 修改
		//当前的todo的样式
		$scope.edtingTodo={};
		//修改todo
		$scope.editTodo=function (todo) {
			$scope.edtingTodo=todo;
		};
		//失去焦点保存todo
		$scope.saveTodo=function () {
			  $scope.edtingTodo={};
			 storageService.edit();
		};
		//itemLeft的统计
		$scope.todoCount=0;
		$scope.isShowCompleted=false;
		$scope.toggleAll=false;
		$scope.$watch('todoList',function (newVal) {
			//1.过滤器的名称
			//2.需要过滤的数据
			//3.过滤的条件
			$scope.todoCount=$filter('filter')($scope.todoList, {completed: false}).length;
			//当completed: true有超过1条数据才会显示Clear completed，如果没有则隐藏
			$scope.isShowCompleted=$filter('filter')($scope.todoList, {completed: true}).length>0?true:false;
			$scope.toggleAll=!$scope.todoCount
			//console.log(newVal);
		},true);
		//删除已完成的todo
		$scope.clearCompleted=function () {
			storageService.clearCompleted();
			//$scope.todoList=$filter('filter')($scope.todoList,{completed: false});
		};
		//全选的切换
		$scope.changeToggleAll=function () {
			storageService.changeToggleAll($scope.toggleAll);
			// $scope.todoList.forEach(function (item) {
			// 	item.completed=$scope.toggleAll;
			// })
			// storageService.edit();
		};
		//不同状态的切换
		$scope.completedStatus={};
		$scope.changeStatus=function (selectStatus) {
			switch(selectStatus){
				case 'all':
					$scope.completedStatus={};
					break;
				case'active':
					$scope.completedStatus={completed:false};
					break;
				case'completed':
					$scope.completedStatus={completed:true};
					break;
			}
		};
		//console.log($location.path());
		//监视锚点值得不同来切换数据
		$scope.location=$location;
		$scope.$watch('location.path()',function (newVal) {
			//获取锚点值
			//console.log(newVal.substring(1));
			switch(newVal.substring(1)){
				case'active':
					$scope.completedStatus={completed:false};
					break;
				case'completed':
					$scope.completedStatus={completed:true};
					break;
				default:
					$scope.completedStatus={};
					break;
			}
		})

		//实时刷新的时间
		$scope.time=new Date();
		$interval(function(){
			$scope.time=new Date();
		},1000)
	})
})(window);
