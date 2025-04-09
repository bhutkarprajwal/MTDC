document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    const popup = document.getElementById("popup");

    form.addEventListener("submit", function (e) {
      e.preventDefault(); // prevent page reload

      // Show popup
      popup.style.display = "block";

      // Hide after 3 seconds
      setTimeout(() => {
        popup.style.display = "none";
      }, 3000);

      // Optionally reset form
      form.reset();
    });
  });
