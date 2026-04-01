<script setup lang="ts">
/** Datas */
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="landing-footer">
    <div class="container">
      <div class="landing-footer__content">
        <div class="landing-footer__brand">
          <h3 class="logo-text">Underwwwater</h3>
          <p class="tagline">{{ $t("landing.footer.tagline") }}</p>
        </div>

        <div class="landing-footer__links">
          <a href="#" class="footer-link">{{ $t("landing.footer.privacy") }}</a>
          <a href="#" class="footer-link">{{ $t("landing.footer.terms") }}</a>
          <a href="#" class="footer-link">{{ $t("landing.footer.contact") }}</a>
        </div>

        <div class="landing-footer__social">
          <a href="#" class="social-icon"><i class="pi pi-twitter"></i></a>
          <a href="#" class="social-icon"><i class="pi pi-instagram"></i></a>
          <a href="#" class="social-icon"><i class="pi pi-github"></i></a>
        </div>
      </div>

      <div class="landing-footer__bottom">
        <p>
          &copy; {{ currentYear }} Underwwwater.
          {{ $t("landing.footer.copyright") }}
        </p>
      </div>
    </div>
  </footer>
</template>

<style lang="scss">
.landing-footer {
  background-color: #050a20;
  color: #ffffff;
  padding: 3rem 0 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);

  &__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 2rem;
    margin-bottom: 2rem;
  }

  &__brand {
    .logo-text {
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      background: linear-gradient(to right, #00ffef, #244cff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .tagline {
      font-size: 0.9rem;
      color: rgba(#ffffff, 0.6);
    }
  }

  &__links {
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;

    .footer-link {
      color: rgba(#ffffff, 0.7);
      text-decoration: none;
      font-size: 0.95rem;
      transition: color 0.3s ease;

      &:hover {
        color: #00ffef;
      }
    }
  }

  &__social {
    display: flex;
    gap: 1rem;

    .social-icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.05);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      text-decoration: none;
      transition: all 0.3s ease;

      &:hover {
        background: #00ffef;
        color: #050a20;
        transform: translateY(-5px);
      }
    }
  }

  &__bottom {
    text-align: center;
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.03);
    font-size: 0.85rem;
    color: rgba(#ffffff, 0.5);
  }
}
</style>
