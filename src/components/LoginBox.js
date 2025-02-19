import React, { useState } from "react";
import axios from "axios";
import image from "./../img/대표이미지1.jpg";

const LoginBox = () => {
  const [loginForm, setLoginForm] = useState({ id: "", pwd: "" });

  /**
   * 로그인 axios 요청 핸들러
   */
  const loginHandler = async () => {
    try {
      const result = await axios.post("http://localhost:8000/api/login", {
        loginId: loginForm.id,
        password: loginForm.pwd,
      });

      if (result.status === 200) {
        alert("로그인 성공!!");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="relative w-3/5 p-8 bg-white shadow-lg rounded-lg flex">
        {/* 로그인 텍스트 - 폼을 벗어나서 상단 중앙 정렬 */}
        <h2 className="absolute top-[-40px] left-1/2 transform -translate-x-1/2 text-4xl font-bold text-gray-700">
          로그인
        </h2>

        <div className="w-1/2 p-6 flex flex-col justify-center">
          <form className="w-full mt-8">
            {/* 아이디 입력 필드드 */}
            <input
              type="text"
              placeholder="아이디"
              onChange={(e) =>
                setLoginForm({ ...loginForm, id: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />  
            {/* 비밀번호 입력 필드 */}
            <input
              type="password"
              onChange={(e) =>
                setLoginForm({ ...loginForm, pwd: e.target.value })
              }
              placeholder="비밀번호"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />
            {/* 로그인 상태 유지 체크박스스 */}
            <div>
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 text-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                로그인 상태 유지
              </label>
            </div>
            {/* 로그인 버튼튼 */}
            <button
              type="button"
              onClick={() => {
                loginHandler();
              }}
              className="w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 mt-4"
            >
              로그인
            </button>

            {/* 소셜 로그인 버튼튼 */}
            <div className="flex justify-between mt-4">
              <button className="p-3 bg-green-500  text-white">N</button>
              <button className="p-3 bg-yellow-400 rounded-lg text-white">
                K
              </button>
              <button className="p-3 bg-blue-600 rounded-lg text-white">
                F
              </button>
              <button className="p-3 bg-blue-700 rounded-lg text-white">
                T
              </button>
              <button className="p-3 bg-black rounded-lg text-white">A</button>
            </div>
          </form>
        </div>

        {/* 광고 이미지 */}
        <div className="w-1/2 p-4 flex justify-center items-center">
          <img src={image} alt="광고 이미지" className="w-full rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default LoginBox;
