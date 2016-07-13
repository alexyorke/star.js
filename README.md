[![npm version](https://badge.fury.io/js/star-correct.svg)](https://badge.fury.io/js/star-correct)

# star.js
Fixing typos was never easier*. A small javascript library to automatically correct typos in messages based on the next message. That means if I type something that ends with a star, Star.js will recognize that that word is meant to replace a word in the previously sent message (presumably because it was misspelled) and try to replace it.

### Usage: 
`starjs.correct(phrase[]);` where `phrase` is a two element array, the first element is the first message, the second is the correction. If there is no corrections to be made (because the correction is too ambigious, or it doesn't need to be corrected) it will return `false`.

Example 1 (nodejs): 
```
var starjs = require('star-correct');

// Will Output 'I would like to do that today sometime'
console.log(starjs.correct(['I would like to to that today sometime', 'to do*']));
```

Star.js knows when something isn't a correction, even though it is passed in as a correction.
Example 2: 
```
var starjs = require('star-correct');

// Will return false, since there is no correction to be made.
console.log(starjs.correct(['I like apples', 'I like oranges, pecans, and strawberries, too.']));
```


##### Sample Usage
*Might be used for IM applications, where messages can be edited later or sent a few seconds late in order to allow for corrections.*

Star.js is very new, and so most of the features have not been implemented yet. It's meant to replace manual spell checkers, or drop down menus that let you choose a different word. Spell checkers are very good if you have the time, but if you only have one correction to make, they're a bit overkill, especially when you have to use the mouse.

### How it works

Say you're on some sort of internet chat thing, and you type:

*Message:* Helo my name is Decagon

*Correction (immediately after you type the message):* Hello*

Star.js will notice that the second message ends with a star, and will use that word as a replacement for the misspelled word in the message. The resulting message would be: "Hello my name is Decagon".

If multiple misspelled words exist, such as when using shorthand writing, star.js will only replace the word that makes sense. 

*Message:* This is a msg with a tyop in it

*Correction:* typo*

Star.js will replace "tyop" with "typo" because it sounds similar (using soundex) but will not consider msg to be a typo because the replacement does not make sense. Similarly, if I replace a "misspelled" word with another one:

Sometimes, no words are misspelled but instead a context change is needed. If something is typed but contains something incorrect, Star.js can use some of the words in the correction to base its starting position from.

*Message:* My rss isn't working today

*Correction:* rss reader*

*Corrected Message:* My rss reader isn't working today

Here, Star.js uses "rss" as an anchor word, and adds "reader" after it.

(In beta) sometimes, corrections might make a sentence more gramatically correct, but the words have absolutely no relation to any misspellings.

*Message:* He go to store tomorrow

*Correction:* will*

*Corrected Message:* He will go to the store tomorrow

Star.js notices that the word "He" is a null link, and adds the correction to the end, since will is acting as a verb for the proper pronoun "he".

*Message:* Turn left on Main Street, then take a right at 83 Prince Street.

*Correction:* Turn right*

Since the correction begins with "turn" it will go to the first instance of the word "turn" and replace the next word with the next word in the correction. So, the message would read:

*Corrected Message:* Turn right on Main Street, then take a right at 83 Prince Street.

Things can get a bit tricky when working with multiple values that could easily be replaced, such as numbers.

*Message:* I have 34 apples and 83 eggs.

*Correction:* 23*

Here, it is more likely that the user typed "34" instead of "23" because of how close the number keys are on the keyboard compared to the distance from 8 and 3 to 2 and 3.
