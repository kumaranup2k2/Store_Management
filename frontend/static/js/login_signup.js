// Open modal by ID
function openModal(modalId) {
  document.getElementById(modalId).style.display = "block";
}

// Close modal by ID
function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}

// Switch between login and signup modals
function switchModal(currentModalId, targetModalId) {
  closeModal(currentModalId);
  openModal(targetModalId);
}

// Close modals when clicking outside
window.onclick = function(event) {
  const loginModal = document.getElementById('loginModal');
  const signupModal = document.getElementById('signupModal');

  if (event.target === loginModal) {
    closeModal('loginModal');
  }
  if (event.target === signupModal) {
    closeModal('signupModal');
  }
}

// Optional: Handle social login button clicks
document.addEventListener("DOMContentLoaded", () => {
  const googleBtns = document.querySelectorAll(".google");
  const facebookBtns = document.querySelectorAll(".facebook");
  const twitterBtns = document.querySelectorAll(".twitter");

  googleBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      alert("Redirecting to Google login...");
      // window.location.href = "/auth/google"; // Uncomment when backend ready
    });
  });

  facebookBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      alert("Redirecting to Facebook login...");
    });
  });

  twitterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      alert("Redirecting to X login...");
    });
  });
});

function openModal(id) {
  document.getElementById(id).classList.add('show');
}

function closeModal(id) {
  document.getElementById(id).classList.remove('show');
}

function switchModal(hideId, showId) {
  closeModal(hideId);
  openModal(showId);
}
