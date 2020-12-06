#!/usr/bin/env node

function tree(input,high,low,toprange,bottomrange){
    if(input===''){
        //console.log("🎅🎅🎅🎅 "+toprange);
        return toprange;
    } 
    else if(input.substring(0,1) === high){
        //console.log("📈")
        bottomrange = (bottomrange+((toprange-bottomrange+1)/2));
    }
    else if(input.substring(0,1) === low){
        //console.log("📉")
        toprange = (toprange-((toprange-bottomrange+1)/2));
    }
    input = input.substring(1);
    return(tree(input,high,low,toprange,bottomrange));
}

function GetSeatID(row, column){
    return (row*8)+column;
}

var fs = require('fs');
var array = fs.readFileSync('my-file.txt').toString().split("\n");
//console.log(array);

var plane = new Array(128).fill(false);
for (i in plane){
    plane[i]= new Array(8).fill("no ticket");
}
var seatlist = new Array;

var highestId = -1;
for(i in array) {
    var rawseat = {
        row:array[i].substring(0,7),
        column:array[i].substring(7)
    }
    var row = tree(rawseat.row,"B","F",127,0);
    var column = tree(rawseat.column,"R","L",7,0)

    //console.log("Row: "+ row + " Column: "+column);
    plane[row][column] = false;
    seatlist.push(GetSeatID(row,column));
}

var previousseat;
for(q in seatlist){
//    console.log(seatlist[q]);
}

for(i in plane){
    var row = i;
    for(j in plane[i]){
        if(plane[i][j] === "no ticket"){
            row = row + ".";
            //console.log("💺💺💺💺💺 Row: "+ i + " Column: "+j);
            var currentId = GetSeatID(i, j);
            //console.log(currentId);
        }
        else row = row + "#";
    }
    console.log(row);
}
//console.log("🎄🎫🎄: "+currentId);