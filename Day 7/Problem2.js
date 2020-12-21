#!/usr/bin/env node
function removeBag(color){
    var cleanString = new String;
    var nospace = color.split(" ");
    for(i in nospace){
        if(!nospace[i].match(/bag|bags|bags.|bag./) && i>0) cleanString+=" ";
        if(!nospace[i].match(/bag|bags|bags.|bag./)) cleanString+=nospace[i];   
    }
    return cleanString;
}

function extractNumber(rule){
    rule = removeBag(rule);
    if(rule==="no other"){
        return {count:0,color:"no other bags"};
    }
    var nospace=rule.split(" ");
    var r = {}
    r.count = parseInt(nospace[0]);
    r.color = new String;
    for(i in nospace){
        if(i>1 && !nospace[i].match(/bag|bags/)) r.color+=" ";
        if(i>0 && !nospace[i].match(/bag|bags/)) r.color+=nospace[i];
    }
    return r;
}

function checkBag(outer,rules,count,multiplyer,tabs){
    for(i in outer){
        if(outer[i].color !== "no other bags"){
            count.count+=outer[i].count*multiplyer;
            console.log(tabs+count.count+ " "+outer[i].color);
            checkBag(rules[outer[i].color], rules, count,multiplyer * outer[i].count, tabs+"  ");
        }
    }
    return;
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
var bagcount = {count:0};
var tempbag = rules[winningBag];
checkBag(tempbag,rules,bagcount,1,"");

console.log("🎄🎫🎄: "+bagcount.count);