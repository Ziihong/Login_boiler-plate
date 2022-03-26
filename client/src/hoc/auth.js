import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action'
import { Navigate, useNavigate } from 'react-router';

export default function (SpecificComponent, option, adminRoute = null){

    // option: null => 아무나 출입이 가능한 페이지
    // option: true => 로그인한 유저만 출입이 가능한 페이지
    // option: false => 로그인한 유저는 출입 불가능한 페이지

    function AuthenticationCheck(props){
        
        const dispatch = useDispatch();
        const navigator = useNavigate();

        useEffect(() => {
            dispatch(auth()).then(response => {
                console.log(response)
                if(!response.payload.isAuth){
                    if(option){
                        navigator('/login')
                    }
                }
                else{
                    if(adminRoute && !response.payload.isAdmin){
                        navigator('/')
                    }
                    else{
                        if(!option){
                            navigator('/')
                        }
                    }
                }
            })
        }, [])

        return (
            <SpecificComponent />
        )
            
    }
    return AuthenticationCheck
}