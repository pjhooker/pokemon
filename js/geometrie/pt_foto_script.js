// GEOM 2

var file_geojson2 = "http://www.cityplanner.it/experiment_host/supply/geojsonphp/pt_poke_mysql_geojson.php";

// POST
var cluster = 1;
var function_icon3 = 'IconPost';
var name3 = 'l1_3';

if(cluster==1){
  var def_cluster = new Array();
  def_cluster["temp"] = eval("cluster_"+function_icon3);
  markers_t[name3+'_cluster']= new L.MarkerClusterGroup(def_cluster["temp"]());
  //var markers = L.markerClusterGroup({ chunkedLoading: true });
}
else {
  markers_t[name3] = new L.featureGroup();
}

// Post
$.getJSON(file_geojson2, function(data) {
    var def_icon = new Array();
    def_icon["temp"] = eval(function_icon3);
    var geojson3 = L.geoJson(data,{
      pointToLayer: def_icon["temp"]
    });
    markers_t[name3+'_cluster'].addLayer(geojson3);
    markers_t[name3+'_cluster'].addTo(mymap);
});

function IconPost(feature,latlng) {
  return L.marker(latlng,{
    icon: L.icon({
      iconUrl: getIconPost_url(feature.properties.category), //'http://www.cityplanner.it/supply/icon_web/mapbox-maki-51d4f10/renders/star-24@2x.png',
      iconSize: [40,40]
    }),
    //clickable:false
  }).on('click', onClick_IconPost);
}

function cluster_IconPost() {
  return {
    maxClusterRadius: 120,
    iconCreateFunction: function (cluster) {
      var markers = cluster.getAllChildMarkers();
      var html = '<div>' + markers.length + '</div>';
      return L.divIcon({ html: html, className: 'myclusterHW1', iconSize: L.point(40, 40) });
    },
    showCoverageOnHover: false
  };
}

function getIconPost_url(d) {

    if ( d=='animali' ) {
        return  "http://www.cityplanner.it/supply/icon_web/mapbox-maki-51d4f10/renders/dog-park-24@2x.png";
    }
    else if ( d=='camere') {return  "http://www.cityplanner.it/supply/icon_web/mapbox-maki-51d4f10/renders/lodging-24@2x.png";}
    else if ( d=='pranzo') {return  "http://www.cityplanner.it/supply/icon_web/mapbox-maki-51d4f10/renders/restaurant-24@2x.png";}
    else{
      return  "http://www.cityplanner.it/supply/icon_web/mapbox-maki-51d4f10/renders/star-24@2x.png";
    }
}

function onClick_IconPost(e) {

  $('#source-modal').modal('show');
  $('.modal-body').html(e.target.feature.properties.title);
  $('.modal-title').html("Dettaglio");

}

// GEOM 2 -end
