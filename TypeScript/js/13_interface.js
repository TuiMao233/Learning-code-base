"use strict";
function printName(name) {
    console.log(name.firstName + "---" + name.secondName);
}
function printInfo(name) {
    console.log(name.firstName + "---" + name.secondName);
}
printInfo({
    firstName: '张',
    secondName: '三'
});
printName({
    age: 20,
    firstName: '张',
    secondName: '三'
});
