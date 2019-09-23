
const Discord = require('discord.js');
const bot = new Discord.Client();
const { token, metartoken } = require('./config.json');
var prefix = "!";
const weather = require('weather-js');
var nometar = "";
var valueICAO;
var valueTime;
var valueTemp;
var valueDewpoint;
var valueWinds;
var valueVisibility;
var valueAltimeter;
var valueClouds;
var valueFlightRules;
var valuespeech;
var valuecity;
var valuename;
var apicall = "";
console.log(prefix);


/*bot.on('message', async message => {

    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

    if (!prefixes[message.guild.id]) {
        prefixes[message.guild.id] = {
            prefixes: botconfig.prefix
        };
    }

    let prefix = prefixes[message.guild.id].prefixes;
    console.log(prefix);

})*/

bot.on('message', message =>{

    let msg = message.content.toUpperCase();
    let sender = message.author;
    let cont = message.content.slice(prefix.length).split(" ");
    let args = cont.slice(1);

    //start of my weirdness



/*
    if (msg.startsWith(prefix + "changeprefix")) {
        message.channel.startTyping(true);
        const prefixconst = message.content.slice(prefix.length).split(' ');
        prefix = message.content[1];
        console.log(prefix);
        console.log(prefixconst);
        
    }
*/
    
    if (msg === prefix + 'PING') {

        message.channel.send('Ping!');
    }

    if (msg.startsWith(prefix + 'PURGE')) {
        async function purge() {
            message.delete();

            if (!message.member.roles.find("name", "Owners")) {
                message.channel.send('You need the \`Owners\` role to use this command.');
                return;
            }
            
            if(isNaN(args[0])) {
                message.channel.send('Please use a number as your arguments. \n Usage: ' + prefix + 'purge <amount>');
                return;
            }

            const fetched = await message.channel.fetchMessages({limit: args[0]});
            console.log(fetched.size + ' messages found, deleting...');

            message.channel.bulkDelete(fetched)
            .catch(error => message.channel.send(`Error: ${error}`));

        }

        purge();

    
    }

    

    if (msg.startsWith(prefix + 'WEATHER')) {

        weather.find({search: args.join(" "), degreeType: 'F'}, function(err, result) {
            if (err) message.channel.send(err);


            if (result.length === undefined || result.length === 0) {
                message.channel.send('**Please enter a valid location.**')
                return;
            }
            

            var current = result[0].current;
            var location = result[0].location;
            
            const embed = new Discord.RichEmbed()
                .setDescription(`**${current.skytext}**`)
                .setAuthor(`Weather for ${current.observationpoint}`)
                .setThumbnail(current.imageUrl)
                .setColor(0x00AE86)
                .addField('Timezone', `UTC${location.timezone}`, true)
                .addField('Degree Type',location.degreetype, true)
                .addField('Temperature',`${current.temperature} Degrees`, true)
                .addField('Feels Like', `${current.feelslike} Degrees`, true)
                .addField('Winds',current.winddisplay, true)
                .addField('Humidity', `${current.humidity}%`, true)


                message.channel.send({embed});

            
        })

    }

    if (msg.startsWith(prefix + 'METAR')) {
        message.channel.startTyping(true);
        const icao = message.content.toLowerCase();
        const umar = message.content.slice(prefix.length).split(' ');
        const icao1 = umar[1];

        
        var request = require('request');
        if (request.length === undefined || request.length === 0) {
            message.channel.send('**Please enter a valid ICAO.**')
            return;

        }

        request({
            
            method: 'GET',
            url: 'https://avwx.rest/api/metar/'+icao1+'?options=translate,info,speech,summary',
            headers: {
                'Authorization': metartoken
            }}, function (error, response, body) {
                body = JSON.parse(body)
                apicall = body;
                nometar = body.error;
                // console.log(nometar);

                
            // console.log('Status:', response.statusCode);
            // console.log('Headers:', JSON.stringify(response.headers));
            // console.log('Response:', body);
            // console.log("test");
            // message.channel.send(body.meta.timestamp);
            // console.log(body.altimeter.value);
            //console.log(response.body.metatimestamp);
            //console.log(response.body.altimeter.repr);
            
            var windgust = JSON.stringify(apicall.wind_gust);
            if (isNaN(windgust)){
                windgust = "";
            } 
            else{
                windgust = " gusting at " + apicall.wind_gust + " knots"
            };
            

            console.log(valueTime);

            try {
                valueTime = apicall.time.dt;
              }
              catch(error) {
                console.error(error);
                message.channel.send(`${nometar}`);
                return;
              }

            const valueimage = './inifnity1black.png'; 
            valueICAO = apicall.station;
            valueTime = apicall.time.dt;
            valueMetar = apicall.raw;
            valueTemp = apicall.translate.temperature;
            valueDewpoint = apicall.translate.dewpoint;
            valueWinds = apicall.wind_direction.value + "° at " + apicall.wind_speed.value + " knots" + windgust;
            valueVisibility = apicall.translate.visibility;
            valueAltimeter = apicall.translate.altimeter;
            valueClouds = apicall.translate.clouds;
            valueFlightRules = apicall.flight_rules;
            valuespeech = apicall.speech;
            valuecity = apicall.info.city;
            valuename = apicall.info.name;

            
            
/*
            const weirdo1 = new Discord.RichEmbed()
                .setTitle("__METAR for "+`${valueICAO}`+"__")
                .setDescription(`**{current.skytext}**`)
                .setAuthor(`METAR for ${valueICAO}`)
                .setThumbnail(`attachment://infinitelogo.png`)
                .setColor(0x00AE86)
                .addField( `**${valueMetar}**`,'\u200b')
                .addField(`**Station:** ${valueICAO}`,'\u200b')
                .addField(`**Observed at:** ${valueTime}`,'\u200b')
                .addField(`**Temperature:** ${valueTemp}`,'\u200b')
                .addField(`**Dewpoint:** ${valueDewpoint}`,'\u200b')
                .addField(`**Winds:** ${valueWinds}`,'\u200b')
                .addField(`**Visibility:** ${valueVisibility}`,'\u200b')
                .addField(`**Pressure:** ${valueAltimeter}`,'\u200b')
                .setFooter(`Why are you getting metar from me? Go use fucking Google! Sincerely, GAY BOT, 1234 Bot Road, Montréal, QC, H1R2K9, Canada`)

                .addField(`**Pressure:** ${valueAltimeter}`,'\u200b')
*/
                /*

                console.log({weirdo1});
                channel.send(weirdo1);
                


            const weirdo1 = new Discord.RichEmbed()
                .setTitle(`${valuecity}, ${valuename} – ${valueICAO}`)
                .setColor([93, 233, 235])
                .addField('Raw Report – ', valueMetar, true)
                .addField('Readable – ', valuespeech, true)
                .setFooter(`This is not a source for official weather briefing. Please obtain a weather briefing from the appropriate agency.`);
   */

            const weirdo5 = new Discord.Attachment('./infinitelogo.png');

            const weirdo1 = {
                color: 0x0091DF,
                title: "__METAR for "+`${valueICAO}`+"__",
                author: {
                    name: "",
                },
                //description: `**{current.skytext}**`,
                thumbnail: {
                    url: 'attachment://infinitelogo.png',
                },
                fields: [
                    {
                        name: `**${valueMetar}**`,
                        value: `**Station:** ${valueICAO} \n **Observed at:** ${valueTime} \n **Temperature:** ${valueTemp} \n **Dewpoint:** ${valueDewpoint} \n **Winds:** ${valueWinds} \n **Visibility:** ${valueVisibility} \n **Pressure:** ${valueAltimeter} \n`,
                    },
                    {
                        name: `\u200b \n__Sky Conditions__`,
                        value: `**Clouds:** ${valueClouds} \n **Flight Rules:** ${valueFlightRules}`
                    }

                ],
            };

/*            message.channel.send("<@554906239323209728>");
            message.channel.send("<@554906239323209728>");
            message.channel.send("<@554906239323209728>");
            message.channel.send("<@554906239323209728>");
            message.channel.send("<@554906239323209728>");
            message.channel.send("<@554906239323209728>");
            message.channel.send("<@554906239323209728>");
            message.channel.send("<@554906239323209728>");
            message.channel.send("<@554906239323209728>");
            message.channel.send("<@554906239323209728>");
            message.channel.send("<@554906239323209728>");
            message.channel.send("<@554906239323209728>");
            message.channel.send("<@554906239323209728>");
            message.channel.send("<@554906239323209728>");
            message.channel.send("<@554906239323209728>");
            message.channel.send("<@554906239323209728>");
            message.channel.send("<@554906239323209728>");
            message.channel.send("<@554906239323209728>");
            message.channel.send("<@554906239323209728>");
            message.channel.send("<@554906239323209728>"); //LOL */
            message.channel.send({ embed: weirdo1 });
            message.channel.stopTyping(true);
            message.channel.stopTyping(true);

        });
}
});


bot.on('ready', () => {

    console.log('Bot started.')
});

bot.login(token);


































































/*
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();

const fetch = require('node-fetch');

const querystring = require('querystring');



client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {

    if(message.content.startsWith(`${prefix}GAY`)) {
        message.channel.send("no u")
    }
    if(message.content.startsWith(`${prefix}gay`)) {
        message.channel.send("no u ||YOU ARE AN IDIOT FOR NOT USING CAPS||")
    }
    if(message.content.startsWith(`${prefix}gAY`)) {
        message.channel.send("no u ||really...||")
    }
    if(message.content.startsWith(`${prefix}GAy`)) {
        message.channel.send("no u ||i hate u rn||")
    }
    if(message.content.startsWith(`${prefix}Gay`)) {
        message.channel.send("no u ||you think you writing an essay?||")
    }
    if(message.content.startsWith(`${prefix}gaY`)) {
        message.channel.send("no u ||k||")
    }
    if(message.content.startsWith(`${prefix}gAy`)) {
        message.channel.send("no u ||uhm...||")
    }
})
*/

/*
client.on('message', async message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    
    
    if (command === 'urban') {
        if (!args.length) {
          return message.channel.send('You need to supply a search term!');
        }
      
        const query = querystring.stringify({ term: args.join(' ') });
      
        const { list } = await fetch(`https://avwx.rest/api/metar/${query}?options=info,translate,speech`).then(response => response.json());

//        if (!list.length) {
//			return message.channel.send(`No results found for **${args.join(' ')}**.`);
//		}
    }
    else if (command === 'GAY') {
        if (!args.length) {
          return message.channel.send('no u');
        }
        if (!list.length) {
        return message.channel.send(`No results found for **${args.join(' ')}**.`);
		}
    }

});


client.login(token);
*/
/*

client.on('message', message => {
    //console.log(message.content);

    if(message.content.startsWith(`${prefix}metar`))
    let reqURL = `https://avwx.rest/api/metar/${DvalueDewpoint}?options=info,translate,speech`;
        message.channel.send()
})

client.login(token);
*/



 /*

    // Metar Command
    // https://avwx.rest/api/metar/EKCH?options=info,translate,speech
    if(cmd == `${prefix}metar`) {
        console.log(`METAR for ${args} by ${message.author.tag}`);
        let argz = args.map(e=>e.toUpperCase());
        let reqURL = `https://avwx.rest/api/metar/${argz}?options=info,translate,speech`;
        message.channel.startTyping(true);
        let response = await fetch(reqURL);
        let json = fixKeys(await response.json());
        let optText = (truthy, ifTrue, ifFalse = '') => truthy ? ifTrue : ifFalse;
        // if (!gucci){
        //     return; // No gucci );
        // }
        if (json.Error) {
            let briefErrorEmbed = new Discord.RichEmbed()
                .setTitle(`${argz} is not a valid ICAO`)
                .setDescription('The bot might not be able to find it! The ICAO might not be in it\'s library or is not a valid ICAO')
                .addField('Quick Tip:', 'ICAOs almost always have four letters', true)
                .addBlankField(true)
                .addField('Example:', 'One example is **CYUL** for Montréal–Pierre Elliott Trudeau International Airport', true)
                .setColor([255, 0, 0]);
            console.log('Oop something fucked up')
            message.channel.stopTyping(true);
            return message.channel.send(briefErrorEmbed);
        }
//         let METAREmbed = new Discord.RichEmbed()
//             .setTitle(`${json.Info.City}, ${json.Info.Name} – ${json.Info.ICAO}`)
//             .setColor([93, 233, 235])
//             .setDescription(`**Readable Report:**
// ${json.Speech}

// **Raw Report:**
// ${json.RawReport}

// **Flight Rule:** ${json.FlightRules}

// **Visibility:** ${json.Translations.Visibility}     
// **Wind:** ${json.WindDirection} at ${json.WindSpeed} ${json.Units.WindSpeed}

// **Clouds:** ${json.Translations.Clouds}

// **Temperature:** ${json.Translations.Temperature}
// **Dewpoint:** ${json.Translations.Dewpoint}

// **QNH:** ${json.Translations.Altimeter}

// **Remarks:** ${json.Remarks}`)
//             .addField('Time of Report', `${json.Meta.Timestamp}`, true)
//             .setFooter(`This is not a source for official weather briefing. Please obtain a weather briefing from the appropriate agency.`);
        let METAREmbed = new Discord.RichEmbed()
            .setTitle(`${json.Info.City}, ${json.Info.Name} – ${argz}`)
            .setColor([93, 233, 235])
            .addField('Raw Report – ', json.RawReport, true)
            .addField('Readable – ', json.Speech, true)
            .setFooter(`This is not a source for official weather briefing. Please obtain a weather briefing from the appropriate agency.`);
        message.channel.stopTyping(true);
        return message.channel.send(METAREmbed);
    }
*/