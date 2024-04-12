import React from 'react';

const calcantara = () => {
    return (
        <div className="hover:scale-125 transition-transform duration-200 fixed bottom-10 right-10 z-50 fade-in ">
            <a href="https://calcantara.com">
                <img 
                    src="/calcantara.svg" 
                    alt="calcantara.com" 
                    width="40px" 
                    height="40px" 
                    style={{ filter: 'drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.3))' }}
                />
            </a>
        </div>
    );
};

export default calcantara