var starjs = {
	correctL: function(message) {
		function distance(s, t) {
			var d = []; //2d matrix

			// Step 1
			var n = s.length;
			var m = t.length;

			if (n == 0) return m;
			if (m == 0) return n;

			//Create an array of arrays in javascript (a descending loop is quicker)
			for (var i = n; i >= 0; i--) d[i] = [];

			// Step 2
			for (var i = n; i >= 0; i--) d[i][0] = i;
			for (var j = m; j >= 0; j--) d[0][j] = j;

			// Step 3
			for (var i = 1; i <= n; i++) {
				var s_i = s.charAt(i - 1);

				// Step 4
				for (var j = 1; j <= m; j++) {

					//Check the jagged ld total so far
					if (i == j && d[i][j] > 4) return n;

					var t_j = t.charAt(j - 1);
					var cost = (s_i == t_j) ? 0 : 1; // Step 5

					//Calculate the minimum
					var mi = d[i - 1][j] + 1;
					var b = d[i][j - 1] + 1;
					var c = d[i - 1][j - 1] + cost;

					if (b < mi) mi = b;
					if (c < mi) mi = c;

					d[i][j] = mi; // Step 6

					//Damerau transposition
					if (i > 1 && j > 1 && s_i == t.charAt(j - 2) && s.charAt(i - 2) == t_j) {
						d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + cost);
					}
				}
			}

			// Step 7
			return d[n][m];
		}

		wordsOfMessage = message[0].split(" ");
		correction = message[1].split("*")[0];

		if (wordsOfMessage.length == correction.split(" ").length) {
			return correction;
		}

		if (correction.length == 0) {
			return false;
		}
		if (("!$%().,?;:".indexOf(correction[correction.length - 1]) > -1)) {

			if (correction.join("").length == 1) {
				// entire correction is to fix punctuation

				wordsOfMessage = wordsOfMessage.join(" ");
				wordsOfMessage[wordsOfMessage.length - 1] = correction;
				return wordsOfMessage;
			}
		}

		if (correction[correction.length - 1] == ":") {
			return false; // a :* face
		}

		if ((wordsOfMessage.length == 1) && (correction.length == 1) && (wordsOfMessage[0] == correction[0])) {
			return false;
		}

		oldIndex = 0;
		oldDistance = 10000;
		
		for (var i = 0; i < wordsOfMessage.length; i++) {

			newDistance = distance(wordsOfMessage[i],correction);

			if (newDistance < oldDistance) {
				oldDistance = newDistance;
				oldIndex = i;
			}

		}
		prevWord = wordsOfMessage[oldIndex];
		punctuation = (prevWord.substr(prevWord.length - 1));
		
		if (!("!$%().,?;:".indexOf(punctuation) > -1)) {
			punctuation = "";
		}
	
		// if the levenstein distance is too far, cancel early
		if (oldDistance > 13) { return false; }
		
		wordsOfMessage[oldIndex] = correction + punctuation;
		
		return wordsOfMessage.join(" ");

	},
	correct: function(message, allowMultipleCorrections = false, allowLongCorrections = false) {
		var correction = message[1];
		var words = message[0].split(" ");
		correction = correction.trim();

		if (correction.split(" ").length - 2 > words.length) {
			console.log("Filter 1");
			return false;
		}	       

		if (correction.split(" ").length == 1 && words.length == 1) {
			return correction.split("*")[0];
		}
		correction = correction.split("*");
		if (!allowLongCorrections) {
			if (message[1].split(" ").length > 4) {
				console.log("Triggered filter 2");
				return false; // disallow long corrections
			}
		}

		var modifiedText = false;
		for (var i = words.length; i--;) {

			if (this.soundex(words[i]) == this.soundex(correction)) {
				words[i] = correction;   
				modifiedText = true;
				if (!allowMultipleCorrections) {
					break;
				}
			}

		}
		if (modifiedText) {
			return words.join(" ");
		} else {
			console.log("Star.js: could not find suitable replacement.")
				return false;
		}

	},
	soundex: function(str) { 
		str = str.toString();
		str = str.toUpperCase();
		str = str.split('');

		var firstLetter = str[0];

		// convert letters to numeric code
		for (var i = 0; i < str.length; i++) {
			switch (str[i]) {

				case 'B':
				case 'F':
				case 'P':
				case 'V':
					str[i] = '1';
					break;

				case 'C':
				case 'G':
				case 'J':
				case 'K':
				case 'Q':
				case 'S':
				case 'X':
				case 'Z':
					str[i] = '2';
					break;

				case 'D':
				case 'T':
					str[i] = '3';
					break;

				case 'L':
					str[i] = '4';
					break;

				case 'M':
				case 'N':
					str[i] = '5';
					break;

				case 'R':
					str[i] = '6';
					break;

				default:
					str[i] = '0';
					break;
			}
		}

		// remove duplicates
		var output = firstLetter;
		for (var i = 1; i < str.length; i++)
			if (str[i] != str[i-1] && str[i] != '0')
				output += str[i];

		// pad with 0's or truncate
		output = output + "0000";
		return output.substring(0, 4);
	}

};

module.exports = starjs;
