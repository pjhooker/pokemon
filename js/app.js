
  var mymap = L.map(
    'mapid',
    {
      zoomControl: false
    }
  ).setView(
    [center_lat, center_lng],
    zoom_level
  );

  function onClick_zoomIn () {
    mymap.zoomIn();
  }
  function onClick_zoomOut () {
    mymap.zoomOut();
  }
  function onClick_home () {
    mymap.setView([center_lat, center_lng], zoom_level);
  }

  var markers_t = {};
