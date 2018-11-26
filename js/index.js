var content = document.getElementById("content");
var td = document.getElementsByClassName("td");
var start = document.getElementById("start");
var tiem = document.getElementById("tiem");
var helpbottom = document.getElementById("helpbottom");

function Test() {}
Test.prototype.init = function() {
    var tdW = parseInt(getComputedStyle(content).width);
    var tdH = parseInt(getComputedStyle(content).height);
    for (var i = 0; i < td.length; i++) {
        td[i].style.width = (tdW - 15) / 15 + "px";
        td[i].style.height = (tdH - 15) / 15 + "px";
    }
    start.onclick = function() {};
    tiem.onclick = function() {};
    helpbottom = function() {};
}
var test = new Test();
test.init();
console.log(Test());