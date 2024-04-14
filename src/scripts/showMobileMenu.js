function showMobileMenu() {
    const body = document.body;
    const modal = document.getElementById('fullScreenMenu');
    if (modal.classList.contains('showMenu')) {
        body.style.overflow = 'auto';
      } else {
        body.style.overflow = 'hidden';
      }
    document.getElementById("fullScreenMenu").classList.toggle("showMenu");
}