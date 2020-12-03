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

var speeds = [1,3,5,7];
var positions = [0,0,0,0];
var trees = [0,0,0,0];

for(i in array){
    for(p in positions){
        if(array[i][positions[p]] === "#"){
            trees[p]++;
        }
        positions[p]+=speeds[p];
        if(positions[p]>=array[i].length)
            positions[p]-=array[i].length;
    }
}

for(x in trees){
    console.log("🎄"+trees[x]);
    tree = trees[x]*tree;
}

console.log("🎄🛷🎄: "+tree);