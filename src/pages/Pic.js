import React from 'react';

function Pic(props) {
    return(
            <div className={'circle-imgs'}>
                <img 
                    className='circle-img'
                    src={props.url} 
                    alt={props.url} 
                />
            </div>
    );
    
}

export default Pic ;