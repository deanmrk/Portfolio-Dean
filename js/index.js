function toggleMenu() {
  document.querySelector(".nav-container").classList.toggle("active");
}

document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-items");

  function updateActiveLink() {
    const scrollPos = window.scrollY + 100;

    const homeSection = document.querySelector("main");
    const aboutSection = document.getElementById("about");
    const contactSection = document.getElementById("contact");

    if (contactSection && scrollPos >= contactSection.offsetTop - 100) {
      updateLinkActiveState("contact");
    } else if (aboutSection && scrollPos >= aboutSection.offsetTop - 100) {
      updateLinkActiveState("about");
    } else if (homeSection && scrollPos >= homeSection.offsetTop - 100) {
      updateLinkActiveState("home");
    }
  }

  function updateLinkActiveState(sectionId) {
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${sectionId}`) {
        link.classList.add("active");
      }
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href").substring(1);
      let targetElement;

      if (targetId === "home") {
        targetElement = document.querySelector("main");
      } else if (targetId === "portfolio") {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        return;
      } else {
        targetElement = document.getElementById(targetId);
      }

      if (targetElement) {
        document.querySelector(".nav-container").classList.remove("active");

        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: "smooth",
        });

        navLinks.forEach((link) => link.classList.remove("active"));
        this.classList.add("active");
      }
    });
  });

  window.addEventListener("scroll", updateActiveLink);

  updateActiveLink();

  document.addEventListener("click", function (e) {
    const navContainer = document.querySelector(".nav-container");
    const hamburger = document.querySelector(".hamburger");

    if (
      window.innerWidth <= 768 &&
      !navContainer.contains(e.target) &&
      !hamburger.contains(e.target) &&
      navContainer.classList.contains("active")
    ) {
      navContainer.classList.remove("active");
    }
  });

  const contactForm = document.getElementById("contactForm");
  const formMessage =
    document.getElementById("formMessage") || createFormMessage();

  function createFormMessage() {
    const messageDiv = document.createElement("div");
    messageDiv.id = "formMessage";
    if (contactForm) {
      contactForm.appendChild(messageDiv);
    }
    return messageDiv;
  }

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = contactForm.querySelector('input[type="text"]').value;
      const email = contactForm.querySelector('input[type="email"]').value;
      const subject = contactForm.querySelector(
        'input[placeholder="Subject"]'
      ).value;
      const message = contactForm.querySelector("textarea").value;

      if (!name || !email || !subject || !message) {
        showMessage("Please fill in all fields.", "error");
        return;
      }

      showMessage("inProgress", "failed!");

      setTimeout(() => {
        contactForm.reset();
        formMessage.style.display = "none";
      }, 3000);
    });
  }

  function showMessage(text, type) {
    if (formMessage) {
      formMessage.textContent = text;
      formMessage.className = type;
      formMessage.style.display = "block";
    }
  }
});
