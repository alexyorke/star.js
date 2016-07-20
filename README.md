[![npm version](https://badge.fury.io/js/star-correct.svg)](https://badge.fury.io/js/star-correct)  [![travis cli](https://travis-ci.org/Decagon/star.js.svg)](https://travis-ci.org/Decagon/star.js/branches)  [![downloads](https://img.shields.io/npm/dm/star-correct.svg)](https://www.npmjs.com/package/star-correct) [![Join the chat at https://gitter.im/Decagon/star.js](https://badges.gitter.im/Decagon/star.js.svg)](https://gitter.im/Decagon/star.js?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

# star.js

**star-correct** does automatic typo correction in the browser, based on the next message.
```javascript
starjs.correct(['Fixing typos awsf never asier', 'easier* was*'])
// 'Fixing typos was never easier'
```

![gif of star js](https://camo.githubusercontent.com/4103442ab23201042fa832cd81ce0cb29fab642e/687474703a2f2f692e696d6775722e636f6d2f31595745554f532e676966)

(See Sozercan's slack-typobot on GitHub, powered by Star.js: https://github.com/sozercan/slack-typobot)

A small javascript npm library to automatically correct typos in messages based on the next message, and it works out of the box--no dependencies.

### Getting Started

If you're using Ubuntu/Debian, install node: `apt-get install node`

Create a new dir: `mkdir my-project && cd my-project`

Run `npm init`, then `npm install star-correct`, and just include `star-correct` via `var starjs = require('star-correct');` in the first line of your javascript file, and you're good to go!

See the examples section to get started.

### Examples

```javascript
var starjs = require('star-correct');

starjs.correct(['I would like to to that today sometime', 'to do']);
// 'I would like to do that today sometime'
```

Not all messages are corrections. Star.js knows when something isn't a correction, even though it is passed in as a correction.
```javascript
var starjs = require('star-correct');

starjs.correct(['I like apples', 'I like oranges, pecans, and strawberries, too.']);
// false (no correction needed)
```

Star.js is meant to replace manual spell checkers, or drop down menus that let you choose a different word. Spell checkers are very good if you have the time, but if you only have one correction to make, they're a bit overkill, especially when you have to use the mouse. All of these examples follow the same syntax as the previous boilerplate example.

### Examples for Star.js 2.0 (in development)

```javascript
starjs.correct(['I like apples', 'I like oranges, pecans, and strawberries, too.']);
// false (no correction needed)

starjs.correct(['She wanted to go to the movies', 'he*']);
// 'He wanted to go to the movies'

starjs.correct(['He went to the concert yesterday', 'a few days ago* was going to go*']);
// 'He was going to go to the concert a few days ago'

starjs.correct(['He go to store tomorrow', 'will*']);
// 'He will go to the store tomorrow'

starjs.correct(['Turn left on Main Street, then take a right on 123 Sesame Street', 'turn right*']);
// 'Turn right on Main Street, then take a right on 123 Sesame Street

starjs.correct(['I have 10 apples and one bananas', '2*']);
// 'I have 10 apples and two bananas'

starjs.correct(['The ayoxk bepwn dpx kimped ovwe the laxy soh', 'quick**']);
// 'The quick bepwn dpx kimped ovwe the laxy soh'
```

### Why Star.js is a bit different than a spell checker

Star doesn't try to correct every single word; it knows the correct spelling of the word that you meant to type, and compares it against the words that you did type. Here's a comparison of a general spell checker against Star:

*Super-bad-misspelled-sentence:* The ayoxk bepwn dpx kimped ovwe the laxy soh

*Correction I want to make:* quick*

*Star.js:* ayoxk -> quick (correctly identifies misspelled word)

*Conventional spell checker suggestions:* aux, askoa, Axons, ataxic... (and no suggestion for "quick"!)

This is because spell checkers put heavy emphasis on the first letter of the word being correct, which is not always the case. They also use prouncination cues to determine whether a word is spelled correctly.

Star.js doesn't use prouncination, and it doesn't focus tonnes on the first letter: it looks at keys that are close to the letter that you may be trying to type--and a few other things--to determine whether the correction should correct that word. Each misspelled word is given a ranking on how likely it could have been created by looking at the keys which are closer to each letter on the keyboard, along with calculating a modified version of the levenshtein distance, and the highest ranking word is automatically corrected, if it is not a perfect match.

### Demo

A demo is available at https://decagon.github.io/star.js/ (thanks to @njt1982 for getting the demo working nicely)

### Issues

- punctuation is not preserved if there is more than one punctuation symbol after the word that needs to be replaced
- capitalization is only preserved for the first letter, the rest is ignored
- whitespace is not preserved, but just added (and never subtracted)
- there are, of course a few false positives where star.js can make the new message non-sensical

### Browser

I have only tested Star.js in Google Chrome, but it should work with all modern browsers, except possibly IE, since it uses a string function which is not built-in to IE.

### Thanks

- @adamisntdead, for helping publish Star.js to NPM, and making the readme file more readable and attractive
- Stack Overflow (credit in comments) for the levenshtein distance algorthim
