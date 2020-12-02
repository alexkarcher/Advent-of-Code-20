#!/usr/bin/env node
var fs = require('fs');
var array = fs.readFileSync('my-file.txt').toString().split("\n");
var answers = [];
for(i = 0; i < array.length; i++) {
    for (j = i; j < array.length; j++){
        for(q = j; q < array.length; q++){
            if(+array[i]+ +array[j] + +array[q] == 2020){
                console.log(+array[i]* +array[j]* +array[q]);
            }
        }
    }
}