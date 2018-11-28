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
//是否结束游戏
var s = 0;

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
                whitepiece.push([left / 26, top / 26, "white"]);
                isWhitebole = false;
            } else {
                piecediv.style.backgroundColor = "black";
                piecediv.setAttribute("class", "piece_black");
                both_sides.style.color = "white";
                both_sides.innerHTML = "白棋走..";
                blackepiece.push([left / 26, top / 26, "black"]);
                isWhitebole = true;
            }
            piecediv.onclick = function(event) {
                alert("此处以有棋子");
                event.stopPropagation();
            }
            this.paixu(pieceList);
            this.paixu(whitepiece);
            this.paixu(blackepiece);
            this.game_Over(whitepiece, piecediv);
            this.game_Over(blackepiece, piecediv);
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
Test.prototype.game_Over = function(list, piecediv) {
    var listStat = [];
    console.log(list, ">>>>>>>>>>>>>>>>>>>>>>>>>>");
    for (var i = 0; i < list.length; i++) {
        listStat.push(list[i]);
        for (var a = 1; a < list.length - i; a++) {
            if (list[i][1] == list[i + a][1]) {
                listStat.push(list[i + a]);
            } else if (listStat.length >= 5) {
                this.paixu1(listStat)
                console.log(listStat);
                for (var c = 0; c < listStat.length; c++) {
                    for (var v = 1; v < listStat.length - c; v++) {
                        if (listStat[c][0] + v == listStat[c + v][0]) {
                            s++;
                        } else {
                            s = 0;
                        }
                    }
                    if (s == 4) {
                        return;
                    }
                }
                if (s == 4) {
                    listStat[0][2] == "black" ? alert("黑棋胜利！！！") : alert("白棋胜利！！！");
                    s = 0;
                    return;
                }
            } else {
                listStat = [];
            }

        }
    }
    content.appendChild(piecediv);
}
Test.prototype.paixu = function(list) {
    list.sort(function(x, y) {
        return x[1] - y[1]; //按照二维数组arr1中每个数组元素（数组）的第二个元素升序排列
    });
}
Test.prototype.paixu1 = function(list) {
    list.sort(function(x, y) {
        return x[0] - y[0]; //按照二维数组arr1中每个数组元素（数组）的第一个元素升序排列
    });
}
Test.prototype.colon = function() {
        isWhitebole = false;
        //保存一下棋子
        pieceList = [];
        //是否存在棋子
        pieceListBole = 0;
        //白棋
        whitepiece = [];
        //黑棋
        blackepiece = [];
        //是否结束游戏
        s = 0;
        //黑棋先
        both_sides.style.color = "black";
        both_sides.innerHTML = "黑棋先..";
        //清除棋子
        this.removeClass("piece_white");
        this.removeClass("piece_black");

    }
    //清除棋盘
Test.prototype.removeClass = function(className) {
        var ele = document.getElementsByClassName(className);
        while (ele.length > 0) {
            ele[0].parentNode.removeChild(ele[0]);
        }
    }
    //去除不符合规则棋子的影响
Test.prototype.duplicateRemoval = function(res) {
    var result = [];
    for (var i = 0; i < res.length; i++) {
        for (var j = i + 1; j < res.length; j++) {
            if (res[i][0] === res[j][0]) {
                j = ++i;
            }
        }
        result.push(res[i]);
    }
    console.log(result);
    return result;
}
var test = new Test();
test.init();