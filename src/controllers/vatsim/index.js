'use strict';
const Discord = require('discord.js');
const fetch = require("node-fetch");
var text = "";

fetch('http://us.data.vatsim.net/vatsim-data.txt')
    .then(response => response.text())
    .then(text => console.log(JSON.parse(text)))

var timerID = setInterval(function() {
    fetch('http://us.data.vatsim.net/vatsim-data.txt')
    .then(response => response.text())
    .then(text => console.log(text))
}, 120 * 1000); 


const vatsimController = message => {

    message.channel.send('Vatsim!');
};





module.exports = vatsimController;
