$(document).ready(function() {
  const $likeForm = $('#like');
  $likeForm.submit(e => {
    e.preventDefault();
    var data = {};
    const house_name = $likeForm.serialize().split('=')[1];
    const user_id = $('#userId').val();
    data = { house_name: house_name, user_id: user_id };
    $.ajax({
      url: `/users/profile`,
      data: data,
      type: 'POST',
      success: function(data) {
        window.location.href = `/users/profile`;
      },
      error: function(xhr, status, error) {},
    });
  });
  const $dateForm = $('#date');
  $dateForm.submit(e => {
    e.preventDefault();
    var date = {};
    date = $dateForm.serialize();
    function renderView(data) {
      $('.streetview-container').remove();
      $('#streetview').append($('<div>').attr('class', 'streetview-container'));
      for (var i = 0; i < 10; i++) {
        let image = data.photos[i].img_src;
        $('.streetview-container').append($(`<img src='${image}'>`));
      }
    }
    function getData(date) {
      $.ajax({
        method: 'GET',
        url: `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${
          date.split('=')[1].split('&')[0]
        }-${date.split('=')[2].split('&')[0]}-${
          date.split('=')[3].split('&')[0]
        }&camera=mast&api_key=yUr8T3TgSdw948TEBEsWXIUnTGaX5zXLXLsGl5Zm`,
        success: function(data) {
          renderView(data);
        },
        error: function(jqxhr, status, errorThrown) {
          console.log('oops an error. Status:', status);
          console.log('errorThrown:', errorThrown);
        },
      });
    }
    getData(date);
  });
});
