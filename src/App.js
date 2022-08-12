import { cleanup } from '@testing-library/react';
import React, {useState, useEffect} from 'react'
import './style/App.scss'

let quoteJson = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

function App() {
    const [quote, setQuote] = useState('Popaosp');
    const [author, setAuthor] = useState('Charkes dick');
    const [randomNumber, setRandomNumber] = useState(0);
    const [quotesArray, setQuotesArray] = useState(null);


    const fetchQuotes = async (url) =>{
        const response = await fetch(url)
        const parse = await response.json()
        setQuotesArray(parse.quotes);
        console.log(parse);
    }

    useEffect(() =>{
        fetchQuotes(quoteJson)
    }, [quoteJson])

    const generateRandomNumber = () => {
        let rand = Math.floor(quotesArray.length * Math.random())
        console.log(rand)
        setRandomNumber(rand)
        setQuote(quotesArray[rand].quote)
        setAuthor(quotesArray[rand].author)
    }

  return (<>

    <div className='app'>
        <header className='app-header' id='quote-box'>
            <p id='text' className='text'>"{quote}"</p>
            <p id='author' className='author'>-{author}</p>
            <button id="new-quote" onClick={() => generateRandomNumber()}>Change Quote</button>
        </header>
    </div>
    </>
  )
}

export default App;