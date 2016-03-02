Template.scoreboard.helpers({
  homeScore: function(){
    return Session.get('homeScore');
  },
  visitorScore: function(){
    return Session.get('visitorScore');
  },
  down: function(){
    return Session.get('down');
  },
  ballOn: function(){
    return Session.get('ballOn');
  },
  toGo: function(){
    return Session.get('toGo');
  },
  own: function(){
    own = Session.get('ballOn').own
    if (own) { return 'own' } else { return '' }
  },
  seconds: function(){
    return ('0' + Math.round(Number(Session.get('seconds')))%60).slice(-2);
  },
  minutes: function(){
    return Math.floor(Math.round(Number(Session.get('seconds')))/60);
  },
  quarter: function(){
    return Session.get('quarter');
  }
});