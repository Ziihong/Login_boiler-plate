const express = require('express'); //express 모듈 가져오기
const app = express(); // 함수 생성
const port = 3000;
const bodyParser = require('body-parser');
const config = require('./config/key');
const cookieParser = require('cookie-parser');

const { User } = require("./models/User");

// application/x-www-for-urlencoded 데이터 형식 가져오기
app.use(bodyParser.urlencoded( {extended: true} ));
app.use(cookieParser());

// application/json 데이터 형식 가져오기
app.use(bodyParser.json());



const mongoose = require('mongoose');
mongoose.connect(config.mongoURI,{
    //useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(()=> console.log('MongoDB Connected . . .'))
  .catch(err => console.log(err))


app.get('/', (req, res) => res.send("Hello World~!"));


app.post('/api/users/register', (req, res) => {

  // 회원가입할 때 필요한 정보들을 client에서 가져오면 데이터베이스에 넣어준다. => User 모델 필요
  const user = new User(req.body)

  user.save( (err, userInfo) => {
    if(err) return res.json({success: false, err})
    return res.status(200).json({
      success: true
    })
  })
})

app.post('/api/users/login', (req, res) => {
  
  // 요청된 이메일이 데이터베이스에 있는지 찾기
  User.findOne({email: req.body.email}, (err, user) => {
    if(!user){
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 사용자가 없습니다.",
      })
    }
    // 요청된 이메일이 데이터베이스에 있다면, 비밀번호가 해당 이메일의 비밀번호가 맞는지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch){ 
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        })
      }

      // 비밀번호까지 맞다면 토큰 생성
      user.generateToken((err, user) => {
        if(err) return res.status(400).send(err);

        // 토큰 저장 => 쿠키 or 로컬스토리지
        // 쿠키에 저장
        res.cookie("x_auth", user.token)
        .status(200)
        .json({
          loginSuccess: true,
          userId: user._id, 
        })
      })
    })
  })
})


  

app.listen(port, () => console.log(`Example app listenng on port ${port}!`));

