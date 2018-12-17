// websocket
var ws = require("nodejs-websocket");
console.log("开始建立连接...")
var $controller = null,$display = null , $controllerReady = false , $displayReady = false;
var server = ws.createServer(function(conn){
    conn.on("text", function (str) {
        console.log("收到的信息为:"+str)
        if(str === "😏") {
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
        conn.sendText("😃")
    })
    conn.on("close", function (code, reason) {
        console.log("关闭连接")
    });
    conn.on("error", function (code, reason) {
        console.log("异常关闭")
    });
}).listen(8111)
console.log("WebSocket建立完毕");

// web server
var c = require('child_process');
var os = require('os');
var express = require("express");
var app = express();
app.use(express.static("./")).listen(8000);

var getIPAddress = function () {
  var ifaces = os.networkInterfaces();
  var ip = '';
  for (var dev in ifaces) {
    ifaces[dev].forEach(function (details) {
      if (ip === '' && details.family === 'IPv4' && !details.internal) {
        ip = details.address;
        return;
      }
    });
  }
  return ip || "127.0.0.1";
};
let hostname = getIPAddress();
let ipAdress = `http://${hostname}:8000`;
c.exec(`start ${ipAdress}`);