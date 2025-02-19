import React, { useState } from 'react';
import axios from 'axios';

const FindPwBox = () => {
    /* 비밀번호 찾기 필수 요소를 useState로 선언언 */
    const [pwForm, setPwForm] = useState({
        loginId: '',
        birthdate: '',
        phone: '',
        verificationCode: '',
        inputCode: '',
        newPassword: '',
        confirmPassword: '',
        resetLink: ''
    });
    /* 필수요소의 유효성을 useState로 선언언 */
    const [pwValid, setPwValid] = useState({
        isPhoneValid: false,
        isVerified: false
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [isPasswordReset, setIsPasswordReset] = useState(false);

     /* 휴대폰 번호로 인증번호 요청 핸들러 */
    const handlePhoneVerification = async () => {
        if (pwForm.loginId && pwForm.phone && pwForm.birthdate) {
            try {
                const response = await axios.get(`/api/send-verification-code`, {
                    phone: pwForm.phone
                });
                if (response.data.isSent) {
                    setPwValid({ ...pwValid, isPhoneValid: true });
                    setPwForm({ ...pwForm, verificationCode: response.data.verificationCode });
                    setErrorMessage(""); // 이전 오류 메시지 지우기기
                } else {
                    setErrorMessage("인증번호 발송에 실패했습니다.");
                }
            } catch (error) {
                console.error('Error sending verification code:', error);
                setErrorMessage("인증번호 발송 중 오류가 발생했습니다.");
            }
        } else {
            setErrorMessage("아이디, 생년월일, 휴대폰 번호를 입력해주세요.");
        }
    };

     /* 인증번호 확인 핸들러 */
    const handleVerifyCode = () => {
        if (pwForm.inputCode === pwForm.verificationCode) {
            setPwValid({ ...pwValid, isVerified: true });
            setErrorMessage(""); // 이전 오류 메시지 지우기
        } else {
            setErrorMessage("인증번호가 일치하지 않습니다.");
        }
    };

    /* 비밀번호 찾기 요청 핸들러 */
    const handleFindPassword = async () => {
        if (pwValid.isVerified) {
            setIsPasswordReset(true);
        }
    };

    /* 비밀번호 재설정 요청 핸들러 */
    const handlePasswordReset = async () => {
        if (pwForm.newPassword && pwForm.newPassword === pwForm.confirmPassword) {
            try {
                const response = await axios.post(`/api/reset-password`, {
                    loginId: pwForm.loginId,
                    newPassword: pwForm.newPassword
                });
                if (response.status === 200) {
                    alert("비밀번호가 성공적으로 변경되었습니다.");
                    setIsPasswordReset(false);
                }
            } catch (error) {
                console.error('Error resetting password:', error);
                setErrorMessage("비밀번호 변경 중 오류가 발생했습니다.");
            }
        } else {
            setErrorMessage("비밀번호가 일치하지 않습니다.");
        }
    };

    /* 폼 유효성 검사사 */
    const isCheckId = pwForm.loginId && pwForm.birthdate && pwForm.phone && pwValid.isVerified;
    const phoneRegex = /^[0-9]{10,11}$/;
    const isPhoneInputValid = phoneRegex.test(pwForm.phone);

    return (
        <div className="flex justify-center items-center p-8 bg-white shadow-md rounded-lg">
            <div className="w-full p-4">
                <h2 className="text-2xl font-bold mb-10 text-center">비밀번호 찾기</h2>
                <form className="items-center w-1/2 mx-auto">
                    <h4 className='mb-3'>등록된 휴대폰 번호로 찾기</h4>
                    <div className='mb-3'>
                        {/* 아이디 입력 필드 */}
                        <input 
                            type="text"
                            placeholder="아이디"
                            value={pwForm.loginId}
                            onChange={(e) => setPwForm({ ...pwForm, loginId: e.target.value })}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                        />
                    </div>
                    <div className='mb-3'>
                        {/* 생년월일 입력 필드 */}
                        <input 
                            type="text"
                            placeholder="생년월일 (예: 20010601)"
                            value={pwForm.birthdate}
                            onChange={(e) => setPwForm({ ...pwForm, birthdate: e.target.value })}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                        />
                    </div>
                    {/* 휴대폰 번호 입력 필드드 */}
                    <div className='flex space-x-2 mb-10'>
                        <input
                            type="text"
                            placeholder="등록된 휴대폰 번호"
                            value={pwForm.phone}
                            onChange={(e) => setPwForm({ ...pwForm, phone: e.target.value })}
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
                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                    {/* 인증번호 입력 및 확인 */}
                    {pwValid.isPhoneValid && (
                        <>
                            <div className="flex space-x-2 mb-3">
                                <input 
                                    type="text"
                                    placeholder="인증번호"
                                    value={pwForm.inputCode}
                                    onChange={(e) => setPwForm({ ...pwForm, inputCode: e.target.value })}
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
                            {pwValid.isVerified && <p className="text-green-500">인증을 완료하였습니다.</p>}
                            {pwValid.isVerified && !isPasswordReset && (
                                <button
                                    type="button"
                                    onClick={handleFindPassword}
                                    className="w-full py-2 bg-blue-500 text-white rounded-md"
                                >
                                    확인
                                </button>
                            )}
                            {isPasswordReset && (
                                <>
                                    <div className='mb-3'>
                                        {/* 새 비밀번호 입력 필드 */}
                                        <input 
                                            type="password"
                                            placeholder="새 비밀번호"
                                            value={pwForm.newPassword}
                                            onChange={(e) => setPwForm({ ...pwForm, newPassword: e.target.value })}
                                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        {/* 새 비밀번호 확인 입력 필드 */}
                                        <input 
                                            type="password"
                                            placeholder="새 비밀번호 확인"
                                            value={pwForm.confirmPassword}
                                            onChange={(e) => setPwForm({ ...pwForm, confirmPassword: e.target.value })}
                                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                                        />
                                    </div>
                                    {/* 비밀번호 변경 버튼튼 */}
                                    <button
                                        type="button"
                                        onClick={handlePasswordReset}
                                        className="w-full py-2 bg-blue-500 text-white rounded-md"
                                    >
                                        비밀번호 변경
                                    </button>
                                </>
                            )}
                            {pwForm.resetLink && <p className="text-green-500">비밀번호 재설정 링크: {pwForm.resetLink}</p>}
                        </>
                    )}
                    <div className='mb-3'>
                        {/* 안내 메시지 */}
                        <ul className='list-disc text-sm text-gray-500'>
                            <li>Facebook, Twitter등 외부 연동 계정의 아이디 및 비밀번호는 가입하신 SNS 사이트에서 확인하시길 바랍니다.</li>
                            <li>본인 인증 시 제공되는 정보는 인증기관에서 수집하며, 인증 수단 이외의 용도로 사용하지 않습니다.</li>
                            <li>위 방법으로 찾기가 어려우신 경우, <span className='text-red-500 text-sm'>지니 고객센터(1577-5337)</span>에 문의하시면 본인 확인 절차 후 안내해 드립니다.</li>
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

export default FindPwBox;