//typewriter hook from https://github.com/awran5/react-simple-typewriter
import React from 'react';
import { useTypewriter, Cursor} from 'react-simple-typewriter'

function Header() {
    const {text} = useTypewriter({
        words: ['ᕙ(^▿^ᕙ)','( ◡́.◡̀)(^◡^ )','¯\_(ツ)_/¯', '⸜( ˙˘˙)⸝', '\(◡̈ )/♥︎', 'ᕕ( ᐛ )ᕗ', '≧◉◡◉≦', '(ㆆ_ㆆ)', '(¬‿¬)','ᕙ(`▿´)ᕗ', '(ɔ˘ ³(-‿-c)', '┻┻︵ヽ(`▭´)ﾉ︵┻┻'],
        loop: 0,
        typeSpeed: 90,
        deleteSpeed: 70,
        delaySpeed: 900,
        //onLoopDone: () => console.log(`loop completed after x runs.`)
    });

    return (
        <div>
            <div className='header'>
                <h1 className='header-title'>
                    What a <span className='header-typewriter'>
                        {text}
                    </span><Cursor /> day!
                </h1>
                <h1 className='header-intro'>Delivering a new drawing every day about me and my girlfriend 99</h1>
            </div>
            
        </div>
    );
    
}

export default Header;