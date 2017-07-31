

function outputPoem() {
  
  var lyricsObj = document.getElementById("lyricsForm");
  var lyrics = lyricsObj.elements["lyrics"].value;
  lyrics = lyrics.toLowerCase().replace(/[^a-z0-9\s]/ig, "").replace(/\n/g, " ").split(" ");
  console.log(lyrics);
  
  var generateWordPairs = function(lyricArray) {
    var dictionary = {};
  
    for(var i=0; i<lyricArray.length; i++) {
      if(!dictionary[lyricArray[i]]) {
        dictionary[lyricArray[i]] = [];
      } 
      if(lyricArray[i+1] !== undefined) {
        dictionary[lyricArray[i]].push(lyricArray[i+1]);
      }
    }
    console.log(dictionary);
    return dictionary;
  }
  
  lyrics = generateWordPairs(lyrics);
  console.log("word pairs lyrics are ", lyrics);
  
  
  var writeLine = function(markovChainObject, wordLength) {
    
    //FIRST: randomly choosing first word to initialize poem line:
    
    //create empty array and then push each key name into the array
    
    var wordArray = [];
    var currentWord;
    for(var key in markovChainObject) {
      wordArray.push(key);
    }
    //then randomly choose a word from that array
    while(!currentWord) currentWord = wordArray[Math.floor(Math.random()*wordArray.length)];
    
    // SECOND: begin to build line 
    
    //declare array to hold new poem line, starting with the first word
    var line = [currentWord];
    
    //create helper function to determine next word based on current word
    function nextWord(word) {
      // if the current word has no following words (aka its dictionary entry is 0), find another random word to follow
      if(!markovChainObject[word]) {
        word = wordArray[Math.floor(Math.random()*wordArray.length)];
      }
      //return a randomly selected word from its entry
      return markovChainObject[word][Math.floor(Math.random()*((markovChainObject[word]).length))];
      }
    
    //For loop to build line of length wordLength-1 (accounts for first word already established)
    for(var i=0; i<wordLength-1; i++) {
      //add the next word to the line array
      line.push(nextWord(currentWord));
      //and set the current word to the former next word value
      currentWord = line[i+1];
    }
    //return the line array as a string
    return line.join(" ");
  }

  
  var generatePoem = function(wordCorpus, numberOfLines, numberOfWords) {
    var finalPoem = "";
    for(i=0; i<numberOfLines; i++) {
      finalPoem += (writeLine(wordCorpus, numberOfWords)) + "<br>";
    }
    console.log(finalPoem);
    document.getElementById("poem").innerHTML = finalPoem;
  }

  var numberOfWordsObj = document.getElementById("numberOfWordsForm");
  var numberOfWords = numberOfWordsObj.elements["numberOfWords"].value;
  console.log("words: ", numberOfWords);
  
  var numberOfLinesObj = document.getElementById("numberOfLinesForm");
  var numberOfLines = numberOfLinesObj.elements["numberOfLines"].value;
  console.log("lines: ", numberOfLines);
  
  generatePoem(lyrics, numberOfLines, numberOfWords);




}






// Other potential improvements:

// Implement a Markov Chain that goes 2+ words deep
// Implement a Markov Chain that includes punctuation. To do this, the Markov Chain could stores two versions of words: one in a normalized context and one that keeps the original formatting.
// Experiment with HTML and CSS to create a web app that lives outside of repl.it (SUPER BONUS FEATURE)

















// $(document).ready(main);
