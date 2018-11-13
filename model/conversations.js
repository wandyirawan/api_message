module.exports = (sequelize, type) => {
  return sequelize.define('conversations', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement:  true,
    }, 
    key: {
      // needs to be unique
      type: type.STRING,
      allowNull: false,
      unique: true
    }

  })
}
