$(function(){

    // CONSTANTS BEGIN
    var SEGMENT_SIZE = 10;

    var LIST_COLORS = [
        "#1abc9c",
        "#2ecc71",
        "#3498db",
        "#9b59b6",
        "#19b698",
        "#27ae60",
        "#2980b9",
        "#8e44ad",
        "#f1c40f",
        "#e67e22",
        "#e74c3c",
        "#ecf0f1",
        "#f39c12",
        "#d35400",
        "#c0392b",
        "#bdc3c7"
    ];
    // CONSTANTS END

    var app = {
        movePointToImage: function(x, y, className){
            $('.workspace__map-inner').append( $('<div>', {
                'class': className,
                'style': 'top: ' + y + 'px; left: ' + x + 'px;'
            }));
        },
        rgbToHex: function(r, g, b) {
            if (r > 255 || g > 255 || b > 255)
                throw "Invalid color component";
            return ((r << 16) | (g << 8) | b).toString(16);
        },
        hexToRGB: function(hex){
            hex = hex.replace('#','');
            var r = parseInt(hex.substring(0,2), 16);
            var g = parseInt(hex.substring(2,4), 16);
            var b = parseInt(hex.substring(4,6), 16);

            return {
                R: r,
                G: g,
                B: b
            };
        },
        getNearestColor: function(hex)
        {
            var n = 12;
            var distance = Number.MAX_VALUE;

            for(var i = 0; i < LIST_COLORS.length; i++) {
                if(this._getDistance(hex, LIST_COLORS[i]) < distance) {
                    distance = this._getDistance(hex, LIST_COLORS[i]);
                    n = i;
                }
            }
            return 'color_' + (n+1);
        },
        _getDistance: function(hex1, hex2) {
            hex1 = this.hexToRGB(hex1);
            hex2 = this.hexToRGB(hex2);
            return Math.sqrt(
                (hex1.R-hex2.R)*(hex1.R-hex2.R)+(hex1.B-hex2.G)*(hex1.G-hex2.G)+(hex1.B-hex2.B)*(hex1.B-hex2.B)
            );
        },
        getMapImage: function ()
        {
            var step = SEGMENT_SIZE;
            var image_w, image_h;
            var canvas = document.getElementById("myCanvas");
          canvas.width = image_w = $('#myImage').width();//ширина
          canvas.height = image_h = $('#myImage').height();//высота

          var ctx = canvas.getContext('2d');
          var img = new Image();  // Создание нового объекта изображения
          img.src = $('#myImage').attr('src');
          var color = [];
          img.onload = $.proxy(function ()
          {    // Событие onLoad, ждём момента пока загрузится изображение
            ctx.drawImage(img, 0, 0);  // Рисуем изображение от точки с координатами 0, 0

            var s = "rgb(", r = 0, g = 0, b = 0, f = ")", z = ',';
            var imgd;
            var pix;
            var p_color = [];

            for (var i = 0, h = image_h; i < h; i += step) {

              for (var j = 0, w = image_w; j < w; j += step) {

                imgd = ctx.getImageData(j, i, step, step);
                pix = imgd.data;


                for (var ii = 0, n = pix.length; ii < n; ii += 4) {

                  r += pix[ii]; // red
                  g += pix[ii + 1]; // green
                  b += pix[ii + 2]; // blue

                }
                r = r / n;
                g = g / n;
                b = b / n;

                p_color.push('#' + this.rgbToHex(r, g, b))

              }
              color.push(p_color);
              p_color = [];

            }
            this.drawImage(color);
          }, this);
        },
        drawImage: function(list){
            for(var i = 0; i < list.length; i++) {
                for(var j = 0; j < list[i].length; j++) {
                    var posX = SEGMENT_SIZE * j;
                    var posY = SEGMENT_SIZE * i;
                    this.movePointToImage(posX, posY, this.getNearestColor(list[i][j]));
                }
            }
        }
    };
    app.getMapImage();

});