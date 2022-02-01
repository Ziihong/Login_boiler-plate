const express = require('express') //express 모듈 가져오기
const app = express() // 함수 생성
const port = 3000
const bodyParser = require('body-parser')
const { User } = require("./models/User")

// application/x-www-for-urlencoded 데이터 형식 가져오기
app.use(bodyParser.urlencoded( {extended: true} ))

// application/json 데이터 형식 가져오기
app.use(bodyParser.json())



const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://hong:testtest1@boilerplate.de8y0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    //useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(()=> console.log('MongoDB Connected . . .'))
  .catch(err => console.log(err))


app.get('/', (req, res) => res.send("Hello World~!"))


app.post('/register', (req, res) => {

  // 회원가입할 때 필요한 정보들을 client에서 가져오면 데이터베이스에 넣어준다. => User 모델 필요
  const user = new User(req.body)

  user.save( (err, userInfo) => {
    if(err) return res.json({success: false, err})
    return res.status(200).json({success: true})
  })

})

app.listen(port, () => console.log(`Example app listenng on port ${port}!`))

