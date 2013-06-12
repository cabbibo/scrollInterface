
//Function to pull in all of the reddits using JSON
//And add the proper information to the reddit array
function letThereBeLight(){
   for(var i =0; i<redditsToLoad.length; i++){
      loadSubreddit(i);
  }
}


//TODO: Create parser for imgur, and not just i.imgur
//should just be one extra line or 2 to add the i. at the beginning
//and .png at the end



function loadSubreddit(i){

  //Sets the url we are going to load using the global variables
  var urlToLoad = "http://www.reddit.com/r/"+redditsToLoad[i]+".json?limit="+redditBufferNumber+"&jsonp=?";
  
  var subredditName = redditsToLoad[i];
  
  $.getJSON(urlToLoad,function(data){
    
    //adds to the total loaded,
    //so that we only start the spiral once all 
    //subreddits have been loaded
    loaded += 1;
    
    var subreddit = [];

    //creates a new object that is pushed to the 
    //global array 'reddit'
    $.each(data.data.children,function(key,value){
    
      //Only creates an object if the image is from
      //i.imgur.com 
      //To avoid NSFW make sure to add:
      //value.data.over_18 == false to the IF statement!
      if(value.data.domain == 'i.imgur.com'){
      
        var toPush = {
          title:value.data.title,
          image:value.data.thumbnail,
          score:value.data.score,
          created:value.data.created,
          subreddit:redditsToLoad[i],
          url:value.data.url
        }
        
        subreddit.push(toPush);
      
      }


      //Once we have looped through all of the 
      //children in this json load, then push this subreddit
      //to the reddit array
      if(key == data.data.children.length-1){
        
        var toPush = {
          title:redditsToLoad[i],
          images:subreddit
        }
        
        reddits.push(toPush);

      }
    
    });


    //If this is the last subreddit, initialize the helix
    if(loaded == redditsToLoad.length){    
      init();  
      allLoaded = true;
    }

  });
}



