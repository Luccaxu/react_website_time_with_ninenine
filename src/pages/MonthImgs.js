// Image Viewer from https://github.com/infeng/react-viewer
import React, { useState } from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import backIcon from '../icons/left-arrow.svg';
import Viewer from 'react-viewer';

function MonthImgs(props) {
    const location = useLocation();
    const navigate = useNavigate();

    const passedTitles = location.state.monthTitle;
    const passedUrls = location.state.monthlyImgs;

    const [visible, setVisible] = useState(false);
    const [visibleImg, setVisibleImg] = useState({address:'', date:''});

    const monthImgsList = passedUrls.map( url => {
        var filename = url.substring(url.lastIndexOf('/')+1).split('.')[0];
        return(
            <h1 key={url} className='monthImgsNames'>
                <img 
                    key={url} 
                    src={url} 
                    alt={url} 
                    className='daily-img' 
                    onClick={()=>{
                        setVisible(true);
                        viewerTrigger(url, filename);
                    }} 
                />
                {filename}
            </h1>
        );
    });

    function backToHome() {
        navigate(-1);
    }
    
    //console.log(visible);
    function viewerTrigger( eleOne, eleTwo ) {
        return (
            setVisibleImg(
                {address: eleOne,
                date: eleTwo}
            )
        );
    }

    return (
        <div>
            <div className="child-header">
                <img
                    src={backIcon} 
                    alt="back to homepage" 
                    className="back-arrow"
                    onClick={backToHome}
                />
                <h1 className="month-title">{passedTitles}</h1>
            </div>
            <div className="monthly-imgs">
                {monthImgsList}
            </div>
            <div>
                <Viewer className='react-viewer-canvas'
                    visible={visible}
                    images={[{src:visibleImg.address, alt:visibleImg.date}]}
                    onClose={() => { setVisible(false)}}
                    noImgDetails={true}
                    noNavbar={false}
                    loop={true}
                    scalable={false}
                    drag={true}      
                    changeable={false} 
                    zoomSpeed={0.2}
                />
            </div>
        </div>
    );
}

export default MonthImgs;