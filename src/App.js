import { useEffect,useState,useRef } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import { NewsCards } from './components/NewsCards/NewsCards';
import wordsToNumbers from 'words-to-numbers'
import {Typography} from '@mui/material'
import './App.css';

const alanKey = 'a3cb8787c42d1ef3f61dd238b39be9d62e956eca572e1d8b807a3e2338fdd0dc/stage';


function App() {

  const [newsArticles, setnewsArticles] = useState([]);
  const [activeArticle, setactiveArticle] = useState(-1)

  const alanBtnInstance = useRef(null);
  useEffect(()=>{
    if (!alanBtnInstance.current) {
      alanBtnInstance.current = 
    alanBtn({
      key: alanKey,
      onCommand: ({command,articles,number}) =>{
        if(command==='newHeadlines'){
          setnewsArticles(articles);
        }
        else if(command==='highlight'){
          setactiveArticle((prevactiveArticle) => prevactiveArticle+1)
        }
        else if (command==='open'){
          const parsednum = number.length > 2? wordsToNumbers(number,{fuzzy:true}): number;
          const artic = articles[parsednum-1];
          if(parsednum>20){
            alanBtn().playText('Please try that again.');
          }
          else if(artic){
          window.open(artic.url,'_blank');
          // alanBtn.playText('Opening...');
          // alanBtn().playText('Please try that again.')
          // alanBtnInstance.playText("Hi! I am Alan");
          }
        }
      },
    })}
  },[]);

  return (
    <>
    <div className='mainhead'>
      <h2>
      AI News Assitant
      </h2>
    </div>
    <div>
      <NewsCards articles = {newsArticles} activeArticle = {activeArticle}/>
    </div>
    {!newsArticles.length ? (
        <div className='footer'>
          
          <div className="createdby">
          Created by Vivek, Ankit, Ravan, Rohith and Dikshant
          </div>
          <div className='footdet'>
          Under UG project of 6th semester 2021-22.
          </div>
        </div>
      ) : null}
    </>
  );
}

export default App;
