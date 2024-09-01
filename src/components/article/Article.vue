<script setup>
import '../../assets/css/artikel.css';
import '../../assets/css/style.css';
import '../../assets/css/template.css';
import ModalArtikel from "@/components/modal/ModalArtikel.vue";
</script>

<template>
  <ModalArtikel/>

  <div class="c1">
    <h1 class="tit">Artikel Kami</h1>
    <div class="can">
      <div class="grid-con">
        <router-link to="/read/slug" class="cover">
          <img class="img" src="../../images/bsis.jpg" alt="">
          <p>desc</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>