module.exports = (sequelize, type) => {
  return sequelize.define('participans', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement:  true,
    }, 
    user_id: type.INTEGER ,
    last_read_timestamp: type.DATE,
    conversation_id: type.INTEGER
  })
}

