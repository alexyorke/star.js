var starjs = {
	correct: function(message) {
		// Credit: http://stackoverflow.com/questions/11919065/sort-an-array-by-the-levenshtein-distance-with-best-performance-in-javascript/11958496#11958496
		function distance(s, t) {
			var d = []; //2d matrix

			// Step 1
			var n = s.length;
			var m = t.length;

			if (n === 0) return m;
			if (m === 0) return n;

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

		function isUpperCase(text) {
			return (text[0].toUpperCase() == text[0]);
		}

		if (("/".indexOf(message[0]) > -1) && ("/".indexOf(correction) > -1)) {

			return false; // might be a path name

		}

		var wordsOfMessage = message[0].split(" ");
		var correction = message[1].split("*")[0];

		if (wordsOfMessage.length == correction.split(" ").length) {
			return correction;
		}

		if (correction.length === 0) {
			return false;
		}

		var correctionMerged = correction;

		if (typeof(correction) !== "string") {
			correctionMerged = correction.join("");
		}

		if (("!$%().,?;:".indexOf(correction[correction.length - 1]) > -1)) {

			if (correctionMerged.length == 1) {
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

		var oldIndex = 0;
		var oldDistance = 10000;

		for (var i = 0; i < wordsOfMessage.length; i++) {

			var newDistance = distance(wordsOfMessage[i],correction);

			if ((newDistance < oldDistance) && (newDistance !== 0)) {
				oldDistance = newDistance;
				oldIndex = i;
			}

		}
		var prevWord = wordsOfMessage[oldIndex];

		// http://stackoverflow.com/a/4431173
		var punctuation = prevWord.match(/['";:,.\/?\\-]/g);

		if (punctuation === null) {
			punctuation = "";
		}

		// if the levenstein distance is too far, cancel early
		if (oldDistance > 4) { return false; }

		// match case

		correction = correction.split("");

		if (isUpperCase(wordsOfMessage[oldIndex])) {
			correction[0] = correction[0].toUpperCase();
		} else {
			correction[0] = correction[0].toLowerCase();
		}

		correction = correction.join("");
		wordsOfMessage[oldIndex] = correction + punctuation;

		return wordsOfMessage.join(" ");

	},
	closeKeys: function(inputText, correction) {
		// it's up to the algorthim to determine whether a match is "too good" (i.e the ranking is too high and to find a slightly lower one.) This is because if the ranking is too high, it means that the input and correction are identical, and it's unlikely that the user corrected a perfectly good word.


		// returns an array, the first element is the ranking of how closely the inputText could resemble the output from 0 to length of inputText or correction, whichever is greater. The higher the number the higher probability that it could be spelled with the correction.
		// the second element is the same thing as the first, except the possible values range from 0 to 1, 0 being completely unlikely it could be generated from the correction, and 1 being 100% chance it was (i.e is the same text.)

		// the keyApprox array is for a US qwerty keyboard layout
		var keyApprox = {
			q: "qwasedzx",
			w: "wqesadrfcx",
			e: "ewrsfdqazxcvgt",
			r: "retdgfwsxcvgt",
			t: "tryfhgedcvbnju",
			y: "ytugjhrfvbnji",
			u: "uyihkjtgbnmlo",
			i: "iuojlkyhnmlp",
			o: "oipklujm",
			p: "ploik",
			a: "aqszwxwdce",
			s: "swxadrfv",
			d: "decsfaqgbv",
			f: "fdgrvwsxyhn",
			g: "gtbfhedcyjn",
			h: "hyngjfrvkim",
			j: "jhknugtblom",
			k: "kjlinyhn",
			l: "lokmpujn",
			z: "zaxsvde",
			x: "xzcsdbvfrewq",
			c: "cxvdfzswergb",
			v: "vcfbgxdertyn",
			b: "bvnghcftyun",
			n: "nbmhjvgtuik",
			m: "mnkjloik"
		};

		var closeLetters = [];
		var totalRanking = 0;

		// make sure that there are no extra spaces, otherwise it messes things up
		inputText = inputText.trim();
		correction = correction.trim();

		for (var i = 0; i < inputText.length; i++) {
			closeLetters.push(keyApprox[inputText[i]]);
		}

		for (var j = 0; j < correction.length; j++) {

			if (closeLetters[j] !== undefined) {

				var ranking = closeLetters[j].indexOf(correction[j]);

				// if it is the first letter (i.e the same letter) set to one, which is the highest ranking
				if (ranking === 0) {
					ranking = 1;
				}

				// close letter not found in array (i.e too far)
				if (ranking == -1) {
					// penalize the ranking
					ranking--;
				}

				totalRanking = totalRanking + (1 / ranking);
			} else {
				// something bad happened, and the correction/inputText is too long or short.
			}

		}

		return [totalRanking, ((totalRanking / Math.max(correction.length, inputText.length)) + 1) / 2];
	}


};

module.exports = starjs;
