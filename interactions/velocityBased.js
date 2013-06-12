/*
 *    VELOCITY BASED INTERACTION
 */

var velocityBased = function(frame){

  if(frame.hands[0]){

    var hand = frame.hands[0];
    frameMarker.position = leapToScene(hand.palmPosition);
    frameMarker.position.z = -450;


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
          var d = gesture.direction[1];
          var speed = (gesture.speed >= params.velocityBased.verticalSwipeSpeed);
          var dir = (Math.abs(d) >= params.velocityBased.verticalSwipeDirection);
          if(dir && speed){
            
            if(gesture.direction[1] <= 0){
            
              slideDown();
      
            }else if(gesture.direction[1] >= 0){
            
              slideUp();
            
            }
          }
        }
      }

      var speed = hand.palmVelocity[0]/params.velocityBased.divisionFactor;
      scrollers[currentScroller].speed = speed;
    

    }

  }else{

    scrollers[currentScroller].speed *= params.dampening;

  }

}


