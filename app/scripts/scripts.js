/**
 * Created by Joshua Baert on 10/20/2016.
 */
$(document).ready(function () {
	
	var listo = [];
	
	function toLocal() {
		localStorage.clear();
		localStorage.setItem('todos', JSON.stringify(listo));
		console.log(listo);
	}
	
	function getLocal() {
		var arr = JSON.parse(localStorage.getItem('todos'));
		for (var i=0; i<arr.length; i++) {listo.push(arr[i]);}
		return listo;
	}
	
	getLocal();
	
	/*function postList(arr) {
		
		for(var i=0; i<arr.length; i++){
			if(arr[i].id === 'new'){
				$('#newList').append(
						'<a href="#finish" class="" id="item"' +
						'<li class="list-group-item">' +
						'<h3>' + arr[i].task + '</h3>' +
						'<span class="arrow pull-right">' +
						'<i class="glyphicon glyphicon-arrow-right">' +
						'</span>' +
						'</li>' +
						'</a>'
				);
			} else if (arr[i].id === 'inProgress') {
				$('#currentList').append(
						'<a href="#finish" class="" id="item '+i+'"' +
						'<li class="list-group-item">' +
						'<h3>' + arr[i].task + '</h3>' +
						'<span class="arrow pull-right">' +
						'<i class="glyphicon glyphicon-arrow-right">' +
						'</span>' +
						'</li>' +
						'</a>'
				);
				$('#currentList').append(this.outerHTML);
				
			} else if (arr[i].id === 'archived') {
				$('#archivedList').append(
						'<a href="#finish" class="" id="item"' +
						'<li class="list-group-item">' +
						'<h3>' + arr[i].task + '</h3>' +
						'<span class="arrow pull-right">' +
						'<i class="glyphicon glyphicon-arrow-right">' +
						'</span>' +
						'</li>' +
						'</a>'
				);
				$('#archivedList').append(this.outerHTML);
				var changeIcon = task.outerHTML.replace('glyphicon-arrow-right', 'glyphicon-remove');
				$('#archivedList').append(changeIcon);
			}
				
							
			
		}
	}
	
	postList(listo);*/ // this is unworking function unable to post current list items correctly
	
	var Task = function (task) {
		this.task = task;
		this.id = 'new';
	};
	
	var addTask = function (task) {
//		console.log("add task " + task);
		if (task) {
			
			task = new Task(task);
			listo.push(task);
//			console.log("new task " + task);
//			console.log("listo " + listo);
			
			$('#newItemInput').val('');
			$('#newList').append(
					'<a href="#finish" class="" id="item"' +
					'<li class="list-group-item">' +
					'<h3>' + task.task + '</h3>' +
					'<span class="arrow pull-right">' +
					'<i class="glyphicon glyphicon-arrow-right">' +
					'</span>' +
					'</li>' +
					'</a>'
			);
		}
		
		$('#newTaskForm').slideToggle('fast', 'linear');
		
	};
	
	var advanceTask = function(task) {
//		var modified = task.innerText.trim();
		for (var i = 0; i < listo.length; i++) {
//			if (listo[i].task === modified) {
//				console.log('entered past modified');
				if (listo[i].id === 'new') {
					listo[i].id = 'inProgress';
				} else if (listo[i].id === 'inProgress') {
					listo[i].id = 'archived';
				} else {
					listo.splice(i, 1);
				}
				break;
//			}
		}
		task.remove();
		toLocal();
		console.log(localStorage);
		console.log(listo);
	};
	
	$('#newTaskForm').hide();
	
	$('#saveNewItem').on('click', function (e) {
		e.preventDefault();
		var task = $('#newItemInput').val().trim();
		console.log(task);
		addTask(task);
		toLocal();
	});
	
	$('#add-todo').on('click', function () {
		$('#newTaskForm').fadeToggle('fast', 'linear');
	});
	
	$('#cancel').on('click', function (e) {
		e.preventDefault();
		$('#newTaskForm').fadeToggle('fast', 'linear');
	});
	
	$(document).on('click', '#item', function(e) {
		e.preventDefault();
		var task = this;
		advanceTask(task);
		this.id = 'inProgress';
		$('#currentList').append(this.outerHTML);
		
		console.log(localStorage);
		console.log(listo);
	});
	
	$(document).on('click', '#inProgress', function (e) {
		e.preventDefault();
		var task = this;
		task.id = "archived";
		var changeIcon = task.outerHTML.replace('glyphicon-arrow-right', 'glyphicon-remove');
		advanceTask(task);
		$('#archivedList').append(changeIcon);
		
		console.log(localStorage);
		console.log(listo);
	});
	
	$(document).on('click', '#archived', function (e) {
		e.preventDefault();
		var task = this;
		advanceTask(task);
		
		console.log(localStorage);
		console.log(listo);
	});
	
	$('.logo').click(function () {
		console.log(JSON.stringify(listo));
	})
	
});