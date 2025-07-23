//loading component from https://github.com/JoshK2/react-spinners-css
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Heart } from 'react-spinners-css';
import Pic from './Pic';
import ninePhoto from '../icons/99said.png';

function Gallery({ allUrlsArrays, monthNameArray }) {
    //----pass apis data to Pic component----//
    // const [allImgs, setAllImgs] = useState([]);
    // function loadImages() {
    //----try to fetch assets api but it can only return 50 assets----//
    //     // fetch('https://api.opensea.io/api/v1/assets?owner=0x0D4cC9eae54761c1aD10E1D99D73F57A930ECc98&order_direction=desc&limit=50')
    //     //     .then(res => res.json())
    //     //     .then(data => setAllImgs(data.assets)) 
    //     //     .catch(err => {
    //     //         console.error(err)
    //     //         console.error('Could not talk to OpenSea')
    //     //         return null
    //     //     });
    //     //----try to declare apis array, then fetch multiple apis---//
    //     return Promise.all(allApis.map(url =>  
    //         fetch(url)
    //             .then(res=>res.json())
    //             .catch(err => { 
    //                 console.error(err)
    //                 console.error('Could Not Talk To Opensea')
    //                 return null
    //             })
    //     ))
    //     .then(data=>setAllImgs(data));
    // }    
    // useEffect(() => {loadImages()}, []);
    //-----pass imgs data to components-----
    // const pics = allImgs.map((data)=> {
    //     return(
    //         <Pic key={data.id} url={data.image_url} content={data.description} date={data.name} />
    //     );
    // });
    

    //const[allNames, setAllNames] = useState([]);//img's title
    
    const[buttonNumber, setButtonNumber] = useState(0);

    // useEffect(() => {
    //     async function getImageUrlsByMonth(){
    //         var url_dict = {};
    //         for(let month = 0; month<12; month++ ){
    //             url_dict[month] = new Array();
    //         };
    //         const res = await fetch(storageURL);
    //         const value = await res.text();
    //         var parser = new DOMParser();
    //         var xmlDoc = parser.parseFromString(value, "text/xml");
    //         var blobs = xmlDoc.getElementsByTagName("EnumerationResults")[0].getElementsByTagName("Blobs")[0];
    //         for(var blob of blobs.children){
    //             var url = blob.getElementsByTagName("Url")[0].textContent;
    //             var name = blob.getElementsByTagName("Name")[0].textContent.split('.')[0];
    //             var month = new Date(name).getMonth();
    //             url_dict[month].push(url);
    //         }
    //         setAllUrls(url_dict);
    //     }
    //     getImageUrlsByMonth()
    // }, []);
    

    //-------display all images-----------
    // const allImgsInCircle = allUrlsArrays.map((arrays)=> {
    //         return(arrays.map((array,index)=>{
    //             return(<Pic key={index} url={array} hoverTrigger={shadowModel} />)
    //         }));
    //     })

    const ImgsInCircle = allUrlsArrays.length>0? allUrlsArrays[buttonNumber].slice(0, 10).map(
        (value)=> {
            return(
                <Pic key={value} url={value} />
            )
        }
    ):<Heart color='#ffd500' className='loading-heart'/>;

    const navigate = useNavigate();

    const monthName = monthNameArray.map((name, index)=>{
        return (
            <button 
                key= {name}
                className= {
                    allUrlsArrays[index]&&allUrlsArrays[index].length?'month-name':'month-name-empty'
                }
                onClick= {()=>{
                    allUrlsArrays[index]&&allUrlsArrays[index].length&&navigateToMonth(name.slice(0, -1), index)
                }}
                onMouseEnter= {()=> {
                    allUrlsArrays[index]&&allUrlsArrays[index].length&&setButtonNumber(index)}
                } 
                onMouseLeave= {()=> {
                    allUrlsArrays[index]&&allUrlsArrays[index].length&&setButtonNumber(0)}
                }
            >{name}</button>
        );
    });
 
    function navigateToMonth(shortname, arraynum) {
        let clickedUrlsArray = allUrlsArrays[arraynum];
        navigate(`/${shortname}`,
            {state:{
                monthTitle: shortname.concat('.'),
                monthlyImgs: clickedUrlsArray
            }}
        ); 
    }

    return (
        <div>
            <div className='gallery'>
                <div className='month-name-container'>
                    {monthName}
                </div>
                <div className='circle-container'>
                    {ImgsInCircle}
                </div>
            </div>
            <img className='nine-photo' src={ninePhoto} alt='99 said' />
            <div className='header-memo-container'>
                <p className='header-memo'>Actually most of these bad words on 99 are LIES!</p>
                {/* <p className='header-memo'>Actually this website is established with 99's large help (●´⌓`●)</p> */}
            </div>
        </div>
    );
}

export default Gallery;
