// Screen width phones are usually <= 767px
const USUAL_PHONE_WIDTH = 767

// Function checking if the device is a smartphone
function isSmartphone() {
    // User agent check for mobile, but not tablet
    var ua = navigator.userAgent;
    var isMobileUA = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
    var isTabletUA = /iPad|Tablet|PlayBook|Silk/i.test(ua);
    // Screen width check
    var isPhoneScreen = window.innerWidth <= USUAL_PHONE_WIDTH;
    return isMobileUA && !isTabletUA && isPhoneScreen;
}

// What to do if the device is a smartphone
window.addEventListener('DOMContentLoaded', function () {
    if (isSmartphone()) {
        // Background video should be portrait mode
        var video = document.getElementById('myVideo');
        var source = document.getElementById('videoSource');
        source.src = '../vid/cotton_mobile.mp4';
        source.style = 'filter:opacity(70%)'
        video.classList.add('mobile-vertical-video');
        video.load();
        // Activate the sweet mobile footer

    }
});

// Spotify JS functions
window.onSpotifyIframeApiReady = (IFrameAPI) => {
  const element = document.getElementById('embed-iframe');
  const options = {
      uri: 'spotify:playlist:1mYXYlRBQvypHTXz7alA7C',
      title: 'Dreampunk Spotify Playlist',
      ariaLabel: 'Spotify Player: Dreampunk Playlist',
    };
    const callback = (EmbedController) => {
    document.querySelectorAll('.playlist').forEach(
        playlist => {
        playlist.addEventListener('click', () => {
            EmbedController.loadUri(playlist.dataset.spotifyId)
            // Add title and aria-label attributes to iframe for accessibility
            const iframe = document.querySelector('#embed-iframe iframe');
            iframe.setAttribute('title', 'Spotify Player: ' + playlist.dataset.spotifyTitle);
            iframe.setAttribute('aria-label', 'Spotify Player: ' + playlist.dataset.spotifyTitle);
            // untoggle previous active button
            document.querySelectorAll('.playlist').forEach(function(b){ b.classList.remove('active'); });
            // toggle active button
            playlist.classList.add('active');
            });
        })
    };
  IFrameAPI.createController(element, options, callback);
}