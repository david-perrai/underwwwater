import { defineStore } from 'pinia';

/**
 * Navigation Store
 * @description Add your store description here
 */
export const useNavigationStore = defineStore('navigation', () => {
  /** State */
  const isModalDiveVisible = ref(false);
  const isMenuOpened = ref(false);

  /** Getters */

  /** Actions */
  const toggleModalDive = () => {
    isModalDiveVisible.value = !isModalDiveVisible.value;
  };

  const toggleMenu = () => {
    isMenuOpened.value = !isMenuOpened.value;
  };

  return {
    isModalDiveVisible,
    isMenuOpened,
    toggleModalDive,
    toggleMenu,
  };
});
