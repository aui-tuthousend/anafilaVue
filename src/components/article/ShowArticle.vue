<script setup>
import '../../assets/css/viewartikel.css';
import '../../assets/css/style.css';
import '../../assets/css/template.css';
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";

const route = useRoute();
const slug = ref(route.params.slug);

const artikel = ref(null);
const loading = ref(false);

onMounted(async () => {
  try {
    loading.value = true;
    let response = await fetch(`https://api.annafilah.id/api/showArticle/${slug.value}`);
    artikel.value = await response.json();
    artikel.value.image_url = `https://api.annafilah.id${artikel.value.image_path}`;
    console.log(artikel.value)
  } catch (error) {
    console.error('Error fetching article:', error);
  }finally {
    loading.value = false;
  }
})


</script>

<template>
  <div v-if="loading">
    Loading...
  </div>
  <div class="A1 col" v-if="artikel">
    <div>
      <p >{{artikel.category}}</p>
      <h1 class="tit">{{ artikel.title }}</h1>
      <br/>
      <img class="img gmbar" :src="artikel.image_url" alt="Article Image">
      <h4>oleh: author</h4>
      <p style="margin-top: 5px;">tanggal</p>
      <p v-html="artikel.description" class="txt2"></p>
    </div>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<style scoped>

</style>