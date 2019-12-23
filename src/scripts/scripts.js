document.addEventListener("DOMContentLoaded", function() {
  // close loader when content loaded
  const loader = document.querySelector(".loader");
  loader.classList.add("closed");

  // Hamburger and navbar animation
  const hamburgerButton = document.querySelector(".hamburger");
  const header = document.querySelector(".header");
  const navbar = document.querySelector(".navbar");

  const tlNavbar = gsap.timeline(
    { paused: true },
    {
      defaults: { duration: 1, ease: "power4.out" }
    }
  );
  tlNavbar
    .fromTo(
      header,
      {
        height: 84
      },
      {
        height: "90vh"
      }
    )
    .from(".navbar-item", {
      x: -200,
      stagger: {
        from: "start",
        axis: "x",
        amount: 1
      }
    });

  const openMenu = function() {
    hamburgerButton.classList.add("is-active");
    navbar.style.display = "block";
    tlNavbar.play();
  };

  const closeMenu = function() {
    hamburgerButton.classList.remove("is-active");
    tlNavbar.timeScale(2).reverse();
  };

  hamburgerButton.addEventListener("click", () => {
    hamburgerButton.classList.toggle("is-active");
    if (hamburgerButton.classList.contains("is-active")) {
      openMenu();
    } else {
      closeMenu();
    }
  });

  window.onresize = closeMenu;

  // GSAP AND SCROLMAGIC ANIMATIONS
  const controller = new ScrollMagic.Controller();

  // HERO
  const heroRule = CSSRulePlugin.getRule(".hero__two:before");
  const tlHero = gsap.timeline({
    defaults: { duration: 1, ease: "power4.out" }
  });
  tlHero
    .from(".hero-title", {
      x: -200,
      opacity: 0
    })
    .from(".hero-text", {
      x: -100,
      opacity: 0
    });

  new ScrollMagic.Scene({
    triggerElement: ".hero",
    duration: 0,
    triggerHook: 0.5
  })
    .setTween(tlHero)
    .addTo(controller);

  // SKULL
  const tlSkull = gsap.timeline();
  tlSkull.fromTo(
    heroRule,
    {
      cssRule: { x: 0, y: -100, rotation: -80 }
    },
    { cssRule: { x: -200, y: 600, rotation: 360 } }
  );

  new ScrollMagic.Scene({
    triggerElement: ".hero",
    duration: 1000,
    triggerHook: 0.1
  })
    .setTween(tlSkull)
    .addTo(controller);

  // ABOUT IMAGE
  const tlAboutImg = gsap.timeline();
  tlAboutImg.fromTo(
    ".about__img img",
    {
      y: -100
    },
    { y: 10 }
  );

  new ScrollMagic.Scene({
    triggerElement: ".about",
    duration: 800,
    triggerHook: 0.8
  })
    .setTween(tlAboutImg)
    .addTo(controller);

  // ABOUT
  const tlAbout = gsap.timeline();
  tlAbout.from(".about__inside", {
    duration: 1,
    opacity: 0,
    y: 100,
    ease: "power4.out"
  });

  new ScrollMagic.Scene({
    triggerElement: ".about",
    duration: 0,
    triggerHook: 0.6,
    reverse: false
  })
    .setTween(tlAbout)
    .addTo(controller);

  // SERVICES
  const tlServices = gsap.timeline({
    defaults: { duration: 1, ease: "power4.out", opacity: 0 }
  });
  tlServices
    .from(
      ".services-heading",
      {
        y: 100
      },
      "-=1"
    )
    .from(".services__bot__prices", {
      y: 100
    })
    .from(
      ".services__bot__desc",
      {
        y: 100
      },
      "-=1"
    );

  new ScrollMagic.Scene({
    triggerElement: ".services",
    duration: 0,
    triggerHook: 0.5,
    reverse: false
  })
    .setTween(tlServices)
    .addTo(controller);

  // PRODUCTS
  const tlProducts = gsap.timeline({
    defaults: { duration: 1, ease: "power4.out", opacity: 0 }
  });
  tlProducts
    .from(".products__header", {
      y: 100
    })
    .from(
      ".products-item",
      {
        x: 100,
        stagger: {
          from: "start",
          axis: "x",
          amount: 1
        }
      },
      "-=0.8"
    );

  new ScrollMagic.Scene({
    triggerElement: ".products",
    duration: 0,
    triggerHook: 0.4,
    reverse: false
  })
    .setTween(tlProducts)
    .addTo(controller);

  // BANNER
  const tlBanner = gsap.timeline();
  tlBanner.from(".banner__wrapper", {
    duration: 1,
    opacity: 0,
    x: "-50vw",
    ease: "power4.out"
  });

  new ScrollMagic.Scene({
    triggerElement: ".banner",
    duration: 0,
    triggerHook: 0.6,
    reverse: false
  })
    .setTween(tlBanner)
    .addTo(controller);

  // CONTACT
  const tlContact = gsap.timeline({
    defaults: { duration: 1, y: 100, opacity: 0 }
  });
  tlContact
    .from(".contact-info", {
      ease: "power4.out"
    })
    .from(
      ".more-links",
      {
        ease: "power4.out"
      },
      "-=0.9"
    )
    .from(
      ".working-hours",
      {
        ease: "power4.out"
      },
      "-=0.8"
    );

  new ScrollMagic.Scene({
    triggerElement: ".banner",
    duration: 0,
    triggerHook: 0.3,
    reverse: false
  })
    .setTween(tlContact)
    .addTo(controller);

  // ######### SCROLLTO PLUGIN #########################
  // click navbar item - scroll to that specific section
  // !!! works only when items are in correct order !!!
  // mobile devices - close menu after scroll to section
  document.querySelectorAll(".navbar-item").forEach((item, index) => {
    item.addEventListener("click", () => {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: "#section" + (index + 1), offsetY: 84 },
        ease: "power2",
        onComplete: closeMenu
      });
    });
  });

  // show/hide btnTop
  const btnTop = document.querySelector(".js-go-top");
  let windowHeight = screen.height;
  let isBtnVisible = false;

  window.addEventListener("scroll", e => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollTop > windowHeight) {
      if (!isBtnVisible) {
        btnTop.classList.add("visible");
        isBtnVisible = true;
      }
    } else {
      if (isBtnVisible) {
        btnTop.classList.remove("visible");
        isBtnVisible = false;
      }
    }
  });

  // scroll top animation
  const scrollTop = function() {
    gsap.to(window, { duration: 1, scrollTo: 0, ease: "power2" });
  };
  // click btnTop - scroll top
  btnTop.addEventListener("click", () => {
    scrollTop();
  });
  // click logo - scroll top
  const navbarLogo = document.querySelector(".logo");
  navbarLogo.addEventListener("click", e => {
    scrollTop();
  });
  // contact button scroll
  const contactBtn = document.querySelector(".js-contact");
  contactBtn.addEventListener("click", () => {
    console.log("coklwer");
    gsap.to(window, { duration: 2, scrollTo: "#section5", ease: "power2" });
  });

  // FOOTER COPYRIGHTS YEAR
  const currentYearSpan = document.querySelector(".js-current-year");
  const currentYear = new Date().getFullYear();
  currentYearSpan.textContent = currentYear;
});
