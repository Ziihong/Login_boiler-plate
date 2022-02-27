const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
    },
    email: {
        type: String,
        trim: true,
        unique: 1,
    },
    password: {
        type: String,
        minlength: 5,
    },
    lastname: {
        type: String, 
        maxlength: 50,
    },
    role: {
        type: Number,
        default: 0,
    },
    token: {
        type: String,
    },
    tokenExp:{
        type: Number,
    },

})

userSchema.pre('save', function(next) {

    let user = this;

    if(user.isModified('password')){

        // user 비밀번호 암호화. user 정보를 저장하기 전에 function 실행
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err);
            
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err);
                user.password = hash;
                next();
            })
        })
    }
    else{
        next();
    }
 
})

userSchema.methods.comparePassword = function(plainPassword, cb){
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch);
    })
}

userSchema.methods.generateToken = function(cb){
    let user = this;

    let token = jwt.sign(user._id.toHexString(), 'secretToken');

    user.token = token;
    user.save(function(err, userInfo){
        if(err) return cb(err);
        cb(null, userInfo);
    })
}

userSchema.statics.findByToken = function(token, cb){
    let user = this;

    jwt.verify(token, 'secretToken', function(err, decoded){

        // user 아이디를 decode해서 유저를 찾고,
        // 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인

        user.findOne({"_id": decoded, "token": token}, function(err, user){
            if(err) return cb(err);
            cb(null, user);
        })
    })
}


const User = mongoose.model('User', userSchema)
module.exports = { User } // 다른 파일에서도 해당 모델을 쓸 수 있도록 export