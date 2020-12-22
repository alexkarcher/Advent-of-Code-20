#!/usr/bin/env node

function makeInstruction(input){
    input = input.split(" ");
    var output = {};
    output.op = input[0];
    output.sign = input[1].substring(0,1)==="+";
    output.num = parseInt(input[1].substring(1));
    return output;
}

function testInstructions(array){
    let accumulator = 0;
    let index = 0;

    var visited = {};

    while(1){
        if(index >= array.length){
            return accumulator;
        }
        else if(visited.hasOwnProperty(index)){
            return false;
        }

        else{
            visited[index]=true;
        }

        if(array[index].op === "nop"){
            index++;
        } 
        else if(array[index].op === "jmp"){
            if(array[index].sign) index += array[index].num;
            else index -= array[index].num;
        }
        else if(array[index].op === "acc"){
            if(array[index].sign) accumulator += array[index].num;
            else accumulator -= array[index].num;
            index++;
        }
        else{
            console.log("🚨Something is wrong🚨")
        }
    }

    
}

var fs = require('fs');
var array = fs.readFileSync('my-file.txt').toString().split("\n");

for(i in array){
    array[i]=makeInstruction(array[i]);
}

for(i in array){
    let answer = false;
    if(array[i].op === "jmp"){
        array[i].op = "nop";
        answer = testInstructions(array);
        array[i].op = "jmp";
    }
    else if(array[i].op === "nop"){
        array[i].op = "jmp";
        answer = testInstructions(array);
        array[i].op = "nop";
    }

    console.log(answer);
    if(answer === false){
        //console.log("Sad!");
    }
    else{
        console.log("🎰🎰🎰" + answer);
    }

}