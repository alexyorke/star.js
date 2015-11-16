# star.js
Fixing typos was never easier*. A small javascript library to automatically correct typos in messages based on the next message. Star.js is very new, and so most of the features have not been implemented yet.

# How it works

For example, if I type:

Helo my name is Decagon
Hello*

Star.js will notice that the second message ends with a star, and will use that word as a replacement for the misspelled word in the message. If multiple misspelled words exist, such as when using shorthand writing, star.js will only replace the word that makes sense. The resulting message would be "Hello my name is Decagon"

For example,

Message: This is a msg with a tyop in it

Correction: typo*

Star.js will replace "tyop" with "typo" because it sounds similar (using soundex) but will not consider msg to be a typo because the replacement does not make sense. Similarly, if I replace a "misspelled" word with another one:

Message: Just send the file over to /dev/zero

Correction: /dev/null*

Star.js will recognize that /dev/zero is a misspelled word, and notices that the replacement is also misspelled. Since the two look similar, (both contain slashes and start with /dev/) it will replace it.

Sometimes, no words are misspelled but instead a context change is needed. If something is typed but contains something incorrect, Star.js can use some of the words in the correction to base its starting position from.

For example,

Message: Turn left on Main Street, then take a right at 83 Prince Street.

Correction: Turn right*

Since the correction begins with "turn" it will go to the first instance of the word "turn" and replace the next word with the next word in the correction. So, the message would read:

Corrected Message: Turn right on Main Street, then take a right at 83 Prince Street.

Things can get a bit tricky when working with multiple values that could easily be replaced, such as numbers.

Message: I have 34 apples and 83 eggs.
Correction: 23*

Here, it is more likely that the user typed "34" instead of "23" because of how close the number keys are on the keyboard compared to the distance from 8 and 3 to 2 and 3.
