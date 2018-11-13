const Sequelize = require('sequelize');
const MessageModel = require('./model/messages');
const ConversationModel = require('./model/conversations');
const ParticipantModel = require('./model/participans.js');

const sequelize = new Sequelize(
  'messaging_db',//'database',
  'postgres', //'username',
  'postgres', //'password',
  {
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
  });

const Message = MessageModel(sequelize,Sequelize)
const Conversation = ConversationModel(sequelize,Sequelize)
const Participan  = ParticipantModel(sequelize,Sequelize)

Conversation.hasMany(Message)
Conversation.hasMany(Participan)
Message.belongsTo(Conversation);
Participan.belongsTo(Conversation);

sequelize.sync({ force: true })
  .then(() => {
    console.log(`Database & tables created!`)
  })

module.exports = {
  Message,
  Conversation,
  Participan
}
