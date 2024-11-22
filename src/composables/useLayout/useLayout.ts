import { reactive } from "vue";

export function useLayout() {
  const layout = reactive({
    header: {
      height: "",
    },
    leftDrawer: {
      isVisible: true,
      isFixed: false,
      width: "",
    },
  });
  return { layout };
}
