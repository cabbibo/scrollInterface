/*
 *    MOMENTUM BASED INTERACTION
 */


var motionBased = function(frame){

  if(!lastFrame){
    lastFrame = frame;
  }

  if(frame.hands[0]){

    var hand = frame.hands[0]
    frameMarker.position = leapToScene(hand.palmPosition)
    frameMarker.position.z = -450

    if(hand.pointables.length == 0){

      scrollers[currentScroller].speed  *= params.dampening;

    }else if(hand.pointables.length == 1){

      checkClosest();

      if(tweening == false){
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
      }
    }else{


      var translation = frame.translation(lastFrame);

      if(tweening == false){

        scrollers[currentScroller].speed  = params.motionBased.translationFactor * translation[0];

        //If desired, can add an additional if statemen
        //to check for direction
        if( translation[1] > params.motionBased.verticalSwipeSpeed){
     
          slideUp();

        }else if( translation[1] < -params.motionBased.verticalSwipeSpeed){

          slideDown();

        }

      }


    }

  }

  lastFrame = frame;
  
}

