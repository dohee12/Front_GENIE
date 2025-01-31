import React from "react";
import Logo from "./../img/genieLogo.png";

const Header = () => {
    return (
        <header className="flex items-center justify-between h-16 px-56 py-3 border-b bg-white">
            <a href="/login">
                <img src={Logo} alt="지니뮤직 로고" className="w-28"/>
            </a>
            <nav className="flex space-x-8 text-gray-600 text-sm">
                <a href="/signup" className="hover:text-blue-600">회원가입</a>
                <a href="/find-id" className="hover:text-blue-600">아이디 찾기</a>
                <a href="/find-password" className="hover:text-blue-600">비밀번호 찾기</a>
                <a href="/login" className="text-blue-500 font-bold">로그인</a>
            </nav>
        </header>
    )
}

export default Header;
