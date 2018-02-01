console.log('js connected');
$(document).ready(function() {
  const $likeForm = $('#like');
  $likeForm.submit(e => {
    e.preventDefault();
    var data = {};
    const house_id = $likeForm.serialize().split('=')[1];
    const user_id = $('#userId').val();
    data = { user_id: user_id, house_id: house_id };
    $.ajax({
      url: `/users/profile`,
      data: data,
      type: 'POST',
      success: function(data) {
        window.location.href = `/users/favorites`;
      },
      error: function(xhr, status, error) {},
    });
  });

  const $hideButton = $('.hideThis');
  $hideButton.click(e => {
    e.preventDefault();
    var picId = e.target.getAttribute('value');
    $(`#${picId}`).remove();
    $.ajax({
      url: `/users/pictures`,
      data: { picId },
      type: 'PUT',
      success: function(data) {
        window.location.href = `/users/pictures`;
      },
      error: function(xhr, status, error) {},
    });
  });

  const $delete = $('.delete');
  $delete.click(e => {
    e.preventDefault();
    var data = {};
    const house_id = e.target.getAttribute('value');
    const user_id = $('.fav_userID').val();
    data = { user_id: user_id, house_id: house_id };
    $.ajax({
      url: `/users/favorites`,
      data: data,
      type: 'DELETE',
      success: function(data) {
        window.location.href = `/users/favorites`;
      },
      error: function(xhr, status, error) {},
    });
  });

  const $money = $('#money');
  $money.submit(e => {
    e.preventDefault();
    const curr = $('#curencies').val();
    const amount = $('#price')
      .val()
      .split('$')[1];
    console.log(curr, amount);
    $.ajax({
      url: `/convertion`,
      data: {
        amount: amount,
        from: 'USD',
        to: curr,
      },
      method: 'GET',
      success: function(response) {
        console.log('result:', response);
        $('#pricetag').text(
          'The price is ' + response.symbol + ' ' + response.amount
        );
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
        console.log('image: ' + image);
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

  const $pictureForm = $('#pictureDayPick');
  $pictureForm.submit(e => {
    e.preventDefault();
    var picdate = {};
    picdate = $pictureForm.serialize();
    function renderPicture(data) {
      $('.picture-container').remove();
      $('#pictureDay').append($('<div>').attr('class', 'picture-container'));
      let image = data.hdurl;
      let title = data.title;
      let explanation = data.explanation;
      $('.picture-container').append($(`<h2>'${title}'</h2>`));
      $('.picture-container').append($(`<img src='${image}'>`));
      $('.picture-container').append($(`<p>'${explanation}'</p>`));
      $.ajax({
        url: `/users/pictures`,
        data: { image },
        type: 'POST',
        success: function(data) {
          console.log(data);
        },
        error: function(xhr, status, error) {},
      });
    }

    function getPicture(picdate) {
      $.ajax({
        method: 'GET',
        url: `https://api.nasa.gov/planetary/apod?date=${
          picdate.split('=')[1].split('&')[0]
        }-${picdate.split('=')[2].split('&')[0]}-${
          picdate.split('=')[3].split('&')[0]
        }&api_key=yUr8T3TgSdw948TEBEsWXIUnTGaX5zXLXLsGl5Zm`,
        success: function(data) {
          renderPicture(data);
          console.log();
        },
        error: function(jqxhr, status, errorThrown) {
          console.log('oops an error. Status:', status);
          console.log('errorThrown:', errorThrown);
        },
      });
    }
    getPicture(picdate);
  });
});
