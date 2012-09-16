function Game() {

    this.CheckInterval = 50;

    var _canvas;
    var _canvasContext;
    var _canvasBuffer;
    var _canvasBufferContext;

    this.Run = function () {
        if (this.Initialize()) {
            // if initialization was succesfull, load content
            this.LoadContent();
        }
    }

    this.Initialize = function () {
        _canvas = document.getElementById('canvas');
        var that = this;

        if (_canvas && _canvas.getContext) {
            _canvasContext       = _canvas.getContext('2d');
            _canvasBuffer        = document.createElement('canvas');
            _canvasBuffer.width  = _canvas.width;
            _canvasBuffer.height = _canvas.height;
            _canvasBufferContext = _canvasBuffer.getContext('2d');

            var x = 10;
            var y = 10;

            _canvasBufferContext.fillStyle = "rgb(127,0,0)";
            _canvasBufferContext.fillRect(x, y, 100, 85);
            
            x += 120;
            _canvasBufferContext.strokeStyle = "rgb(0,0,0)";
            _canvasBufferContext.strokeRect(x, y, 10, 185);

            x = 10;
            y += 120;
            _canvasBufferContext.fillStyle = "rgb(127,255,0)";
            _canvasBufferContext.font = "bold 26px sans-serif";
            _canvasBufferContext.fillText('Test text ', x, y);

            y += 20;
            var img = new Image();
            img.src = "img/box.gif";
            img.onload = function() {
                _canvasBufferContext.drawImage(img, x, y);
                that.Draw(); // draw stage after loading the image
            }

            return true;
        }

        return false;
    }

    this.LoadContent = function () {
        var that = this;

        // load content – graphics, sound etc.
        $(document).bind('keyup', function (event) {
            that.Update(event);
            that.Draw();
        });
        
        // since all content is loaded run main game loop
        // Calls RunGameLoop method every 'check' interval’
       // this.GameLoop = setInterval(this.RunGameLoop, this.CheckInterval);
    }

    this.RunGameLoop = function () {
        sokobanGame.Update(); // @aaaaaaaaaaaaaaaah
        sokobanGame.Draw(); // @aaaaaaaaaaaaaaaah
    }

    this.Update = function () {
        // update game variables, handle user input, perform calculations etc.
    }

    this.Draw = function () {
        // draw game frame
        _canvasContext.drawImage(_canvasBuffer, 0, 0);
    }
}
