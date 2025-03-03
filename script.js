// Actualizar año en el footer
document.getElementById("current-year").textContent = new Date().getFullYear()

// Funcionalidad de tabs
const tabButtons = document.querySelectorAll(".tab-button")
const tabPanels = document.querySelectorAll(".tab-panel")

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Desactivar todos los botones y paneles
    tabButtons.forEach((btn) => btn.classList.remove("active"))
    tabPanels.forEach((panel) => panel.classList.remove("active"))

    // Activar el botón clickeado
    button.classList.add("active")

    // Activar el panel correspondiente
    const tabId = button.getAttribute("data-tab")
    document.getElementById(`${tabId}-panel`).classList.add("active")
  })
})


// Agregar efecto "activo" en la barra de navegación con una transición suave
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
    let currentSection = "";

    sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionHeight = section.clientHeight;
        if (sectionTop <= window.innerHeight / 2 && sectionTop + sectionHeight > window.innerHeight / 2) {
            currentSection = section.getAttribute("id");
        }
    });

    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10) {
        currentSection = "contacto";
    }

    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(currentSection)) {
            link.classList.add("active");
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    const closeButton = document.querySelector(".close-button");
    const prevButton = document.getElementById("prevImage");
    const nextButton = document.getElementById("nextImage");
    let imagePaths = [];
    let currentIndex = 0;
    
    document.querySelectorAll(".show-images").forEach(button => {
        button.addEventListener("click", function() {
            event.preventDefault();
            const project = this.getAttribute("data-project");
            imagePaths = [];
            let index = 1;
            
            function loadImage() {
                const imgPath = `./images/proyectos/${project}_${index}.png`;
                const img = new Image();
                img.src = imgPath;
                img.onload = function() {
                    imagePaths.push(imgPath);
                    index++;
                    loadImage();
                };
                img.onerror = function() {
                    if (imagePaths.length > 0) {
                        currentIndex = 0;
                        modalImage.src = imagePaths[currentIndex];
                        modal.style.display = "flex";
                    }
                };
            }
            loadImage();
        });
    });
    
    closeButton.addEventListener("click", function() {
        modal.style.display = "none";
    });
    
    prevButton.addEventListener("click", function() {
        if (imagePaths.length > 0) {
            currentIndex = (currentIndex - 1 + imagePaths.length) % imagePaths.length;
            modalImage.src = imagePaths[currentIndex];
        }
    });
    
    nextButton.addEventListener("click", function() {
        if (imagePaths.length > 0) {
            currentIndex = (currentIndex + 1) % imagePaths.length;
            modalImage.src = imagePaths[currentIndex];
        }
    });
});

