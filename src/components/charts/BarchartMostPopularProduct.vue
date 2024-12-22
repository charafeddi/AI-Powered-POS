<template>
    <div>
      <Bar v-if="chartData" :chart-data="chartData" :options="chartOptions" />
    </div>
  </template>
  
  <script>
  import { Bar } from 'vue-chartjs';
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
  import { ref, onMounted } from 'vue';
  import { useStore } from 'vuex';
  
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
  
  export default {
    name: 'BarPlotForPopularProducts',
    components: {
      Bar,
    },  
    setup() {
      const store = useStore();
      const user = ref(null);
      const chartData = ref(null);
      const chartOptions = ref({
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Product Code',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Rating',
            },
          },
        },
      });
  
      const fetch10MostpopularProduct = async () => {
      try {
        user.value = store.getters['auth/user'];
        if (!user.value) {
          await store.dispatch('auth/attempt');
          user.value = store.getters['auth/user'];
        }

        if (user.value) {
          await store.dispatch('analytics/Import10mostPopularProduct', user.value.id );
          const data = store.getters['analytics/get10MostPopularProduct'];
          console.log(data.data);
            chartData.value = {
              labels: data.data.map((product) => product.product_code),
              datasets: [
                {
                  label: 'Rating',
                  backgroundColor: '#42A5F5',
                  data: data.map((product) => product.total_quantity),
                },
              ],
            };
            console.log('am in');

          console.log('chart data:', chartData.value);  // Ensure data is set correctly
        }
      } catch (error) {
        console.error('Error fetching peak sales hours:', error);
      }
    };
  
      onMounted(fetch10MostpopularProduct);
  
      return {
        chartData,
        chartOptions,
      };
    },
  };
  </script>
  