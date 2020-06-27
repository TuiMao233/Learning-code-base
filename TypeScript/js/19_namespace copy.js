"use strict";
var TS_19;
(function (TS_19) {
    var A;
    (function (A) {
        A.Animal = 70;
    })(A || (A = {}));
    // 两个命名空间不会产生冲突
    var B;
    (function (B) {
        B.Animal = 60;
    })(B || (B = {}));
    console.log(A.Animal); // 70
    console.log(B.Animal); // 60
})(TS_19 || (TS_19 = {}));
