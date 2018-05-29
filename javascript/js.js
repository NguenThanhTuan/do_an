day = new Date();   
    miVisit = day.getTime();   
    function clock() 
    {   
        dayTwo = new Date();   
        hrNow = dayTwo.getHours();   
        mnNow = dayTwo.getMinutes();    
        scNow = dayTwo.getSeconds();   
        miNow = dayTwo.getTime();   
        if (hrNow == 0) 
        {   
            hour = 12;   
            ap = " AM";   
        }
        else if(hrNow <= 11) 
        {   
            ap = " AM";   
            hour = hrNow;   
        } 
        else if(hrNow == 12) 
        {   
            ap = " PM";   
            hour = 12;   
        } 
        else if (hrNow >= 13) 
        {   
            hour = (hrNow - 12);   
            ap = " PM";   
        }   
        if (hrNow >= 13) 
        {   
            hour = hrNow - 12;   
        }   
        if (mnNow <= 9) 
        {   
            min = "0" + mnNow;   
        }   
        else (min = mnNow)   
        if (scNow <= 9) 
        {   
            secs = "0" + scNow;   
        } 
        else 
        {   
            secs = scNow;   
        }   
        time = hour + ":" + min + ":" + secs + ap;   
        document.form.button.value = time;   
        self.status = time;   
        setTimeout('clock()', 1000);   
    }   
    function timeInfo() 
    {   
        milliSince = miNow;   
        milliNow = miNow - miVisit;   
        secsVisit = Math.round(milliNow / 1000);   
        minsVisit = Math.round((milliNow / 1000) / 60);   
        
    }   
    var html = "<form name=\"form\">"   
    + "<input id=\"codeseonet\" type=button value=\"Click for info!\""   
    + " name=button onClick=\"timeInfo()\"></form>";   
    document.getElementById('clock').innerHTML = html;
    onError = null;   
    clock();

    function WebSocketTest()
         {
            if ("WebSocket" in window)
            {
               alert("WebSocket is supported by your Browser!");
               
               // Let us open a web socket
               var ws = new WebSocket("ws://GEOEVENT.ESRIVN.NET:6180/arcgis/ws/services/SensorData1_STREAM/StreamServer");
				
               ws.onopen = function()
               {
                  // Web Socket is connected, send data using send()
                  ws.send("Message to send");
                  alert("Message is sent...");
               };
				
               ws.onmessage = function (evt) 
               { 
                  var received_msg = evt.data;
                  alert("Message is received...");
               };
				
               ws.onclose = function()
               { 
                  // websocket is closed.
                  alert("Connection is closed..."); 
               };
					
               window.onbeforeunload = function(event) {
                  socket.close();
               };
            }
            
            else
            {
               // The browser doesn't support WebSocket
               alert("WebSocket NOT supported by your Browser!");
            }
         }

    // Map gg
    // var _map, _marker, _infowindow;
    // var _markers = [];
    // var _address_infos = {};

    // function initMap()
    // {
    //     _map = new google.maps.Map(document.getElementById('r_map'), {
    //         center: {lat: 21.0277644, lng: 105.83415979999995 },
    //         zoom: 12,
    //         mapTypeId: 'roadmap'
    //     });
    //     _map.addListener("click", function(e) {
    //         clearMarkers();
    //         placeMarker(e.latLng);
    //         geocodeAddress(e.latLng);
    //         _map.panTo(_marker.position);
    //         _markers.push(_marker);
    //       });
    //     createInfoWindow();
    //     var input = document.getElementById('search_input');
    //     var input2 = document.getElementById('exampleInputPlace');
    //     searchPlace(input);
    //     searchPlace(input2);
    // }
    // function searchPlace(input)
    // {
    //     var searchBox = new google.maps.places.SearchBox(input);
        
    //     _map.addListener('bounds_changed', function(){
    //         searchBox.setBounds(_map.getBounds());
    //     });

    //     searchBox.addListener('places_changed', function(){
    //         var places = searchBox.getPlaces();
    //         if(places.length ==0){
    //             return;
    //         }
    //         _markers.forEach(function(marker){
    //             marker.setMap(null);
    //         });
    //         _markers = [];
    //         var bounds = new google.maps.LatLngBounds();
    //         places.forEach(function(place){
    //             if(!place.geometry)
    //             {
    //                 console.log("Returned place contains no geometry");
    //                 return;
    //             }
                
    //             _markers.push(new google.maps.Marker({
    //                 map: _map,
    //                 title: place.name,
    //                 position: place.geometry.location
    //             }));
    //             if(place.geometry.viewport)
    //             {
    //                 bounds.union(place.geometry.viewport);
    //             }
    //             else
    //             {
    //                 bounds.extend(place.geometry.location);
    //             }
    //         });
    //         _map.fitBounds(bounds);
    //     });
    // }

    // function placeMarker(latLng)
    // {
    //     _marker = new google.maps.Marker({
    //         position: latLng,
    //         map: _map
    //     });
    // }

    // function createInfoWindow()
    // {
    //     if(_infowindow)
    //     {
    //         _infowindow.close();
    //     }
    //     _infowindow = new google.maps.InfoWindow();
    // }

    // function clearMarkers()
    // {
    //     for(var i = 0; i < _markers.length; i++)
    //     {
    //         _markers[i].setMap(null)
    //     }
    //     _markers = [];
    // }

    // function geocodeAddress(latLng)
    // {
    //     var geocoder = new google.maps.Geocoder;
    //     createInfoWindow();

    //     geocoder.geocode(
    //         { "location": latLng },
    //         function(results, status)
    //         {
    //             if(status === google.maps.GeocoderStatus.OK)
    //             {
    //                 if(results[0])
    //                 {
    //                     create_address_infos(results[0]);
    //                     _infowindow.setContent(
    //                         "<div>" +
    //                             "<b>Address :</b> " + _address_infos["name"] + "<br>" +
    //                             "<b>Latitude :</b> " + _address_infos["latitude"] + "<br>" +
    //                             "<b>Longitude :</b> " + _address_infos["longitude"] +
    //                         "</div>"
    //                     );
    //                     _infowindow.open(_map, _marker);
    //                 }
    //                 else
    //                 {
    //                     console.log("No results found");
    //                 }
    //             }
    //             else
    //             {
    //                 console.log("Geocoder failed due to: " + status);
    //             }
    //         }
    //     );
    // }

    // function create_address_infos(address)
    // {
    //     _address_infos = {
    //         name: address.formatted_address.toString(),
    //         latitude: address.geometry.location.lat(),
    //         longitude: address.geometry.location.lng(),
    //         prefecture: "",
    //         city: "",
    //         town: "",
    //         choume: "",
    //         banchi: "",
    //         gou: ""
    //     }
    // }

    // var x = document.getElementById('r_map');
    // // Hàm lấy vị trí
    // function getLocation()
    // {
    //     // alert('Hello');
       
    //     _map.addListener("click", function(e) {
    //         clearMarkers();
    //         placeMarker(e.latLng);
    //         geocodeAddress(e.latLng);
    //         _map.panTo(_marker.position);
    //         _markers.push(_marker);
    //     });
          
    //     createInfoWindow();
    //     if(navigator.geolocation)
    //     {
    //         navigator.geolocation.getCurrentPosition(function(position) {
    //             var lat = position.coords.latitude;
    //             var lng = position.coords.longitude;
    //             var latlng = new google.maps.LatLng(lat, lng);
    //             _map.setZoom(14);
    //             _map.setCenter(latlng);
    //             _map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
    //             _marker = new google.maps.Marker({position:latlng,map:_map,title:"You are here!"});
    //         }, function() {
    //             switch(error.code)
    //             {
    //                 case error.PERMISSION_DENIED:
    //                     x.innerHTML = "Người sử dụng từ chối xác định vị trí.";
    //                     break;
    //                 case error.POSITION_UNAVAILABLE:
    //                     x.innerHTML = "Thông tin vị trí không có sẵn.";
    //                     break;
    //                 case error.TIMEOUT:
    //                     x.innerHTML = "Yêu cầu vị trí người dùng vượt quá thời gian quy định.";
    //                     break;
    //                 case error.UNKNOWN_ERROR:
    //                     x.innerHTML = "Một lỗi xảy ra không rõ nguyên nhân";
    //                     break;
                    
    //             }
    //         });
    //     }
    //     else
    //     {
    //         x.innerHTML = "Geolocation không được hỗ trợ trên trình duyệt này";
    //     }
    // }
    
    
    