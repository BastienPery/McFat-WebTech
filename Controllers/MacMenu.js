var database;

var totalCalories = 0;


var w;
var timeSpent = 0

function findName(mealId) {
	var mealName = JSON.parse(database.getItem(mealId)).mealName;
	var target = document.getElementById(mealId+"1"); // find the list-item
	target.innerHTML = mealName; // set it's content
}

function findMeals(mealType) {
    $.each(database, function(key, value){
	   try {
		   var item = JSON.parse(value);
		   if (item.type != null && item.type === mealType) {
		   var target = document.getElementById(mealType);
		   target.innerHTML += ' <li id="' + key + '" draggable="true" ondragstart="drag(event)" >'  +
									'<div class="thumbnail">'+
									   '<img onclick="removeImg(this)" src="img/'+mealType+'/' + key + '.jpg" ondragstart="drag(event)" draggable="false"  /> '+
									   '<figcaption id="'+key+'Name">'+item.mealName+'</figcaption>'+
									   '<figcaption id="'+key+'Calories">'+item.calories+' calories</figcaption>'+
								'	</div>'+
								' </li> '		   }
	   }catch(e) {
	   }

	});
}

function startTimer() {
  if (typeof(Worker) !== "undefined") {
    if (typeof(w) == "undefined") {
      w = new Worker("meal_worker.js");
    }
    w.onmessage = function(event) {
      timeSpent = event.data;
    };
  } else {
    document.getElementById("result").innerHTML = "Sorry! No Web Worker support.";
  }
}


function allowDrop(ev) {
  ev.preventDefault();
}

function sendEmail(email, name) {
	var service_id = "default_service";
	var template_id = "template_QsOe6TEA";
	var message_html = document.getElementById("proba").innerHTML;
	var data = {
		service_id: service_id,
		template_id: template_id,
		user_id: 'user_UjtEOG0bz8KVN7ciMfhVA',
		template_params: {
	   "to_email": email,
	   "to_name": name,
	   "message_html": message_html,
	   "time_spent": timeSpent
		}
	};
	
	console.log(message_html);
	 
	$.ajax('https://api.emailjs.com/api/v1.0/email/send', {
		type: 'POST',
		data: JSON.stringify(data),
		contentType: 'application/json'
	}).done(function() {
		alert('Your mail is sent!');
	}).fail(function(error) {
		alert('Oops... ' + JSON.stringify(error));
	});
}


function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data=ev.dataTransfer.getData("text");
  var nodeCopy = document.getElementById(data).cloneNode(true);
  totalCalories += JSON.parse(database.getItem(nodeCopy.id)).calories;
  var target = document.getElementById("calories");
  target.innerHTML = "TOTAL CALORIES:" + totalCalories + "kcal";
  var dodatak = Math.floor((Math.random() * 10000) + 1);
  nodeCopy.id = nodeCopy.id+dodatak; /* We cannot use the same ID */
  ev.target.appendChild(nodeCopy);

}

function removeImg(item) {
	if (item.parentNode.parentNode.parentNode.id != "div1") {
		return;
	}
	var realItem = item.parentNode.parentNode;
	var id = realItem.id.replace(/[0-9]/g, '');
	totalCalories -= JSON.parse(database.getItem(id)).calories;
	var target = document.getElementById("calories");
    target.innerHTML = "TOTAL CALORIES:" + totalCalories + "kcal";
	var image_x = document.getElementById(realItem.id);
	console.log(realItem.id);
	image_x.parentNode.removeChild(image_x);
}