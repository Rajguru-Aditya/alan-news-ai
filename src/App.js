import React, { useState, useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsCards from './components/NewsCards/NewsCards';

import wordsToNumbers from 'words-to-numbers';

import useStyles from './styles.js';


const alanKey = '3dcb4cd8c8de4f028bd4061fa4adb4022e956eca572e1d8b807a3e2338fdd0dc/stage';

//dabf3cf8d93c49248c36c9bdf761fc4b


const App = () =>{

    const [newsArticles, setNewsArticles] = useState([]);
    const [activeArticle, setActiveArticle] = useState(-1);
    const classes = useStyles();

    useEffect(() => {
        alanBtn({
            key: alanKey,
            onCommand: ({ command, articles, number }) => {
                if(command === 'newHeadlines'){
                    setNewsArticles(articles);
                    setActiveArticle(-1);
                } else if(command === 'highlight'){
                    setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
                } else if(command === 'open'){
                    const parsedNumber = number.length > 2 ? wordsToNumbers(number, { fuzzy: true }) : number;
                    const article = articles[parsedNumber - 1];

                    if(parsedNumber > 20){
                        alanBtn().playText('Please try that again.')
                    } else if(article){
                        window.open(article.url, '_blank');
                        alanBtn().playText('Opening...');
                    }
                }
            }
        });
    }, [])


    return(
        <div>
            <div className={classes.logoContainer}>
                <img src='https://46ba123xc93a357lc11tqhds-wpengine.netdna-ssl.com/wp-content/uploads/2019/10/alan.jpg' className={classes.alanLogo} alt="alan logo"/>

            </div>
            <NewsCards articles={newsArticles} activeArticle={activeArticle} />
        </div>
    );
}
//https://miro.medium.com/max/700/1*HQrTZ0sZd6m3XigurzBsGA.png
//https://46ba123xc93a357lc11tqhds-wpengine.netdna-ssl.com/wp-content/uploads/2019/10/alan.jpg

export default App;