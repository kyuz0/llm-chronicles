
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
    $(".scroll-nav-toggle").click(function() {
        $(".scroll-nav").toggleClass("active");
        $("#expand-icon").toggle();
        $("#collapse-icon").toggle();
    }); 

    resize()

    // Listen for window resize
    $(window).resize(function() {
        resize()
    });

    $(window).on('scroll', function() {
        $('.video').each(function() {
            var topOfLesson = $(this).offset().top;
            var topOfWindow = $(window).scrollTop();
    
            if (topOfWindow > topOfLesson - 10) {
                var lessonId = $(this).attr('id');
                $('.scroll-nav-button').removeClass('active');
                $('.scroll-nav-button[href="#' + lessonId + '"]').addClass('active');
            }
        });
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

    $('a[data-toggle="modal"]').click(function(e) {
        e.preventDefault();
    });

    $('#pdfModal').on('show.bs.modal', function(event) {
        var button = $(event.relatedTarget); // Button that triggered the modal
        var pdfUrl = button.data('pdf-url'); // Extract the PDF URL from the data-pdf-url attribute
    
        var modal = $(this);
        modal.find('#pdfIframe').attr('src', pdfUrl);
        modal.find('#downloadPdfBtn').attr('href', pdfUrl);
      });
 
});
