const { User } = require("../models/User");

// 인증 처리
let auth = (req, res, next) => {

    // 클라이언트 쿠키에서 토큰을 가져옴
    let token = req.cookies_x.auth;

    // 토큰을 복호화 한 후, 유저 탐색
    User.findByToken(token, (err, user) => {
        if(err) throw err;
        if(!user) return res.json({isAuth: false, error: true})

        req.token = token;  
        req.user = user;
        next(); // middleware에서 머무르지 않고, 다음 동작이 가능하도록
    })

    // 유저가 있으면 인증 success

    // 유저가 없으면 인증 fail

}

module.exports = {auth}