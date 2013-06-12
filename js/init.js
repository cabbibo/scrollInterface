function init(){   
  
  clock = new THREE.Clock();

  //Sets up the CSS3D Scene
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 5000 );
  camera.position.z = 500;  
  scene = new THREE.Scene();

  //Setting up WebGL Scene
  backgroundScene =  new THREE.Scene();
  backgroundCamera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 5000 );
  backgroundCamera.position.z = 500;

  for(var i = 0; i < reddits.length; i++){

    var scroller = new SCROLLER(reddits[i],i);
    scrollers.push(scroller);

    //Adds a scroll marker so we can tell which scroller we are on
    var scrollMarker = document.createElement('div');
    $(scrollMarker).addClass('scrollMarker').css('top',function(){

      //reversing direction of placement so it makes physical sense
      var toReturn = (reddits.length-1-i)*(window.innerHeight/(2*(reddits.length))) + window.innerHeight/4;
      toReturn = toReturn + "px";
      return toReturn;

    });

    $("#scrollerMarkers").append(scrollMarker);
    
    if(i == 0){
      $(scrollMarker).addClass('selectedMarker');
    }

    scrollerMarkers.push(scrollMarker);

  }

  //Create a vector to hold the leaps position
  frameMarker = new THREE.Vector3();  

  //Creates the renderer
  renderer = new THREE.CSS3DRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.domElement.style.position = 'absolute';


  //Creates the renderer
  backgroundRenderer = new THREE.WebGLRenderer();
  backgroundRenderer.setSize( window.innerWidth, window.innerHeight );
  backgroundRenderer.domElement.style.position = 'absolute';

  //Creates Stats
  /*TAKE OUT FOR PRODUCTION*/
  window.stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.bottom = '0px';
  stats.domElement.style.right ='0px'

  document.getElementById( 'container' )
    .appendChild( renderer.domElement )
    .appendChild( stats.domElement )

  document.getElementById( 'backgroundRenderer' )
     .appendChild( backgroundRenderer.domElement )


  //Make sure the windows still look ok when resized
  window.addEventListener( 'resize', onWindowResize, false );

  animate();



  /*
   *
   * LEAP CONTROLLER SET UP
   *
   */

  controller = new Leap.Controller({enableGestures:true});

  controller.on('frame', function(frame){
   
    if(params.interactionMode == 'velocityBased'){

      velocityBased(frame);

    }else if(params.interactionMode == 'momentumBased'){

      momentumBased(frame);

    }else if(params.interactionMode == 'motionBased'){

      motionBased(frame);

    }else if(params.interactionMode == 'grabBased'){

      grabBased(frame);

    }



    
    
    
  })

  controller.connect();

}
