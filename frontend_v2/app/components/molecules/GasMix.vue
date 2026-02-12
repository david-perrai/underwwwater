<script setup lang="ts">
const { 
  gasMix, 
  isOxygenDisabled, 
  isNitrogenDisabled, 
  isHeliumDisabled, 
  updateGas 
} = useGasMixBalance();

const { title, subtitle } = useGasMixName(gasMix);
</script>

<template>
  <div :class="['gas-panel']">
    <div class="gas-panel__header">
      <h2 class="gas-panel__title">{{ title }}</h2>
      <p v-if="subtitle" class="gas-panel__subtitle">{{ subtitle }}</p>
    </div>
    
    <div class="gas-panel__grid">
      <!-- Oxygen (O2) -->
      <div :class="['gas-column', { 'gas-column--locked': isOxygenDisabled }]" color="primary">
        <label class="gas-column__label">Oxygen (O2)</label>
        <PVKnob 
          :model-value="gasMix.oxygen" 
          :size="150" 
          :min="0"
          :max="100"
          value-template="{value}%"
          value-color="#00FFEF"
          range-color="rgba(0, 255, 239, 0.1)"
          :readonly="isOxygenDisabled"
          @update:model-value="(v) => updateGas('oxygen', v)"
        />
        <div class="gas-column__controls">
          <PVButton 
            icon="pi pi-minus" 
            text 
            rounded 
            :disabled="isOxygenDisabled || gasMix.oxygen <= 0" 
            @click="updateGas('oxygen', Math.floor(gasMix.oxygen - 1))" 
          />
          <PVInputNumber 
            :model-value="gasMix.oxygen" 
            mode="decimal" 
            suffix="%" 
            class="gas-column__input" 
            input-class="gas-column__input-inner"
            :min="0" 
            :max="100"
            :disabled="isOxygenDisabled"
            @update:model-value="(v) => updateGas('oxygen', v || 0)"
          />
          <PVButton 
            icon="pi pi-plus" 
            text 
            rounded 
            :disabled="isOxygenDisabled || gasMix.oxygen >= 100" 
            @click="updateGas('oxygen', Math.ceil(gasMix.oxygen + 1))" 
          />
        </div>
        <div class="gas-column__lock">
          <PVCheckbox v-model="isOxygenDisabled" :binary="true" input-id="lock-o2" />
          <label for="lock-o2">Locked</label>
        </div>
      </div>

      <!-- Nitrogen (N2) -->
      <div :class="['gas-column', { 'gas-column--locked': isNitrogenDisabled }]" color="secondary">
        <label class="gas-column__label">Nitrogen (N2)</label>
        <PVKnob 
          :model-value="gasMix.nitrogen" 
          :size="150" 
          :min="0"
          :max="100"
          value-template="{value}%"
          value-color="#244cff"
          range-color="rgba(36, 76, 255, 0.1)"
          :readonly="isNitrogenDisabled"
          @update:model-value="(v) => updateGas('nitrogen', v)"
        />
        <div class="gas-column__controls">
          <PVButton 
            icon="pi pi-minus" 
            text 
            rounded 
            :disabled="isNitrogenDisabled || gasMix.nitrogen <= 0" 
            @click="updateGas('nitrogen', Math.floor(gasMix.nitrogen - 1))" 
          />
          <PVInputNumber 
            :model-value="gasMix.nitrogen" 
            mode="decimal" 
            suffix="%" 
            class="gas-column__input" 
            input-class="gas-column__input-inner"
            :min="0" 
            :max="100"
            :disabled="isNitrogenDisabled"
            @update:model-value="(v) => updateGas('nitrogen', v || 0)"
          />
          <PVButton 
            icon="pi pi-plus" 
            text 
            rounded 
            :disabled="isNitrogenDisabled || gasMix.nitrogen >= 100" 
            @click="updateGas('nitrogen', Math.ceil(gasMix.nitrogen + 1))" 
          />
        </div>
        <div class="gas-column__lock">
          <PVCheckbox v-model="isNitrogenDisabled" :binary="true" input-id="lock-n2" />
          <label for="lock-n2">Locked</label>
        </div>
      </div>

      <!-- Helium (He) -->
      <div :class="['gas-column', { 'gas-column--locked': isHeliumDisabled }]" color="warn">
        <label class="gas-column__label">Helium (He)</label>
        <PVKnob 
          :model-value="gasMix.helium" 
          :size="150" 
          :min="0"
          :max="100"
          value-template="{value}%"
          value-color="#FFD600"
          range-color="rgba(255, 214, 0, 0.1)"
          :readonly="isHeliumDisabled"
          @update:model-value="(v) => updateGas('helium', v)"
        />
        <div class="gas-column__controls">
          <PVButton 
            icon="pi pi-minus" 
            text 
            rounded 
            :disabled="isHeliumDisabled || gasMix.helium <= 0" 
            @click="updateGas('helium', Math.floor(gasMix.helium - 1))" 
          />
          <PVInputNumber 
            :model-value="gasMix.helium" 
            mode="decimal" 
            suffix="%" 
            class="gas-column__input" 
            input-class="gas-column__input-inner"
            :min="0" 
            :max="100"
            :disabled="isHeliumDisabled"
            @update:model-value="(v) => updateGas('helium', v || 0)"
          />
          <PVButton 
            icon="pi pi-plus" 
            text 
            rounded 
            :disabled="isHeliumDisabled || gasMix.helium >= 100" 
            @click="updateGas('helium', Math.ceil(gasMix.helium + 1))" 
          />
        </div>
        <div class="gas-column__lock">
          <PVCheckbox v-model="isHeliumDisabled" :binary="true" input-id="lock-he" />
          <label for="lock-he">Locked</label>
        </div>
      </div>
    </div>
  </div>
</template>

