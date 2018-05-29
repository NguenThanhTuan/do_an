// Biến toàn cục
var _map, _lyrWF, _tool, _query, _queryTask, _symbPin, _draw, _measureTotal, _lyrGrp;
var graphic;
var currLocation;
var watchId;
var _pt, _symbol, _symbolLine, _symPic; 
require([
    "esri/map",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/Color",
    "esri/geometry/Point",
    "esri/dijit/Search",
    "esri/dijit/LayerList",
    "esri/arcgis/utils",
    "esri/InfoWindowBase",
    "esri/layers/GraphicsLayer",
    "esri/toolbars/draw",
    "esri/symbols/PictureMarkerSymbol",
    "esri/symbols/MarkerSymbol",
    "esri/graphic",
    "esri/InfoWindowBase",
    "esri/tasks/IdentifyTask",
    "esri/geometry/ScreenPoint",
    "esri/tasks/query",
    "esri/tasks/QueryTask",
    "esri/SpatialReference",
    "esri/layers/ArcGISDynamicMapServiceLayer",
    "dojo/parser",
    "dojo/domReady!"
],
    function (
        Map,
        SimpleMarkerSymbol,
        SimpleLineSymbol,
        Color,
        Point,
        Search,
        LayerList,
        arcgisUtils,
        InfoWindowBase,
        GraphicsLayer,
        Draw,
        PictureMarkerSymbol,
        MarkerSymbol,
        Graphic,
        InfoWindowBase,
        IdentifyTask,
        ScreenPoint,
        Query,
        QueryTask,
        SpatialReference,
        ArcGISDynamicMapServiceLayer,
        parser) {
        parser.parse();
        
    //Khởi tạo bản đồ
        _map = new Map("r_map", {
            map: _map,
            basemap: "osm",
            center: [105.83415979999995, 21.0277644],
            zoom: 12,
            autoResize: true
        });
        
        /*
        Search bằng esri API
        var id_test = document.getElementById("search_input");
        function search(id) {
            var search = new Search({
                
            }, id);
            search.startup();
        }
        search(id_test);
        search(exampleInputPlace);
        */

    // Search bằng API google: Lấy dữ liệu từ input người dùng
        var input = document.getElementById("inputGroupSuccess3");
        var input2 = document.getElementById("exampleInputPlace");
        function searchPlaces(input){
            var searchBox = new google.maps.places.SearchBox(input);
        }
        searchPlaces(input);
        searchPlaces(input2);

    // Khởi tạo Pic symbol
        _symPic = new PictureMarkerSymbol("images/search-pointer.png", 36, 36);

    // Khởi tạo GraphicsLayer
        _lyrGrp = new GraphicsLayer();
        _map.addLayer(_lyrGrp);

    // Search địa điểm bằng google API
        _pt = new Point();
        _symbol = new SimpleMarkerSymbol();
        //Khởi tạo Geocoder service
        var geocoder = new google.maps.Geocoder();
        // Gán sự kiện cho button
        $(".input-group-addon").click(function(){
            geocodeAddress(geocoder, _map);
            $("#inputGroupSuccess3").val("");
        });
        $("#inputGroupSuccess3").keypress(function(e){
            if(e.which == 13)
            {
                geocodeAddress(geocoder, _map);
                $("#inputGroupSuccess3").val("");
            }
        });
        $("#exampleInputPlace").keypress(function(e){
            if(e.which == 13)
            {
                geocodeAddress2(geocoder, _map);
                $("#exampleInputPlace").val("");
            }
        });

    // _map.on("load", initFunc);
        $("#test").click(function () {
            initFunc();
        });

        // function orientationChanged() {
        //   if(_map){
        //     _map.reposition();
        //     _map.resize();
        //   }
        // }

        function initFunc(_map) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(zoomToLocation, locationError);
                watchId = navigator.geolocation.watchPosition(showLocation, locationError);
            } else {
                alert("Browser doesn't support Geolocation. Visit http://caniuse.com to see browser support for the Geolocation API.");
            }
        }

        function locationError(error) {
            //error occurred so stop watchPosition
            if (navigator.geolocation) {
                navigator.geolocation.clearWatch(watchId);
            }
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    alert("Location not provided");
                    break;

                case error.POSITION_UNAVAILABLE:
                    alert("Current location not available");
                    break;

                case error.TIMEOUT:
                    alert("Timeout");
                    break;

                default:
                    alert("unknown error");
                    break;
            }
        }

        function zoomToLocation(location) {
            var pt = new Point(location.coords.longitude, location.coords.latitude);
            addGraphic(pt);
            _map.centerAndZoom(pt, 15);
        }

        function showLocation(location) {
            //zoom to the users location and add a graphic
            var pt = new Point(location.coords.longitude, location.coords.latitude);
            if (!graphic) {
                addGraphic(pt);
            } else { // move the graphic if it already exists
                graphic.setGeometry(pt);
            }
            _map.centerAt(pt);
        }

        function addGraphic(pt) {
            var symbol = new SimpleMarkerSymbol(
                SimpleMarkerSymbol.STYLE_CIRCLE,
                12,
                new SimpleLineSymbol(
                    SimpleLineSymbol.STYLE_SOLID,
                    new Color([70, 20, 220, 0.5]),
                    8
                ),
                new Color([70, 20, 220, 0.9])
            );
            graphic = new Graphic(pt, symbol);
            _map.graphics.add(graphic);
        }
    });
    // Hàm lấy dữ liệu(tọa độ x, y) từ input của người dùng
    function geocodeAddress(geocoder, resultsMap){
        var address = document.getElementById('inputGroupSuccess3').value;
        geocoder.geocode({'address': address}, function(results, status){
            if(status === 'OK'){
                var x = results[0].geometry.location.lat();
                console.log("Lat: " + x);
                var y = results[0].geometry.location.lng();
                console.log("Lng: " + y);
                _pt.setLatitude(x);
                _pt.setLongitude(y);
                var g = new esri.Graphic(_pt, _symPic);
                _lyrGrp.add(g);
                //addGraphic2(_pt);
                _map.centerAndZoom(_pt, 15);
            } else{
                alert("Geocode was not successful for the following reason: " + status);
            }
        });
    }
    // Hàm lấy dữ liệu(tọa độ x, y) từ input của người dùng
    function geocodeAddress2(geocoder, resultsMap){
        var address = document.getElementById('exampleInputPlace').value;
        geocoder.geocode({'address': address}, function(results, status){
            if(status === 'OK'){
                var x = results[0].geometry.location.lat();
                console.log("Lat: " + x);
                var y = results[0].geometry.location.lng();
                console.log("Lng: " + y);
                _pt.setLatitude(x);
                _pt.setLongitude(y);
                var g = new esri.Graphic(_pt, _symPic);
                _lyrGrp.add(g);
                //addGraphic2(_pt);
                _map.centerAndZoom(_pt, 15);
            } else{
                alert("Geocode was not successful for the following reason: " + status);
            }
        });
    }
    
    /*
    Hàm addGraphic2
    function addGraphic2(_pt){
        _symbol.setStyle("STYLE_CIRCLE");
        _symbol.setColor(new esri.Color([70, 20, 220, 0.5]));
        _symbol.setSize("12");
        graphic = new esri.Graphic(_pt, _symbol);
        _map.graphics.add(graphic);
    }*/

