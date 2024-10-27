<script setup>
import '../../assets/css/artikel.css';
import '../../assets/css/style.css';
import '../../assets/css/template.css';
import Modal from "@/components/modal/Modal.vue";
import {onMounted, ref} from "vue";

const token = localStorage.getItem('token');
const posts = ref([]);
const loading = ref(false);

onMounted(async () => {
  try {
    loading.value = true;
    const response = await axios.get(`https://api.annafilah.id/api/getPosts`);

    // Asumsikan `image_paths` adalah bagian dari objek di dalam data
    response.data.forEach(post => {
      let imagePaths = post.image_paths;
      imagePaths = JSON.parse(imagePaths);

      if (Array.isArray(imagePaths)) {
        post.image_urls = imagePaths.map(path => `https://api.annafilah.id${path}`);
      } else {
        post.image_urls = [`https://api.annafilah.id${imagePaths}`];
      }
    });

    posts.value = response.data;
    // console.log(posts.value);
  } catch (error) {
    console.error('Error fetching posts:', error);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <Modal v-if="token!==null"/>

  <div class="c1">
    <h1 class="tit">Galeri Kegiatan</h1>
    <div v-if="loading">
      Loading...
    </div>
    <div class="can" v-else>
      <div class="grid-con">
        <router-link v-for="p in posts.slice().reverse()" :to="{name: 'ShowGaleri', params: { slug: p.slug }}" class="cover">
          <img v-for="(url, index) in p.image_urls.slice(0,1)" :key="index" class="img" :src="url">
<!--          <img class="img" src="" alt="">-->
          <p>{{p.title}}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>