<script setup lang="ts">
import type { GasMix } from '~/types/GasMix';

/** Types */
interface TankData {
  id: string; // unique ID for UI tracking
  pressureStart: number;
  pressureEnd: number;
  gasMix: GasMix;
}

/** State */
const tanks = ref<TankData[]>([]);
const isAddingTank = ref(false);
const editingTankId = ref<string | null>(null);

/** SplitButton Items */
const addTankItems = [
  {
    label: 'Air',
    command: () => {
      addPresetTank({ oxygen: 21, nitrogen: 79, helium: 0 });
    }
  },
  {
    label: 'Nitrox 32',
    command: () => {
      addPresetTank({ oxygen: 32, nitrogen: 68, helium: 0 });
    }
  },
  {
    label: 'Nitrox 36',
    command: () => {
      addPresetTank({ oxygen: 36, nitrogen: 64, helium: 0 });
    }
  },
];

/** Functions */
const addPresetTank = (mix: GasMix) => {
  tanks.value.push({
    id: crypto.randomUUID(),
    pressureStart: 200,
    pressureEnd: 50,
    gasMix: mix
  });
};

const openAddTankForm = () => {
  isAddingTank.value = true;
  editingTankId.value = null;
};

const handleSaveTank = (data: { pressureStart: number; pressureEnd: number; gasMix: GasMix }) => {
  if (editingTankId.value) {
    // Update existing
    const idx = tanks.value.findIndex(t => t.id === editingTankId.value);
    if (idx !== -1) {
      tanks.value[idx] = { ...tanks.value[idx], ...data };
    }
    editingTankId.value = null;
  } else {
    // Add new
    tanks.value.push({
      id: crypto.randomUUID(),
      ...data
    });
    isAddingTank.value = false;
  }
};

const editTank = (tank: TankData) => {
  editingTankId.value = tank.id;
  isAddingTank.value = false; // Ensure we're not in add mode
};

const removeTank = (id: string) => {
  tanks.value = tanks.value.filter(t => t.id !== id);
  if (editingTankId.value === id) {
    editingTankId.value = null;
  }
};

const getTankItems = (tank: TankData) => [
  {
    label: 'Remove',
    icon: 'pi pi-trash',
    command: () => removeTank(tank.id)
  }
];

// Expose tanks to parent
defineExpose({
  tanks
});
</script>

<template>
  <div :class="['gas-tanks']" :data-id="'gas-tanks'">
    <!-- List of Tanks -->
    <div v-if="tanks.length > 0" class="gas-tanks__list mb-4 flex flex-wrap gap-2">
      <div 
        v-for="tank in tanks" 
        :key="tank.id" 
        class="gas-tanks__item"
      >
        <!-- Editor Mode for this tank -->
        <div v-if="editingTankId === tank.id" class="w-full">
          <GasMix
            :initial-pressure-start="tank.pressureStart"
            :initial-pressure-end="tank.pressureEnd"
            :initial-mix="tank.gasMix"
            @save="handleSaveTank"
          />
        </div>

        <!-- Button Mode -->
        <PrimeSplitButton 
          v-else
          severity="secondary" 
          outlined 
          size="small"
          class="flex items-center"
          @click="editTank(tank)"
          :model="getTankItems(tank)"
        >
          <div class="flex items-center gap-2">
            <i class="pi pi-eject rotate-90"></i>
            <span>
              {{ useGasMixName(tank.gasMix).title.value }}
              <span v-if="useGasMixName(tank.gasMix).subtitle.value" class="opacity-70 ml-1">
                {{ useGasMixName(tank.gasMix).subtitle.value }}
              </span>
            </span>
          </div>
        </PrimeSplitButton>
      </div>
    </div>

    <!-- Add Tank Section -->
    <div v-if="isAddingTank" class="gas-tanks__form mb-4">
       <GasMix
          :initial-pressure-start="200"
          :initial-pressure-end="50"
          :initial-mix="{ oxygen: 21, nitrogen: 79, helium: 0 }"
          @save="handleSaveTank"
        />
    </div>

    <!-- Add Button (Split) -->
    <div v-if="!isAddingTank && !editingTankId" class="gas-tanks__actions">
      <PrimeSplitButton 
        :label="$t('dive.gas.add')" 
        icon="pi pi-plus" 
        :model="addTankItems" 
        @click="openAddTankForm"
        severity="secondary"
        outlined
      />
    </div>
  </div>
</template>
