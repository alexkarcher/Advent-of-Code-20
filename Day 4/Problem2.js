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
    console.log("🎃Passport🎃")
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
        //console.log(line);
        for(x in line){
            var field = line[x].split(":");
            var id = field[0];
            var value = field[1];
            console.log("🔥"+id+":"+value);
            switch(id){
                case"byr":// (Birth Year) - four digits; at least 1920 and at most 2002.
                    if(value >= 1920 && value <= 2002){
                        passport[id] = true;
                        console.log("setting "+id);
                    }
                    break;
                case"iyr":// (Issue Year) - four digits; at least 2010 and at most 2020.
                    if(value >= 2010 && value <= 2020){
                        passport[id] = true;
                        console.log("setting "+id);
                    }
                    break;
                case"eyr":// (Expiration Year) - four digits; at least 2020 and at most 2030.
                    if(value >= 2020 && value <= 2030){
                        passport[id] = true;
                        console.log("setting "+id);
                    }
                    break;
                case"hgt":// (Height) - a number followed by either cm or in:
                        //cm, the number must be at least 150 and at most 193.
                        //in, the number must be at least 59 and at most 76.
                    num = value.substring(0,value.length-2);
                    unit = value.substring(value.length-2);
                    console.log(num+"📏"+unit)
                    if((unit === "cm" && num >= 150 && num <= 193)||(unit === "in" && num >= 59 && num <= 76)){
                        passport[id] = true;
                        console.log("setting "+id);
                    }
                    break;    
                case"hcl":// (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
                    if(value[0]==="#" && value.substring(1).match(/[0-9a-f]/g).length === value.substring(1).length){
                        passport[id] = true;
                        console.log("setting "+id);
                    }
                    break;
                case"ecl":// (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
                    eyes = value.match(/amb|blu|brn|gry|grn|hzl|oth/);
                    if(eyes !== null && eyes[0]===value){
                        passport[id] = true;
                        console.log("setting "+id);
                    }
                    break;
                case"pid":// (Passport ID) - a nine-digit number, including leading zeroes.
                    if(value.match(/[0-9]/g).length === value.length && value.length === 9){
                        passport[id] = true;
                        console.log("setting "+id);
                    }
                        break;
                case"cid":// (Country ID) - ignored, missing or not.
                    passport[id] = true;
                    console.log("setting "+id);
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