#!/usr/bin/env node
function removeBag(color){
    var cleanString = new String;
    var nospace = color.split(" ");
    for(i in nospace){
        if(!nospace[i].match(/bag|bags/) && i>0) cleanString+=" ";
        if(!nospace[i].match(/bag|bags/)) cleanString+=nospace[i];   
    }
    return cleanString;
}

function extractNumber(rule){
    if(rule==="no other bags"){
        return {count:0,color:"no other bags"};
    }
    rule = removeBag(rule);
    var nospace=rule.split(" ");
    var r = {}
    r.count = nospace[0];
    r.color = new String;
    for(i in nospace){
        if(i>1 && !nospace[i].match(/bag|bags/)) r.color+=" ";
        if(i>0 && !nospace[i].match(/bag|bags/)) r.color+=nospace[i];
    }
    return r;
}

function checkBag(outer,goal,rules,winner,tabs){
    //var outer = i_outer;
    if(winner.didWeWin){
        //console.log("Winning Bag!!!")
        return;
    } 
    for(i in outer){
        if(outer[i].color === "no other bags") return;

        //var color = extractNumber(outer[i]);
        else if(goal === outer[i].color){
            winner.didWeWin=true;
            //console.log("Winner!!!!");
            return;
        }
        else{
            //console.log(tabs+"checking bag "+outer[i].color);
            checkBag(rules[outer[i].color], goal, rules, winner, tabs+"  ");
        }
    }
    
}
var fs = require('fs');
var array = fs.readFileSync('my-file.txt').toString().split(".\n");
//console.log(array);

const winningBag = "shiny gold";

var count = 0;
var rules = [];

//Load in rules
for(i in array) {
    var line = array[i].split(" bags contain ");
    var outer = line[0];
    var inners = line[1].split(", ");
    for(j in inners){
        inners[j] = extractNumber(inners[j]);
    }
    rules[outer]=inners;
}

console.log(rules.length);
//Check if you can have other bags
for(const i in rules){
    console.log("checking "+i);
    var winner = { didWeWin:false};
    var tempbag = rules[i];
    //var tempwinner = i;
    checkBag(tempbag,winningBag,rules,winner,"");
    
    if(winner.didWeWin){ 
        count++;
        console.log("🎄winner🎄 " + i);
    }
}

console.log("🎄🎫🎄: "+count);