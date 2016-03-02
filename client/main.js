// Session.set('ballOn', 35);
Session.set('ballOn', Yards()[19]);
Session.set('chains', Yards()[19]);

Session.set('down', 1);
Session.set('toGo', 10);

Session.set('seconds', 3);
Session.set('quarter', 1)

Timer = null; // Global Variable

Meteor.startup( function () {
  $(document).on('keydown', function (e) {
    let keyCode = e.keyCode;
    let shiftKey = e.shiftKey;
    switch(keyCode) {
      case 39: // Right Key
        ballForward(shiftKey)
        break;
      case 37: // Left Key
        ballBackwards(shiftKey)
        break;
      case 38: // Up Key
        upDown();
        break;
      case 40: // Down Key
        firstDown()
        break;
      case 32:
        timerControl();
        break;
      default:
        return null;
    }
  });
});

function timerControl(){
  if (Timer) {
    stopTimer();
  } else {
    Timer = setInterval(dropSecond , 1000);
  };
};

function stopTimer(){
  clearInterval(Timer);
  Timer = null;
}

function dropSecond(){
  console.log("still running");
  let seconds = Session.get('seconds');

  if (seconds == 120) {
    twoMinuteWarning(true);
    return;
  };
  if (seconds >= 1) {
    Session.set('seconds', seconds - 1);
    if (seconds - 1 <= 0) { blowWhistle() };
  } else {
    stopTimer();
    nextQuarter();
    resetTimer();
  };
}

function nextQuarter() {
  let quarter = Number(Session.get('quarter'));
  Session.set('quarter', quarter + 1)
}

function resetTimer(){
  Session.set('seconds', 480);
}

function twoMinuteWarning(){
  blowWhistle();
  Session.set('seconds', 119.99);
  stopTimer();
}

function blowWhistle(){
  let audio = new Audio('/WhistleBlow.mp3');
  audio.play();
}


function ballForward(shiftKey){
  let ballOn = Session.get('ballOn');

  if (shiftKey) {
    if(ballOn.index >= 90) { return }
    Session.set('ballOn', Yards()[ballOn.index + 9]);
    firstDown();
  } else {
    if(ballOn.index == 99) { return }
    Session.set('ballOn', Yards()[ballOn.index]);
    yardsToGo();
  }
}

function ballBackwards(shiftKey){
  let ballOn = Session.get('ballOn');

  if (shiftKey) {
    if(ballOn.index <= 10) { return }
    Session.set('ballOn', Yards()[ballOn.index - 11]);
  } else {
    if(ballOn.index == 1) { return }
    Session.set('ballOn', Yards()[ballOn.index - 2]);
    yardsToGo();
  }
}

function yardsToGo(){
  let chains = Session.get('chains');
  let firstDowndMarkerIndex = chains.index + 10
  let toGo = firstDowndMarkerIndex - Session.get('ballOn').index;

  if (toGo < 1) {
    firstDown();
    return;
  } else {
    Session.set('toGo', toGo);
  }
}

function firstDown(){
  Session.set('down', 1);
  let ballOn = Session.get('ballOn');
  Session.set('chains', ballOn);
  yardsToGo();
}

function upDown(){
  let down = Session.get('down');
  if(down < 4){
    Session.set('down', (down + 1));
    return;
  } else { return }
}

function Yards() {
  return [
    { index: 1,  yard: 1,  own: true },
    { index: 2,  yard: 2,  own: true },
    { index: 3,  yard: 3,  own: true },
    { index: 4,  yard: 4,  own: true },
    { index: 5,  yard: 5,  own: true },
    { index: 6,  yard: 6,  own: true },
    { index: 7,  yard: 7,  own: true },
    { index: 8,  yard: 8,  own: true },
    { index: 9,  yard: 9,  own: true },
    { index: 10, yard: 10, own: true },
    { index: 11, yard: 11, own: true },
    { index: 12, yard: 12, own: true },
    { index: 13, yard: 13, own: true },
    { index: 14, yard: 14, own: true },
    { index: 15, yard: 15, own: true },
    { index: 16, yard: 16, own: true },
    { index: 17, yard: 17, own: true },
    { index: 18, yard: 18, own: true },
    { index: 19, yard: 19, own: true },
    { index: 20, yard: 20, own: true },
    { index: 21, yard: 21, own: true },
    { index: 22, yard: 22, own: true },
    { index: 23, yard: 23, own: true },
    { index: 24, yard: 24, own: true },
    { index: 25, yard: 25, own: true },
    { index: 26, yard: 26, own: true },
    { index: 27, yard: 27, own: true },
    { index: 28, yard: 28, own: true },
    { index: 29, yard: 29, own: true },
    { index: 30, yard: 30, own: true },
    { index: 31, yard: 31, own: true },
    { index: 32, yard: 32, own: true },
    { index: 33, yard: 33, own: true },
    { index: 34, yard: 34, own: true },
    { index: 35, yard: 35, own: true },
    { index: 36, yard: 36, own: true },
    { index: 37, yard: 37, own: true },
    { index: 38, yard: 38, own: true },
    { index: 39, yard: 39, own: true },
    { index: 40, yard: 40, own: true },
    { index: 41, yard: 41, own: true },
    { index: 42, yard: 42, own: true },
    { index: 43, yard: 43, own: true },
    { index: 44, yard: 44, own: true },
    { index: 45, yard: 45, own: true },
    { index: 46, yard: 46, own: true },
    { index: 47, yard: 47, own: true },
    { index: 48, yard: 48, own: true },
    { index: 49, yard: 49, own: true },
    { index: 50, yard: 50, own: false },
    { index: 51, yard: 49, own: false },
    { index: 52, yard: 48, own: false },
    { index: 53, yard: 47, own: false },
    { index: 54, yard: 46, own: false },
    { index: 55, yard: 45, own: false },
    { index: 56, yard: 44, own: false },
    { index: 57, yard: 43, own: false },
    { index: 58, yard: 42, own: false },
    { index: 59, yard: 41, own: false },
    { index: 60, yard: 40, own: false },
    { index: 61, yard: 39, own: false },
    { index: 62, yard: 38, own: false },
    { index: 63, yard: 37, own: false },
    { index: 64, yard: 36, own: false },
    { index: 65, yard: 35, own: false },
    { index: 66, yard: 34, own: false },
    { index: 67, yard: 33, own: false },
    { index: 68, yard: 32, own: false },
    { index: 69, yard: 31, own: false },
    { index: 70, yard: 30, own: false },
    { index: 71, yard: 29, own: false },
    { index: 72, yard: 28, own: false },
    { index: 73, yard: 27, own: false },
    { index: 74, yard: 26, own: false },
    { index: 75, yard: 25, own: false },
    { index: 76, yard: 24, own: false },
    { index: 77, yard: 23, own: false },
    { index: 78, yard: 22, own: false },
    { index: 79, yard: 21, own: false },
    { index: 80, yard: 20, own: false },
    { index: 81, yard: 19, own: false },
    { index: 82, yard: 18, own: false },
    { index: 83, yard: 17, own: false },
    { index: 84, yard: 16, own: false },
    { index: 85, yard: 15, own: false },
    { index: 86, yard: 14, own: false },
    { index: 87, yard: 13, own: false },
    { index: 88, yard: 12, own: false },
    { index: 89, yard: 11, own: false },
    { index: 90, yard: 10, own: false },
    { index: 91, yard: 9,  own: false },
    { index: 92, yard: 8,  own: false },
    { index: 93, yard: 7,  own: false },
    { index: 94, yard: 6,  own: false },
    { index: 95, yard: 5,  own: false },
    { index: 96, yard: 4,  own: false },
    { index: 97, yard: 3,  own: false },
    { index: 98, yard: 2,  own: false },
    { index: 99, yard: 1,  own: false }
  ]
}