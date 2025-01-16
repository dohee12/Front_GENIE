import React, { useState, useEffect } from 'react';

const SignupBox = () => {
    const [username, setUsername] = useState('');
    const [isUsernameValid, setIsUsernameValid] = useState(null);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState(null);
    const [email, setEmail] = useState('');
    const [emailDomain, setEmailDomain] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(null);
    const [phone, setPhone] = useState('');
    const [isPhoneValid, setIsPhoneValid] = useState(false);

    useEffect(() => {
        const usernameRegex = /^[a-z][a-z0-9]{3,11}$/;
        if (username && usernameRegex.test(username)) {
            fetch(`/api/check-username?username=${username}`)
                .then(response => response.json())
                .then(data => setIsUsernameValid(data.isValid));
        } else {
            setIsUsernameValid(null);
        }
    }, [username]);

    useEffect(() => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,20}$/;
        if (password && confirmPassword) {
            setIsPasswordValid(passwordRegex.test(password) && password === confirmPassword);
        } else {
            setIsPasswordValid(null);
        }
    }, [password, confirmPassword]);

    useEffect(() => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && emailDomain) {
            setIsEmailValid(emailRegex.test(`${email}@${emailDomain}`));
        } else {
            setIsEmailValid(null);
        }
    }, [email, emailDomain]);

    const handlePhoneVerification = () => {
        if (phone) {
            fetch(`/api/send-verification-code?phone=${phone}`)
                .then(response => response.json())
                .then(data => setIsPhoneValid(data.isSent));
        }
    };

    const isFormValid = isUsernameValid && isPasswordValid && isEmailValid && isPhoneValid;

    return (
        <div className="flex justify-center items-center p-8 bg-white shadow-md rounded-lg">
            <div className="w-full p-4">
                <h2 className="text-3xl font-bold mb-6 text-center">정보 입력</h2>
                <form className="items-center w-1/2 mx-auto ">
                    <div>
                        <h1>아이디</h1>
                        <div className="flex space-x-2">
                            <input 
                                type="text"
                                placeholder="아이디 (영문 소문자와 숫자, 4~12자)"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-3 mb-3"
                            />
                            <button
                                type="button"
                                disabled={!username}
                                className={`w-1/3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-3 mb-3 ${username ? 'bg-blue-500' : 'bg-gray-300'} text-white`}
                            >
                                중복확인
                            </button>
                        </div>
                        {isUsernameValid === null ? null : isUsernameValid ? <p className="text-green-500">사용 가능한 아이디입니다.</p> : <p className="text-red-500">이미 사용 중인 아이디입니다.</p>}
                    </div>
                    <div>
                        <h1>비밀번호</h1>
                        <input 
                            type="password"
                            placeholder="비밀번호 (영문 대소문자, 숫자, 특수문자 중 2가지 이상 조합, 8~20자)"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-3 mb-3"
                        />
                        <input 
                            type="password"
                            placeholder="비밀번호 확인"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                        />
                        {isPasswordValid === null ? null : isPasswordValid ? <p className="text-green-500">사용 가능한 비밀번호입니다.</p> : <p className="text-red-500">영문 대소문자, 숫자, 특수기호(@,$,!,%,*,?,&)중 2가지 이상을 조합하여 8~20자로 입력해주세요</p>}
                    </div>
                    <div>
                        <h1>이메일</h1>
                        <div className="flex space-x-2 items-center">
                            <input 
                                type="email"
                                placeholder="이메일"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3 mt-3"
                            />
                            <span className="mx-2">@</span>
                            <select 
                                value={emailDomain}
                                onChange={(e) => setEmailDomain(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">선택</option>
                                <option value="gmail.com">gmail.com</option>
                                <option value="naver.com">naver.com</option>
                                <option value="daum.net">daum.net</option>
                            </select>
                        </div>
                        {isEmailValid === null ? null : isEmailValid ? <p className="text-green-500">사용 가능한 이메일입니다.</p> : <p className="text-red-500">유효하지 않은 이메일입니다.</p>}
                        <p className='text-sm mb-5 text-gray-500'>더 안전하게 계정을 보호하려면 가입 후 [내정보 > 회원정보 수정]에서 이메일 인증을 진행해주세요.</p>
                    </div>
                    <div>
                        <h1>휴대폰 번호</h1>
                        <div className="flex space-x-2">
                            <input 
                                type="text"
                                placeholder="핸드폰 번호"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3 mt-3"
                            />
                            <button
                                type="button"
                                disabled={!phone}
                                onClick={handlePhoneVerification}
                                className={`w-1/3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3 mt-3 ${phone ? 'bg-blue-500' : 'bg-gray-300'} text-white`}
                            >
                                인증번호 받기
                            </button>
                        </div>
                        {isPhoneValid && <p className="text-green-500">인증번호가 발송되었습니다.</p>}
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
