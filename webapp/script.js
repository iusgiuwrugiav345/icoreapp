const menuToggle = document.getElementById("menu-toggle");
const menuClose = document.getElementById("menu-close");
const sidebar = document.getElementById("sidebar");
const scrim = document.getElementById("scrim");
const navItems = document.querySelectorAll(".nav-item");

const openMenu = () => {
    sidebar.classList.add("open");
    document.body.classList.add("menu-open");
    menuToggle.setAttribute("aria-expanded", "true");
};

const closeMenu = () => {
    sidebar.classList.remove("open");
    document.body.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
};

const toggleMenu = () => {
    if (sidebar.classList.contains("open")) {
        closeMenu();
    } else {
        openMenu();
    }
};

menuToggle.addEventListener("click", toggleMenu);
menuClose.addEventListener("click", closeMenu);
scrim.addEventListener("click", closeMenu);

navItems.forEach((item) => {
    item.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && sidebar.classList.contains("open")) {
        closeMenu();
    }
});
