import { callback } from './callback.js';

function pomodoro(response, params){
  if(!params.valid_input){
    return ({
      data: {
        type: 4,
        data: {
          content: 'Please input values greater than 0.'
        }
      }
    });
  }

  return({
    data:{
      type: 4,
      data: {
        content: response,
        components: [
          {
            type: 1,
            components: [
              {
                type: 2,
                style: 1,
                label: 'Click to join this cycle!',
                custom_id: 'joinCycle'
              },
              {
                type: 2,
                style: 4,
                label: 'Leave this cycle.',
                custom_id: 'leaveCycle'
              }
            ]
          }
        ]
      }
    }
  });
}

function messages(params){
  console.log(params);
  var valid = true;
  if(params[0].value <= 0 || params[1].value <= 0 || params[2].value <= 0){
    valid = false;
  }
  console.log(valid);
  return({
    pomodoro_start: `${params[2].value} pomodoro cycle/s of ${params[0].value} minute/s with ${params[1].value} minute/s rest.`,
    valid_input: valid
  })
}

function join(id){
  return({
    data:{
      type: 4,
      data: {
        content: `<@${id}> joined the cycle!` 
      }
    }
  });
}

function joinFail(id){
  return({
    data:{
      type: 4,
      data: {
        content: `<@${id}>, you're already part of a cycle!` 
      }
    }
  });
}

function leaveFail(id){
  return({
    data:{
      type: 4,
      data: {
        content: `<@${id}>, you are not part of this cycle!` 
      }
    }
  });
}

function leave(id){
  return({
    data:{
      type: 4,
      data: {
        content: `<@${id}> left the cycle!` 
      }
    }
  });
}

async function timer(params, message){
  var cycle = 1;
  const guildRoles = message.guild.roles.cache;
  while(params[2].value > 0){
    var work = params[0].value*60, rest = params[1].value*60;
    var workmessage = await message.channel.send(`Work session started! ${guildRoles.get(guildRoles.find(role => role.name === 'Pomodoro 📖').id)}`);

    var workTimer = setInterval(async () => {
      console.log(work);
      work -= 5;
      message.edit(`**WORK PERIOD**\n**Cycle**: ${cycle}\n**Time remaining**: ${Math.floor(work/60)}:${work%60}.`);
      if(work <= 0){
        workmessage.delete();
        clearInterval(workTimer);
      }
    }, 5000);
    var restTimer = setTimeout(async () => {
      var restmessage = await message.channel.send(`Rest session started! ${guildRoles.get(guildRoles.find(role => role.name === 'Pomodoro 📖').id)}`);
        var real = setInterval(async () => {
          rest -= 5;
          message.edit(`**REST PERIOD**\n**Cycle**: ${cycle}\n**Time remaining**: ${Math.floor(rest/60)}:${rest%60}.`);
          if(rest <= 0){
            restmessage.delete();
            clearInterval(real);
            if(!params[2].value){
              message.channel.send(`Pomodoro session finished! ${guildRoles.get(guildRoles.find(role => role.name === 'Pomodoro 📖').id)}`);
              message.delete();
            }
          }
      }, 5000)
    }, work*1000);
    params[2].value--;
  }
}

async function addRole(interaction, client){
  const guild = client.guilds.cache.get(interaction.guild_id);
  const user = guild.members.cache.get(interaction.member.user.id)
  var role = await guild.roles.cache.find(role => role.name === 'Pomodoro 📖');
  if(!user.roles.cache.get(role.id)){
    user.roles.add(role);
  } else {
    return "FAIL";
  }

  return "SUCCESS";
}

async function removeRole(interaction, client){
  const guild = client.guilds.cache.get(interaction.guild_id);
  const user = guild.members.cache.get(interaction.member.user.id)
  var role = await guild.roles.cache.find(role => role.name === 'Pomodoro 📖');
  
  if(user.roles.cache.get(role.id)){
    user.roles.remove(role);
  } else {
    return "FAIL";
  }

  return "SUCCESS";
}

export default {
  pomodoro,
  messages,
  join,
  leave,
  joinFail,
  leaveFail,
  timer,
  addRole,
  removeRole
};