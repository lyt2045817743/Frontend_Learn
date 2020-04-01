var http=require('http');
var url=require('url');
var dns=require("dns");
var querystring=require("querystring");
var fs=require("fs");
var util=require("util")

http.createServer(function(req,res){
    var pathname=url.parse(req.url).pathname;
    if(pathname=="/parse"){
        goPost(req,res);
    }else if(pathname=="/" || pathname=="/index"){
        goIndex(res);
    }
    else{
        goDefault(res);
    }
}).listen(3000);

function goPost(req,res){
    var postData="";
    req.setEncoding("utf8");
    req.addListener("data",function(postDataChunk){
        postData += postDataChunk;
    })
    req.addListener("end",function(){
        var data=querystring.parse(postData);
        dns.resolve4(data.search_dns,function(err,addresses){
            if(err){
                throw new Error();
            }else{
                res.writeHead(200,{'Content-type':"text/plain"});
                res.end(util.inspect(addresses));
            }
        })
    })
}

function goIndex(res){
    var pathname=__dirname+'/'+url.parse("index.html").pathname;
    var data=fs.readFileSync(pathname,'utf-8');
    res.writeHead(200,{"Content-type":"text/html"});
    res.end(data);
}

function goDefault(res){
    res.writeHead(404);
    res.end("The page is not founded")
}
console.log("server start");
