import React, { useState, useEffect } from 'react';

const SignupBox = () => {
    const [username, setUsername] = useState('');
    const [isUsernameValid, setIsUsernameValid] = useState(null);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState(null);
    const [email, setEmail] = useState('');
    const [emailDomain, setEmailDomain] = useState('');
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

    const handlePhoneVerification = () => {
        if (phone) {
            fetch(`/api/send-verification-code?phone=${phone}`)
                .then(response => response.json())
                .then(data => setIsPhoneValid(data.isSent));
        }
    };

    return (
        <div className="flex justify-center items-center p-8 bg-white shadow-md rounded-lg">
            <div className="w-full p-4">
                <h2 className="text-2xl font-bold mb-6 text-blue-500">회원가입</h2>
                <form className="space-y-4">
                    <div>
                        <h1>아이디</h1>
                        <div className="flex space-x-2">
                            <input 
                                type="text"
                                placeholder="아이디 (영문 소문자와 숫자, 4~12자)"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="button"
                                disabled={!username}
                                className={`py-2 px-4 ${username ? 'bg-blue-500' : 'bg-gray-300'} text-white rounded-md`}
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
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input 
                            type="password"
                            placeholder="비밀번호 확인"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {isPasswordValid === null ? null : isPasswordValid ? <p className="text-green-500">사용 가능한 비밀번호입니다.</p> : <p className="text-red-500">비밀번호가 일치하지 않거나 유효하지 않습니다.</p>}
                    </div>
                    <div>
                        <h1>이메일</h1>
                        <div className="flex space-x-2">
                            <input 
                                type="email"
                                placeholder="이메일"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <span>@</span>
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
                    </div>
                    <div>
                        <h1>휴대폰 번호</h1>
                        <div className="flex space-x-2">
                            <input 
                                type="text"
                                placeholder="핸드폰 번호"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="button"
                                disabled={!phone}
                                onClick={handlePhoneVerification}
                                className={`py-2 px-4 ${phone ? 'bg-blue-500' : 'bg-gray-300'} text-white rounded-md`}
                            >
                                인증번호 받기
                            </button>
                        </div>
                        {isPhoneValid && <p className="text-green-500">인증번호가 발송되었습니다.</p>}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignupBox;
