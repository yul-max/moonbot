const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

//========== BOT START ==========//
const Discord = require("discord.js");
require('dotenv').config();
const Database = require("@replit/database");
const schd = new Database();
const client = new Discord.Client();

var prefix = 'moon';
var moonsun = ['https://tinyurl.com/moonsolar1', 'https://tinyurl.com/moonsolar2', 'https://tinyurl.com/moonsolar3'];
var yeji = ['https://tinyurl.com/seonyeji1', 'https://tinyurl.com/seonyeji2', 'https://tinyurl.com/seonyeji3', 'https://tinyurl.com/seonyeji4', 'https://tinyurl.com/seonyeji5'];
var forbidden = ['dick', 'oten', 'otin', 'duterte', 'du30', 'digong', 'pdutz', 'pduts', 'tangina', 'atay', 'yawa', 'ywa', 'piste', 'pisti', 'psti', 'pste', 'uten', 'utin', 'kayata', 'tangena','fuck', 'fck', 'shit', 'sht', 'shet', 'fack'];
var moonbyul = ['https://media1.tenor.com/images/5c2ca79a7ce7cf6a324586c9adad96c0/tenor.gif?itemid=13827606', 'https://media.tenor.com/images/412caa9a19679b26bab378031ca0bad1/tenor.gif', 'https://media.tenor.com/images/dc0dade64b20d79d9d99163de5314171/tenor.gif', 'https://media.tenor.com/images/1f1de4e434375b7a605cd197c44b7a7b/tenor.gif', 
                'https://media.tenor.com/images/af470d8d044e1afaf880c27bc8391d92/tenor.gif', 'https://media.tenor.com/images/532ff323d97accc4a818054987098033/tenor.gif', 'https://media.tenor.com/images/471bd58bb33ae185155578669ff4801e/tenor.gif', 'https://media.tenor.com/images/8fb6834f0f9059e39a5de2f98679af2f/tenor.gif', 'https://media.tenor.com/images/6cb01d4c37e14df1d658aa85eda22b2f/tenor.gif',
                'https://media.tenor.com/images/139082daa54f9448cfa32bc29c7915a7/tenor.gif', 'https://media.tenor.com/images/59bef4056aaff2e8140db469c1fa1666/tenor.gif', 'https://media.tenor.com/images/04ce8ee392d15cd40a4eca4906035291/tenor.gif', 'https://media.tenor.com/images/74b2691f7c9a4f0cbe4e6349a2326aed/tenor.gif',
                'https://media.tenor.com/images/f58d2b6f675714f4d74f07a402ba68c1/tenor.gif', 'https://media.tenor.com/images/a715223125c2232f9b95ccd1818f635d/tenor.gif', 'https://media.tenor.com/images/bb1ac52758221e96ab16073bcf7bc4e8/tenor.gif', 'https://media.tenor.com/images/b863169146566e3f1925f47c3a32083e/tenor.gif', 'https://media.tenor.com/images/f181f0db3b2810a619d051767ac1c1f7/tenor.gif',
                'https://media.tenor.com/images/290673aab4ec69b378bdc894089f083d/tenor.gif', 'https://media.tenor.com/images/e85a47ed03e416fbb6cd3524afa599a6/tenor.gif', 'https://media.tenor.com/images/57265638f67e6f2d5706fa480c3a2610/tenor.gif', 'https://media.tenor.com/images/3369a617866ad23330a0dac82c417000/tenor.gif', 'https://64.media.tumblr.com/e5909c13e6692821b1ee1d3b5da5320b/65bb7d19a4496cf3-d5/s400x600/670a779fcbde4f3b2f2a7cfdc54295fde0c90c05.gif',
                'https://64.media.tumblr.com/386431491da5952e7c3e07932c47da18/391a30a8b741ea99-f5/s250x400/8470435f9ebc9281c64a6daee5188b1e3304628f.gif','https://64.media.tumblr.com/7a22c66eb61a1d2af5acb2d66eac3509/a7a67cf01e1b5df0-a9/s400x600/b81a374f67b9f68d8d8211832457ad6d039169ea.gif'];

client.on('ready', () =>{
    console.log('MoonBot is online!');
});

function for_include(a, b){
  var i;
  for(i = 0; i < a.length; i++){
    if(b.includes(a[i])){
      return true;
    }
  }
  return false;
}

function for_index(a, b){
  var i;
  for(i = 0; i < a.length; i++){
    if(b.includes(a[i])){
      return i;
    }
  }
}

function isThere(a, b){
  return a.indexOf(b)+1;
}

function bfurtherc(a, b, c){
  if(a.indexOf(b) > a.indexOf(c)){
    return true;
  }
  return false;
}

client.on('message', message =>{
    if(message.author.bot) return;
    const thing = message.content.toLowerCase();
    if(!thing.startsWith(prefix)){
      if(thing.includes('happy birthday')){
        message.channel.send('HAPPY BIRTHDAY!');
        message.channel.send('https://media1.tenor.com/images/fc7564b35016ff67a1d45b876ce9dc6c/tenor.gif?itemid=20263807');
      }
      
      const tok = thing.split(" ");

      if(for_include(forbidden, thing)){
        message.channel.send('Hey, <@'+message.author.id+">, we don't say "+forbidden[for_index(forbidden,thing)]+' here.');
        message.channel.send('https://media.tenor.com/images/2ab440c1a009acb97d5d92a6c173228e/tenor.gif');
        return;
      }

      if(isThere(tok, 'hey')){
        if(isThere(tok, 'lol') && bfurtherc(tok, 'lol', 'hey')){
          message.channel.send("Hey <@"+message.author.id+">, I'm Moonbyul!");
          message.channel.send('https://media1.tenor.com/images/82ddf3fa9511c4e19d841931997109c6/tenor.gif?itemid=7446959');
        }
        else{
          if(message.author.tag == 'solar#3000'){
            message.channel.send('Hey, Solar! <3');
            message.channel.send(moonsun[Math.floor(Math.random() * 101)%3]);
          }
          if(message.author.tag == 'yeji#5284'){
            message.channel.send('Hey, Yeji from ITZY!');
            message.channel.send(yeji[Math.floor(Math.random() * 101)%6]);
          }
          else{
            message.channel.send('Hey <@'+message.author.id+'>!');
            message.channel.send('https://media1.tenor.com/images/28475262cda2583e3f1a3c25dee08841/tenor.gif?itemid=17375271');
          }
        }
      }

      if(thing.startsWith('i')){
        if(isThere(tok, 'h8') || isThere(tok, 'hate')){
          var n = (isThere(tok, 'h8') > isThere(tok, 'hate')) ? isThere(tok, 'h8') : isThere(tok, 'hate');
          var i = (isThere(tok, 'u') > isThere(tok, 'you')) ? isThere(tok, 'u') : isThere(tok, 'you');
          if(i > n){
            message.channel.send('So, you hate me, <@'+message.author.id+'>? Whatever.');
            message.channel.send('https://media1.tenor.com/images/cff525852a7bf41b352fb8efd1ca67c3/tenor.gif?itemid=9603669');
          }
          else if(thing.includes('it here') && isThere(tok, 'it') > n){
            message.channel.send('Same, <@'+message.author.id+'>.');
            message.channel.send('https://media1.tenor.com/images/ed23ace02b6a6d8d06ad5d0f5333e890/tenor.gif?itemid=7446968');
          }
        }
        else if(isThere(tok, 'luv') || isThere(tok, 'love')){
          var n = (isThere(tok, 'luv') > isThere(tok, 'love')) ? isThere(tok, 'luv') : isThere(tok, 'love');
          var i = (isThere(tok, 'u') > isThere(tok, 'you')) ? isThere(tok, 'u') : isThere(tok, 'you');
          if(i > n){
            message.channel.send("Stop it, you're making me blush.");
            message.channel.send('https://media1.tenor.com/images/4bd37bfa9b39a9bf55860680b0e42f0b/tenor.gif?itemid=7445372');
          }
          else if(!i){
            message.channel.send('OMG <@'+message.author.id+'> REALLY? ME TOO!');
            message.channel.send('https://media1.tenor.com/images/2914ba26bc6c1b8e6e0a43c94a77ab90/tenor.gif?itemid=7447001');
          }
        }
      }

      if(isThere(tok, 'omg')){
        message.channel.send('OMG!');
        message.channel.send('https://i.pinimg.com/originals/c1/e0/b8/c1e0b815bfc5822808ae33f2119d9049.gif');
      }

      if(isThere(tok, 'ty') || (isThere(tok, 'thank')+1 === isThere(tok, 'you') && isThere(tok, 'thank')) || isThere(tok, 'thanks')){
        message.channel.send('No problem <@'+message.author.id+'> ;)');
        message.channel.send('https://media1.tenor.com/images/1f05a6cd0795619210c494afa9aae61c/tenor.gif?itemid=14619415');
      }

      if(isThere(tok, 'salamat') || isThere(tok, 'lamat')){
        message.channel.send('Way problema basta ikaw, <@'+message.author.id+'> ;)');
        message.channel.send('https://media1.tenor.com/images/1f05a6cd0795619210c494afa9aae61c/tenor.gif?itemid=14619415');
      }

      if(thing.startsWith('yie') || isThere(tok, 'congrats') || isThere(tok, 'grats') || isThere(tok, 'sanaol') || isThere(tok, 'sana')+1 === isThere(tok, 'ol') || isThere(tok, 'sana')+1 === isThere(tok, 'all') || isThere(tok, 'naol')){
        message.channel.send('My friend Lisa from BLACKPINK has something to say about that:');
        message.channel.send('https://media1.tenor.com/images/868bc400c4cc241dbcd257834a7be6de/tenor.gif?itemid=19370458');
      }

      if(isThere(tok, 'sorry') || isThere(tok, 'sori') || isThere(tok, 'gomen') || isThere(tok, 'gomennasai') || isThere(tok, 'sry')){
        message.channel.send('죄송합니다.');
        message.channel.send('https://media.tenor.com/images/c285ecd82002b7cf1a607f4bd168f859/tenor.gif');
      }
    }
    
    else{
      const args = thing.split(" ");
      console.log(args);

      switch(args[1]){
        case 'help':
          message.channel.send("죄송합니다. I don't have any commands right now, but I will soon!");
          break;
        case 'byul':
          message.channel.send("Thank you for calling my name! Have a GIF!");
          message.channel.send(moonbyul[Math.floor(Math.random() * moonbyul.length)]);
          break;
        case 'day':
          if(args.length > 2 && args[2].includes('-')){
            var year = new Date().getFullYear();
            var d = new Date(args[2]);
            d.setFullYear(year);
            console.log(d);
            var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            message.channel.send(d.toLocaleDateString()+" is a "+days[d.getDay()]);
          }
          else{
            message.channel.send('Please indicate a date.');
            message.channel.send('Usage: moon day *month-day*');
          }
          break;
        case 'sched':
          /*switch(args[2]){
            case 'clear':
              
              break;
            case 'view':
              
              break;
            default:
              var year = new Date().getFullYear();
              var d = new Date(args[2]);
              d.setFullYear(year);
              
              break;
          }*/
          message.channel.send('Sorry, pero wala pa nako gipadayon ang sched.');
          message.channel.send('Nagkat-on pa kog SQL ug integration sa repl :D');
          break;
        default:
          break;
      }
    }
});


client.login(process.env.TOKEN);