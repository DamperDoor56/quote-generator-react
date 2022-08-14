import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, {useState, useEffect} from 'react';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import colorsArray from './colorsArray';
import './style/App.scss'

let quoteJson = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

function App() {
    const [quote, setQuote] = useState('Behind this mask there is more than just flesh. Beneath this mask there is an idea... and ideas are bulletproof');
    const [author, setAuthor] = useState('Alan Moore, V for Vendetta');
    const [randomNumber, setRandomNumber] = useState(0);
    const [quotesArray, setQuotesArray] = useState(null);
    const [accentColor, setAccentColor] = useState('#9bf6ff');
    console.log(randomNumber);

    const fetchQuotes = async (url) =>{
        const response = await fetch(url)
        const parse = await response.json()
        setQuotesArray(parse.quotes);
        console.log(parse);
    }

    useEffect(() =>{
        fetchQuotes(quoteJson)
    }, [])

    const generateRandomNumber = () => {
        let rand = Math.floor(quotesArray.length * Math.random())
        console.log(rand)
        setRandomNumber(rand)
        setAccentColor(colorsArray[rand])
        setQuote(quotesArray[rand].quote)
        setAuthor(quotesArray[rand].author)
    }

  return (<>

    <div className='app' style={{backgroundColor:accentColor}}>
        <header className='app-header' id='quote-box' style={{color:accentColor}}>
            <p id='text' className='text'>"{quote}"</p>
            <p id='author' className='author'>-{author}</p>
            <button id="new-quote" style={{backgroundColor:accentColor}} onClick={() => generateRandomNumber()}>Change Quote</button>
            <a id='tweet-quote' style={{backgroundColor:accentColor}} className='twitter-btn' href={encodeURI(`http://www.twitter.com/intent/tweet?text=${quote} -${author}`)}><FontAwesomeIcon icon={faTwitter} /></a>
        </header>
    </div>
    </>
  )
}

export default App;