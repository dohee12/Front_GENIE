import React, { useState } from 'react';

const FindIdBox = () => {
    const [username, setUsername] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [phone, setPhone] = useState('');
    const [isPhoneValid, setIsPhoneValid] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const [inputCode, setInputCode] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const [foundId, setFoundId] = useState('');

    const handlePhoneVerification = () => {
        if (username && phone && birthdate) {
            fetch(`/api/send-verification-code?phone=${phone}`)
                .then(response => response.json())
                .then(data => {
                    setIsPhoneValid(data.isSent);
                    setVerificationCode(data.verificationCode);
                });
        }
    };

    const handleVerifyCode = () => {
        if (inputCode === verificationCode) {
            setIsVerified(true);
        }
    };

    const handleFindId = () => {
        if (isVerified) {
            fetch(`/api/find-id?phone=${phone}&birthdate=${birthdate}&username=${username}`)
                .then(response => response.json())
                .then(data => setFoundId(data.id));
        }
    };

    return (
        <div className="flex justify-center items-center p-8 bg-white shadow-md rounded-lg">
            <div className="w-full p-4">
                <h2 className="text-2xl font-bold mb-6 text-blue-500">아이디 찾기</h2>
                <form className="space-y-4">
                    <input 
                        type="text"
                        placeholder="생년월일 (예: 20010601)"
                        value={birthdate}
                        onChange={(e) => setBirthdate(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input 
                        type="text"
                        placeholder="등록된 휴대폰 번호"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="button"
                        disabled={!phone || !birthdate}
                        onClick={handlePhoneVerification}
                        className={`w-full py-2 ${phone && birthdate ? 'bg-blue-500' : 'bg-gray-300'} text-white rounded-md`}
                    >
                        인증번호 받기
                    </button>
                    {isPhoneValid && (
                        <>
                            <input 
                                type="text"
                                placeholder="인증번호"
                                value={inputCode}
                                onChange={(e) => setInputCode(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="button"
                                onClick={handleVerifyCode}
                                className="w-full py-2 bg-blue-500 text-white rounded-md"
                            >
                                인증하기
                            </button>
                        </>
                    )}
                    {isVerified && <p className="text-green-500">인증을 완료하였습니다.</p>}
                    {isVerified && (
                        <button
                            type="button"
                            onClick={handleFindId}
                            className="w-full py-2 bg-blue-500 text-white rounded-md"
                        >
                            확인
                        </button>
                    )}
                    {foundId && <p className="text-green-500">아이디: {foundId}</p>}
                </form>
            </div>
        </div>
    );
};

export default FindIdBox;