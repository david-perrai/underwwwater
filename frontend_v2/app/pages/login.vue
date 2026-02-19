<script setup lang="ts">
definePageMeta({
  layout: "landing",
});

const { t } = useI18n();

useHead({
  title: t('pages.login.title'),
  meta: [
    { name: 'description', content: t('pages.login.description') }
  ]
});
</script>

<template>
  <div class="auth-page">
    <div class="auth-page__overlay"></div>
    
    <div class="auth-page__container">

      <!-- Login Section -->
      <section class="auth-page__section auth-page__section--login">
        <div class="auth-page__card">
          <FormLogin />
        </div>
      </section>
      <!-- Divider -->
      <div class="auth-page__divider">
        <span class="auth-page__divider-text">{{ $t('pages.login.divider') }}</span>
      </div>

      <!-- Signup Section -->
      <section class="auth-page__section auth-page__section--signup">
        <div class="auth-page__card">
          <FormSignup />
        </div>
      </section>
     
    </div>

    <!-- Back to home link -->
    <div class="auth-page__back">
      <NuxtLink to="/" class="auth-page__back-link">
        <i class="pi pi-arrow-left"></i>
        {{ $t('pages.login.backToHome') }}
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="scss">
@use '@/assets/scss/variables' as *;

.auth-page {
  position: relative;
  min-height: 100vh;
  width: 100%;
  background-image: url('/bg2.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 1rem;

  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      rgba($color-marine, 0.85) 0%,
      rgba($color-marine, 0.9) 50%,
      rgba($color-marine, 0.95) 100%
    );
    z-index: 1;
  }

  &__container {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 600px;
    animation: fadeUp 0.8s ease-out;
  }

  &__section {
    margin-bottom: 2rem;
  }

  &__card {
    background: rgba($color-marine, 0.6);
    backdrop-filter: blur(20px);
    border: 1px solid rgba($color-turquoise, 0.2);
    border-radius: 12px;
    padding-bottom: 2rem;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    transition: all 0.15s ease;

    &:hover {
      border-color: rgba($color-turquoise, 0.4);
      box-shadow: 0 12px 48px rgba(0, 0, 0, 0.4);
    }
  }

  &__divider {
    position: relative;
    text-align: center;
    margin: 3rem 0;

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(
        to right,
        transparent,
        rgba($color-white, 0.2) 20%,
        rgba($color-white, 0.2) 80%,
        transparent
      );
    }

    &-text {
      position: relative;
      display: inline-block;
      padding: 0 1.5rem;
      background: rgba($color-marine, 0.8);
      font-family: $font-barlow;
      font-size: 0.875rem;
      font-weight: 600;
      color: rgba($color-white, 0.6);
      text-transform: uppercase;
      letter-spacing: 1px;
    }
  }

  &__back {
    position: fixed;
    top: 2rem;
    left: 2rem;
    z-index: 10;

    @media (max-width: 640px) {
      top: 1rem;
      left: 1rem;
    }
  }

  &__back-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-family: $font-barlow;
    font-size: 0.875rem;
    font-weight: 600;
    color: rgba($color-white, 0.8);
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    transition: all 0.15s ease;
    padding: 0.75rem 1.25rem;
    background: rgba($color-marine, 0.5);
    backdrop-filter: blur(10px);
    border: 1px solid rgba($color-white, 0.1);
    border-radius: 4px;

    &:hover {
      color: $color-turquoise;
      border-color: rgba($color-turquoise, 0.3);
      transform: translateX(-4px);
    }

    i {
      font-size: 1rem;
    }
  }
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>