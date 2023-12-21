
function setScrollNavVisible(isVisible) {
    if (isVisible) {
        $('.scroll-nav').addClass('active');
        $('#expand-icon').hide();
        $('#collapse-icon').show();
    } else {
        $('.scroll-nav').removeClass('active');
        $('#expand-icon').show();
        $('#collapse-icon').hide();
    }
}

function resize() {
    if ($(window).width() < 992) {
        setScrollNavVisible(false)
    } else {
        setScrollNavVisible(true)
    }
}

$(document).ready(function () {
    $(".scroll-nav-toggle").click(function () {
        $(".scroll-nav").toggleClass("active");
        $("#expand-icon").toggle();
        $("#collapse-icon").toggle();
    });

    resize()

    // Listen for window resize
    $(window).resize(function () {
        resize()
    });

    $(window).on('scroll', function () {
        var topOfWindow = $(window).scrollTop();

        // Track the closest element to the top of the window
        var closestElement = null;
        var closestDistance = Number.MAX_VALUE;

        $('.video').each(function () {
            var topOfElement = $(this).offset().top;

            // Calculate the distance from the top of the element to the top of the window
            var distance = Math.abs(topOfElement - topOfWindow);

            // Check if this element is closer to the top of the window than the previous closest
            if (distance < closestDistance) {
                closestDistance = distance;
                closestElement = $(this);
            }
        });

        // Activate the closest element
        if (closestElement) {
            var elementId = closestElement.attr('id');
            $('.scroll-nav-button').removeClass('active');
            $('.scroll-nav-button[href="#' + elementId + '"]').addClass('active');

            $('.scroll-nav-sub-list').removeClass('active');
            $('.scroll-nav-button[href="#' + elementId + '"]').closest('.scroll-nav-sub-list').addClass('active');
        }
    });

    $('.video-description').each(function () {
        const $description = $(this);
        const $showMoreLink = $description.next('.show-more');

        if ($description[0].scrollHeight > $description.innerHeight()) {
            $showMoreLink.show();
        } else {
            $showMoreLink.hide();
        }
    });
    $('.show-more').on('click', function (e) {
        e.preventDefault();
        const desc = $(this).prev('.video-description');
        if (desc.css('max-height') !== 'none') {
            desc.css('max-height', 'none');
            $(this).text('less...');
        } else {
            desc.css('max-height', '3.2em');
            $(this).text('more...');
        }
    });

    $('a[data-toggle="modal"]').click(function (e) {
        e.preventDefault();
    });

    $('#pdfModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget); // Button that triggered the modal
        var pdfUrl = button.data('pdf-url'); // Extract the PDF URL from the data-pdf-url attribute

        var modal = $(this);
        modal.find('#pdfIframe').attr('src', pdfUrl);
        modal.find('#downloadPdfBtn').attr('href', pdfUrl);
    });

    $('.scroll-nav-button').click(function () {
        // Get the target anchor ID from the data-target attribute of the clicked button
        var targetId = $(this).data('target');

        $('.scroll-nav-sub-list').removeClass('active');
        if ($(this).next('.scroll-nav-sub-list').length > 0) {
            $(this).next('.scroll-nav-sub-list').addClass('active')
        } else {
            $(this).parents('.scroll-nav-sub-list').addClass('active')
        }


        // Scroll to the target anchor
        $('html, body').animate({
            scrollTop: $('#' + targetId).offset().top
        }, 'slow');
    });

});
