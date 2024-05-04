import React from 'react';

const calcantara = () => {
    return (
        <div className="hover:scale-125 transition-transform duration-100 fixed bottom-10 right-10 z-50 fade-in ">
            <a href="https://calcantara.com">
                <img 
                    src="/c.svg" 
                    alt="calcantara.com" 
                    width="35px" 
                    height="35px" 
                    // style={{ filter: 'drop-shadow(2px 4px 6px rgba(255, 255, 255, 0.3))' }}
                />
            </a>
        </div>
    );
};

export default calcantara