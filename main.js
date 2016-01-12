var _ = require('lodash')

module.exports = {
  // String : [LeetCode 151] Reverse words in a sentence
  // Input	: "the sky is blue"
  // Outout : "blue is sky the"
  ReverseWordsInSentence: function(input) {
    var med="", head = input.length-1, tail = input.length;
    for(i = input.length-1; i >= 0; i--) {
     if(input[i] != ' '){
       head--;
       continue
     }
     med += input.substring(head, tail)
     tail = head;
     head--;
    }

    med += " "+input.substring(0, tail);
    return med.trim(' ');
  }
}

