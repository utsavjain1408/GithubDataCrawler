import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import axios from 'axios'
import sleep from 'system-sleep'
import http from 'http'
//import getJSON from 'get-json'

const PORT = 1206

const app = express()

var usersIDList =[]
var options = {
    "method": "GET",
    "hostname": "api.github.com",
    "port": null,
    "path": "/users/utsavjain1408/followers",
    "headers": {
      "part": "utsavjain1408",
      "cache-control": "no-cache",
      "postman-token": "7cf1a4b6-1bc0-9ec9-4e6f-93b62735205b"
    }
  };

app.listen(PORT, ()=>{
    console.log(`Bro the server is running on ${PORT}`)
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.get('/', (req,resp)=>{
    var request = require("request");

    var options = { method: 'GET',
      url: 'https://api.github.com/users/octocat/followers',
      headers: 
       { 'postman-token': '320f088b-02fd-5ec8-4081-878a3ec16aec',
         'cache-control': 'no-cache',
        'User-Agent' : 'utsavjain1408' } };
    
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
    
      console.log(body);
      var j = JSON.parse(body)
      // all followers 
      j.forEach((val)=>{
        if(!usersIDList.includes(val.followers_url.slice(29,-10))){  
                val.followers_url = val.followers_url.slice(29,-10)
                usersIDList.push( val.followers_url)
            }
        })
      resp.send(usersIDList)
    });
})
