$(document).ready(function() {
  function renderView(data) {
    $('#streetview').append($('<div>').attr('class', 'streetview-container'));
    for (var i = 0; i < 10; i++) {
      let image = data.photos[i].img_src;
      $('.streetview-container').append($(`<img src='${image}'>`));
    }
  }

  function getData(houseId) {
    $.ajax({
      method: 'GET',
      url: `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-08-${houseId}&camera=mast&api_key=yUr8T3TgSdw948TEBEsWXIUnTGaX5zXLXLsGl5Zm`,
      success: function(data) {
        renderView(data);
      },
      error: function(jqxhr, status, errorThrown) {
        console.log('oops an error. Status:', status);
        console.log('errorThrown:', errorThrown);
      },
    });
  }

  var houseId = $('#houseId').val();
  getData(houseId);
});
