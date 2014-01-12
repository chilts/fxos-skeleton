$(function() {
    // options view
    var myUserId;
    var $optionsOpen   = $('#options-open');
    var $optionsClose  = $('#options-close');
    var $optionsView   = $('#options-view');

    $optionsOpen.click(function(ev) {
        ev.preventDefault();
        $optionsView.removeClass('move-down').addClass('move-up');
    });

    $optionsClose.click(function(ev) {
        ev.preventDefault();
        $optionsView.removeClass('move-up').addClass('move-down');
    });

    // vote confirmation
    var myVote;
    var $movie;
    var $confirm       = $('#confirm');
    var $confirmCancel = $('#confirm-cancel');
    var $confirmView   = $('#confirm-view');

    $confirmCancel.click(function(ev) {
        ev.preventDefault();
        myVote = undefined;
        $movie = undefined;
        $confirmView.removeClass('move-up').addClass('move-down');
    });

    $confirm.click(function(ev) {
        ev.preventDefault();
        // here, we would perform a request to /vote/<user_id>/<movie_id> using myVote and myUserId
        $movie.find('aside').removeClass('contacts-addfavorite').addClass('contacts-favorite');
        $confirmView.removeClass('move-up').addClass('move-down');
    });

    function vote(ev) {
        ev.preventDefault();
        console.log('movie_id=' + $(this).data('movie-id'));
        $movie = $(this);
        myVote = $movie.data('movie-id');
        $confirmView.removeClass('move-down').addClass('move-up');
    }

    $('#appList a').click(vote);

    // for now, don't do anything below here
    return;

    // do an Ajax request to get the movies
    var jqxhr = $.ajax({
        type     : 'GET',
        url      : 'http://localhost:8000/movies',
        dataType : 'json'
    });

    jqxhr.done(function(data) {
        var $list = $('#appList ul');
        $list.empty();
        data.movies.forEach(function(movie) {
            var $li = $('<li>');
            var $a = $('<a href="#">');
            $a.data('movie-id', movie.movie_id);
            $a.append('<aside class="icon comms-icon contacts-addfavorite">vote</aside>');
            $a.append($('<p>').text(movie.title));
            $a.append($('<p>').text(movie.genre));
            $a.click(vote);
            $li.append($a);
            $list.append($li);
            console.log(movie);
        });
    });
});
