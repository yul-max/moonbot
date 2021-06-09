const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

//========== BOT START ==========//
const Discord = require("discord.js");
require('dotenv').config();
const client = new Discord.Client();

var prefix = 'moon';
var busy = {};

client.on('ready', () => {
  console.log('MoonBot is online!');
});

const commands = [
  'help',
  'pomodoro'
];

client.on('guildMemberAdd', (guildMember) =>{
  client.channels.cache.get('851968559230877706').send(`여러분! 우리 친구 <@${guildMember.id}>씨가 왔어요!`);
});

client.on('message', async message => {
  if (message.author.bot) return;
  
  if (message.content.startsWith(prefix)){
    const msg = message.content.split(" ");
    const command = msg[1], parameter = msg[2];

    switch(command){
      case 'help':
        message.channel.send(commands);
        break;
      case 'pomodoro':
        if(isNaN(parameter) || parameter <= 0 || parameter % 1 !== 0){
          message.channel.send('Please enter a valid number. Type *moon help pomodoro* for more details.');
        } else {
          var minute = parameter > 1 ? 'minutes' : 'minute';
          let secs = parameter * 60;
          const react = await message.channel
            .send(`Pomodoro interval of ${parameter} ${minute} started. Timer will update every 5 seconds. \nReact to the emoji to join the tag list!`)
          react.react('🤔');
          const filter = (reaction) => reaction.emoji.name === '🤔';
          var reactions = react.createReactionCollector(filter, {time : secs*1000});
          reactions.on('collect', r => {
            try{
              reactors = r.users.cache.array();
            }catch(err){
              console.log(err);
            }
          });
          reactions.on('end', collection => {
              message.channel.send(`Time's up, <@${message.author.id}>!`);
            tagReactors(collection.array()[0].users.cache.array(), message);
          });
          const msg = await message.channel.send(`Time remaining: ${Math.floor(secs/60)}:${secs%60}`);
          var countdown = setInterval(async () => {
            secs -= 5;
            var min = Math.floor(secs/60), sec = secs%60;
            console.log(secs);
            if(secs <= 0){
              msg.delete();
              busy[message.guild.id] = false;
              clearInterval(countdown);
            } else {
              msg.edit(`Time remaining: ${min}:${sec}.`);
            }
          }, 5000);
        }
        break;
      default:
        message.channel.send('Please enter a valid command. Type *moon help* for a list of valid commands.');
        break;
    }
  }

});

function tagReactors(reactorsArray, message){
  for(let i = 0; i < reactorsArray.length; i++){
    if(!reactorsArray[i].bot && reactorsArray[i].id !== message.author.id){
      message.channel.send(`<@${reactorsArray[i].id}>`);
    }
  }
}

client.login(process.env.TOKEN);  