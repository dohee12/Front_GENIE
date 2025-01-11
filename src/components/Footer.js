import React from 'react';

const Footer = () => {
    return (
        <footer className='py-4 text-sm text-center font-bold border-t bg-gray-100'>
            <p>
                <a href="/terms" className='hover:underline'>이용약관</a> | 
                <a href='/privacy' className='hover:underline'>개인정보처리방침</a> | 
                <a href='/contact' className='hover:underline'>이메일주소무단수집거부</a> | 
                <a href='/report' className='hover:underline'>고객센터</a>
            </p>
            <p className='mt-2'>Copyright © GENIE MUSIC Corp. All rights reserved.</p>
        </footer>
    );
};

export default Footer;