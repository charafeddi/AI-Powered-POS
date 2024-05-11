<template lang="">
    <div class="loader">
        <div class='spinner-grow text-primary' role='status'>
            <span class='sr-only'>Loading...</span>
        </div>
    </div>
</template>
<script>
export default {
    name:'LoadEvent',
    mounted() {
      // Ensuring the entire view is rendered and loaded
      this.$nextTick(() => {
        // Adding a delay to simulate the timeout
        setTimeout(() => {
          document.body.classList.add('no-loader');
        }, 1000);
      });
  }
}
</script>
<style lang="">
    
</style>