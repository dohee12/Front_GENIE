import React, { useState, useEffect } from 'react';
import axios from 'axios';

const usernameRegex = /^[a-z][a-z0-9]{3,11}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,20}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SignupBox = () => {
    // 회원가입 시 필수 요소를 useState로 선언
    const [signupForm, setSignupForm] = useState({
       loginId: "",
       pwd: "",
       email: "",
       phone: "",
       confirmPassword: ""
    });
    // 필수 요소의 값을 useState로 선언
    const [signupValid, setSignupValid] = useState({
        isUsernameValid: null,
        isPasswordValid: null,
        isEmailValid: null,
        isPhoneValid: null
    });

    /* 아이디 axios 요청 핸들러 */
    const signIdHandle = async () => {
        if (signupForm.loginId && usernameRegex.test(signupForm.loginId)) {
            try {
                const response = await axios.get("http://localhost:8000/api/signup", { 
                    loginId: signupForm.loginId
                });
                
                if (response.status === 200) {
                    setSignupValid({
                        ...signupValid,
                        isUsernameValid: response.data.isValid
                    });
                }
            } catch (e) {
                alert("Error checking username:", e);
            }
        }
    };

    // 비밀번호 useEffect 
    useEffect(() => {
        if (passwordRegex.test(signupForm.pwd) && signupForm.pwd === signupForm.confirmPassword) {
            setSignupValid({...signupValid, isPasswordValid: true});
        } else {
            setSignupValid({...signupValid, isPasswordValid: null});
        }
    }, [signupForm.pwd, signupForm.confirmPassword]);

    // 이메일 useEffect
    useEffect(() => {
        
        if (signupForm.email && signupForm.emailDomain) {
            setSignupValid({...signupValid, isEmailValid: emailRegex.test(`${signupForm.email}@${signupForm.emailDomain}`)});
        } else {
            setSignupValid({...signupValid, isEmailValid: null});
        }
    }, [signupForm.email, signupForm.emailDomain]);
    
    // 휴대폰 번호 인증번호 받기
    const handlePhoneVerification = async () => {
       if (signupForm.phone) {
            try {
                const response = await axios.post(`/api/send-verification-code`, {
                    phone: signupForm.phone
                });
                setSignupValid({
                    ...signupValid,
                    isPhoneValid: response.data.isSent
                });
            } catch (e) {
                console.error(e);
                // alert("Error sending verification code:" , e);
                setSignupValid({
                    ...signupValid,
                    isPhoneValid: null
                });
            }
        }
    };

    const isFormValid = signupValid.isUsernameValid && signupValid.isPasswordValid && signupValid.isEmailValid && signupValid.isPhoneValid;

    return (
        <div className="flex justify-center items-center p-8 bg-white shadow-md rounded-lg">
            <div className="w-full p-4">
                <h2 className="text-3xl font-bold mb-10 text-center">정보 입력</h2>
                <form className="items-center w-1/2 mx-auto ">
                    <div className='mb-3'>
                        <h1>아이디</h1>
                        <div className="flex space-x-2">
                            <input 
                                type="text"
                                placeholder="아이디 (영문 소문자와 숫자, 4~12자)"
                                value={signupForm.username}
                                onChange={(e) => setSignupForm({ ...signupForm, username: e.target.value })}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-3 mb-3"
                            />
                            <button
                                type="button"
                                onClick={signIdHandle}
                                disabled={!signupForm.loginId}
                                className={`w-1/3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-3 mb-3 ${signupForm.username ? 'bg-blue-500' : 'bg-gray-300'} text-white`}
                            >
                                중복확인
                            </button>
                        </div>
                        {signupForm.username === '' ? <p className="text-gray-500">4~12자/영문 소문자(숫자 조합 가능)</p> : (signupValid.isUsernameValid === null ? null : signupValid.isUsernameValid ? <p className="text-green-500">사용 가능한 아이디입니다.</p> : <p className="text-red-500">이미 사용 중인 아이디입니다.</p>)}
                    </div>
                    <div className='mb-3'>
                        <h1>비밀번호</h1>
                        <input 
                            type="password"
                            placeholder="비밀번호 (영문 대소문자, 숫자, 특수문자 중 2가지 이상 조합, 8~20자)"
                            value={signupForm.password}
                            onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-3 mb-3"
                        />
                        <input 
                            type="password"
                            placeholder="비밀번호 확인"
                            value={signupForm.confirmPassword}
                            onChange={(e) => setSignupForm({ ...signupForm, confirmPassword: e.target.value })}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                        />
                        {signupForm.password === '' && signupForm.confirmPassword === '' ? <p className="text-gray-500">8~20자/영문 대문자, 소문자, 숫자, 특수문자 중 2가지 이상 조합</p> : (signupForm.password === signupForm.confirmPassword && signupValid.isPasswordValid ? <p className="text-green-500">사용 가능한 비밀번호입니다.</p> : <p className="text-red-500">영문 대소문자, 숫자, 특수기호(@,$,!,%,*,?,&)중 2가지 이상을 조합하여 8~20자로 입력해주세요</p>)}
                    </div>
                    <div className='mb-3'>
                        <h1>이메일</h1>
                        <div className="flex space-x-2 items-center">
                            <input 
                                type="email"
                                placeholder="이메일"
                                value={signupForm.email}
                                onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3 mt-3"
                            />
                            <span className="mx-2">@</span>
                            <select 
                                value={signupForm.emailDomain}
                                onChange={(e) => setSignupForm({ ...signupForm, emailDomain: e.target.value })}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">선택</option>
                                <option value="gmail.com">gmail.com</option>
                                <option value="naver.com">naver.com</option>
                                <option value="daum.net">daum.net</option>
                            </select>
                        </div>
                        {signupValid.isEmailValid === null ? null : signupValid.isEmailValid ? <p className="text-green-500">사용 가능한 이메일입니다.</p> : <p className="text-red-500">유효하지 않은 이메일입니다.</p>}
                        <p className='text-sm mb-5 text-gray-500'>더 안전하게 계정을 보호하려면 가입 후 [내정보 > 회원정보 수정]에서 이메일 인증을 진행해주세요.</p>
                    </div>
                    <div className='mb-3'>
                        <h1>휴대폰 번호</h1>
                        <div className="flex space-x-2">
                            <input 
                                type="text"
                                placeholder="핸드폰 번호"
                                value={signupForm.phone}
                                onChange={(e) => setSignupForm({ ...signupForm, phone: e.target.value })}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3 mt-3"
                            />
                            <button
                                type="button"
                                disabled={!signupForm.phone}
                                onClick={handlePhoneVerification}
                                className={`w-1/3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3 mt-3 ${signupForm.phone ? 'bg-blue-500' : 'bg-gray-300'} text-white`}
                            >
                                인증번호 받기
                            </button>
                        </div>
                        {signupValid.isPhoneValid && <p className="text-green-500">인증번호가 발송되었습니다.</p>}
                    </div>
                    <button
                        type="submit"
                        disabled={!isFormValid}
                        className={`w-full px-4 py-2 ${isFormValid ? 'bg-blue-500' : 'bg-gray-300'} text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-6`}
                    >
                        가입하기
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignupBox;