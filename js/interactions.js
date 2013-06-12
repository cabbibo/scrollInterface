/*

    Interaction Modes:

    A list of different interaction functions
    to be added to the on frame function 

*/


var velocityBased = function(frame){

  if(frame.hands[0]){

    var hand = frame.hands[0]
    frameMarker.position = leapToScene(hand.palmPosition)
    frameMarker.position.z = -450


    //Is the the hand vertical enough to be considered for horizontal swiping
    //We are doing this test first, because it should not care about fingers
    if(Math.abs(hand.palmNormal[0])>palmNormalForHorizontalSwipe){
    
      //if(verticalHandScrolling == true){
      //scrollers[currentScroller].speed = 60 * hand.palmVelocity[0]/swipeDivision;
    
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
            
            if(gesture.speed >= params.velocityForVerticalSwipe){
              
              if(gesture.direction[1] <= -.9){
              
                slideDown();
        
              }else if(gesture.direction[1] >= .9){
              
                slideUp();
              
              }
            

            //Uncomment Else Statement if you are interested in using gesture based swipe
            //for left and right
            }/*else{

              toAdd = gesture.direction[0] * gesture.speed / swipeDivision;

              scrollers[currentScroller].speed += toAdd;
            }*/

          }
        }

        /*
         * Alternative hortizontal movement
         */

        if(horizontalHandScrolling == true){
          scrollers[currentScroller].speed = 60 * hand.palmVelocity[0]/ params.swipeDivision;
        }
      }

    }

  }else{

    scrollers[currentScroller].speed *= params.dampening;

  }

}



var momentumBased = function(frame){

  if(frame.hands[0]){

    var hand = frame.hands[0]
    frameMarker.position = leapToScene(hand.palmPosition)
    frameMarker.position.z = -450


    //Is the the hand vertical enough to be considered for horizontal swiping
    //We are doing this test first, because it should not care about fingers
    if(Math.abs(hand.palmNormal[0])>params.palmNormalForHorizontalSwipe){
      
      scrollers[currentScroller].speed += hand.palmVelocity[0]/params.swipeDivision;
    
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
            
            if(gesture.speed >= params.velocityForVerticalSwipe){
              
              if(gesture.direction[1] <= -.9){
              
                slideDown();
        
              }else if(gesture.direction[1] >= .9){
              
                slideUp();
              
              }
            

            //Uncomment Else Statement if you are interested in using gesture based swipe
            //for left and right
            }/*else{

              toAdd = gesture.direction[0] * gesture.speed / swipeDivision;

              scrollers[currentScroller].speed += toAdd;
            }*/

          }
        }

        /*
         * Alternative hortizontal movement
         */

        if(horizontalHandScrolling == true){
          scrollers[currentScroller].speed = 60* hand.palmVelocity[0]/params.swipeDivision;
        }
      }

    }

  }else{

    scrollers[currentScroller].speed *= params.dampening;

  }

}

