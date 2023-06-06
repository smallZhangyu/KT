import { ref, computed } from 'vue';

function useCounter(data) {
  let count = ref(data);
  let doubleCount = computed(() => count.value * 2);

  return {
    count,
    doubleCount,
  };
}

export default useCounter;
