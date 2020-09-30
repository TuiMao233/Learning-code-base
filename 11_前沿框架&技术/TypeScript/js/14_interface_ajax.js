"use strict";
function ajax(config) {
    var xhr = new XMLHttpRequest();
    xhr.open(config.type, config.url, true);
    xhr.send(config.data);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log('---成功---');
            if (config.dataType == 'json') {
                JSON.parse(xhr.responseText);
            }
            console.log(xhr.responseText);
        }
    };
}
ajax({
    type: 'GET',
    url: 'http://www.baidu.com',
    dataType: 'json'
});
