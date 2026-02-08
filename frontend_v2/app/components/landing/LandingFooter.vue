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

<style lang="scss" scoped>
.landing-footer {
  background-color: darken($deep-navy, 2%);
  padding: 4rem 1rem 2rem;
  color: $stone-gray;
  border-top: 1px solid rgba($white, 0.05);

  .container {
    max-width: 1200px;
    margin: 0 auto;
  }

  &__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 2rem;
    margin-bottom: 3rem;
    
    @media (max-width: 768px) {
      flex-direction: column;
      text-align: center;
    }
  }

  &__brand {
    .logo-text {
      font-family: $font-playfair;
      font-size: 1.8rem;
      color: $white;
      margin-bottom: 0.25rem;
    }
    
    .tagline {
      font-family: $font-roboto;
      font-size: 0.9rem;
      color: $turquoise;
    }
  }

  &__links {
    display: flex;
    gap: 2rem;
    
    .footer-link {
      color: $stone-gray;
      text-decoration: none;
      transition: color 0.2s;
      
      &:hover {
        color: $turquoise;
      }
    }
  }

  &__social {
    display: flex;
    gap: 1rem;
    
    .social-icon {
      color: $white;
      font-size: 1.25rem;
      transition: all 0.2s;
      opacity: 0.7;
      
      &:hover {
        opacity: 1;
        color: $turquoise;
      }
    }
  }

  &__bottom {
    text-align: center;
    padding-top: 2rem;
    border-top: 1px solid rgba($white, 0.05);
    font-size: 0.85rem;
    opacity: 0.5;
  }
}
</style>
