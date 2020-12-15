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

function checkBag(i_outer,inner,rules,winner){
    //console.log("checking bag "+outer);
    var outer = i_outer;
    if(winner.didWeWin){
        //console.log("Winning Bag!!!")
        return;
    } 
    for(i in outer){
        if(outer[i] === "no other bags")return;

        var color = extractNumber(outer[i]);
        if(inner === color.color){
            winner.didWeWin=true;
            //console.log("Winner!!!!");
            return;
        }
        else{
            return checkBag(rules[color.color], inner, rules, winner);
        }
    }
    
}
var fs = require('fs');
var array = fs.readFileSync('my-file.txt').toString().split(".\n");
//console.log(array);

var winningBag = "shiny gold";

var count = 0;
var rules = [];

//Load in rules
for(i in array) {
    var line = array[i].split(" contain ");
    var outer = removeBag(line[0]);
    var inners = line[1].split(", ");
    rules[outer]=inners;
}

console.log(rules.length);
//Check if you can have other bags
for(i in rules){
    //console.log("i:"+i)
    var winner = { didWeWin:false };
    var tempbag = rules[i];
    var tempwinner = i;
    checkBag(tempbag,winningBag,rules,winner);
    
    if(winner.didWeWin && tempwinner!==winningBag){ 
        count++;
        console.log("winner " + tempwinner);
    }
}

console.log("🎄🎫🎄: "+count);