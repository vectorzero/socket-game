var ws = require("nodejs-websocket");
console.log("开始建立连接...")

var $controller = null,$display = null , $controllerReady = false , $displayReady = false;
var server = ws.createServer(function(conn){
    conn.on("text", function (str) {
        console.log("收到的信息为:"+str)
        if(str === "controller") {
            $controller = conn;
            $controllerReady = true;
            conn.sendText("success");
        }
        if(str === "display") {
            $display = conn;
            $displayReady = true;
        }
        if($controllerReady && $displayReady){
            $display.sendText(str);
        }
        conn.sendText("Let's go!")
    })
    conn.on("close", function (code, reason) {
        console.log("关闭连接")
    });
    conn.on("error", function (code, reason) {
        console.log("异常关闭")
    });
}).listen(8111)
console.log("WebSocket建立完毕")