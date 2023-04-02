import './RecipeScrapingForm.css';
import { useState } from "react";
import ErrBubble from './common/ErrBubble';
import ButtonMain from './ButtonMain';
import formatScrapedRecipe from './utils/formatScrapedRecipe';
import isValidHttpURL from './utils/isValidHttpURL';

export default function ScrapeRecipeForm({ handleResponse }) {
  const [urlInputErr, setURLInputErr] = useState({ isShowing: false, msg: '' });
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    let inputString = e.target.querySelector('input').value;
    
    if(!isValidHttpURL(inputString)){
      setURLInputErr({ isShowing: true, msg: 'Please paste a valid recipe URL' });
      return false;
    } 
    
    try {
      setIsLoading(true);
      let res = await fetch(`http://localhost:8000/recipe-data?url=${inputString}`);

      if(res.status === 200){
        setURLInputErr({ isShowing: false, msg: ''});
        let data = await res.json();
        handleResponse(formatScrapedRecipe(data));
        e.target.querySelector('input').value = "";
      } else {
        let errText = await res.text();
        setURLInputErr({ isShowing: true, msg: errText });
      }
    } catch {
      setURLInputErr({ isShowing: true, msg: 'Failed to connect to recipe API. Please try again later'});
    } finally {
      setIsLoading(false);
    }
  }

  return ( 
    <form id="recipe-scraping-form" onSubmit={handleSubmit}>
      <div id="rsf-input-wrapper">
        <input type="text" id="url-input" placeholder="Paste a recipe's URL"
        onFocus={() => setURLInputErr({ isShowing: false, msg: ''})} />
        {urlInputErr.isShowing && <ErrBubble msg={urlInputErr.msg} />}
      </div>
      <ButtonMain text='Get Recipe' />
      {isLoading && <img id="rsf-spinner" src="loading-gif.gif" alt="safs" />}
    </form>
  );
}
