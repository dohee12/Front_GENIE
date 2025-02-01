import React from 'react';

const Footer = () => {
    return (
        <footer className='py-4 text-sm text-center font-bold border-t bg-gray-100'>
            <p className="footer-links flex justify-center space-x-3">
                <span className="relative after:content-['|'] after:ml-3 after:text-gray-500 last:after:content-none">
                    <a href="/terms" className='hover:underline'>이용약관</a>
                </span>
                <span className="relative after:content-['|'] after:ml-3 after:text-gray-500 last:after:content-none">
                    <a href='/privacy' className='hover:underline'>개인정보처리방침</a>
                </span>
                <span className="relative after:content-['|'] after:ml-3 after:text-gray-500 last:after:content-none">
                    <a href='/contact' className='hover:underline'>이메일주소무단수집거부</a>
                </span>
                <span className="relative last:after:content-none">
                    <a href='/report' className='hover:underline'>고객센터</a>
                </span>
            </p>
            <p className='mt-2'>Copyright © GENIE MUSIC Corp. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
