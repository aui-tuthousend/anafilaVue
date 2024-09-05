<script setup>
import '../../assets/css/artikel.css';
import '../../assets/css/style.css';
import '../../assets/css/template.css';
import ModalArtikel from "@/components/modal/ModalArtikel.vue";
import {onMounted, ref} from "vue";

const token = localStorage.getItem('token');
const artikel = ref([]);
const loading = ref(false);

onMounted(async () => {
  try{
    loading.value = true;
    const response = await axios.get(`http://127.0.0.1:8000/api/getArticles`);
    artikel.value = response.data.map(art => {
      return {
        ...art,
        image_url: `http://127.0.0.1:8000${art.image_path}`
      };
    });
    console.log(artikel.value)
  } catch (error){
    console.error('Error fetching article:', error);
  } finally {
    loading.value = false;
  }

});
</script>

<template>
  <ModalArtikel v-if="token!==null"/>

  <div class="c1" >
    <h1 class="tit">Artikel Terbaru Kami</h1>
    <div v-if="loading">
      Loading...
    </div>
    <div class="can" v-else>
      <div class="grid-con" >
        <router-link v-for="a in artikel.slice().reverse()" :to="{name: 'ShowArticle', params: { slug: a.slug }}" class="cover">
          <img class="img" :src="a.image_url" :alt="a.image_desc">
<!--          <img class="img" src="../../images/bsis.jpg" alt="">-->
          <p>{{a.title}}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>