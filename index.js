const express = require('express') //express 모듈 가져오기
const app = express() // 함수 생성
const port = 3000

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://hong:testtest1@boilerplate.de8y0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    //useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(()=> console.log('MongoDB Connected . . .'))
  .catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World! 안녕하세요~~'))

app.listen(port, () => console.log(`Example app listenng on port ${port}!`))

