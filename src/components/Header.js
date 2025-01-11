import React from 'react';

const Header = () => {
    return (
        <header className="flex items-center justify-between px-8 py-4 border-b bg-white">
            <h1 className='text-2xl font-bold text-blue-500'><a href='/login'>genie</a></h1>
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