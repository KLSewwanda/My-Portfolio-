// Typing animation
const textArray = [
  "Hello, I'm Sewwanda Lakshitha",
  "I'm a UI/UX Designer",
  "I build Web & Mobile Apps",
];
let index = 0;
let charIndex = 0;
const typingElement = document.getElementById("typed-text");

function typeText() {
  if (charIndex <= textArray[index].length) {
    typingElement.textContent = textArray[index].substring(0, charIndex);
    charIndex++;
    setTimeout(typeText, 100);
  } else {
    setTimeout(eraseText, 1500);
  }
}

function eraseText() {
  if (charIndex >= 0) {
    typingElement.textContent = textArray[index].substring(0, charIndex);
    charIndex--;
    setTimeout(eraseText, 60);
  } else {
    index = (index + 1) % textArray.length;
    setTimeout(typeText, 300);
  }
}

document.addEventListener("DOMContentLoaded", typeText);

// Scroll to top function
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Show/hide scroll-top button
window.addEventListener("scroll", function () {
  const scrollBtn = document.querySelector(".scroll-top");
  if (window.scrollY > 300) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
});

// Resume download with confirmation
function confirmDownload() {
  const proceed = confirm("Do you want to download the resume?");
  if (proceed) {
    const resumeUrl =
      "https://drive.google.com/uc?id=1Jo1A5G3HK07zliJ8gcrGOA2AeDeH06bq&export=download";
    window.open(resumeUrl, "_blank");
  }
}

// Show download modal
function showDownloadModal() {
  const alreadyDownloaded = sessionStorage.getItem("resumeDownloaded");

  // Only show modal if previously downloaded
  if (alreadyDownloaded) {
    document.getElementById("downloadModal").classList.remove("hidden");
  } else {
    confirmAndDownload();
  }
}

// Close download modal
function closeDownloadModal() {
  document.getElementById("downloadModal").classList.add("hidden");
}

// Confirm and download resume
function confirmAndDownload() {
  const resumeUrl =
    "https://drive.google.com/uc?id=1Jo1A5G3HK07zliJ8gcrGOA2AeDeH06bq&export=download";
  const a = document.createElement("a");
  a.href = resumeUrl;
  a.download = "Sewwanda_Lakshitha_Resume.pdf";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  sessionStorage.setItem("resumeDownloaded", "true");
  closeDownloadModal();
}

// Mobile menu toggle
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const menuIcon = menuToggle.querySelector("i");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");

  if (navMenu.classList.contains("active")) {
    menuIcon.classList.remove("ri-menu-line");
    menuIcon.classList.add("ri-close-line");
  } else {
    menuIcon.classList.remove("ri-close-line");
    menuIcon.classList.add("ri-menu-line");
  }
});

// Close menu when clicking on a link
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    menuIcon.classList.remove("ri-close-line");
    menuIcon.classList.add("ri-menu-line");
  });
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
    navMenu.classList.remove("active");
    menuIcon.classList.remove("ri-close-line");
    menuIcon.classList.add("ri-menu-line");
  }
});

// Gmail function with mobile/desktop detection
function openGmail() {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile) {
    // Try to open Gmail App (may prompt user)
    window.location.href = "googlegmail://co?to=sewwandalakshitha28@gmail.com";
    // Fallback to mailto after short delay
    setTimeout(() => {
      window.location.href = "mailto:sewwandalakshitha28@gmail.com";
    }, 1000);
  } else {
    // Open Gmail in web on desktop
    window.open(
      "https://mail.google.com/mail/?view=cm&fs=1&to=sewwandalakshitha28@gmail.com",
      "_blank"
    );
  }
}
