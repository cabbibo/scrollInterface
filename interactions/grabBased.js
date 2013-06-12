/*
 *  Grab Based Interaction    
 */


var grabBased = function(frame){

  if(!lastFrame){
    lastFrame = frame;
  }

  if(frame.hands[0]){

    var hand = frame.hands[0]
    frameMarker.position = leapToScene(hand.palmPosition)
    frameMarker.position.z = -450

    if(hand.pointables.length == 0){

      
      var translation = frame.translation(lastFrame);

      if(tweening == false){

        scrollers[currentScroller].speed  = params.grabBased.translationFactor * translation[0];

        if( translation[1] > params.grabBased.verticalSwipeSpeed){
     
          slideUp();

        }else if( translation[1] < - params.grabBased.verticalSwipeSpeed ){

          slideDown();

        }

      }

    }else if(hand.pointables.length == 1){

      checkClosest();

      for(var i = 0; i < frame.gestures.length; i++){

        gesture = frame.gestures[i];
        if(gesture.type == 'keyTap'){

          if(beingViewedObject){
            moveBackTile(beingViewedObject);
          }else{
            centerTile(closestObject); 
            closestObject.beingViewed = true;
          }
        }
      }
    }else{


     scrollers[currentScroller].speed  *= params.dampening;


    }

  }

  lastFrame = frame;
  
}
