<template>
  <div>
    <bar v-if="chartData" :data="chartData" :options="chartOptions"></bar>
    <div v-else>Loading...</div>
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
  name: 'PeakSalesHoursChart',
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
            text: 'Hour of the Day',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Total Sales ($)',
          },
        },
      },
    });

    const fetchPeakSalesHours = async () => {
      try {
        user.value = store.getters['auth/user'];
        if (!user.value) {
          await store.dispatch('auth/attempt');
          user.value = store.getters['auth/user'];
        }
        if (user.value) {
          await store.dispatch('analytics/ImportPeakSalesHours', { period: 'month', id: user.value.id });
          const data = store.getters['analytics/getPeakSalesHours'].data;
          chartData.value = {
            labels: data.map((sale) => `${sale.hour}:00`),
            datasets: [
              {
                label: 'Total Sales',
                backgroundColor: '#42A5F5',
                data: data.map((sale) => sale.total_sales),
              },
            ],
          };
          console.log('chart data:', chartData.value);  // Ensure data is set correctly
        }
      } catch (error) {
        console.error('Error fetching peak sales hours:', error);
      }
    };

    onMounted(fetchPeakSalesHours);

    return {
      chartData,
      chartOptions,
    };
  },
};

</script>