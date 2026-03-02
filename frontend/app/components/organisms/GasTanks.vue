<script setup lang="ts">
import type { GasMix } from '~/types/GasMix';

/** Types */
interface TankData {
  id: string;
  pressureStart: number;
  pressureEnd: number;
  gasMix: GasMix;
  presetVersion: number;
}

/** Presets */
const PRESETS: { label: string; mix: GasMix }[] = [
  { label: 'Air',       mix: { oxygen: 21, nitrogen: 79, helium: 0 } },
  { label: 'Nitrox 32', mix: { oxygen: 32, nitrogen: 68, helium: 0 } },
  { label: 'Nitrox 36', mix: { oxygen: 36, nitrogen: 64, helium: 0 } },
];

/** Functions */
function createTank(mix: GasMix): TankData {
  return {
    id: crypto.randomUUID(),
    pressureStart: 200,
    pressureEnd: 50,
    gasMix: { ...mix },
    presetVersion: 0,
  };
}

/** Datas */
const tanks = ref<TankData[]>([createTank(PRESETS[0]!.mix)]);
const activeTankId = ref<string | null>(tanks.value[0]?.id ?? null);
const menuRefs = ref<Record<string, InstanceType<typeof import('primevue/menu').default> | null>>({});

/** Actions */
const toggleMenu = (event: Event, tankId: string) => {
  menuRefs.value[tankId]?.toggle(event);
};

const togglePanel = (tankId: string) => {
  activeTankId.value = activeTankId.value === tankId ? null : tankId;
};

const getPresetItems = (tank: TankData) =>
  PRESETS.map(preset => ({
    label: preset.label,
    command: () => {
      tank.gasMix = { ...preset.mix };
      tank.presetVersion++;
    },
  }));

const addTank = () => {
  if (tanks.value.length < 4) {
    const newTank = createTank(PRESETS[0]!.mix);
    tanks.value.push(newTank);
    activeTankId.value = newTank.id; // ← ouvre le nouveau, ferme les autres
  }
};

const removeTank = (id: string) => {
  if (tanks.value.length > 1) {
    tanks.value = tanks.value.filter(t => t.id !== id);
  }
};

defineExpose({ tanks });
</script>

<template>
  <PrimeFieldset legend="Tanks" data-id="gas-tanks">

    <PrimePanel
      v-for="(tank, index) in tanks"
      :key="tank.id"
      toggleable
      :collapsed="activeTankId !== tank.id"
      @toggle="togglePanel(tank.id)"
    >
      <!-- Header: gas name -->
      <template #header>
        <span class="font-semibold">
          {{ useGasMixName(tank.gasMix).title.value }}
          <span v-if="useGasMixName(tank.gasMix).subtitle.value" class="opacity-60 ml-1 font-normal text-sm">
            {{ useGasMixName(tank.gasMix).subtitle.value }}
          </span>
        </span>
      </template>

      <!-- Icons: preset switcher + delete -->
      <template #icons>
        <!-- Delete (disabled if only one tank remains) -->
        <PrimeButton
          icon="pi pi-trash"
          severity="danger"
          rounded
          text
          :disabled="tanks.length === 1"
          @click="removeTank(tank.id)"
        />
        <!-- Preset quick-switch -->
        <PrimeButton
          icon="pi pi-cog"
          severity="contrast"
          rounded
          text
          @click="toggleMenu($event, tank.id)"
        />
        <PrimeMenu
          :ref="el => menuRefs[tank.id] = el"
          :model="getPresetItems(tank)"
          popup
        />
      </template>

      <!-- Body: GasMix form -->
      <GasMix
        :key="`${tank.id}-${tank.presetVersion}`"
        v-model="tanks[index]!"
      />
    </PrimePanel>

    <!-- Add tank button (hidden when 4 tanks reached) -->
    <div class="flex justify-end">
      <PrimeButton
        v-if="tanks.length < 4"
        :label="$t('dive.gas.add')"
        icon="pi pi-plus"
        severity="secondary"
        outlined
      @click="addTank"
    />
    </div>
  </PrimeFieldset>
</template>