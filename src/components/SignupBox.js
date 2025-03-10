import React, { useState, useEffect } from 'react';
import axios from 'axios';

const usernameRegex = /^[a-z][a-z0-9]{3,11}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,20}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SignupBox = () => {
    /* 회원가입 시 필수 요소를 useState로 선언 */
    const [signupForm, setSignupForm] = useState({
       loginId: "",
       pwd: "",
       email: "",
       emailDomain: "",
       phone: "",
       confirmPassword: "",
       verificationCode: "",
       inputCode: ""
    });
    /* 필수 요소의 유효성을 useState로 선언 */
    const [signupValid, setSignupValid] = useState({
        isUsernameValid: null,
        isPasswordValid: null,
        isEmailValid: null,
        isPhoneValid: null,
        isVerified: false,
        errorMessage: ""
    });

    /* 아이디 중복 확인 요청 핸들러 */
    const checkUsername = async () => {
        if (signupForm.loginId && usernameRegex.test(signupForm.loginId)) {
            try {
                const response = await axios.post('http://localhost:8000/api/check-username', { loginId: signupForm.loginId});
                if (response.data.isValid) {
                    setSignupValid({
                        ...signupValid,
                        isUsernameValid: true,
                        errorMessage: "사용 가능한 아이디입니다"
                    });
                } else {
                    setSignupValid ({
                        ...signupValid,
                        isUsernameValid: false,
                        errorMessage: "이미 사용 중인 아이디입니다"
                    });
                }
            } catch (error) {
                console.log("아이디 중복 확인 오류:", error);
                setSignupValid({
                    ...signupValid,
                    isUsernameValid: false,
                    errorMessage: "아이디 중복 확인 중 오류가 발생했습니다."
                });
            }
        } else {
            setSignupValid({
                ...signupValid,
                isUsernameValid: false,
                errorMessage: "유효하지 않은 아이디 형식입니다."
            });
        }
    };

    /* 비밀번호 유효성 검사 */
    useEffect(() => {
        if(signupForm.pwd && signupForm.confirmPassword){
            if (passwordRegex.test(signupForm.pwd) && signupForm.pwd === signupForm.confirmPassword) {
                setSignupValid({
                    ...signupValid,
                    isPasswordValid: true
                });
            } else {
                setSignupValid({
                    ...signupValid, 
                    isPasswordValid: null
                });
            } 
        } else {
            setSignupValid({
                ...signupValid,
                isPasswordValid: null
            });
        }
    }, [signupForm.pwd, signupForm.confirmPassword]);

    /* 이메일 유효성 검사 */
    useEffect(() => {
        const fullEmail = `${signupForm.email}@${signupForm.emailDomain}`;
        if (emailRegex.test(fullEmail)) {
            setSignupValid({
                ...signupValid,
                isEmailValid: true
            });
        } else {
            setSignupValid({
                ...signupValid,
                isEmailValid: false
            });
        }
    }, [signupForm.email, signupForm.emailDomain]);
    
    /* 휴대폰 번호 인증번호 받기기 */
    const handlePhoneVerification = async () => {
        if (signupForm.phone) {
            try {
                const response = await axios.post(`/api/send-verification-code`, {
                    phone: signupForm.phone
                });
                if (response.data.isSent) {
                    setSignupValid({
                        ...signupValid,
                        isPhoneValid: true
                    });
                    setSignupForm({
                        ...signupForm,
                        verificationCode: response.data.verificationCode
                    });
                    setSignupValid("");
                } else {
                    setSignupValid("인증번호 발송에 실패했습니다.");
                }
            } catch (e) {
                console.error('Error sending verification code:', e);
                setSignupValid("인증번호 발송 중 오류가 발생했습니다.");
            }
        } else {
            setSignupValid("휴대폰 번호를 입력해주세요.");
        }
    };

    /* 인증번호 확인인 */
    const handleVerifyCode = () => {
        if (signupForm.inputCode === signupForm.verificationCode) {
            setSignupValid({
                ...signupValid,
                isVerified: true
            });
            setSignupValid(""); // Clear any previous error message
        } else {
            setSignupValid("인증번호가 일치하지 않습니다.");
        }
    };

    /* 폼 유효성 검사 */
    const isFormValid = signupValid.isUsernameValid && signupValid.isPasswordValid && signupValid.isEmailValid && signupValid.isPhoneValid && signupValid.isVerified;

    /* 가입하기 버튼 핸들러 */
    const handleSubmit = async (e) => {
        e.preventDefault(); // 폼 제출 시 새로고침을 막고 js로 폼 데이터 처리
        try {
            const response = await axios.post('http://localhost:8000/api/signup', {
                loginId: signupForm.loginId,
                pwd: signupForm.pwd,
                email: `${signupForm.email}@${signupForm.emailDomain}`,
                phone: signupForm.phone
            });

            if (response.status === 200) {
                alert("가입이 완료되었습니다");
            }
        } catch (e) {
            console.error("Error during signup:", e);
            alert("가입 중 오류가 발생했습니다");
        }
    };

    return (
        <div className="flex justify-center items-center p-8 bg-white shadow-md rounded-lg">
            <div className="w-full p-4">
                <h2 className="text-3xl font-bold mb-10 text-center">정보 입력</h2>
                <form className="items-center w-1/2 mx-auto " onSubmit={handleSubmit}>
                    {/* 아이디 입력 필드 */}
                    <div className='mb-3'>
                        <h1>아이디</h1>
                        <div className="flex space-x-2">
                            <input 
                                type="text"
                                placeholder="아이디 (영문 소문자와 숫자, 4~12자)"
                                value={signupForm.loginId}
                                onChange={(e) => setSignupForm({ ...signupForm, loginId: e.target.value })}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-3 mb-3"
                            />
                            <button
                                type="button"
                                onClick={checkUsername}
                                disabled={!signupForm.loginId}
                                className={`w-1/3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-3 mb-3 ${signupForm.loginId ? 'bg-blue-500' : 'bg-gray-300'} text-white`}
                            >
                                중복확인
                            </button>
                        </div>
                        {signupForm.loginId === '' ? <p className="text-gray-500">4~12자/영문 소문자(숫자 조합 가능)</p> : (signupValid.isUsernameValid === null ? null : signupValid.isUsernameValid ? <p className="text-green-500">사용 가능한 아이디입니다.</p> : <p className="text-red-500">이미 사용 중인 아이디입니다.</p>)}
                    </div>
                    {/* 비밀번호 입력 필드 */}
                    <div className='mb-3'>
                        <h1>비밀번호</h1>
                        <input 
                            type="password"
                            placeholder="비밀번호 (영문 대소문자, 숫자, 특수문자 중 2가지 이상 조합, 8~20자)"
                            value={signupForm.pwd}
                            onChange={(e) => setSignupForm({ ...signupForm, pwd: e.target.value })}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-3 mb-3"
                        />
                        <input 
                            type="password"
                            placeholder="비밀번호 확인"
                            value={signupForm.confirmPassword}
                            onChange={(e) => setSignupForm({ ...signupForm, confirmPassword: e.target.value })}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                        />
                        {signupForm.pwd === '' && signupForm.confirmPassword === '' ? <p className="text-gray-500">8~20자/영문 대문자, 소문자, 숫자, 특수문자 중 2가지 이상 조합</p> : (signupForm.pwd === signupForm.confirmPassword && signupValid.isPasswordValid ? <p className="text-green-500">사용 가능한 비밀번호입니다.</p> : <p className="text-red-500">영문 대소문자, 숫자, 특수기호(@,$,!,%,*,?,&)중 2가지 이상을 조합하여 8~20자로 입력해주세요</p>)}
                    </div>
                    {/* 이메일 입력 필드 */}
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
                    {/* 핸드폰 번호 입력 필드 */}
                    <div className='mb-3'>
                        <h1>핸드폰 번호</h1>
                        <div className="flex space-x-2">
                            <input 
                                type="text"
                                placeholder="핸드폰 번호"
                                value={signupForm.phone}
                                onChange={(e) => setSignupForm({ ...signupForm, phone: e.target.value })}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3 mt-3"
                            />
                            {/* 핸드폰 번호 인증번호 받기 필드드 */}
                            <button
                                type="button"
                                disabled={!signupForm.phone}
                                onClick={handlePhoneVerification}
                                className={`w-1/3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3 mt-3 ${signupForm.phone ? 'bg-blue-500' : 'bg-gray-300'} text-white`}
                            >
                                인증번호 받기
                            </button>
                        </div>
                        {signupValid.errorMessage && <p className="text-red-500">{signupValid.errorMessage}</p>}
                        {signupValid.isPhoneValid && (
                            <>
                                <div className="flex space-x-2 mb-3">
                                    <input 
                                        type="text"
                                        placeholder="인증번호"
                                        value={signupForm.inputCode}
                                        onChange={(e) => setSignupForm({ ...signupForm, inputCode: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleVerifyCode}
                                        className="w-full py-2 bg-blue-500 text-white rounded-md"
                                    >
                                        인증하기
                                    </button>
                                </div>
                                {signupValid.isVerified && <p className="text-green-500">인증을 완료하였습니다.</p>}
                            </>
                        )}
                    </div>
                    {/* 모든 것이 완료되면 가입하기 버튼이 작동 */}
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