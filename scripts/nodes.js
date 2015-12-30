var Nodes = {

  // Settings
  base64Image: 'data:image/png;base64,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',
  density: 5,

  drawDistance: 0,
  baseRadius: 1,
  maxLineThickness: 0.2,
  reactionSensitivity: 0.5,
  lineThickness: 0.1,

  points: [],
  mouse: { x: -1000, y: -1000, down: false },

  animation: null,

  canvas: null,
  context: null,

  imageInput: null,
  bgImage: null,
  bgCanvas: null,
  bgContext: null,
  bgContextPixelData: null,

  init: function() {
    // Set up the visual canvas
    this.canvas = document.getElementById( 'canvas' );
    this.context = canvas.getContext( '2d' );
    this.context.globalCompositeOperation = "lighter";
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.canvas.style.display = 'block'

    this.imageInput = document.createElement( 'input' );
    this.imageInput.setAttribute( 'type', 'file' );
    this.imageInput.style.visibility = 'hidden';
    this.imageInput.addEventListener('change', this.upload, false);
    document.body.appendChild( this.imageInput );

    this.canvas.addEventListener('mousemove', this.mouseMove, false);
    this.canvas.addEventListener('mousedown', this.mouseDown, false);
    this.canvas.addEventListener('mouseup',   this.mouseUp,   false);
    this.canvas.addEventListener('mouseout',  this.mouseOut,  false);

    window.onresize = function(event) {
      Nodes.canvas.width = window.innerWidth;
      Nodes.canvas.height = window.innerHeight;
      Nodes.onWindowResize();
    }

    // Load initial input image (the chrome logo!)
    this.loadData( this.base64Image );
  },

  preparePoints: function() {

    // Clear the current points
    this.points = [];

    var width, height, i, j;

    var colors = this.bgContextPixelData.data;

    for( i = 0; i < this.canvas.height; i += this.density ) {

      for ( j = 0; j < this.canvas.width; j += this.density ) {

        var pixelPosition = ( j + i * this.bgContextPixelData.width ) * 4;

        // Dont use whiteish pixels
        if ( colors[pixelPosition] > 200 && (colors[pixelPosition + 1]) > 200 && (colors[pixelPosition + 2]) > 200 || colors[pixelPosition + 3] === 0 ) {
          continue;
        }

        var color = 'rgba(' + colors[pixelPosition] + ',' + colors[pixelPosition + 1] + ',' + colors[pixelPosition + 2] + ',' + '1)';
        this.points.push( { x: j, y: i, originalX: j, originalY: i, color: color } );

      }
    }
  },

  updatePoints: function() {

    var i, currentPoint, theta, distance;

    for (i = 0; i < this.points.length; i++ ){

      currentPoint = this.points[i];

      theta = Math.atan2( currentPoint.y - this.mouse.y, currentPoint.x - this.mouse.x);

      if ( this.mouse.down ) {
        distance = this.reactionSensitivity * 200 / Math.sqrt((this.mouse.x - currentPoint.x) * (this.mouse.x - currentPoint.x) +
         (this.mouse.y - currentPoint.y) * (this.mouse.y - currentPoint.y));
      } else {
        distance = this.reactionSensitivity * 100 / Math.sqrt((this.mouse.x - currentPoint.x) * (this.mouse.x - currentPoint.x) +
         (this.mouse.y - currentPoint.y) * (this.mouse.y - currentPoint.y));
      }


      currentPoint.x += Math.cos(theta) * distance + (currentPoint.originalX - currentPoint.x) * 0.05;
      currentPoint.y += Math.sin(theta) * distance + (currentPoint.originalY - currentPoint.y) * 0.05;

    }
  },

  drawLines: function() {

    var i, j, currentPoint, otherPoint, distance, lineThickness;

    for ( i = 0; i < this.points.length; i++ ) {

      currentPoint = this.points[i];

      // Draw the dot.
      this.context.fillStyle = currentPoint.color;
      this.context.strokeStyle = currentPoint.color;

      for ( j = 0; j < this.points.length; j++ ){

        // Distaqnce between two points.
        otherPoint = this.points[j];

        if ( otherPoint == currentPoint ) {
          continue;
        }

        distance = Math.sqrt((otherPoint.x - currentPoint.x) * (otherPoint.x - currentPoint.x) +
         (otherPoint.y - currentPoint.y) * (otherPoint.y - currentPoint.y));

        if (distance <= this.drawDistance) {

          this.context.lineWidth = (1 - (distance / this.drawDistance)) * this.maxLineThickness * this.lineThickness;
          this.context.beginPath();
          this.context.moveTo(currentPoint.x, currentPoint.y);
          this.context.lineTo(otherPoint.x, otherPoint.y);
          this.context.stroke();
        }
      }
    }
  },

  drawPoints: function() {

    var i, currentPoint;

    for ( i = 0; i < this.points.length; i++ ) {

      currentPoint = this.points[i];

      // Draw the dot.
      this.context.fillStyle = currentPoint.color;
      this.context.strokeStyle = currentPoint.color;

      this.context.beginPath();
      this.context.arc(currentPoint.x, currentPoint.y, this.baseRadius ,0 , Math.PI*2, true);
      this.context.closePath();
      this.context.fill();

    }
  },

  draw: function() {
    this.animation = requestAnimationFrame( function(){ Nodes.draw() } );

    this.clear();
    this.updatePoints();
    this.drawLines();
    this.drawPoints();

  },

  clear: function() {
    this.canvas.width = this.canvas.width;
  },

  // The filereader has loaded the image... add it to image object to be drawn
  loadData: function( data ) {

    this.bgImage = new Image;
    this.bgImage.src = data;

    this.bgImage.onload = function() {

      //this
      Nodes.drawImageToBackground();
    }
  },

  // Image is loaded... draw to bg canvas
  drawImageToBackground: function () {

    this.bgCanvas = document.createElement( 'canvas' );
    this.bgCanvas.width = this.canvas.width;
    this.bgCanvas.height = this.canvas.height;

    var newWidth, newHeight;

    // If the image is too big for the screen... scale it down.
    if ( this.bgImage.width > this.bgCanvas.width - 100 || this.bgImage.height > this.bgCanvas.height - 100) {

      var maxRatio = Math.max( this.bgImage.width / (this.bgCanvas.width - 100) , this.bgImage.height / (this.bgCanvas.height - 100) );
      newWidth = this.bgImage.width / maxRatio;
      newHeight = this.bgImage.height / maxRatio;

    } else {
      newWidth = this.bgImage.width;
      newHeight = this.bgImage.height;
    }

    // Draw to background canvas
    this.bgContext = this.bgCanvas.getContext( '2d' );
    this.bgContext.drawImage( this.bgImage, (this.canvas.width - newWidth) / 2, (this.canvas.height - newHeight) / 2, newWidth, newHeight);
    this.bgContextPixelData = this.bgContext.getImageData( 0, 0, this.bgCanvas.width, this.bgCanvas.height );

    this.preparePoints();
    this.draw();
  },

  mouseDown: function( event ){
    Nodes.mouse.down = true;
  },

  mouseUp: function( event ){
    Nodes.mouse.down = false;
  },

  mouseMove: function(event){
    Nodes.mouse.x = event.offsetX || (event.layerX - Nodes.canvas.offsetLeft);
    Nodes.mouse.y = event.offsetY || (event.layerY - Nodes.canvas.offsetTop);
  },

  mouseOut: function(event){
    Nodes.mouse.x = -1000;
    Nodes.mouse.y = -1000;
    Nodes.mouse.down = false;
  },

  // Resize and redraw the canvas.
  onWindowResize: function() {
    cancelAnimationFrame( this.animation );
    this.drawImageToBackground();
  }

}