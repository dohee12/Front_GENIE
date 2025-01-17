import React from 'react';
import image from './../img/대표이미지1.jpg';

const LoginBox = () => {
    return (
        <div className="flex justify-center items-center p-8 bg-white shadow-md rounded-lg">
            <div className="w-full p-4 flex flex-col items-center">
                <h2 className="text-3xl font-bold mb-6 text-center">로그인</h2>
                <div className="w-full flex">
                    <div className="w-1/2 p-4">
                        <form className="items-center w-full mx-auto">
                            <div>
                                <input 
                                    type="text"
                                    placeholder="아이디"
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                                />
                            </div>
                            <div>
                                <input 
                                    type="password"
                                    placeholder="비밀번호"
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                                />
                            </div>
                            <div className="flex items-center mb-4">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    className="w-4 h-4 text-blue-500 border-gray-300 rounded"
                                />
                                <label
                                    htmlFor="remember"
                                    className="ml-2 text-sm text-gray-600"
                                >
                                    로그인 상태 유지
                                </label>
                            </div>
                            <button
                                type="submit"
                                className="w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                            >
                                로그인
                            </button>
                            <div className="mt-6 flex justify-center space-x-4">
                                <button className="p-3 bg-green-500 rounded-full text-white">N</button>
                                <button className="p-3 bg-yellow-400 rounded-full text-white">K</button>
                                <button className="p-3 bg-blue-600 rounded-full text-white">F</button>
                                <button className="p-3 bg-blue-700 rounded-full text-white">T</button>
                                <button className="p-3 bg-black rounded-full text-white">A</button>
                            </div>
                        </form>
                    </div>
                    <div className="w-1/2 p-4 flex flex-col justify-center items-center">
                        <img src={image} alt="대표이미지" className="w-full rounded-md" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginBox;