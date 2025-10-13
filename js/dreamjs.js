function isSmartphone() {
    // User agent check for mobile, but not tablet
    var ua = navigator.userAgent;
    var isMobileUA = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
    var isTabletUA = /iPad|Tablet|PlayBook|Silk/i.test(ua);
    // Screen width check (phones are usually <= 767px)
    var isPhoneScreen = window.innerWidth <= 767;
    return isMobileUA && !isTabletUA && isPhoneScreen;
}
window.addEventListener('DOMContentLoaded', function () {
    if (isSmartphone()) {
        // Background video portrait
        var video = document.getElementById('myVideo');
        var source = document.getElementById('videoSource');
        source.src = '../vid/cotton_mobile.mp4'; // <-- your vertical video path
        video.classList.add('mobile-vertical-video');
        video.load();
        
        // Masquer section pokémon go aka MISC section
        //var otherSection = document.getElementById('other')
        //otherSection.style.display = "none";
    }
});