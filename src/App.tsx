import { SetStateAction, useState} from 'react'
import './App.css'


function App() {

    //Our states
    //Input form from the user and all the stuff they type in it gets stored here.
    const [user, userInput] = useState("");

    //We store all vowels from the user input here.
    const [vowels, setVowels] = useState("");

    //We store the actual html for the word when they press submit.
    const [highlightedWord, setHighlightedWord] = useState();

    //Since I'm using TSX  I need to specify the type of e
    const display = (e: SetStateAction<string>) => {
        //Convert e to a string, then turn it into a list, so we can iterate over it
        const curInput = e.toString().split("");
        //Initialize a str, so we can pull out just the vowels for a vowel only label
        let vowelStr = ""
        //Iterate over the input and regex the vowels
        for (let i = 0; i < curInput.length; i++) {
            if (curInput[i].match(/[aeiouAEIOU]/)) {
                vowelStr += curInput[i]
            }
        }

        //Update the states
        userInput(e)
        setVowels(vowelStr)
    }

    //We iterate over the stored user input and make html for highlighting the word
    const highlightedHtml = () => {
        let stuff = []
        for (let i = 0; i < user.length; i++) {
            if (user[i].match(/[aeiou]/)) {
                stuff.push(<span><mark>{user[i]}</mark></span>)
            } else {
                stuff.push(<span>{user[i]}</span>)
            }
        }
        return stuff
    }

    //Let's add the new list item in a specific way
    const createHistoryListItem = () => {
        let htmlContent = []
        htmlContent.push(highlightedWord)
        htmlContent.push(
            <li>
                <p>
                    Fully Typed Word: {user}
                </p>
                <p>
                    Number of Vowels: {vowels.length}
                </p>
                <p>
                    Highlighted Vowels: {highlightedHtml()}
                </p>
            </li>)
        // @ts-ignore
        setHighlightedWord(htmlContent)
        return htmlContent
    }

    return (
    <div className="App">
        <div>
            <label id="highlight-vowels">
                Highlight Vowels:
                {highlightedHtml()}
            </label>
        </div>
        <div>
            Vowel Count: {vowels.length}
        </div>
        <div>
            <label>
                Found Vowels: <mark>{vowels}</mark>
            </label>
        </div>
        <form>
            <label>
                User Input:
                <input type="text"
                       value={user}
                       onChange={(e) => display(e.target.value)}
                />
            </label>
        </form>
        <button onClick={() => createHistoryListItem()}>Add to list</button>
        <ul>
            {highlightedWord}
        </ul>
    </div>
    )
}

export default App
