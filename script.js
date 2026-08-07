document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".menu-button");
  const nav = document.querySelector(".site-header nav");

  menuButton?.addEventListener("click", () => {
    const expanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!expanded));
    nav?.classList.toggle("nav-open", !expanded);
  });

  nav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("nav-open");
      menuButton?.setAttribute("aria-expanded", "false");
    });
  });

  const closeLightbox = () => {
    document.querySelector(".lightbox")?.remove();
    document.body.classList.remove("modal-open");
  };

  const openLightbox = (button) => {
    const sourceImage = button.querySelector("img");
    if (!sourceImage) return;

    const emailMeta = button.closest(".email-piece")?.querySelector(".email-meta");
    const caseStudy = button.closest(".case-study");
    const title = emailMeta?.querySelector("strong")?.textContent || caseStudy?.querySelector("h3")?.textContent || "Portfolio proof";
    const category = emailMeta?.querySelector("small")?.textContent || "Anonymous Klaviyo result";

    const lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");
    lightbox.innerHTML = `
      <div class="lightbox-panel">
        <div class="lightbox-head">
          <div><strong></strong><span></span></div>
          <button type="button" aria-label="Close preview">Close <i>×</i></button>
        </div>
        <div class="lightbox-scroll"><img alt=""></div>
      </div>`;

    lightbox.querySelector("strong").textContent = title;
    lightbox.querySelector("span").textContent = category;
    const previewImage = lightbox.querySelector("img");
    previewImage.src = sourceImage.src;
    previewImage.alt = sourceImage.alt;
    lightbox.querySelector("button").addEventListener("click", closeLightbox);
    lightbox.addEventListener("mousedown", (event) => {
      if (event.target === lightbox) closeLightbox();
    });
    document.body.appendChild(lightbox);
    document.body.classList.add("modal-open");
  };

  document.querySelectorAll(".email-piece button, .evidence-frame").forEach((button) => {
    button.addEventListener("click", () => openLightbox(button));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeLightbox();
  });
});
