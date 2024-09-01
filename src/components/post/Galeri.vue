<script setup>
import '../../assets/css/artikel.css';
import '../../assets/css/style.css';
import '../../assets/css/template.css';
import Modal from "@/components/modal/Modal.vue";

</script>

<template>
  <Modal/>
  <div class="c1">
    <h1 class="tit">Galeri Kegiatan</h1>
    <div class="can">
      <div class="grid-con">
        <router-link to="/galeri/slug" class="cover">
          <img class="img" src="" alt="">
          <p>desc</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>