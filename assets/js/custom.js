(function ($) {
  "use strict";

  // Page loading animation
  $(window).on("load", function () {
    $("#js-preloader").addClass("loaded");
  });

  $(window).scroll(function () {
    var scroll = $(window).scrollTop();
    var box = $(".header-text").height();
    var header = $("header").height();

    if (scroll >= box - header) {
      $("header").addClass("background-header");
    } else {
      $("header").removeClass("background-header");
    }
  });

  var width = $(window).width();
  $(window).resize(function () {
    if (width > 767 && $(window).width() < 767) {
      location.reload();
    } else if (width < 767 && $(window).width() > 767) {
      location.reload();
    }
  });

  const elem = document.querySelector(".event_box");
  const filtersElem = document.querySelector(".event_filter");
  if (elem) {
    const rdn_events_list = new Isotope(elem, {
      itemSelector: ".event_outer",
      layoutMode: "masonry",
    });
    if (filtersElem) {
      filtersElem.addEventListener("click", function (event) {
        if (!matchesSelector(event.target, "a")) {
          return;
        }
        const filterValue = event.target.getAttribute("data-filter");
        rdn_events_list.arrange({
          filter: filterValue,
        });
        filtersElem.querySelector(".is_active").classList.remove("is_active");
        event.target.classList.add("is_active");
        event.preventDefault();
      });
    }
  }

  $(".owl-banner").owlCarousel({
    center: true,
    items: 1,
    loop: true,
    nav: true,
    navText: [
      '<i class="fa fa-angle-left" aria-hidden="true"></i>',
      '<i class="fa fa-angle-right" aria-hidden="true"></i>',
    ],
    margin: 30,
    responsive: {
      992: {
        items: 1,
      },
      1200: {
        items: 1,
      },
    },
  });

  $(".owl-testimonials").owlCarousel({
    center: true,
    items: 1,
    loop: true,
    nav: true,
    navText: [
      '<i class="fa fa-angle-left" aria-hidden="true"></i>',
      '<i class="fa fa-angle-right" aria-hidden="true"></i>',
    ],
    margin: 30,
    responsive: {
      992: {
        items: 1,
      },
      1200: {
        items: 1,
      },
    },
  });

  // Menu Dropdown Toggle
  if ($(".menu-trigger").length) {
    $(".menu-trigger").on("click", function () {
      $(this).toggleClass("active");
      $(".header-area .nav").slideToggle(200);
    });
  }

  // Menu elevator animation
  $(".scroll-to-section a[href*=\\#]:not([href=\\#])").on("click", function () {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        var width = $(window).width();
        if (width < 767) {
          $(".menu-trigger").removeClass("active");
          $(".header-area .nav").slideUp(200);
        }
        $("html,body").animate(
          {
            scrollTop: target.offset().top - 80,
          },
          700
        );
        return false;
      }
    }
  });

  $(document).ready(function () {
    $(document).on("scroll", onScroll);

    //smoothscroll
    $('.scroll-to-section a[href^="#"]').on("click", function (e) {
      e.preventDefault();
      $(document).off("scroll");

      $(".scroll-to-section a").each(function () {
        $(this).removeClass("active");
      });
      $(this).addClass("active");

      var target = this.hash,
        menu = target;
      var target = $(this.hash);
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: target.offset().top - 79,
          },
          500,
          "swing",
          function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
          }
        );
    });
  });

  function onScroll(event) {
    var scrollPos = $(document).scrollTop();
    $(".nav a").each(function () {
      var currLink = $(this);
      var refElement = $(currLink.attr("href"));
      if (
        refElement.position().top <= scrollPos &&
        refElement.position().top + refElement.height() > scrollPos
      ) {
        $(".nav ul li a").removeClass("active");
        currLink.addClass("active");
      } else {
        currLink.removeClass("active");
      }
    });
  }

  // Page loading animation
  $(window).on("load", function () {
    if ($(".cover").length) {
      $(".cover").parallax({
        imageSrc: $(".cover").data("image"),
        zIndex: "1",
      });
    }

    $("#preloader").animate(
      {
        opacity: "0",
      },
      600,
      function () {
        setTimeout(function () {
          $("#preloader").css("visibility", "hidden").fadeOut();
        }, 300);
      }
    );
  });

  const dropdownOpener = $(".main-nav ul.nav .has-sub > a");

  // Open/Close Submenus
  if (dropdownOpener.length) {
    dropdownOpener.each(function () {
      var _this = $(this);

      _this.on("tap click", function (e) {
        var thisItemParent = _this.parent("li"),
          thisItemParentSiblingsWithDrop = thisItemParent.siblings(".has-sub");

        if (thisItemParent.hasClass("has-sub")) {
          var submenu = thisItemParent.find("> ul.sub-menu");

          if (submenu.is(":visible")) {
            submenu.slideUp(450, "easeInOutQuad");
            thisItemParent.removeClass("is-open-sub");
          } else {
            thisItemParent.addClass("is-open-sub");

            if (thisItemParentSiblingsWithDrop.length === 0) {
              thisItemParent
                .find(".sub-menu")
                .slideUp(400, "easeInOutQuad", function () {
                  submenu.slideDown(250, "easeInOutQuad");
                });
            } else {
              thisItemParent
                .siblings()
                .removeClass("is-open-sub")
                .find(".sub-menu")
                .slideUp(250, "easeInOutQuad", function () {
                  submenu.slideDown(250, "easeInOutQuad");
                });
            }
          }
        }

        e.preventDefault();
      });
    });
  }
  // Contact Form Submission
  $(document).ready(function () {
    $("#contact-form").on("submit", function (event) {
      event.preventDefault(); // Prevent default form submission

      var name = $("#name").val().trim();
      var email = $("#email").val().trim();
      var message = $("#message").val().trim();

      if (name === "" || email === "" || message === "") {
        alert("Please fill in all fields.");
        return;
      }

      // Create email content with better formatting
      var subject = "New Contact Form Submission from " + name;
      var body =
        "Name: " +
        name +
        "\n" +
        "Email: " +
        email +
        "\n\n" +
        "Message:\n" +
        "------------------------------\n" +
        message +
        "\n" +
        "------------------------------";

      // Open default email client
      window.location.href =
        "mailto:keshavgoel2025.com?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(body);
    });
  });
  // ===== Dynamic Join Us Modal Form =====
  $(document).ready(function () {
    // Append modal to body
    $("body").append(`
        <div id="joinModal" class="modal">
          <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Join Scholar</h2>
            <form id="joinForm">
              <input type="text" id="join-name" placeholder="Your Name" required />
              <input type="email" id="join-email" placeholder="Email Address" required />
              <input type="tel" id="join-phone" placeholder="Phone Number" required />
              <select id="join-skillset" required>
                <option value="">Select Skillset</option>
                <option value="tech">Tech</option>
                <option value="business">Business</option>
                <option value="soft">Soft Skills</option>
                <option value="other">Other</option>
              </select>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      `);

    // Basic modal styles (optional - you can move this to your CSS file)
    $("<style>")
      .prop("type", "text/css")
      .html(
        `
        .modal {
          display: none;
          position: fixed;
          z-index: 9999;
          left: 0; top: 0;
          width: 100%; height: 100%;
          background: rgba(0,0,0,0.6);
        }
        .modal-content {
          background: #fff;
          border-radius: 10px;
          padding: 30px;
          margin: 10% auto;
          max-width: 400px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }
        .modal-content input,
        .modal-content select {
          width: 100%;
          padding: 12px;
          margin: 10px 0;
          border-radius: 6px;
          border: 1px solid #ccc;
        }
        .modal-content button {
          padding: 12px;
          width: 100%;
          background: #6c63ff;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }
        .modal-content button:hover {
          background: #584ee0;
        }
        .modal .close {
          float: right;
          font-size: 22px;
          cursor: pointer;
        }
      `
      )
      .appendTo("head");

    // Open modal on "Join Us!" click
    $('a[href="#courses"]').on("click", function (e) {
      e.preventDefault();
      $("#joinModal").fadeIn();
    });
    // $("#join-us-btn").on("click", function (e) {
    //   e.preventDefault(); // stop default jump
    //   $("#joinModal").fadeIn(); // open modal
    // });

    // Close modal
    $("body").on("click", ".modal .close", function () {
      $("#joinModal").fadeOut();
    });

    // Close modal when clicking outside the form
    $("body").on("click", "#joinModal", function (e) {
      if ($(e.target).is("#joinModal")) {
        $("#joinModal").fadeOut();
      }
    });

    // Form submission
    // Form submission
    // $("#joinForm").on("submit", function (e) {
    //   e.preventDefault();
    //   const name = $("#join-name").val().trim();
    //   const email = $("#join-email").val().trim();
    //   const phone = $("#join-phone").val().trim();
    //   const skill = $("#join-skillset").val();

    //   if (!name || !email || !phone || !skill) {
    //     alert("Please fill in all fields.");
    //     return;
    //   }

    //   // Success message
    //   alert("Thanks for joining Scholar! We'll contact you soon.");

    //   // Close modal and reset form
    //   $("#joinForm")[0].reset();
    //   $("#joinModal").fadeOut();

    //   // Smooth scroll to #events
    //   setTimeout(function () {
    //     const eventsSection = $("#events");
    //     if (eventsSection.length) {
    //       $("html, body").animate(
    //         {
    //           scrollTop: eventsSection.offset().top - 80, // adjust for header offset
    //         },
    //         800
    //       );
    //     }
    //   }, 300); // slight delay after modal fade-out
    // });
    $("#joinForm").on("submit", function (e) {
      e.preventDefault();

      const name = $("#join-name").val().trim();
      const email = $("#join-email").val().trim();
      const phone = $("#join-phone").val().trim();
      const skill = $("#join-skillset").val();

      if (!name || !email || !phone || !skill) {
        alert("Please fill in all fields.");
        return;
      }

      const newEntry = {
        name,
        email,
        phone,
        skill,
        timestamp: new Date().toISOString(),
      };

      // Get existing entries or create a new array
      let entries = JSON.parse(localStorage.getItem("joinUsEntries")) || [];

      // Add new entry
      entries.push(newEntry);

      // Save back to localStorage
      localStorage.setItem("joinUsEntries", JSON.stringify(entries));

      alert(
        "Thanks for joining Scholar! We'll contact you soon.\n\n" +
          "Your Info:\n" +
          "Name: " +
          name +
          "\n" +
          "Email: " +
          email +
          "\n" +
          "Phone: " +
          phone +
          "\n" +
          "Skillset: " +
          skill
      );
      $("#joinForm")[0].reset();
      $("#joinModal").fadeOut();

      // Scroll to events
      setTimeout(() => {
        const eventsSection = $("#courses");
        if (eventsSection.length) {
          $("html, body").animate(
            {
              scrollTop: eventsSection.offset().top - 80,
            },
            800
          );
        }
      }, 300);
    });
    // ==========================================
    // Form submission
    $("#joinForm").on("submit", function (e) {
      // ... your existing modal form logic ...
    });

    // ===== Add the Enroll! routing below this =====
    $(document).on("click", ".enroll-btn", function () {
      const targetURL = $(this).data("link");
      if (!targetURL) {
        alert("Article not found.");
        return;
      }

      window.location.href = targetURL;
    });
    // ==============
  });
})(window.jQuery);
