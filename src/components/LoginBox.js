import React from "react";

const LoginBox = () => {
    return (
        <div className="flex flex-col items-center justify-center p-8 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-6">로그인</h2>
            <form className="space-y-4 w-full">
                <input 
                    type="text"
                    placeholder="아이디"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input 
                    type="password"
                    placeholder="비밀번호"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className="w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                >
                    로그인
                </button>
            </form>
            <div className="mt-6 flex justify-center space-x-4">
                <button className="p-3 bg-green-500 rounded-full text-white">N</button>
                <button className="p-3 bg-yellow-400 rounded-full text-white">K</button>
                <button className="p-3 bg-blue-600 rounded-full text-white">F</button>
                <button className="p-3 bg-black rounded-full text-white">A</button>
            </div>
        </div>
    );
};

export default LoginBox;