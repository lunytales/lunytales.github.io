(() => {
  const nav = document.getElementById("nav");
  const toggler = document.querySelector(".navbar-toggler");
  if (!nav || !toggler) return;
  if (!window.bootstrap) {
    if (window.location.hostname === "localhost" || window.location.protocol === "file:") {
      console.warn("Bootstrap no está disponible. El menú accesible no se inicializó.");
    }
    return;
  }

  const collapse = bootstrap.Collapse.getOrCreateInstance(nav, { toggle: false });

  const setState = (isOpen) => {
    toggler.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
    toggler.classList.toggle("is-open", isOpen);
  };

  const firstLink = nav.querySelector(".nav-link");

  nav.addEventListener("shown.bs.collapse", () => {
    setState(true);
    if (firstLink) firstLink.focus();
  });

  nav.addEventListener("hidden.bs.collapse", () => {
    setState(false);
    toggler.focus();
  });

  nav.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (nav.classList.contains("show")) {
        collapse.hide();
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("show")) {
      collapse.hide();
    }
  });

  setState(toggler.getAttribute("aria-expanded") === "true");
})();
