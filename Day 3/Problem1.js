#!/usr/bin/env node
var fs = require('fs');
var array = fs.readFileSync('my-file.txt').toString().split("\n");
//console.log(array);

var tree = 0;
var position = 0;

for(i = 0; i < array.length; i+=2) {
    if(array[i][position] === "#"){
        tree++;
    }    
    position+=1;
    if(position>=array[i].length){
        position-=array[i].length;
    }
}

console.log("🎄🛷🎄: "+tree);