var starjs = {
	correct: function(message) {
		var correction = message[1];
		correction = correction.split("*");
		var words = message[0].split(" ");

		for (var i = 0; i < words.length; i++) {

			if (this.soundex(words[i]) == this.soundex(correction)) {
				words[i] = correction;   
			}

		}
		return words.join(" ");

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