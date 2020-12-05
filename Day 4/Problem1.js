#!/usr/bin/env node
var fs = require('fs');
var array = fs.readFileSync('my-file.txt').toString().split("\n");
//console.log(array);

var passport = {
    "byr":false,
    "iyr":false,
    "eyr":false,
    "hgt":false,
    "hcl":false,
    "ecl":false,
    "pid":false,
    "cid":false
};

var validpassports = 0;

function countpassport(p1){
    var fields = 0;
    for(j in p1){
        if(p1[j] && j!=="cid"){
            fields++;
        }
    }
    if(fields === 7){
        validpassports++;
        console.log("🚨Valid Passport");
    }
    for(j in p1)p1[j] = false;
}

for(i in array) {
    if(array[i]!==""){
        var line = array[i].split(" ");
        console.log(line);
        for(x in line){
            field = line[x].split(":");
            id = field[0];
            value = field[1];

            switch (id){
                case "ecl":
                    passport.ecl = true;
                    break;
                case "pid":
                    passport.pid = true;
                    break;
                case "eyr":
                    passport.eyr = true;
                    break;
                case "hcl":
                    passport.hcl = true;
                    break;
                case "byr":
                    passport.byr = true;
                    break;
                case "iyr":
                    passport.iyr = true;
                    break;
                case "cid":
                    passport.cid = true;
                    break;
                case "hgt":
                    passport.hgt = true;
                    break;
            }
        }
    }
    else{
        countpassport(passport);
    }
}
countpassport(passport);

console.log("🎄🎫🎄: "+validpassports);