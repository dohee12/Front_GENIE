import React from 'react';

const Footer = () => {
    return (
        <footer className='py-4 text-sm text-center text-gray-500 border-t'>
            <p>
                <a href="/terms" className='hover:underline'> 이용약관 </a>
                <a href="/privacy" className='hover:underline'> 개인정보처리방침 </a>
                <a href="/support" className='hover:underline'>고객센터 </a>
            </p>
            <p className='mt-2'>copyright @ GENIE MUSIC Corp. All rights reserved.</p>
        </footer>
    );
};

export default Footer;