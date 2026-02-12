<script setup lang="ts">
/** Props */

/** Datas */

/** Stores and Composables */

/** Computeds */

/** Functions */

/** Lifecyle Hooks */
</script>

<template>
  <div :class="['form', 'form-dive']" :data-id="'form-dive'">
    <div :class="['form__header']">
      <h2 :class="['form__title']">{{ $t('auth.login.title') }}</h2>
      <p :class="['form__subtitle']">{{ $t('auth.login.subtitle') }}</p>
    </div>

    <form @submit.prevent="handleSubmit" :class="['form__inner']">
  

      <div :class="['field']">
				<GasPanel />
      </div>

      <div :class="['form__actions']">
        <Button 
          type="submit" 
          :label="$t('auth.login.submit')" 
          :size="'large'" 
          :severity="'primary'"
          :outlined="true"
          :is-important="true"
        />
      </div>

      <div :class="['form__footer']">
      </div>
    </form>
  </div>
</template>
