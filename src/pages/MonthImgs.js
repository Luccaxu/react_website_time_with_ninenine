// Image Viewer from https://github.com/infeng/react-viewer
import React, { useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import backIcon from '../icons/left-arrow.svg';
import Viewer from 'react-viewer';
import { Heart } from 'react-spinners-css';

//blur image date : 1-6/21/25/31 2-1/9/28 5-30 6-5/6

function MonthImgs({ allUrlsArrays, monthNameArray }) {
    const location = useLocation();
    const navigate = useNavigate();
    let {shortname} = useParams();
    
    const index = monthNameArray.indexOf(shortname.concat("."));

    const passedTitles = location.state==null? shortname.concat(".") : location.state.monthTitle;
    const passedUrls = location.state==null? allUrlsArrays[index]: location.state.monthlyImgs;

    const [visible, setVisible] = useState(false);
    const [visibleImg, setVisibleImg] = useState({address:'', date:''});
    
    const blurredImgs = ['2022-01-06', '2022-01-21', '2022-01-25', '2022-01-31', '2022-02-01', '2022-02-09', '2022-02-28', '2022-05-30', '2022-06-05', '2022-06-06'];
    const monthImgsList = allUrlsArrays.length>0? passedUrls.map( (url, index) => {
        var filename = url.substring(url.lastIndexOf('/')+1).split('.')[0];
        return(
            <div className='monthImgsContainer'>
                <img 
                    key={url} 
                    src={url} 
                    alt={url} 
                    className={blurredImgs.indexOf(filename)>-1?'blurred-daily-img':'daily-img'}
                    onClick={()=>{
                        setVisible(blurredImgs.indexOf(filename)>-1?false:true);
                        viewerTrigger(url, filename);
                    }}
                />
                <h1 key={filename} className='monthImgsNames'>{filename}</h1>
                {blurredImgs.indexOf(filename)>-1&&<p className='note-text' key={index}>Sorry.<br/>This Image Has Been Blocked By 99 Censorship.</p>}
            </div>
        );
    }) : <Heart color='#ffd500' className='loading-heart-childpage'/>;

    function backToHome() {
        navigate('/');
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
                    key="back to homepage"
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
                <Viewer 
                    className='react-viewer-canvas'
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
                >
                </Viewer>
            </div>
        </div>
    );
}

export default MonthImgs;