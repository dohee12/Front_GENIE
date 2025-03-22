import React, { useState } from 'react';
import axios from 'axios';

const FindIdBox = () => {
    /* 아이디 찾기 필수 요소를 useState로 선언 */
    const [idForm, setIdForm] = useState({
        loginId: "",
        birthdate: '',
        phone: '',
        verificationCode: '',
        inputCode: '',
        foundId: ''
    });
    /* 필수 요소의 유효성을 useState로 선언 */
    const [idValid, setIdValid] = useState({
        isPhoneValid: false,
        isVerified: false,
        errorMessage: ""
    });

    /* 휴대폰 번호로 인증번호 요청 핸들러 */
    const handlePhoneVerification = async () => {
        if (idForm.phone && idForm.birthdate) {
            try {
                const response = await axios.get(`/api/send-verification-code`, {
                    params: { phone: idForm.phone }
                });
                if (response.data.isSent) {
                    setIdValid(prevState => ({ ...prevState, isPhoneValid: true }));
                    setIdForm(prevState => ({ ...prevState, verificationCode: response.data.verificationCode }));
                } else {
                    setIdValid(prevState => ({ ...prevState, errorMessage: "인증번호 발송에 실패했습니다." }));
                }
            } catch (error) {
                console.error('Error sending verification code:', error);
                setIdValid(prevState => ({ ...prevState, errorMessage: "인증번호 발송 중 오류가 발생했습니다." }));
            }
        } else {
            setIdValid(prevState => ({ ...prevState, errorMessage: "생년월일과 휴대폰 번호를 입력해주세요." }));
        }
    };

    /* 인증번호 확인 핸들러 */
    const handleVerifyCode = () => {
        if (idForm.inputCode === idForm.verificationCode) {
            setIdValid(prevState => ({ ...prevState, isVerified: true, errorMessage: "" }));
        } else {
            setIdValid(prevState => ({ ...prevState, errorMessage: "인증번호가 일치하지 않습니다." }));
        }
    };

    /* 아이디 찾기 요청 핸들러 */
    const handleFindId = async () => {
        if (idValid.isVerified) {
            try {
                const response = await axios.get(`/api/find-id`, {
                    params: {
                        phone: idForm.phone,
                        birthdate: idForm.birthdate
                    }
                });
                setIdForm(prevState => ({ ...prevState, foundId: response.data.id }));
                setIdValid(prevState => ({ ...prevState, errorMessage: "" }));
            } catch (error) {
                console.error('Error finding ID:', error);
                setIdValid(prevState => ({ ...prevState, errorMessage: "아이디 찾기 중 오류가 발생했습니다." }));
            }
        }
    };

    /* 폼 유효성 검사 */
    const isCheckId = idForm.birthdate && idForm.phone && idValid.isVerified;
    const phoneRegex = /^[0-9]{10,12}$/;
    const isPhoneInputValid = phoneRegex.test(idForm.phone);

    return (
        <div className="flex justify-center items-center p-8 bg-white shadow-md rounded-lg">
            <div className="w-full p-4">
                <h2 className="text-2xl font-bold mb-10 text-center">아이디 찾기</h2>
                <form className="items-center w-1/2 mx-auto">
                    <h3 className='mb-5'>등록된 휴대폰 번호로 찾기</h3>
                    {/* 생년월일 입력 필드 */}
                    <div className='mb-3'>
                        <input 
                            type="text"
                            placeholder="생년월일 (예: 20010601)"
                            value={idForm.birthdate}
                            onChange={(e) => setIdForm({ ...idForm, birthdate: e.target.value })}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                        />
                    </div>
                    <div className="flex space-x-2 mb-3">
                        {/* 휴대폰 번호 입력 필드 */}
                        <input 
                            type="text"
                            placeholder="등록된 휴대폰 번호"
                            value={idForm.phone}
                            onChange={(e) => setIdForm({ ...idForm, phone: e.target.value })}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                        />
                        {/* 인증번호 받기 버튼 */}
                        <button
                            type="button"
                            disabled={!isPhoneInputValid}
                            onClick={handlePhoneVerification}
                            className={`w-1/3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3 ${isPhoneInputValid ? 'bg-blue-500' : 'bg-gray-300'} text-white`}
                        >
                            인증번호 받기
                        </button>
                    </div>
                    {/* 오류 메시지 표시 */}
                    {idValid.errorMessage && <p className="text-red-500">{idValid.errorMessage}</p>}
                    {/* 인증번호 입력 및 확인 */}
                    {idValid.isPhoneValid && (
                        <>
                            <div className="flex space-x-2 mb-3">
                                <input 
                                    type="text"
                                    placeholder="인증번호"
                                    value={idForm.inputCode}
                                    onChange={(e) => setIdForm({ ...idForm, inputCode: e.target.value })}
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
                            {idValid.isVerified && <p className="text-green-500">인증을 완료하였습니다.</p>}
                            {idValid.isVerified && (
                                <button
                                    type="button"
                                    onClick={handleFindId}
                                    className="w-full py-2 bg-blue-500 text-white rounded-md"
                                >
                                    확인
                                </button>
                            )}
                            {idForm.foundId && <p className="text-green-500">아이디: {idForm.foundId}</p>}
                        </>
                    )}
                    <div className='mb-3'>
                        {/* 안내 메시지 */}
                        <ul className="list-disc text-sm text-gray-500">
                            <li>Facebook, Twitter 등 외부 연동 계정의 아이디 및 비밀번호는 가입하신 SNS 사이트에서 확인하시길 바랍니다</li>
                            <li>본인 인증 시 제공되는 정보는 인증기관에서 수집하며, 인증 수단 이외의 용도로 사용하지 않습니다.</li>
                            <li>위 방법으로 찾기가 어려우신 경우, <span className='text-red-600 text-sm'>지니 고객센터(1577-5337)</span>에 문의하시면 본인 확인 절차 후 안내해 드립니다.</li>
                        </ul>
                    </div>
                    {/* 확인 버튼 */}
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

export default FindIdBox;