export const useMenuState = () => useState('menu', () => ({
  isOpen: false
}));

export const toggleMenu = () => {
  const menu = useMenuState();
  menu.value.isOpen = !menu.value.isOpen;
};
