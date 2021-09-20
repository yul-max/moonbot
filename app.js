const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

//========== BOT START ==========//const Discord = require("discord.js");
require('dotenv').config();
const client = new Discord.Client();
const { callback } = require('./callback.js');
const { 
  authenticate,
  authentication,
 } = require('./classroom.js');
const { 
  pomodoro, 
  messages, 
  join,
  leave,
  joinFail,
  leaveFail, 
  timer,
  addRole,
  removeRole,
} = require('./pomodoro.js');


const guildID = '851967552754286592';
const getApp = (guildID) => {
  const app = client.api.applications(client.user.id);
  if(guildID){
    app.guilds(guildID);
  }
  return app;
};

client.on('ready', async () => {
  console.log('MoonBot is online!');

  await getApp(guildID).commands.post({
    data: {
      name: 'classroom',
      description:'Authenticate MinjiBot to access your Google Classroom data.',
      options: [
        {
          name: 'email',
          description: 'Your e-mail used with Google Classroom',
          required: true,
          type: 3
        },
      ],
    }
  })
});

client.on('guildMemberAdd', (guildMember) => {
  client.channels.cache
    .get('851968559230877706')
    .send(`여러분! 우리 친구 <@${guildMember.id}>씨가 왔어요!`);
});

client.on('voiceStateUpdate', async (oldState, newState) => {
  if(!oldState.member.user.bot){
    vcRole(oldState, newState);
  }
});

client.ws.on('INTERACTION_CREATE', async (interaction) => {
  const params = interaction.data.options;
  switch(interaction.type){
    case 2:
      const command = interaction.data.name.toLowerCase();

      switch(command){
        case 'pomodoro':
          const input = messages(params);
          reply(interaction, input.pomodoro_start, command, input);
          addRole(interaction, client);
          var msg = await client.guilds.cache
            .get(guildID).channels.cache
            .get(interaction.channel_id)
            .send(`**WORK PERIOD**\n**Cycle**: ${params[2].value}\n**Time remaining**: ${params[0].value}:00.`);
          console.log(msg);
          await timer(params, msg);
          break;
        case 'classroom':
          reply(interaction, 'First, you need to allow MinjiBot to access your Google Classroom account.', command, null);
          authentication(params[0].value);
          break;
      }
      break;
    case 3:
      const id = interaction.member.user.id;
      switch(interaction.data.custom_id){
        case 'joinCycle':
          if(addRole(interaction, client) === "SUCCESS")
            callback(interaction, client).post(join(id));
          else
            callback(interaction, client).post(joinFail(id))
          break;
        case 'leaveCycle':
          if(removeRole(interaction, client) === "SUCCESS")
            callback(interaction, client).post(leave(id));
          else
            callback(interaction, client).post(leaveFail(id))
          break;
      }
      break;
  }
})

const reply = (interaction, response, command, input) => {
  switch(command){
    case 'pomodoro':
      callback(interaction, client).post(pomodoro(response, input));
      break;
    case 'classroom':
      callback(interaction, client).post(authenticate(response));
      break;
  }
}

async function vcRole(oldState, newState) {
  let newrole, oldrole;
  const newGuild = newState.guild;
  const oldGuild = oldState.guild;
  const oldChannelID = oldState.channelID;
  const newChannelID = newState.channelID;
  const user = oldGuild.members.cache.get(oldState.member.id);

  var channelIDs = {
    '851967553663926286' : 'in chill vc',
    '851967553663926287' : 'in game vc',
    '851972617115271228' : 'nakatog'
  }

  if(newChannelID in channelIDs){
    newrole = await newGuild.roles.cache.find(role => role.name === channelIDs[newChannelID]);
    await user.roles.add(newrole);
  }
  if(oldChannelID in channelIDs){
    oldrole = await oldGuild.roles.cache.find(role => role.name === channelIDs[oldChannelID]);
    await user.roles.remove(oldrole);
  }
}


client.login(process.env.TOKEN);