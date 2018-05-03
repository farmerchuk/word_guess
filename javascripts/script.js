// Global variables

var $document = $(document);
var $gameOverLayer = $('.game-over');

var randomWord = function () {
  var words = ['apple', 'cat', 'summer', 'bicycle', 'octopus', 'vacation'];

  return function() {
    var word = _(words).sample();
    words = _(words).without(word);
    return word;
  }
}();

var Game = {
  init: function() {
    this.currentWord = '';
    this.incorrectGuesses = 0;
    this.lettersGuessed = [];
    this.allowedIncorrectGuesses = 5;
    this.getWord();
    this.drawNewGame();
    this.bindKeypressHandler();
    this.bindStartNewGameButtonHandler();

    return this;
  },

  resetRound: function() {
    this.incorrectGuesses = 0;
    this.lettersGuessed = [];
  },

  getWord: function() {
    this.currentWord = randomWord() || 'Sorry, I\'ve run out of words!';
  },

  drawNewGame: function () {
    var $word = $('.word');
    var $guessesLetters = $('.guesses .letter');
    var $apples = $('[id^=apple]');

    $word.empty();
    $guessesLetters.empty();
    $apples.attr('style', '');

    for (var i = 0; i < this.currentWord.length; i += 1) {
      $word.append('<p class="letter"></p>');
    }
  },

  bindKeypressHandler: function() {
    $(document).on('keypress', function(e) {
      var guessedChar = e.key;

      if (e.key.match(/[a-z]/)) {
        this.processKeypress(guessedChar);
      }
    }.bind(this));
  },

  processKeypress: function(guessedChar) {
    var $wordLetters = $('.word .letter');

    if (!this.lettersGuessed.includes(guessedChar)) {
      this.processChar(guessedChar);
    }

    if ($wordLetters.slice(0, this.currentWord.length).text() === this.currentWord) {
      this.winRound();
    } else if (this.incorrectGuesses >= this.allowedIncorrectGuesses) {
      this.loseRound();
    }
  },

  winRound: function() {
    this.fadeBackgroundTo('win-background');
    $document.off('keypress');
  },

  loseRound: function() {
    this.fadeBackgroundTo('lose-background');
    $document.off('keypress');
  },

  processChar: function(guessedChar) {
    var currentWordArray = this.currentWord.split('');
    var $guessesLetters = $('.guesses .letter');

    this.addCharToGuesses(guessedChar, $guessesLetters);

    if (currentWordArray.includes(guessedChar)) {
      this.processCorrectGuess(currentWordArray, guessedChar);
    } else {
      this.incorrectGuesses += 1;
      this.processIncorrectGuess();
    }
  },

  addCharToGuesses: function(guessedChar, $guessesLetters) {
    this.lettersGuessed.push(guessedChar);
    this.lettersGuessed.forEach(function(char, idx) {
      $guessesLetters.eq(idx).text(char);
    });
  },

  processCorrectGuess: function(currentWordArray, guessedChar) {
    var $wordLetters = $('.word .letter');

    currentWordArray.forEach(function(char, idx) {
      if (char === guessedChar) { $wordLetters.eq(idx).text(char); }
    });
  },

  processIncorrectGuess: function() {
    var $apple = $('#apple-' + String(this.incorrectGuesses));

    $apple.animate({top: '490px'}, 1000);
  },

  fadeBackgroundTo: function(condition) {
    $(document.body).removeClass();
    $(document.body).addClass(condition);
  },

  bindStartNewGameButtonHandler: function() {
    $('.start-new-game').on('click', function(e) {
      e.preventDefault();

      this.getWord();

      if (this.currentWord.match(/Sorry/)) {
        this.gameOver();
      } else {
        this.newRound();
      }
    }.bind(this));
  },

  gameOver: function() {
    $document.off();
    $gameOverLayer.css('display', 'block');
  },

  newRound: function() {
    this.fadeBackgroundTo('normal-background');
    this.resetRound();
    this.bindKeypressHandler();
    this.drawNewGame();
  },
}


// Run game

Object.create(Game).init();
