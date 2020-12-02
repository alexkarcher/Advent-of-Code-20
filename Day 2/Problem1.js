#!/usr/bin/env node
var fs = require('fs');
var array = fs.readFileSync('my-file.txt').toString().split("\n");
var answers = [];
for(i = 0; i < array.length; i++) {
    for (j = i; j < array.length; j++){
        if(+array[i]+ +array[j] == 2020){
            console.log(+array[i]* +array[j]);
        }
    }
}