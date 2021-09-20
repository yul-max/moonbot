const callback = (interaction, client) => {return client.api.interactions(interaction.id, interaction.token).callback};

export default {
  callback,
}