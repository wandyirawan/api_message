const express = require('express')
const bodyParser = require('body-parser')
const { 
  Message,
  Conversation,
  Participan
} = require('./sequelize')

const app = express()
app.use(bodyParser.json())
// API ENDPOINTS

//this endpoint for send message 
app.post('/api/message', (req,res) => {
  const params = req.body;
  createConversation(res, params)
})
//this endpoint for reply message
app.post('/api/reply_message', (req,res) => {
  const {  to, ...params } = req.body;
  createMessage(res, params)
})

//get message by who created message
app.get('/api/message', (req,res) => {
  Message.findAll({where: {from_id:req.query.from_id},raw:true}).then(message => {
    if(message){
      res.json({code:200, status:'Ok', message})
    }else {
      res.json({code:404, status:'Message Not Found' })
    }
  })
})

//get message by message id
app.get('/api/message/:id', (req,res) => {
  Message.findOne({where: {id:req.params.id},raw:true}).then(message => {
    if(message){
      res.json({code:200, status:'Ok', message})
    }else {
      res.json({code:404, status:'Message Not Found' })
    }
  })
})
// get all message realtime
app.get('/api/conversation/:key',(req, res) => {
  Conversation.findAll({
    where: {key: req.params.key},
    include: [
      {model: Message},
      {model: Participan}
    ],
    raw:true
  }).then(conversation =>{
    if(conversation){
      res.json({code:200, status:'Ok', conversation})
    }else {
      res.json({code:404, status:'Conversation Not Found' })
    }
  })
})
// check conversation by id
app.get('/api/conversation',(req, res) => {
  Conversation.findOne({where:{id:req.query.id},raw:true}).then(conversation => {
    if(conversation){
      res.json({code:200, status:'Ok', conversation})
    }else {
      res.json({code:404, status:'Conversation Not Found' })
    }
  })
})
const createConversation = (res, params) => {
    const {to,..._params}= params
    const paramConv ={key: uuidV4()}
    Conversation.create(paramConv).then(conv => {
      _params.conversation_id = conv.dataValues.id
      participanProces(to,params.from_id, conv.dataValues.id)
      createMessage(res,_params)
    })
}

const participanProces = (to,from_id, conv_id) => {
  if(typeof to !== 'string'){
    to = String(to)
  }
  const params = to.split(';').map(item=>{
    return {user_id:item, conversation_id:conv_id}
  })
  params.push({user_id:from_id,conversation_id:conv_id});
  Participan.bulkCreate(params)
}

const createMessage = (res, params) =>{
  Message.create(params).then(message => {
    res.json({code:200, status:'Ok', message})
  })
}

const uuidV4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
const port = 3000
app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`)
})
