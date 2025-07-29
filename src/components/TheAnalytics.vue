<script setup>
import { onMounted } from 'vue';
import { createPieChart } from '@/utils/chartUtils';


onMounted(async () => {
  await createPieChart();
});


</script>

<template>
  <section class="analytics">
    <div class="chart card">
      <h3>Books by Genre</h3>
      <canvas id="analytics-chart" class="chart"></canvas>
    </div>
    <!--
        <div class="chart card">
          <h3>Pages Read Over Time</h3>
          <img src="../assets/pie-chart.png" alt="Pages Chart">
        </div>
        -->

  </section>
</template>


<style>
.chart {
  width: 25rem;
  height: 25rem;

}
</style>