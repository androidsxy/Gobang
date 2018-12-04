var content = document.getElementById("content");
var td = document.getElementsByClassName("td");
var start = document.getElementById("start");
var tiem = document.getElementById("tiem");
var helpbottom = document.getElementById("helpbottom");
var help = document.getElementById("help");
var both_sides = document.getElementById("both_sides");
var popup_content = document.getElementById("popup_content");
var popup = document.getElementById("popup");
var button = document.getElementById("button");
var audio = document.getElementById("audio");
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
var cont = 0;
var temts = 20;
var tmem;

function Test() {}
//生成棋子
Test.prototype.piece = function(a, event) {
        audio.play();
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
            if (isWhitebole) {
                piecediv.style.backgroundColor = "white";
                piecediv.setAttribute("class", "piece_white");
                both_sides.style.color = "black";
                both_sides.innerHTML = "黑棋走..";
                pieceList.push([left / 26, top / 26, "white"]);
                isWhitebole = false;
            } else {
                piecediv.style.backgroundColor = "black";
                piecediv.setAttribute("class", "piece_black");
                both_sides.style.color = "white";
                both_sides.innerHTML = "白棋走..";
                pieceList.push([left / 26, top / 26, "black"]);
                isWhitebole = true;
            }
            piecediv.onclick = function(event) {
                alert("此处以有棋子");
                event.stopPropagation();
            }
            this.game_Over(pieceList, piecediv);
            console.log(pieceList);
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
    start.onclick = function() {
        popup_content.style.display = "none";
        popup.style.display = "none";
        that.setTmen();
    };
    tiem.onclick = function(event) { event.stopPropagation() };
    helpbottom.onclick = function(event) {
        help.style.display = "block"
        popup.style.display = "block";
        event.stopPropagation()
    };
    content.onclick = function(event) {
        that.piece(this, event);
    };
    button.onclick = function() {
        help.style.display = "none"
        popup.style.display = "none";
        event.stopPropagation()
    }

}
Test.prototype.setTmen = function() {
        var that = this;
        temts = 20;
        tiem.innerHTML = temts;
        tmem = setInterval(function() {
            temts--;
            tiem.innerHTML = temts;
            if (temts == 0) {
                if (pieceList.length > 0) {
                    if (pieceList[pieceList.length - 1][2] == "white") {
                        alert("白棋获胜");
                    } else {
                        alert("黑棋获胜！");
                    }
                } else {
                    alert("白棋获胜！");
                }
                temts = 20;
                tiem.innerHTML = temts;
                that.colon();
                clearInterval(tmem);
            }
        }, 1000);
    }
    //游戏是否完成 左右
Test.prototype.game_Over = function(list, piecediv) {
        for (var u = 1; u < 5; u++) {
            var cont1 = cont;
            for (var a = 0; a < list.length; a++) {
                if ((list[list.length - 1][0] + u) == list[a][0] && list[list.length - 1][1] == list[a][1] && list[list.length - 1][2] == list[a][2]) {
                    cont++;
                }
            }
            if (cont1 == cont) {
                break;
            }
        };
        for (var u = 1; u < 5; u++) {
            var cont1 = cont;
            for (var a = 0; a < list.length; a++) {
                if ((list[list.length - 1][0] - u) == list[a][0] && list[list.length - 1][1] == list[a][1] && list[list.length - 1][2] == list[a][2]) {
                    cont++;
                }
            }
            if (cont1 == cont) {
                break;
            }
        };
        if (cont >= 4) {
            if (list[list.length - 1][2] == "white") {
                alert("白棋获胜！");
            } else {
                alert("黑棋获胜！");
            }
            this.colon();
        } else {
            cont = 0;
            this.game_Over_lerig(list, piecediv);
        }
    }
    //上下
Test.prototype.game_Over_lerig = function(list, piecediv) {
        for (var u = 1; u < 5; u++) {
            var cont1 = cont;
            for (var a = 0; a < list.length; a++) {
                if ((list[list.length - 1][0]) == list[a][0] && (list[list.length - 1][1] + u) == list[a][1] && list[list.length - 1][2] == list[a][2]) {
                    cont++;
                }
            }
            if (cont1 == cont) {
                break;
            }
        };
        for (var u = 1; u < 5; u++) {
            var cont1 = cont;
            for (var a = 0; a < list.length; a++) {
                if (list[list.length - 1][0] == list[a][0] && (list[list.length - 1][1] - u) == list[a][1] && list[list.length - 1][2] == list[a][2]) {
                    cont++;
                }
            }
            if (cont1 == cont) {
                break;
            }
        };
        if (cont >= 4) {
            if (list[list.length - 1][2] == "white") {
                alert("白棋获胜！");
            } else {
                alert("黑棋获胜！");
            }
            this.colon();
        } else {
            cont = 0;
            this.game_Over_left_top_rigth_bottom(list, piecediv);
        }
    }
    //左上 右下
Test.prototype.game_Over_left_top_rigth_bottom = function(list, piecediv) {
    for (var u = 1; u < 5; u++) {
        var cont1 = cont;
        for (var a = 0; a < list.length; a++) {
            if ((list[list.length - 1][0] + u) == list[a][0] && (list[list.length - 1][1] + u) == list[a][1] && list[list.length - 1][2] == list[a][2]) {
                cont++;
            }
        }
        if (cont1 == cont) {
            break;
        }
    };
    for (var u = 1; u < 5; u++) {
        var cont1 = cont;
        for (var a = 0; a < list.length; a++) {
            if ((list[list.length - 1][0] - u) == list[a][0] && (list[list.length - 1][1] - u) == list[a][1] && list[list.length - 1][2] == list[a][2]) {
                cont++;
            }
        }
        if (cont1 == cont) {
            break;
        }
    };
    if (cont >= 4) {
        if (list[list.length - 1][2] == "white") {
            alert("白棋获胜！");
        } else {
            alert("黑棋获胜！");
        }
        this.colon();
    } else {
        cont = 0;
        this.game_Over_rigth_top_left_bottom(list, piecediv);

    }
}
Test.prototype.game_Over_rigth_top_left_bottom = function(list, piecediv) {
    for (var u = 1; u < 5; u++) {
        var cont1 = cont;
        for (var a = 0; a < list.length; a++) {
            if ((list[list.length - 1][0] - u) == list[a][0] && (list[list.length - 1][1] + u) == list[a][1] && list[list.length - 1][2] == list[a][2]) {
                cont++;
            }
        }
        if (cont1 == cont) {
            break;
        }
    };
    for (var u = 1; u < 5; u++) {
        var cont1 = cont;
        for (var a = 0; a < list.length; a++) {
            if ((list[list.length - 1][0] + u) == list[a][0] && (list[list.length - 1][1] - u) == list[a][1] && list[list.length - 1][2] == list[a][2]) {
                cont++;
            }
        }
        if (cont1 == cont) {
            break;
        }
    };
    if (cont >= 4) {
        if (list[list.length - 1][2] == "white") {
            alert("白棋获胜！");
        } else {
            alert("黑棋获胜！");
        }
        this.colon();
    } else {
        cont = 0;
        clearInterval(tmem);
        this.setTmen();
        content.appendChild(piecediv);
    }
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
        cont = 0;
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