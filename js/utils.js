//Resizes the camera and renderer
//so that they always fill the screen
function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );
  backgroundRenderer.setSize( window.innerWidth, window.innerHeight );

}


//animates the scene
//by rendering and updating the tweens
function animate() {

  requestAnimationFrame(animate);

  stats.update(clock);

  //Only update the currently viewed scroller
  scrollers[currentScroller].update();

  TWEEN.update();

  renderer.render( scene, camera );
  backgroundRenderer.render(backgroundScene,camera);


}



//Transfers from leapSpace to sceneSpace
function leapToScene(position){

  toReturn = new THREE.Vector3(
    position[0]*params.movement,
    position[1]*params.movement - (params.movement * 300),
    position[2]*params.movement
  );

  return toReturn
}


//Checks for the closest object to leap pointer
function checkClosest(){

  var closestDistance = 10000000;
  var cCol = 1000;
  var cRow = 1000;



  for(var i = 0; i < scrollers[currentScroller].tiles.length; i++){
  
    var tile = scrollers[currentScroller].tiles[i];
    var distance = getDistance(tile.position,frameMarker.position);

    if(distance < closestDistance){
      closestDistance = distance;
      closestObject = tile;
    }

  }

  for(var i = 0; i < scrollers[currentScroller].tiles.length; i++){
    
    var tile = scrollers[currentScroller].tiles[i];
    $(tile.element).removeClass('selected');
    
  }


  $(closestObject.element).addClass('selected');

}


function getDistance(p1,p2){

  var dif ={
    x:p1.x-p2.x,
    y:p1.y-p2.y,
  };

  var toReturn = Math.sqrt((dif.x*dif.x)+(dif.y*dif.y));
  return toReturn;

}


/*

  The slide up and down functions:
  Used to transfer between different scrollers

*/

function slideUp(){

  if(currentScroller > 0){
    
    var curPos = camera.position.y;
    
    var start = {
      y:curPos
    };

    var target =  {
      y:curPos - spaceBetweenScrollers
    };

    //Set the tweening equal to true, so that we dont 
    //tween multiple things at the same time
    tweening  = true;

    var tween = new TWEEN.Tween( start ).to( target, 1000 );
    tween.easing( TWEEN.Easing.Exponential.InOut );
    
    tween.onUpdate( function(){
      
      camera.position.y  = start.y;

      if(start.y == target.y){
        tweening = false;
      }

    });

    tween.start();
    
    currentScroller -= 1;

    for(var i=0; i< scrollerMarkers.length; i++){
      if(i == currentScroller){

        $(scrollerMarkers[i]).addClass("selectedMarker");
        
      }else{
      
        $(scrollerMarkers[i]).removeClass("selectedMarker");

      }
    }

  }
}

function slideDown(){

  if(currentScroller < scrollers.length-1){
    
    var curPos = camera.position.y;
    
    var start = {
      y:curPos
    };

    var target =  {
      y:curPos + spaceBetweenScrollers
    };

    //Set the tweening equal to true, so that we dont tween multiple
    //things at the same time
    tweening  = true;

    var tween = new TWEEN.Tween(start).to(target, 1000);
    tween.easing(TWEEN.Easing.Exponential.InOut);
    
    tween.onUpdate(function(){

      camera.position.y = start.y;

      if(start.y == target.y){
        tweening = false;
      }

    });

    tween.start();
    currentScroller += 1;

    
    for(var i=0; i< scrollerMarkers.length; i++){
      if(i == currentScroller){

        $(scrollerMarkers[i]).addClass("selectedMarker");
        
      }else{
      
        $(scrollerMarkers[i]).removeClass("selectedMarker");

      }
    }
  
  }
  
}


function centerTile(whichObject){

  whichObject.beingViewed = true;


  var img = new Image();
  img.onload = function() {

    if( this.width <= window.innerWidth && this.height <= window.innerHeight){
      $(whichObject.element).append(this)
        .css('height','auto')
        .css('width','auto');
    }else{
      
      var widthRatio = this.width / window.innerWidth;
      var heightRatio = this.height / window.innerHeight;

      //Make sure the the image always fits in the screen
      if(widthRatio >= heightRatio){

        $(this).css("width",window.innerWidth+"px");
        $(whichObject.element).append(this)
          .css('height','auto')
          .css('width','auto');

      }else{

        $(this).css("height", window.innerHeight+"px");
        $(whichObject.element).append(this)
          .css('height','auto')
          .css('width','auto');

      }

    }

     $(whichObject.element).css('background','#000');

    //adding the title to the div
    $(whichObject.element).append("<p>"+whichObject.info.title+"</p>");

    //Sets the title so that it is the size of the image
    var self = $(this) 
    $(whichObject.element).children('p').css('width',self.css('width'));
  }

  img.src = whichObject.info.url;

  var curPos = whichObject.tempPosition;
  
  var start = {
    x:curPos.x,
    y:curPos.y,
    z:curPos.z
  };

  var target = {
    x:0,
    y:0,
    z:20
  };

  //Set the tweening equal to true, so that we dont tween multiple
  //things at the same time
  tweening  = true;

  var tween = new TWEEN.Tween(start).to(target, 1000);
  tween.easing(TWEEN.Easing.Exponential.InOut);



  
  tween.onUpdate(function(){

    whichObject.position.x = start.x;
    whichObject.position.y = start.y;
    whichObject.position.z = start.z;

    if(start.y == target.y){
      tweening = false;
      beingViewedObject = whichObject;
    }

  });

  tween.start();




}

function moveBackTile(whichObject){

  beingViewedObject = undefined;

  //Returns the tile to its original state
  $(whichObject.element)
    .css('width', tileWidth+'px')
    .css('height', tileHeight+'px')
    .children('p').remove();

  $(whichObject.element)
    .css('background', function(){      
      toReturn = "url("+ whichObject.info.image + ")";
      return toReturn
    })
    .css('background-size','cover')
    .children('img').remove()

  var curPos = whichObject.position;
  
  var start = {
    x:curPos.x,
    y:curPos.y,
    z:curPos.z
  };

  var target = {
    x:whichObject.tempPosition.x,
    y:whichObject.tempPosition.y,
    z:whichObject.tempPosition.z
  };

  //Set the tweening equal to true, so that we dont tween multiple
  //things at the same time
  tweening  = true;

  var tween = new TWEEN.Tween(start).to(target, 1000);
  tween.easing(TWEEN.Easing.Exponential.InOut);
  
  tween.onUpdate(function(){

    //Incase the tempPosition is moving
    target.x = whichObject.tempPosition.x,
    target.y = whichObject.tempPosition.y,
    target.z = whichObject.tempPosition.z,

    whichObject.position.x = start.x;
    whichObject.position.y = start.y;
    whichObject.position.z = start.z;

    if(start.y == target.y){
      tweening = false;
      whichObject.beingViewed = false;
    }

  });

  tween.start();



}



