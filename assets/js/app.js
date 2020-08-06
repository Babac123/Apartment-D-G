require('bootstrap');
require('bootstrap/dist/css/bootstrap.css');

require('@fortawesome/fontawesome-free/css/all.min.css');

require('../css/app.scss');


const $ = require('jquery');
window.jQuery = $;
window.Popper = require('popper.js');

$(document).ready(function() {
    if (window.location.hash) {
        //bind to scroll function
        $(document).scroll( function() {
            var hash = window.location.hash
            var hashName = hash.substring(1, hash.length);
            var element;

            //if element has this id then scroll to it
            if ($(hash).length != 0) {
                element = $(hash);
            }
            //catch cases of links that use anchor name
            else if ($('a[name="' + hashName + '"]').length != 0)
            {
                //just use the first one in case there are multiples
                element = $('a[name="' + hashName + '"]:first');
            }

            //if we have a target then go to it
            if (element != undefined) {
                window.scrollTo(0, element.position().top);
            }
            //unbind the scroll event
            $(document).unbind("scroll");
        });
    }

});


let modalId = $('#image-gallery');

$(document)
    .ready(function () {

        loadGallery(true, 'a.thumbnail');

        //This function disables buttons when needed
        function disableButtons(counter_max, counter_current) {
            $('#show-previous-image, #show-next-image')
                .show();
            if (counter_max === counter_current) {
                $('#show-next-image')
                    .hide();
            } else if (counter_current === 1) {
                $('#show-previous-image')
                    .hide();
            }
        }

        /**
         *
         * @param setIDs        Sets IDs when DOM is loaded. If using a PHP counter, set to false.
         * @param setClickAttr  Sets the attribute for the click handler.
         */

        function loadGallery(setIDs, setClickAttr) {
            let current_image,
                selector,
                counter = 0;

            $('#show-next-image, #show-previous-image')
                .click(function () {
                    if ($(this)
                        .attr('id') === 'show-previous-image') {
                        current_image--;
                    } else {
                        current_image++;
                    }

                    selector = $('[data-image-id="' + current_image + '"]');
                    updateGallery(selector);
                });

            function updateGallery(selector) {
                let $sel = selector;
                current_image = $sel.data('image-id');
                $('#image-gallery-title')
                    .text($sel.data('title'));
                $('#image-gallery-image')
                    .attr('src', $sel.data('image'));
                disableButtons(counter, $sel.data('image-id'));
            }

            if (setIDs == true) {
                $('[data-image-id]')
                    .each(function () {
                        counter++;
                        $(this)
                            .attr('data-image-id', counter);
                    });
            }
            $(setClickAttr)
                .on('click', function () {
                    updateGallery($(this));
                });
        }
    });

$(document).ready(function(){
    $(window).scroll(function(){
        if($(window).scrollTop() > $(window).height()){
            $(".menu").css({"background-color":"grey", "opacity": "0.8", "transition": "0.40s" });
            $(".menu").css({"z-index":"1000"});
        }
        else{
            $(".menu").css({"background-color":"transparent"});
            $(".menu").css({"background-color":"0"});
        }

    })
})

// build key actions
$(document)
    .keydown(function (e) {
        switch (e.which) {
            case 37: // left
                if ((modalId.data('bs.modal') || {})._isShown && $('#show-previous-image').is(":visible")) {
                    $('#show-previous-image')
                        .click();
                }
                break;

            case 39: // right
                if ((modalId.data('bs.modal') || {})._isShown && $('#show-next-image').is(":visible")) {
                    $('#show-next-image')
                        .click();
                }
                break;

            default:
                return; // exit this handler for other keys
        }
        e.preventDefault(); // prevent the default action (scroll / move caret)
    });




    // When the window has finished loading create our google map below
    google.maps.event.addDomListener(window, 'load', init);

    function init() {
    // Basic options for a simple Google Map
    // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    var mapOptions = {
    // How zoomed in you want the map to start at (always required)
    zoom: 15,

    // The latitude and longitude to center the map (always required)
    center: new google.maps.LatLng(45.778520, 15.987910),
    center: new google.maps.LatLng(45.778520, 15.987940),

    // How you would like to style the map.
    // This is where you would paste any style found on Snazzy Maps.
    styles: [{"featureType":"all","elementType":"geometry","stylers":[{"visibility":"simplified"},{"hue":"#ff7700"}]},{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"administrative.country","elementType":"labels.text.fill","stylers":[{"color":"#1d1d1d"}]},{"featureType":"administrative.province","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"},{"visibility":"on"}]},{"featureType":"administrative.province","elementType":"labels.text.stroke","stylers":[{"color":"#00648a"},{"weight":"5.00"},{"visibility":"on"}]},{"featureType":"administrative.locality","elementType":"labels.text.fill","stylers":[{"color":"#787878"},{"visibility":"on"}]},{"featureType":"administrative.locality","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"},{"visibility":"on"},{"weight":"5.00"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text.fill","stylers":[{"visibility":"on"},{"color":"#2d2d2d"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"},{"visibility":"on"},{"weight":"5.00"}]},{"featureType":"administrative.land_parcel","elementType":"geometry.fill","stylers":[{"saturation":"64"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#fafafa"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#2c2c2c"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#d5d5d5"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"on"},{"color":"#ff0000"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#00648a"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"weight":"5.00"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#00648a"},{"visibility":"on"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"color":"#00648a"}]},{"featureType":"road.highway","elementType":"labels.text","stylers":[{"color":"#ffffff"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.highway","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#00648a"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#d9d9d9"},{"visibility":"on"}]},{"featureType":"transit.station","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit.station.airport","elementType":"geometry.fill","stylers":[{"visibility":"simplified"},{"lightness":"4"},{"saturation":"-100"}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#e1e1e1"},{"visibility":"on"}]}]
};

    // Get the HTML DOM element that will contain your map
    // We are using a div with id="map" seen below in the <body>
    var mapElement = document.getElementById('map');

    // Create the Google Map using our element and options defined above
    var map = new google.maps.Map(mapElement, mapOptions);

    // Let's also add a marker while we're at it
    var marker = new google.maps.Marker({
    position: new google.maps.LatLng(45.778520, 15.987910),
    map: map,
    title: 'Ugradbeni ormari po mjeri'
});
}
