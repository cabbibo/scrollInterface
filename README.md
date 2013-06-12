An Expermentation in different interaction models.
If it runs too slowly, try removing the webGL renderer, which just
is there to show when the images get looped through
 
  - Velocity Based:
    
      Tying velocity of scroller to velocity of hand. 
      Any hand direction will work, but a fully vertical hand will sometimes
      only pick up one pointable which will change to selection mode.

      Selection mode is a single pointable.

      Screentap to select an object, keytap to deselect, and screentap another
      object to switch out the currently selected object

  - Momentum Based:
      
      A Vertical hand swiped horizontally will add to the velocity of the scroller.
      Holding a hand vertically in place after swiping will result in constant 
      velocity scroll. Hold fist or remove hand to slow scroller

      Selection mode is a single pointable.

      Screentap to select an object, keytap to deselect, and screentap another
      object to switch out the currently selected object


  - Motion Based:
      
      Using the Motions API, and correlated to velocity of scrolling objects.
      Any hand direction will work, but a fully vertical hand will sometimes
      only pick up one pointable which will change to selection mode.

      Selection mode is a single pointable.

      Keytap to select an object, and keytap again to de-select it


   - Grab Based:
      
      Grab and throw scroller

      Selection mode is a single pointable.

      Keytap to select an object, and keytap again to de-select it


 
