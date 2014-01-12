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
    var $confirm       = $('#confirm');
    var $confirmCancel = $('#confirm-cancel');
    var $confirmView   = $('#confirm-view');

    $confirmCancel.click(function(ev) {
        ev.preventDefault();
        $confirmView.removeClass('move-up').addClass('move-down');
    });

    $confirmView.click(function(ev) {
        ev.preventDefault();
        // here, we would perform a request to /vote/<user_id>/<movie_id> using myVote and myUserId
        $confirmView.removeClass('move-up').addClass('move-down');
    });

    function vote(ev) {
        ev.preventDefault();
        console.log('movie_id=' + $(this).data('movie-id'));
        myVote = $(this).data('movie-id');
        $confirmView.removeClass('move-down').addClass('move-up');
    }

    $('#appList a').click(vote);

    // for now, don't do anything below here
    return;

    // do an Ajax request to get the movies
    var jqxhr = $.ajax({
        type     : 'GET',
        url      : 'movies.json',
        dataType : 'json'
    });

    jqxhr.done(function(data) {
        var $list = $('#appList ul');
        $list.empty();
        data.forEach(function(movie) {
            var $li = $('<li>');
            var $a = $('<a href="#">');
            $a.data('movie-id', movie.movie_id);
            $a.append('<aside class="icon comms-icon contacts-addfavorite">vote</aside>');
            $a.append($('<p>').text(movie.title + ' asd'));
            $a.append($('<p>').text(movie.genre + ' sdf'));
            $a.click(vote);
            $li.append($a);
            $list.append($li);
            console.log(movie);
        });
    });
});
