/* var httpRequest = createHttpRequest();

function createHttpRequest() {

    if (window.XMLHttpRequest) { //Mozilla,Safari ...
        httpRequest = new XMLHttpRequest();
    }

    else if (window.ActiveXObject) { //IE

        try {
            httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (e) {
            try {
                httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch (e) { }
        }
    }

    if (!httpRequest) {
        alert('Error : Impossible XMLHTTP instantiation');
        return false;
    }

    return httpRequest;
}

function alertContents(httpRequest) {

    if (httpRequest.readyState == XMLHttpRequest.DONE) {
        if (httpRequest.status == 200) {
            alert(httpRequest.responseText);
        } else {
            alert('Request problem');
        }
    }

} */

function displayMacMap() {
    $('#page').load('MacMap.html');
}

function displayMacHome() {
    $('#page').load('MacHome.html');
}

function displayMacStats() {
    $('#page').load('MacStats.html');
}

function displayMacMenu() {
    $('#page').load('MacMenu.html');
}

