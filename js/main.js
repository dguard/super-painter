$(function ()
{


  // CONSTANTS BEGIN
  var SEGMENT_W = 10;
  var SEGMENT_H = 10;

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
    movePointToImage: function (x, y, className)
    {
      $('.workspace__map-inner').append($('<div>', {
        'class': className,
        'style': 'top: ' + y + 'px; left: ' + x + 'px;'
      }));
    },
    drawImage: function ()
    {
      var list = this.getMapImage();
      for (var i = 0; i < list.length; i++) {
        for (var j = 0; j < list[i].length; j++) {
          var posX = SEGMENT_W * j;
          var posY = SEGMENT_H * i;

          this.movePointToImage(posX, posY, this.getNearestColor(list[i][j]));
        }
      }
    },
    findPos: function (obj)
    {
      var curleft = 0, curtop = 0;
      if (obj.offsetParent) {
        do {
          curleft += obj.offsetLeft;
          curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return {x: curleft, y: curtop};
      }
      return undefined;
    },
    rgbToHex: function (r, g, b)
    {
      if (r > 255 || g > 255 || b > 255) {
        throw "Invalid color component";
      }
      return ((r << 16) | (g << 8) | b).toString(16);
    },
    getMapImage: function ()
    {
      var step = 10,
        image_w = 100,
        image_h = 100;

      var canvas = document.getElementById("myCanvas");

      canvas.width = $(document).width();//ширина
      canvas.height = $(document).height();//высота

      var ctx = canvas.getContext('2d');
      var img = new Image();  // Создание нового объекта изображения
      img.src = 'image/kot.gif';
      var color = [];
      img.onload = function ()
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
            p_color.push([
              s, r, z, g, z, b, f
            ].join(''))

          }
          color.push(p_color);
          p_color = [];

        }
        console.log(color);

      };

    },
    getNearestColor: function (color)
    {
      throw new DOMException("Метод не определен!");
      //            for(var i = 0; i < LIST_COLORS.length; i++) {
      //
      //            }
    }
  };

  app.movePointToImage(10, 10, 'color_1');
  //console.log();
  app.getMapImage()
  //    var myImg = new Image();
  //    myImg.src = 'images/image.jpg';
  //    var context = document.getElementById('myCanvas').getContext('2d');
  //    context.drawImage(myImg, 0, 0);

  //var c=document.getElementById("myCanvas");
  //var ctx=c.getContext("2d");
  //var img=document.getElementById("myImage");
  //ctx.drawImage(img,0,0);
  //var p = ctx.getImageData(100, 100, 1, 1).data;
  //console.log(p);
  //var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
  //console.log(hex);

  //    drawImage();

  //    var p = context.getImageData(20, 100, 100, 100);
  //    var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
  //    console.log(hex);

})
;