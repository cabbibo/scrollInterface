
/*
 *  A 'SCROLLER' is essentially a set of images that
 *  can scroll to the side
 *
 */

function SCROLLER(subreddit,whichScroller){

  //speed will only be for the x direction
  this.speed = 0;

  //Defining the full height and width for each tile, which includes spacing
  //making this scroller specific so that we can make different spacing per
  //scroller
  this.fullHeight = tileHeight + spacingHeight;
  this.fullWidth = tileWidth + spacingWidth;
  
  //Defining the width of the scroller,
  //so that it will loop smoothly
  this.width = Math.floor(subreddit.images.length/scrollerHeight) * this.fullWidth;


  /*
   *   BACKGROUND:
   *   Part of the scroller that will be renderered
   *   In the WebGL renderer. Used to let the user
   *   know where they are in the loop. Could very
   *   easily be part of the css3d renderer, if the 
   *   styles fit
   *
   */

  //The background, which will be webGL objects
  //added to the background renderer
  this.background = new THREE.Object3D();

  //placing this background vertically
  this.background.position.y = whichScroller * spaceBetweenScrollers;
 
  var scrollGeo = new THREE.IcosahedronGeometry(100,0);
  var scrollMaterial = new THREE.MeshNormalMaterial();

  scrollMarker = new THREE.Object3D();
  var scrollShape = new THREE.Mesh(scrollGeo,scrollMaterial);
  scrollMarker.add(scrollShape);

  var loopMarker = new THREE.Mesh(new THREE.CubeGeometry( 30 , 800 , 30 ),scrollMaterial);
  loopMarker.position.z = 130;
  scrollMarker.add(loopMarker);

  this.background.add(scrollMarker);
  backgroundScene.add(this.background);


  /*
   *  
   *  FOREGROUND:
   *  CSS3D Objects that are part of the foreground
   *  These are the tiles that we will be viewing and manipulating
   *
   */

  //The scene for the scroller that we will be adding
  // all of the tiles to.
  this.scene = new THREE.Object3D();

  //placing this scroller vertically
  this.scene.position.y = whichScroller * spaceBetweenScrollers;
 

  //TITLE FOR SCROLLING SECTION
  var element = document.createElement( 'div' );
  $(element)
    .addClass('titleOfReddit')
    .html(subreddit.title);

  //Place the title
  this.title = new THREE.CSS3DObject(element);
  this.title.position.y = (this.fullHeight * scrollerHeight / 2)-spacingHeight/2;
  this.title.position.z = 50;
  
  this.scene.add(this.title);

  //The array that holds all of the tiles
  this.tiles = [];

  //For each image add a tile to the 'SCROLLER'
  for (var i=0; i < subreddit.images.length; i++){

    //Creates a DIV, which will become the CSS3D object
    var element = document.createElement( 'div' );
    
    //resizing element based on width and height defined in global vars
    $(element)
      .css('width', tileWidth+'px')
      .css('height', tileHeight+'px')
      .css('background', function(){
        
        toReturn = "url("+ subreddit.images[i].image + ")";
        return toReturn
      
      })
      .css('background-size','cover');

    //After we have created the dom element,
    //assign it to a CSS3DObject
    var tile = new THREE.CSS3DObject(element);

    //Position
    tile.position.x = Math.floor(i/scrollerHeight) * this.fullWidth;
    tile.position.y = ((i%scrollerHeight)-((scrollerHeight-1)/2))*this.fullHeight;

    //pass all of the information from loading to this tile
    tile.info = subreddit.images[i];

    //This is a position that will be used to tween from and to,
    //when and tile gets selected. 
    //We will contsantly update this vector,
    //and then place the object at its position.
    tile.tempPosition = new THREE.Vector3(); 
    tile.tempPosition.copy(tile.position);

    //make sure that the tile is not being viewed
    tile.beingViewed = false;

    this.scene.add(tile);
    this.tiles.push(tile);

    scene.add(this.scene);


  }

}


SCROLLER.prototype = {

  update:function(){


    //moves all the tiles corresponding to the speed
    //of the scroller, and loop them smoothly
    for(var i =0; i < this.tiles.length; i++){
      
      this.tiles[i].tempPosition.x += this.speed;
      
      if(this.tiles[i].tempPosition.x > this.width/2){

        this.tiles[i].tempPosition.x -= this.width;

      }else if(this.tiles[i].tempPosition.x <= -this.width/2){

        this.tiles[i].tempPosition.x += this.width;

      }

      this.tiles[i].tempPosition.z = -Math.abs(this.tiles[i].tempPosition.x)/2;
      
      //As long as the tile is not being viewed,
      //set its position equal to its 'tempPosition'
      if(this.tiles[i].beingViewed == false){

        this.tiles[i].position.copy(this.tiles[i].tempPosition);
      
      }
  
    }

  

    //Rotates the background
    //So that it will make a full loop
    //as the scroller makes a full loop
    this.background.rotation.y += (2*Math.PI/this.width)*this.speed;


  }
 

}
