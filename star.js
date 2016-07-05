var message = ["helo my name is bob", "hello*"];

document.getElementById("example").innerHTML = words.join(" ");

var starjs = {
	correct: function(message) {
		correction = message[1];
		correction = correction.split("*");
		var words = message[0].split(" ");

		for (var i = 0; i < words.length; i++) {

			if (soundex(words[i]) == soundex(correction)) {
				words[i] = correction;   
			}

		}
		return words;

	},
	soundex: function(s) { 
		var x = s.toUpperCase().split('');
		var firstLetter = x[0];

		// convert letters to numeric code
		for (var i = 0; i < x.length; i++) {
			switch (x[i]) {

				case 'B':
				case 'F':
				case 'P':
				case 'V':
					x[i] = '1';
					break;

				case 'C':
				case 'G':
				case 'J':
				case 'K':
				case 'Q':
				case 'S':
				case 'X':
				case 'Z':
					x[i] = '2';
					break;

				case 'D':
				case 'T':
					x[i] = '3';
					break;

				case 'L':
					x[i] = '4';
					break;

				case 'M':
				case 'N':
					x[i] = '5';
					break;

				case 'R':
					x[i] = '6';
					break;

				default:
					x[i] = '0';
					break;
			}
		}

		// remove duplicates
		var output = firstLetter;
		for (var i = 1; i < x.length; i++)
			if (x[i] != x[i-1] && x[i] != '0')
				output += x[i];

		// pad with 0's or truncate
		output = output + "0000";
		return output.substring(0, 4);
	}

}
