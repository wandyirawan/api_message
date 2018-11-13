module.exports = (sequelize, type) => {
  return sequelize.define('message', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement:  true,
    }, 
    from_id: type.INTEGER ,
    message_body: type.STRING,
    conversation_id: type.INTEGER
  })
}
