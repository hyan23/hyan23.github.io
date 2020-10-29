var Line = (function () {
    function Line(line_num, raw_text, line) {
        this.line_num = line_num;
        this.raw_text = raw_text;
        this.line = line;
    }
    Line.prototype.toString = function () {
        return '(' + this.line_num + ') ' + this.raw_text;
    };
    return Line;
}());
function accumulate_times(lines) {
    var hours = 0, minutes = 0, seconds = 0;
    var errList = [];
    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
        var line = lines_1[_i];
        var trimmed = line.line.trim();
        if (trimmed.length > 0) {
            if (/^\d+\s*min$/i.test(trimmed)) {
                minutes += parseInt(trimmed.replace(/min/i, '').trim());
            }
            else if (/^\d+$|^\d+\s*[\.:]\s*\d+$|^\d+\s*[\.:]\s*\d+\s*[\.:]\s*\d+$/.test(trimmed)) {
                var components = trimmed.split(/[\.:]/);
                console.assert([1, 2, 3].includes(components.length));
                if (components.length == 1) {
                    hours += parseInt(components[0].trim());
                }
                else if (components.length == 2) {
                    hours += parseInt(components[0].trim());
                    minutes += parseInt(components[1].trim());
                }
                else if (components.length == 3) {
                    hours += parseInt(components[0].trim());
                    minutes += parseInt(components[1].trim());
                    seconds += parseInt(components[2].trim());
                }
            }
            else {
                errList.push('SyntaxError: ' + line);
            }
        }
    }
    if (errList.length > 0) {
        return { 'err': errList };
    }
    else {
        minutes += ~~(seconds / 60);
        seconds = seconds % 60;
        hours += ~~(minutes / 60);
        minutes = minutes % 60;
        return { 'minutes': minutes, 'seconds': seconds, 'hours': hours };
    }
}
