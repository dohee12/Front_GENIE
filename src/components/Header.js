import React from 'react';
import Logo from './../img/genieLogo.png';

const Header = () => {
    return (
        <header className="flex items-center justify-between px-8 py-4 border-b bg-white">
            <a href='/login'><img src= {Logo} alt='지니뮤직 로고' className='w-20 h-10'/></a>
            <nav className='space-x-6 text-sm text-gray-600'>
                <a href="/signup">회원가입</a>
                <a href="/find-id">아이디 찾기</a>
                <a href="/find-password">비밀번호 찾기</a>
                <a href="/login" className='text-blue-600 font-bold'>로그인</a>
            </nav>
        </header>
    );
};

export default Header;