var httpRequest = createHttpRequest();

function createHttpRequest() {

    if (window.XMLHttpRequest) { //Mozilla,Safari ...
        httpRequest = new XMLHttpRequest();
        if (httpRequest.overrideMimeType) {
            httpRequest.open('text/xml'); //Error if invalid XML
        }
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

}