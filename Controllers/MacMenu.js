function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

/*function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}
*/
function drop(ev) {
  ev.preventDefault();
  var data=ev.dataTransfer.getData("text");
  var nodeCopy = document.getElementById(data).cloneNode(true);
  var dodatak = Math.floor((Math.random() * 10000) + 1);
  nodeCopy.id = nodeCopy.id+dodatak; /* We cannot use the same ID */
  ev.target.appendChild(nodeCopy);
}

function removeImg(item) {
	if (item.parentNode.parentNode.parentNode.id != "div1") {
		return;
	}
	var realItem = item.parentNode.parentNode;
	var image_x = document.getElementById(realItem.id);
	console.log(realItem.id);
	image_x.parentNode.removeChild(image_x);
}