var express=require("express");
var app=express();


var bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine","ejs");

var path = require('path')
var sortJsonArray = require('sort-json-array');



var a = require('serve-favicon');
app.use(a(path.join( 'outputDir', 'dfd.webp')))
 




app.get("/",function(req,res){
	
var requestl=require("request");


requestl("https://covid19-server.chrismichael.now.sh/api/v1/IndiaCasesByStates",function(err,response,body){
	
	if(err){
		console.log(err);
	}
	else{
		
		var parsedData= JSON.parse(body);
	
		console.log(body['data']);
		console.log(parsedData);
		parsedData['data'].forEach(function(fr){
		
			
			res.render("covid.ejs",{items:	sortJsonArray(fr['table'],'state')});
		});
		
	
	}
	
});
	
});

app.listen(process.env.PORT ||3000,process.env.IP,function(){
	
	console.log("server has statrted");
	
});
