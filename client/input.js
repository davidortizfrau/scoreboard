Session.set('homeScore', 0);
Session.set('visitorScore', 0);

Template.input.events({
  'click .btn2': function(e){
    e.preventDefault();
    let side = $(e.target).attr('data-side');
    let points = $(e.target).attr('data-points');
    let shiftKey = e.shiftKey;

    let homeScore = Session.get('homeScore');
    let visitorScore = Session.get('visitorScore');

    switch(side){
      case 'home':
        if(shiftKey){
          Session.set('homeScore', Number(homeScore) - Number(points));
        } else {
          Session.set('homeScore', Number(homeScore) + Number(points))
        };
        break;
      case 'visitor':
        if(shiftKey){
          Session.set('visitorScore', Number(visitorScore) - Number(points))
        } else {
          Session.set('visitorScore', Number(visitorScore) + Number(points))
        };
        break;
    }
  }
})