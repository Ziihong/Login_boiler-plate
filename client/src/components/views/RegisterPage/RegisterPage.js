import React, { useState } from 'react'
import { useDispatch } from 'react-redux' 
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../../../_actions/user_action'
import Auth from '../../../hoc/auth'


function RegisterPage() {

    const dispatch = useDispatch();
    const navigator = useNavigate();

    const [Name, setName] = useState("")
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")

    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onPassHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onConfirmPassHandler = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        if(Password != ConfirmPassword){
            return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
        }

        let body = {
            name: Name,
            email: Email,
            password: Password
        }

        dispatch(registerUser(body))
        .then(response => {
            if (response.payload.success){
                navigator('/login');
            }
            else{
                alert('Failed to sign up');
            }
        })

    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'
        }}>
            <form style={{ display: 'flex', flexDirection:'column' }}
                onSubmit={onSubmitHandler}
            >
                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler}/>
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPassHandler}/>
                <label>Confirm Password</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPassHandler}/>
                <br />
                <button type="submit">
                    Register
                </button>
            </form>
        </div>
    )
}

export default Auth(RegisterPage, false)
