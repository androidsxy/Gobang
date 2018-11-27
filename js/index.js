var content = document.getElementById("content");
var td = document.getElementsByClassName("td");
var start = document.getElementById("start");
var tiem = document.getElementById("tiem");
var helpbottom = document.getElementById("helpbottom");
var both_sides = document.getElementById("both_sides");
var isWhitebole = false;
//保存一下棋子
var pieceList = [];
//是否存在棋子
var pieceListBole = 0;
//白棋
var whitepiece = [];
//黑棋
var blackepiece = [];

function Test() {}
//生成棋子
Test.prototype.piece = function(a, event) {
        var setX = event.layerX;
        var setH = event.layerY;
        var left = Math.round(setX / 26) * 26;
        var top = Math.round(setH / 26) * 26;
        for (var i = 0; i < pieceList.length; i++) {
            if (pieceList[i][0] == left / 26 && pieceList[i][1] == top / 26) {
                pieceListBole++;
            }
        }
        if (pieceListBole == 0) {
            var piecediv = document.createElement('div');
            piecediv.style.position = "absolute";
            piecediv.style.left = left - 10 + "px";
            piecediv.style.top = top - 10 + "px";
            piecediv.style.width = "20px";
            piecediv.style.height = "20px";
            piecediv.style.borderRadius = "50%";
            pieceList.push([left / 26, top / 26]);
            if (isWhitebole) {
                piecediv.style.backgroundColor = "white";
                piecediv.setAttribute("class", "piece_white");
                both_sides.style.color = "black";
                both_sides.innerHTML = "黑棋走..";
                whitepiece.push([left / 26, top / 26]);
                isWhitebole = false;
            } else {
                piecediv.style.backgroundColor = "black";
                piecediv.setAttribute("class", "piece_black");
                both_sides.style.color = "white";
                both_sides.innerHTML = "白棋走..";
                blackepiece.push([left / 26, top / 26]);
                isWhitebole = true;
            }
            piecediv.onclick = function(event) {
                alert("此处以有棋子");
                event.stopPropagation();
            }
            this.paixu(pieceList);
            this.paixu(whitepiece);
            this.paixu(blackepiece);
            for (var i = 0; i < whitepiece.length; i++) {
                if (i + 1 < whitepiece.length && whitepiece[i][0] + 1 == whitepiece[i + 1][0]) {

                }
            }
            content.appendChild(piecediv);
        } else {
            pieceListBole = 0;
            alert("此处以有棋子");
        }
    }
    //初始化表格 点击事件
Test.prototype.init = function() {
        var that = this;
        var tdW = parseInt(getComputedStyle(content).width);
        var tdH = parseInt(getComputedStyle(content).height);
        for (var i = 0; i < td.length; i++) {
            td[i].style.width = (tdW - 15) / 15 + "px";
            td[i].style.height = (tdH - 15) / 15 + "px";
        }
        start.onclick = function() {};
        tiem.onclick = function(event) { event.stopPropagation() };
        helpbottom.onclick = function(event) { event.stopPropagation() };
        content.onclick = function(event) {
            that.piece(this, event);
        };
    }
    //游戏是否完成
Test.prototype.game_Over = function() {
    alert("游戏结束！！！");
}
Test.prototype.paixu = function(list) {
    list.sort(function(x, y) {
        return x[0] - y[0]; //按照二维数组arr1中每个数组元素（数组）的第二个元素升序排列
    });
}
var test = new Test();
test.init();