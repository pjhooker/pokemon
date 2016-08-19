  // onury/geolocator START (https://github.com/onury/geolocator)
    geolocator.config({
        language: "en",
        google: {
            version: "3",
            key: "AIzaSyB_deOb9fLaF2uZY47QXAmkkY0p8Fhg-EY"
        }
    });

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

  // onury/geolocator END
