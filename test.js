var assert  = require('assert');
var _       = require('lodash')
var main       = require('./main')

describe('ReverseWordsInSentence', function(){
  it('should be equal', function(){
    var testCases = {
      'the sky is blue': 'blue is sky the',
      'i am a student': 'student a am i'
    }
    _.each(testCases, function(v, k){
      assert.equal(main.ReverseWordsInSentence(k), v);
    }) 
  })
});
