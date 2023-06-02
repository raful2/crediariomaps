document.addEventListener('DOMContentLoaded', function() {
    var filterInput = document.getElementById('filter-input');
    var map;
    
    filterInput.addEventListener('input', function() {
      var filterValue = filterInput.value.toLowerCase();
      
      fetch('localizacoes.json')
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          var filteredLocations = data.features.filter(function(feature) {
            var name = feature.properties.name.toLowerCase();
            return name.includes(filterValue);
          });
          
          displayLocations(filteredLocations);
        })
        .catch(function(error) {
          console.error('Erro ao carregar o arquivo JSON:', error);
        });
    });
    
    function displayLocations(locations) {
      if (map) {
        for (var i = 0; i < locations.length; i++) {
          var location = locations[i];
          var coordinates = location.geometry.coordinates;
          var name = location.properties.name;
  
          var marker = new google.maps.Marker({
            position: { lat: coordinates[1], lng: coordinates[0] },
            map: map,
            title: name
          });
        }
      }
    }
  });
  