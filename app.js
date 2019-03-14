var d2gsi = require('dota2-gsi-sockets');
var io = require('socket.io-client');
var server = new d2gsi();

var hero_name;
var last_health = 0;
var last_mana = 0;
var skill1_passive = false;
var skill2_passive = false;
var skill3_passive = false;
var skill4_passive = false;
var skill5_passive = false;
var skill6_passive = false;
var ability_name_1;
var ability_name_2;
var ability_name_3;
var ability_name_4;
var ability_name_5;
var ability_name_6;
var hero_name;
// Connect to the socket
var socket = io('http://localhost:3000');

socket.on('newclient', (client) => {
    console.log("New client connection, IP address: " + client.ip);
    if (client.auth && client.auth.token) {
        console.log("Auth token: " + client.auth.token);
    } else {
        console.log("No Auth token");
    }
});
socket.on('hero:name', function(name) {
    hero_name = toTitleCase(name.replace(/_/g, ' ')).replace("Npc Dota Hero ","");
    console.log(hero_name + " selected!")
});
socket.on('abilities:ability0:name', function(name) {
    ability_name_1 = toTitleCase(name.replace(/_/g, ' ')).replace(hero_name+" ", "");
    console.log(ability_name_1 + " set!")
});
socket.on('abilities:ability1:name', function(name) {
    ability_name_2 = toTitleCase(name.replace(/_/g, ' ')).replace(hero_name+" ", "");
    console.log(ability_name_2 + " set!")
});
socket.on('abilities:ability2:name', function(name) {
    ability_name_3 = toTitleCase(name.replace(/_/g, ' ')).replace(hero_name+" ", "");
    console.log(ability_name_3 + " set!")
});
socket.on('abilities:ability3:name', function(name) {
    ability_name_4 = toTitleCase(name.replace(/_/g, ' ')).replace(hero_name+" ", "");
    console.log(ability_name_4 + " set!")
});
socket.on('abilities:ability4:name', function(name) {
    ability_name_5 = toTitleCase(name.replace(/_/g, ' ')).replace(hero_name+" ", "");
    console.log(ability_name_5 + " set!")
});
socket.on('abilities:ability5:name', function(name) {
    ability_name_6 = toTitleCase(name.replace(/_/g, ' ')).replace(hero_name+" ", "");
    console.log(ability_name_6 + " set!")
});
socket.on('draft:activeteam', (msg) => {
    console.log("The active team drafting has changed to " + msg);
});
// socket.on('hero:team2:player0:alive', (isAlive) => {
socket.on('hero:alive', (isAlive) => {
    if (isAlive) {
        console.log("Player 0 has respawned");
    } else {
        console.log("Player 0 has been killed!");
    }
});

socket.on('hero:health_percent', function(health) {
     if ((health > last_health + 10) || (health < last_health - 10)){
        last_health = health
        console.log('My health is: ' + health)
        // request(live_health_mana_server+'health/' + (Math.round(health / 10) * 10), function (error, response, body) {});
        // console.log('Passed to server: ' + live_health_mana_server+'health/' + (Math.round(health / 10) * 10))
     }
});

socket.on('hero:mana_percent', function(mana) {
    if ((mana > last_mana + 10) || (mana < last_mana - 10)){
       last_mana = mana
        console.log('My mana is: ' + mana)
        // request(live_health_mana_server+'mana/' + (Math.round(mana / 10) * 10), function (error, response, body) {});
        // console.log('Passed to server: ' + live_health_mana_server+'mana/' + (Math.round(mana / 10) * 10))
    }
});

socket.on('abilities:ability0:passive', function(passive) {
    if (passive){
        skill1_passive = true;
        // request(live_health_mana_server+'skill/1/on', function (error, response, body) {});
    }else{
        skill1_passive = false;
    }
});
socket.on('abilities:ability0:can_cast', function(can_cast) {
    if(skill1_passive != true){
        if (can_cast){
            console.log(ability_name_1 + " is ready!")
            // request(live_health_mana_server+'skill/1/on', function (error, response, body) {});
        }else{
        	console.log(ability_name_1 + " is on cooldown.")
            // request(live_health_mana_server+'skill/1/off', function (error, response, body) {});
        }
    }
});
socket.on('abilities:ability1:passive', function(passive) {
    if (passive){
        skill2_passive = true;
        // request(live_health_mana_server+'skill/2/on', function (error, response, body) {});
    }else{
        skill2_passive = false;
    }
});
socket.on('abilities:ability1:can_cast', function(can_cast) {
    if(skill2_passive != true){
    	if (can_cast){
    	    console.log(ability_name_2 + " is ready!")
    	    // request(live_health_mana_server+'skill/1/on', function (error, response, body) {});
    	}else{
    		console.log(ability_name_2 + " is on cooldown.")
    	    // request(live_health_mana_server+'skill/1/off', function (error, response, body) {});
    	}
    }
});
socket.on('abilities:ability2:passive', function(passive) {
    if (passive){
        skill3_passive = true;
        // request(live_health_mana_server+'skill/3/on', function (error, response, body) {});
    }else{
    	skill3_passive = false;
    }
});
socket.on('abilities:ability2:can_cast', function(can_cast) {
    if(skill3_passive != true){
    	if (can_cast){
    	    console.log(ability_name_3 + " is ready!")
    	    // request(live_health_mana_server+'skill/1/on', function (error, response, body) {});
    	}else{
    		console.log(ability_name_3 + " is on cooldown.")
    	    // request(live_health_mana_server+'skill/1/off', function (error, response, body) {});
    	}
    }
});
socket.on('abilities:ability3:passive', function(passive) {
    if (passive){
        skill4_passive = true;
        // request(live_health_mana_server+'skill/4/on', function (error, response, body) {});
    }else{
    	skill4_passive = false;
    }
});
socket.on('abilities:ability3:can_cast', function(can_cast) {
    if(skill4_passive != true){
    	if (can_cast){
    	    console.log(ability_name_4 + " is ready!")
    	    // request(live_health_mana_server+'skill/1/on', function (error, response, body) {});
    	}else{
    		console.log(ability_name_4 + " is on cooldown.")
    	    // request(live_health_mana_server+'skill/1/off', function (error, response, body) {});
    	}
    }
});

socket.on('abilities:ability4:passive', function(passive) {
    if (passive){
        skill5_passive = true;
        // request(live_health_mana_server+'skill/4/on', function (error, response, body) {});
    }else{
    	skill5_passive = false;
    }
});
socket.on('abilities:ability4:can_cast', function(can_cast) {
    if(skill5_passive != true){
    	if (can_cast){
    	    console.log(ability_name_5 + " is ready!")
    	    // request(live_health_mana_server+'skill/1/on', function (error, response, body) {});
    	}else{
    		console.log(ability_name_5 + " is on cooldown.")
    	    // request(live_health_mana_server+'skill/1/off', function (error, response, body) {});
    	}
    }
});

socket.on('abilities:ability5:passive', function(passive) {
    if (passive){
        skill6_passive = true;
        // request(live_health_mana_server+'skill/4/on', function (error, response, body) {});
    }else{
    	skill5_passive = false;
    }
});
socket.on('abilities:ability5:can_cast', function(can_cast) {
    if(skill6_passive != true){
    	if (can_cast){
    	    console.log(ability_name_6 + " is ready!")
    	    // request(live_health_mana_server+'skill/1/on', function (error, response, body) {});
    	}else{
    		console.log(ability_name_6 + " is on cooldown.")
    	    // request(live_health_mana_server+'skill/1/off', function (error, response, body) {});
    	}
    }
});

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}