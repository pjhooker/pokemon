

/*
  // onury/geolocator START (https://github.com/onury/geolocator)
    geolocator.config({
        language: "en",
        google: {
            version: "3",
            key: "AIzaSyB_deOb9fLaF2uZY47QXAmkkY0p8Fhg-EY"
        }
    });

    function locate_user() {
        var options = {
            enableHighAccuracy: true,
            timeout: 6000,
            maximumAge: 0,
            desiredAccuracy: 30,
            fallbackToIP: false, // fallback to IP if Geolocation fails or rejected
            addressLookup: true,
            timezone: true//,
            //map: "map-canvas"
        };
        geolocator.locate(options, function (err, location) {
            if (err) return console.log(err);
            //console.log(location);
            var my_center_lat = location['coords']['latitude'];
            console.log(my_center_lat);
            var my_center_lng = location['coords']['longitude'];
            console.log(my_center_lng);
            //$("#container-red").html(my_center_lat+"-"+my_center_lng);
            //create_user_map(my_center_lat,my_center_lng);
        });
    };
  // onury/geolocator END
*/


  var str_attribution = $( "div.leaflet-control-attribution" ).html();
  //console.log(str);

  $( "div.leaflet-control-attribution" ).hide();

  function show_attribution(){
    $('#source-modal').modal('show');
    $('.modal-body').html(str_attribution);
    $('.modal-title').html("Attribution");
  }



  function add_poke(name_poke,lat,lng){
    console.log(name_poke);
    console.log(lat);
    console.log(lng);
    var url = 'insert_poke.php?name='+name_poke+'&lat='+lat+'&lng='+lng+'';
    console.log(url);
    $.getJSON(url, function(data) {});
  }


  function onMapClick(e) {

    var poke_lat = e.latlng.lat;
    var poke_lng = e.latlng.lng;
    console.log(poke_lat);
    console.log(poke_lng);
    //show_addpoke(e.latlng);

    $('#source-modal-addpoke').modal('show');
    $('#mbody1').html(''
    +'Inserisci Pokemon in LAT: ' + poke_lat + ' | LNG: ' + poke_lng
    +'');
    $('.modal-title').html("Add new Poke");

    $('#buttonPoke').click(function () {
      var poke_name = $('#inputName1').val();
      add_poke(poke_name,poke_lat,poke_lng)
    });

  }

  mymap.on('click', onMapClick);



          // MY POSITION
  				pointhighlight = new L.featureGroup();
  				pointLeaf = new L.featureGroup();

  				// mantiene la mappa al centro senza cambiare lo zoom
  				function onTimer_geo (lat,lng) {
  						mymap.setView([lat,lng], mymap.getZoom());
  				}



  				// aggiunge un bottone sotto il + e il -
  				var $input = $(''
            +'<li class="active">'
            +'  <button type="button" style="font-size: 25px;" class="btn btn-primary btn-sm mdi-content-add-circle-outline button-control" onclick="geoUpdate()"></button>'
            +'</li>'
  					+'');
  				$input.appendTo($("#side-button"));

  				function geoUpdate(){
  					if (geo_activate==1){
  						geo_activate=0;
              console.log("non attivo");
  					}
  					else{
  						geo_activate=1;
              console.log("gps attivo");
  					}
  				}

  				var greenIcon = L.icon({
  				    iconUrl: 'http://leafletjs.com/docs/images/leaf-green.png',

  				    iconSize:     [38, 95], // size of the icon
  				    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
  				    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
  				});

function create_user_map(my_center_lat,my_center_lng){

    mymap.setView([my_center_lat,my_center_lng], 18);

    var poi_leaf = L.marker([my_center_lat,my_center_lng], {icon: greenIcon}).addTo(mymap);
    pointLeaf.addLayer(poi_leaf);
    pointLeaf.addTo(mymap);

    var circle = L.circle(
      [my_center_lat,my_center_lng],
      // controlla la dimensione del cerchio
      20,
      // controlla lo stile del punto
      {
        color: 'red',
        opacity: 1,
        fillColor: '#f03',
        fillOpacity: 0.5,
        weight:0,
        clickable:false // rende non cliccabile
      }
    );
    pointhighlight.addLayer(circle);
    //map.addLayer(pointhighlight);
    pointhighlight.addTo(mymap).bringToBack(); // fa scendere il layere sotto a tutto, ma sopra la mappa
}
  				$(document).ready( function() {
            var volte=0;
    				setInterval(
    					function() {

                if(volte<6){
                  if(geo_activate==1){
                    volte++;
      							pointhighlight.clearLayers();
      							pointLeaf.clearLayers();
      							//locate_user();
                    geo_activate==0;
      						}
                }
    					},
    					// intervallo di refresh in millisecondi
    					3000
    				);
  				});
