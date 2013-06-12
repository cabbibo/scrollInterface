/*
 *    MOMENTUM BASED INTERACTION
 */


var momentumBased = function(frame){

  if(frame.hands[0]){

    var hand = frame.hands[0]
    frameMarker.position = leapToScene(hand.palmPosition)
    frameMarker.position.z = -450


    //Is the the hand vertical enough to be considered for horizontal swiping
    //We are doing this test first, because it should not care about fingers
    if(Math.abs(hand.palmNormal[0])>params.momentumBased.palmNormalForHorizontalSwipe){
      
      scrollers[currentScroller].speed += hand.palmVelocity[0]/params.momentumBased.divisionFactor;
    
    }else{

      if(hand.fingers.length == 0){

         scrollers[currentScroller].speed  *= params.dampening;

      }else if(hand.fingers.length == 1){

        checkClosest(); 

        scrollers[currentScroller].speed *= params.dampening;

        if(frame.gestures[0] && tweening == false){

          if(frame.gestures[0].type == 'screenTap'){
      
            if(closestObject.beingViewed == true){
              
              closestObject.beingViewed = false;
              moveBackTile(closestObject);
              
            }else{
           
              if(beingViewedObject){
                moveBackTile(beingViewedObject);
              }

              centerTile(closestObject); 
              closestObject.beingViewed = true;
            
            }

          }else if(frame.gestures[0].type == 'keyTap'){

            if(beingViewedObject){
            
              moveBackTile(beingViewedObject);
            
            }
          
          }
          
        }

      //More than one finger
      }else{

         /*
         * VERTICAL SWIPE
         */
        if(frame.gestures[0]){
         
          if(frame.gestures[0].type == 'swipe' && tweening == false){

            var gesture = frame.gestures[0];
            
            if(gesture.speed >= params.momentumBased.verticalSwipeSpeed){
              
              if(gesture.direction[1] <= -params.momentumBased.verticalSwipeDirection){
              
                slideDown();
        
              }else if(gesture.direction[1] >= params.momentumBased.verticalSwipeDirection ){
              
                slideUp();
              
              }
            
            }
          }
        }

      }

    }

  }else{

    scrollers[currentScroller].speed *= params.dampening;

  }

}

