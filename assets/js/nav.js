(() => {
  const nav = document.getElementById("nav");
  const toggler = document.querySelector(".navbar-toggler");
  if (!nav || !toggler || !window.bootstrap) return;

  const collapse = bootstrap.Collapse.getOrCreateInstance(nav, { toggle: false });

  const setState = (isOpen) => {
    toggler.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
    toggler.classList.toggle("is-open", isOpen);
  };

  nav.addEventListener("shown.bs.collapse", () => setState(true));
  nav.addEventListener("hidden.bs.collapse", () => setState(false));

  nav.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (nav.classList.contains("show")) {
        collapse.hide();
      }
    });
  });

  setState(toggler.getAttribute("aria-expanded") === "true");
})();
