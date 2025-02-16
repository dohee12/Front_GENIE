import React from "react";
import { useLocation } from "react-router-dom";
import Logo from "./../img/genieLogo.png";

const Header = () => {
    const location = useLocation(); // 현재 경로 가져와서 네비게이션 링크의 스타일을 동적으로 변경

    return (
        <header className="flex items-center justify-between h-16 px-64 py-3 border-b bg-white">
            <a href="/login">
                <img src={Logo} alt="지니뮤직 로고" className="w-20"/>
            </a>
            <nav className="flex space-x-8 text-gray-600 text-sm">
                {/* 각 페이지로 이동하면 글자를 파란색으로 변경하고 아니면 기본 유지*/}
                <a href="/signup" className={location.pathname === "/signup" ? "text-blue-500 font-bold" : "hover:text-blue-600"}>회원가입</a>
                <a href="/find-id" className={location.pathname === "/find-id" ? "text-blue-500 font-bold" : "hover:text-blue-600"}>아이디 찾기</a>
                <a href="/find-password" className={location.pathname === "/find-password" ? "text-blue-500 font-bold" : "hover:text-blue-600"}>비밀번호 찾기</a>
                <a href="/login" className={location.pathname === "/login" ? "text-blue-500 font-bold" : "hover:text-blue-600"}>로그인</a>
            </nav>
        </header>
    );
};

export default Header;
