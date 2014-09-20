$(function ()
{

  // CONSTANTS BEGIN
  var SEGMENT_SIZE = 2;
  var cashe =[];
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

    Random: function (min, max)
    {
      return Math.floor(Math.random() * (max - min) + min);
    },
    
    
    movePointToImage: function (x, y, className)
    {

      //return function(x, y, className){
      //  var $this =this;

      cashe.push(['<div class="',className,'" style="top: ',y,'px; left: ',x,'px; transform: rotate(',app.Random(0,360),'deg);"></div>'].join(''));
      //$this.getCashe = function(){return cashe};
      //return $this;
      //};


    },
    rgbToHex: function (r, g, b)
    {
      if (r > 255 || g > 255 || b > 255) {
        throw "Invalid color component";
      }
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
    getNearestColor: function(hex) {
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
    // HELPERS END
    init: function(){
      $('#id_urlImage').val($('#myImage').attr('src'));
      this.initEvents();
      this.initImage();
    },
    initImage: function(){
      var canvas = document.getElementById("myCanvas");
      var $image = $('#myImage');

      var img = new Image();  // Создание нового объекта изображения
      img.src = $image.attr('src');
      img.onload = $.proxy(function () { // Событие onLoad, ждём момента пока загрузится изображение
        canvas.width = $image.width(); // ширина
        canvas.height= $image.height(); // высота
        this.drawSuperImage(this.getImageMap(canvas, img));
      }, this);
    },
    initEvents: function(){
      $('#id_updateImage').on('click', $.proxy(this.onClickUpdateImage, this));
      $('#id_form_updateImage').on('submit', $.proxy(this.onClickUpdateImage, this));
    },
    onClickUpdateImage: function(e){
      e.preventDefault();
      var src = $('#id_urlImage').val();
      $('#myImage').attr('src', src);
      $('.workspace__map-inner').empty();
      SEGMENT_SIZE = $('#id_segmentSize').val()*1;
      this.initImage();
    },
    getImageMap: function(canvas, img) {
      var imgd, pix,
        r = 0, g = 0, b = 0,
        rowSegments = [];

      var ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      for (var i = 0, h = $(canvas).height(); i < h; i += SEGMENT_SIZE) {
        var colSegments = [];

        for (var j = 0, w = $(canvas).width(); j < w; j += SEGMENT_SIZE) {

          imgd = ctx.getImageData(j, i, SEGMENT_SIZE, SEGMENT_SIZE);
          pix = imgd.data;

          for (var ii = 0, n = pix.length; ii < n; ii += 4) {

            r += pix[ii]; // red
            g += pix[ii + 1]; // green
            b += pix[ii + 2]; // blue

          }
          r = r / n;
          g = g / n;
          b = b / n;

          colSegments.push('#' + this.rgbToHex(r, g, b))
        }
        rowSegments.push(colSegments);
      }
      return rowSegments;
    },
    drawSuperImage: function(list){
      for(var i = 0; i < list.length; i++) {
        for(var j = 0; j < list[i].length; j++) {
          var posX = SEGMENT_SIZE * j;
          var posY = SEGMENT_SIZE * i;
          this.movePointToImage(posX, posY, this.getNearestColor(list[i][j]));
        }
      }
      $('.workspace__map-inner').append(cashe.join(''));
    }
  };
    app.init();
});