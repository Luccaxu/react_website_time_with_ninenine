import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './pages/Header';
import Gallery from './pages/Gallery';
import MonthImgs from './pages/MonthImgs';
import './App.scss';

function App() {
    //Lifting State Up
    const storageURL=process.env.REACT_APP_AZURE_URL;
    const monthNameArray = ["Jan.", "Feb.", "Mar.","Apr.", "May.", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."];
    const[allUrls, setAllUrls] = useState([]);

    useEffect(() => {
        async function getImageUrlsByMonth(){
            var url_dict = {};
            for(let month = 0; month<12; month++ ){
                url_dict[month] = new Array();
            };
            const res = await fetch(storageURL);
            const value = await res.text();
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(value, "text/xml");
            var blobs = xmlDoc.getElementsByTagName("EnumerationResults")[0].getElementsByTagName("Blobs")[0];
            for(var blob of blobs.children){
                var url = blob.getElementsByTagName("Url")[0].textContent;
                var name = blob.getElementsByTagName("Name")[0].textContent.split('.')[0];
                var month = new Date(name).getMonth();
                url_dict[month].push(url);
            }
            setAllUrls(url_dict);
        }
        getImageUrlsByMonth()
    }, [storageURL]);

    const allUrlsArrays = Object.values(allUrls);
    console.log("app run");

    return (
        <Router>
            <div><Header /></div>
            <Routes>
                <Route path='/' element={<Gallery allUrlsArrays={allUrlsArrays} monthNameArray={monthNameArray} />} />
                <Route path='/:shortname' element={<MonthImgs monthNameArray={monthNameArray} allUrlsArrays={allUrlsArrays} />} />
            </Routes>
        </Router>
    );
}

export default App;