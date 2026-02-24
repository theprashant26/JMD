

const enquiryBox = document.querySelector(".enquiry-box");
        const toggleIcon = document.querySelector(".toggle-form");
        const header = document.querySelector(".enquiry-header");

        // Manual toggle on header click
        header.onclick = () => {
            enquiryBox.classList.toggle("collapsed");
            toggleIcon.classList.toggle("fa-chevron-down");
            toggleIcon.classList.toggle("fa-chevron-up");
        };

        let lastScroll = window.scrollY;

        window.addEventListener("scroll", () => {
            let currentScroll = window.scrollY;

            // Scroll Down → Collapse form
            if (currentScroll > lastScroll) {
                enquiryBox.classList.add("collapsed");
                toggleIcon.classList.remove("fa-chevron-down");
                toggleIcon.classList.add("fa-chevron-up");
            }

            // Only when near top → Expand form
            if (currentScroll < 100) {
                enquiryBox.classList.remove("collapsed");
                toggleIcon.classList.remove("fa-chevron-up");
                toggleIcon.classList.add("fa-chevron-down");
            }

            lastScroll = currentScroll;
        });


$('.amenities-carousel').owlCarousel({
    loop: true,
    margin: 20,
    autoplay: true,
    autoplayTimeout: 3000,
    smartSpeed: 700,
    dots: false,
    nav: false,
    responsive: {
        0: { items: 1 },
        576: { items: 1 },
        768: { items: 1 },
        992: { items: 1 },
        1200: { items: 1 },
        1400: { items: 1 }
    }
});

$('.gallery-carousel').owlCarousel({
    loop: true,
    margin: 20,
    nav: true,
    dots: false,
    autoplay: true,
    autoplayTimeout: 2500,
    autoplayHoverPause: true,
    smartSpeed: 700,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 2
        },
        992: {
            items: 4
        }
    }
});


document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
        var myModal = new bootstrap.Modal(document.getElementById('contactModal'));
        myModal.show();
    }, 2000); // 2 seconds
});