(function() {
  $('#add').click(function() {
    $.post('/api/v1/counter', {
      title: $('#title').val()
    });
    updateView();
  });
  function updateView() {
      var count = 0;
      $('#title').val('');
    $.get('/api/v1/counters', function(data) {
      var begin = '';

      data.forEach(function(el) {
        begin += '<tr><td><span class="deleteThis" id="' + el.id + '">&times;</span> ';
        begin += el.title + '<div class="pull-right">';
        begin += '<button class="btn btn-danger btn-xs minus" id="' + el.id + '">-</button>';
        begin += ' <span class="count"> ' + el.count + ' </span>';
        begin += '<button class="btn btn-success btn-xs plus"  id="' + el.id + '">+</button></div></td></tr>';
        count += el.count;
      });
      $('#data').html(begin);
      $(".deleteThis").click(function() {
        $.ajax({
          url: '/api/v1/counter',
          type: 'DELETE',
          data: {
            id: this.id
          },
          success: function(result) {
            updateView();
          }
        });
      });

      $('.minus').click(function() {
        $.post('/api/v1/counter/dec', {
          id: this.id
        });
        updateView();
      });

      $('.plus').click(function() {
        $.post('/api/v1/counter/inc', {
          id: this.id
        });
        updateView();
      });
      $('#total').html(count);
    });
  }
  updateView();
})();
