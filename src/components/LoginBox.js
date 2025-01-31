import React from "react";
import image from "./../img/대표이미지1.jpg";

const LoginBox = () => {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="relative w-3/5 p-8 bg-white shadow-lg rounded-lg flex">
                {/* 로그인 텍스트 - 폼을 벗어나서 상단 중앙 정렬 */}
                <h2 className="absolute top-[-40px] left-1/2 transform -translate-x-1/2 text-4xl font-bold text-gray-700">
                    로그인
                </h2>

                <div className="w-1/2 p-6 flex flex-col justify-center">
                    <form className="w-full mt-8">
                        <input 
                            type="text"
                            placeholder="아이디"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                        />
                        <input 
                            type="password"
                            placeholder="비밀번호"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                        />
                        <div>
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
                            className="w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 mt-4"
                        >
                            로그인
                        </button>
                        <div className="flex justify-between mt-4">
                            <button className="p-3 bg-green-500 rounded-full text-white">N</button>
                            <button className="p-3 bg-yellow-400 rounded-full text-white">K</button>
                            <button className="p-3 bg-blue-600 rounded-full text-white">F</button>
                            <button className="p-3 bg-blue-700 rounded-full text-white">T</button>
                            <button className="p-3 bg-black rounded-full text-white">A</button>
                        </div>
                    </form>
                </div>

                <div className="w-1/2 p-4 flex justify-center items-center">
                    <img src={image} alt="광고 이미지" className="w-full rounded-md"/>
                </div>
            </div>
        </div>
    )
}

export default LoginBox;
