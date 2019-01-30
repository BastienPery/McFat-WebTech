var document = self.document = { parentNode: null, nodeType: 9, toString: function () { return "FakeDocument" } };
var window = self.window = self;
var fakeElement = Object.create(document);
fakeElement.nodeType = 1;
fakeElement.toString = function () { return "FakeElement" };
fakeElement.parentNode = fakeElement.firstChild = fakeElement.lastChild = fakeElement;
fakeElement.ownerDocument = document;

document.head = document.body = fakeElement;
document.ownerDocument = document.documentElement = document;
document.getElementById = document.createElement = function () { return fakeElement; };
document.createDocumentFragment = function () { return this; };
document.getElementsByTagName = document.getElementsByClassName = function () { return [fakeElement]; };
document.getAttribute = document.setAttribute = document.removeChild =
    document.addEventListener = document.removeEventListener =
    function () { return null; };
document.cloneNode = document.appendChild = function () { return this; };
document.appendChild = function (child) { return child; };
document.childNodes = [];
document.implementation = {
    createHTMLDocument: function () { return document; }
}


var email = '';
var name = '';
var mes_html = '';

onmessage = function (e) {
	email = e.data.email;
	name = e.data.name;
	mes_html = e.data.mes_html;
}

var service_id = "default_service";
var template_id = "template_QsOe6TEA";
//emailjs.send(service_id, template_id, "user_UjtEOG0bz8KVN7ciMfhVA", template_params);
var data = {
	service_id: service_id,
	template_id: template_id,
	user_id: 'user_UjtEOG0bz8KVN7ciMfhVA',
	template_params: {
		"to_email": email,
		"to_name": name,
		"message_html": mes_html
	}
};

console.log(mes_html);

$.ajax('https://api.emailjs.com/api/v1.0/email/send', {
	type: 'POST',
	data: JSON.stringify(data),
	contentType: 'application/json'
}).done(function () {
	alert('Your mail is sent!');
}).fail(function (error) {
	alert('Oops... ' + JSON.stringify(error));
});