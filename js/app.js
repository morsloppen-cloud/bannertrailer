// App initialization and modal logic

document.addEventListener("DOMContentLoaded", () => {
  initMap();
  setupModal();
  setupMobileMenu();
});

// --- Modal ---

const modalOverlay = document.getElementById("modal-overlay");
const modalContent = document.getElementById("modal-content");
const modalClose = document.getElementById("modal-close");
const modalImage = document.getElementById("modal-image");
const modalName = document.getElementById("modal-name");
const modalAddress = document.getElementById("modal-address");
const modalPhone = document.getElementById("modal-phone");
const modalEmail = document.getElementById("modal-email");
const modalDescription = document.getElementById("modal-description");

function openModal(locationId) {
  const loc = trailerLocations.find((l) => l.id === locationId);
  if (!loc) return;

  // Populate content
  modalName.textContent = loc.name;
  modalAddress.textContent = loc.address;
  modalPhone.textContent = loc.phone;
  modalPhone.href = `tel:${loc.phone.replace(/\s/g, "")}`;
  modalEmail.textContent = loc.email;
  modalEmail.href = `mailto:${loc.email}`;
  modalDescription.textContent = loc.description;

  // CTA buttons
  const ctaPhone = document.getElementById("modal-cta-phone");
  const ctaEmail = document.getElementById("modal-cta-email");
  if (ctaPhone) ctaPhone.href = `tel:${loc.phone.replace(/\s/g, "")}`;
  if (ctaEmail) ctaEmail.href = `mailto:${loc.email}`;

  // Image handling
  const modalPlaceholder = document.querySelector(".modal-image-placeholder");
  if (loc.image) {
    modalImage.src = loc.image;
    modalImage.alt = `Bannertrailer hos ${loc.name}`;
    modalImage.style.display = "block";
    if (modalPlaceholder) modalPlaceholder.style.display = "none";
  } else {
    // Show placeholder
    modalImage.src = "";
    modalImage.style.display = "none";
    if (modalPlaceholder) modalPlaceholder.style.display = "flex";
  }

  // Show modal
  modalOverlay.classList.add("active");
  document.body.classList.add("modal-open");

  // Focus trap
  modalClose.focus();
}

function closeModal() {
  modalOverlay.classList.remove("active");
  document.body.classList.remove("modal-open");
}

function setupModal() {
  // Close button
  modalClose.addEventListener("click", closeModal);

  // Click outside
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  // Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOverlay.classList.contains("active")) {
      closeModal();
    }
  });
}

// --- Mobile menu ---
function setupMobileMenu() {
  const toggle = document.getElementById("mobile-menu-toggle");
  const nav = document.getElementById("main-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("open");
      toggle.classList.toggle("open");
    });
  }
}
