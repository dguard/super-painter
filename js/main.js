$(function(){

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
        movePointToImage: function(x, y, className){
            $('.workspace__map-inner').append( $('<div>', {
                'class': className,
                'style': 'top: ' + y + 'px; left: ' + x + 'px;'
            }));
        },
        drawImage: function()
        {
            var list = this.getMapImage();
            for(var i = 0; i < list.length; i++) {
                for(var j = 0; j < list[i].length; j++) {
                    var posX = SEGMENT_W * j;
                    var posY = SEGMENT_H * i;
                    this.movePointToImage(posX, posY, this.getNearestColor(list[i][j]));
                }
            }
        },
        rgbToHex: function(r, g, b) {
            if (r > 255 || g > 255 || b > 255)
                throw "Invalid color component";
            return ((r << 16) | (g << 8) | b).toString(16);
        },
        getMapImage: function()
        {
            return [
                [
                    '#ff000', '#1abc9c', '#2ecc71'
                ],
                [
                    '#3498db', '#9b59b6', '#19b698'
                ]
            ];
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
            var n = -1;
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
        }
    };

    app.movePointToImage(10,10, 'color_1');
    debugger;
    app.drawImage();


    var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");
    var img=document.getElementById("myImage");
    ctx.drawImage(img,0,0);
    var p = ctx.getImageData(100, 100, 10, 10).data;

    var hex = "#" + ("000000" + app.rgbToHex(p[0], p[1], p[2])).slice(-6);
    console.log(hex);
});