<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="landing-footer">
    <div class="container">
      <div class="landing-footer__content">
         <div class="landing-footer__brand">
           <h3 class="logo-text">Underwater</h3>
           <p class="tagline">{{ $t('landing.footer.tagline') }}</p>
         </div>
        
         <div class="landing-footer__links">
           <a href="#" class="footer-link">{{ $t('landing.footer.privacy') }}</a>
           <a href="#" class="footer-link">{{ $t('landing.footer.terms') }}</a>
           <a href="#" class="footer-link">{{ $t('landing.footer.contact') }}</a>
         </div>
        
        <div class="landing-footer__social">
          <a href="#" class="social-icon"><i class="pi pi-twitter"></i></a>
          <a href="#" class="social-icon"><i class="pi pi-instagram"></i></a>
          <a href="#" class="social-icon"><i class="pi pi-github"></i></a>
        </div>
      </div>
      
       <div class="landing-footer__bottom">
         <p>&copy; {{ currentYear }} Underwater. {{ $t('landing.footer.copyright') }}</p>
       </div>
    </div>
  </footer>
</template>

