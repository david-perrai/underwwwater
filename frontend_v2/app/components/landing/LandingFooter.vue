<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="landing-footer">
    <div class="container">
      <div class="landing-footer__content">
        <div class="landing-footer__brand">
          <h3 class="logo-text">Underwater</h3>
          <p class="tagline">Explore the deep.</p>
        </div>
        
        <div class="landing-footer__links">
          <a href="#" class="footer-link">Privacy</a>
          <a href="#" class="footer-link">Terms</a>
          <a href="#" class="footer-link">Contact</a>
        </div>
        
        <div class="landing-footer__social">
          <a href="#" class="social-icon"><i class="pi pi-twitter"></i></a>
          <a href="#" class="social-icon"><i class="pi pi-instagram"></i></a>
          <a href="#" class="social-icon"><i class="pi pi-github"></i></a>
        </div>
      </div>
      
      <div class="landing-footer__bottom">
        <p>&copy; {{ currentYear }} Underwater. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

