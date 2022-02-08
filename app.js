const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){
    
    const query=req.body.cityName
const apiKey="e2c64ff2adfc8b26a54e9d6a849bfd4c"
const unit="metric"
const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
https.get(url,function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
        const weatherData=JSON.parse(data)
        const temp=weatherData.main.temp
        const weatherIcon=weatherData.weather[0].icon
        const weatherDescription=weatherData.weather[0].description
        
        res.write("<h1>the weather is currently "+ weatherDescription +"</h1>");
        res.write("<h1>the temperature in "+query+" is"+temp+"degree celcius</h1>");
    })
})
})


app.listen(5000,function(){
    console.log("port started at 5000");
})