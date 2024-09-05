<script setup>
import '../../assets/css/viewartikel.css';
import '../../assets/css/style.css';
import '../../assets/css/template.css';
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";

const route = useRoute();
const slug = ref(route.params.slug);

const post = ref(null);
const loading = ref(false);

onMounted(async () => {
  try {
    loading.value = true;
    const response = await axios.get(`http://127.0.0.1:8000/api/showPost/${slug.value}`);

    let imagePaths = response.data.image_paths;
    imagePaths = JSON.parse(imagePaths);
    if (Array.isArray(imagePaths)) {
      response.data.image_urls = imagePaths.map(path => `http://127.0.0.1:8000${path}`);
    } else {
      response.data.image_urls = [`http://127.0.0.1:8000${imagePaths}`];
    }

    post.value = response.data;


    console.log(post.value)
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
  <div class="A1 col" v-if="post">
    <div>
      <h1 class="tit">{{post.title}}</h1>
      <br>
      <div class="koper">
        <div class="scroll">
          <img v-for="i in post.image_urls" :src="i" alt="" class="img gmbar">
        </div>
      </div>
      <p style="margin-bottom: 1rem;">📷{{post.image_src}} </p>
      <h4>oleh: {{post.author}} </h4>
      <p style="margin-top: 5px;"> {{ new Date(post.created_at).toLocaleString('en-CA', { hour12: false }) }}</p>
      <p v-html="post.description" class="txt2"></p>
    </div>
  </div>
</template>

<style scoped>

</style>