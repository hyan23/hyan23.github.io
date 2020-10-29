function setCookie(name, value, daysOfValidity) {
    if (daysOfValidity === undefined) {
        document.cookie = name + '=' + encodeURIComponent(value);
    }
    else {
        var expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + daysOfValidity);
        document.cookie = name + '=' + encodeURIComponent(value) + ';expires=' + expiryDate.toUTCString();
    }
}
function getCookie(name) {
    if (document.cookie.length > 0) {
        var start = 0;
        var step = 0;
        while (true) {
            start = document.cookie.indexOf(name + '=', start + step);
            if (start == -1 || start == 0) {
                break;
            }
            if (start > 0) {
                var ch = document.cookie.charAt(start - 1);
                if (ch == ';' || /\s/.test(ch)) {
                    break;
                }
                step = (name + '=').length;
            }
        }
        if (start != -1) {
            start += name.length + 1;
            var end = document.cookie.indexOf(';', start);
            if (end == -1) {
                end = document.cookie.length;
            }
            return decodeURIComponent(document.cookie.substring(start, end));
        }
    }
    return null;
}
function playSound(id) {
    try {
        document.getElementById(id).play();
    }
    catch (e) {
    }
}
function showMsg(title, message) {
    if (window.Notification && Notification.permission !== 'denied') {
        Notification.requestPermission(function (status) {
            new Notification(title, { body: message });
        });
    }
}
function stripComment(line) {
    var previous = '';
    var noComment = line;
    for (var i = 0; i < line.length; i++) {
        if (previous != '\\' && line[i] == '#') {
            noComment = line.substring(0, i);
            break;
        }
        previous = line[i];
    }
    noComment = noComment.replace(/\\#/g, '#');
    return noComment;
}
