import React, { useState } from 'react';
import axios from 'axios';

const FindPwBox = () => {
    const [pwForm, setPwForm] = useState({
        loginId: '',
        birthdate: '',
        phone: '',
        verificationCode: '',
        inputCode: '',
        resetLink: ''
    })
    const [pwValid, setPwValid] = useState({
        isPhoneInputValid: false,
        isVerified: false
    })

    const handlePhoneVerification = async () => {
        if (pwForm.username && pwForm.phone && pwForm.birthdate) {
            try {
                const response = await axios.get(`/api/send-verification-code`, {
                    phone: pwForm.phone
                });
                setPwValid({...pwValid, isPhoneValid: response.data.isSent});
                setPwForm({...pwForm, verificationCode: response.data.verificationCode});
            } catch (error) {
                console.error('Error sending verification code:', error);
            }
        }
    };

    const handleVerifyCode = () => {
        if (pwForm.inputCode === pwForm.verificationCode) {
            setPwValid({...pwValid, isVerified: true});
        }
    };

    const handleFindPassword = async () => {
        if (pwValid.isVerified) {
            try {
                const response = await axios.get(`/api/find-password`, {
                    phone: pwForm.phone, 
                    birthdate: pwForm.birthdate, 
                    loginId: pwForm.loginId
                });
                setPwForm({...pwForm, resetLink: response.data.resetLink});
            } catch (error) {
                console.error('Error finding PW:', error);
            }
        }
    };

    const isCheckId = pwForm.username && pwForm.birthdate && pwForm.phone;
    const phoneRegex = /^[0-9]{10,11}$/;
    const isPhoneInputValid = phoneRegex.test(pwForm.phone);

    return (
        <div className="flex justify-center items-center p-8 bg-white shadow-md rounded-lg">
            <div className="w-full p-4">
                <h2 className="text-2xl font-bold mb-10 text-center">비밀번호 찾기</h2>
                <form className="items-center w-1/2 mx-auto">
                    <h4 className='mb-3'>등록된 휴대폰 번호로 찾기</h4>
                    <div className='mb-3'>
                        <input 
                            type="text"
                            placeholder="아이디"
                            value={pwForm.loginId}
                            onChange={(e) => setPwForm(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                        />
                    </div>
                    <div className='mb-3'>
                        <input 
                            type="text"
                            placeholder="생년월일 (예: 20010601)"
                            value={pwForm.birthdate}
                            onChange={(e) => setPwForm(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                        />
                    </div>
                    <div className='flex space-x-2 mb-10'>
                        <input
                            type="text"
                            placeholder="등록된 휴대폰 번호"
                            value={pwForm.phone}
                            onChange={(e) => setPwForm(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                        />
                       <button
                            type="button"
                            disabled={!pwValid.isPhoneInputValid}
                            onClick={handlePhoneVerification}
                            className={`w-1/3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3 ${isPhoneInputValid ? 'bg-blue-500' : 'bg-gray-300'} text-white`}
                        >
                            인증번호 받기
                        </button>
                        {pwValid.isPhoneValid && (
                            <>
                                <input 
                                    type="text"
                                    placeholder="인증번호"
                                    value={pwForm.inputCode}
                                    onChange={(e) => setPwForm.setInputCode(e.target.value)}
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
                        {pwValid.isVerified && <p className="text-green-500">인증을 완료하였습니다.</p>}
                        {pwValid.isVerified && (
                            <button
                                type="button"
                                onClick={handleFindPassword}
                                className="w-full py-2 bg-blue-500 text-white rounded-md"
                            >
                                확인
                            </button>
                        )}
                        {pwForm.resetLink && <p className="text-green-500">비밀번호 재설정 링크: {pwForm.resetLink}</p>}
                    </div>
                    <div className='mb-3'>
                        <ul className='list-disc text-sm text-gray-500'>
                            <li>Facebook, Twitter등 외부 연동 계정의 아이디 및 비밀번호는 가입하신 SNS 사이트에서 확인하시길 바랍니다.</li>
                            <li>본인 인증 시 제공되는 정보는 인증기관에서 수집하며, 인증 수단 이외의 용도로 사용하지 않습니다.</li>
                            <li>위 방법으로 찾기가 어려우신 경우, <span className='text-red-500 text-sm'>지니 고객센터(1577-5337)</span>에 문의하시면 본인 확인 절차 후 안내해 드립니다.</li>
                        </ul>
                    </div>
                    <button
                        type='submit'
                        disabled={!isCheckId}
                        className={`w-full px-4 py-2 ${isCheckId ? 'bg-blue-500' : 'bg-gray-300'} text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-6`}
                    >
                        확인
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FindPwBox;