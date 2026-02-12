<script setup lang="ts">
const { 
  gasMix, 
  isOxygenDisabled, 
  isNitrogenDisabled, 
  isHeliumDisabled, 
  updateGas 
} = useGasMixBalance();

const { title, subtitle, isBreathable } = useGasMixName(gasMix);
</script>

<template>
  <div :class="['gas-panel']">
    <div class="gas-panel__header">
      <strong class="gas-panel__title">
        {{ title }} 
        <span v-if="subtitle">{{ subtitle }}</span>
      </strong>
    </div>
    
    <div class="gas-panel__grid">
      <GasControl
        id="o2"
        label="Oxygen (O2)"
        :model-value="gasMix.oxygen"
        v-model:locked="isOxygenDisabled"
        color="primary"
        @update:model-value="(v) => updateGas('oxygen', v)"
      />

      <GasControl
        id="n2"
        label="Nitrogen (N2)"
        :model-value="gasMix.nitrogen"
        v-model:locked="isNitrogenDisabled"
        color="secondary"
        @update:model-value="(v) => updateGas('nitrogen', v)"
      />

      <GasControl
        id="he"
        label="Helium (He)"
        :model-value="gasMix.helium"
        v-model:locked="isHeliumDisabled"
        color="warn"
        @update:model-value="(v) => updateGas('helium', v)"
      />
    </div>
  </div>
</template>


