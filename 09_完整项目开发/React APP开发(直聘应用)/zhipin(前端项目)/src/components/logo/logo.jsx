// logo静态组件
import React from 'react';

import logo from './logo.png'
import './logo.less'

const Logo = () => {
    return (
        <div>
            <div className='logo-container'>
                <img src={logo} alt='none' className='logo-img' />
            </div>
        </div>
    );
}

export default Logo;
