document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("Menu").style.display = "none";
  window.onscroll = () => {
    if (document.getElementById("2").className === "nav-link active") {
      document.getElementById("About_me").style.animationPlayState = "running";
    }
    if (window.scrollY >= 33) {
      document.getElementById("Menu").style.display = "block";
    } else {
      document.getElementById("Menu").style.display = "none";
    }
  };
});
