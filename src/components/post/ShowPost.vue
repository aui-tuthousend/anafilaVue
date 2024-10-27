<script setup>
import '../../assets/css/viewartikel.css';
import '../../assets/css/style.css';
import '../../assets/css/template.css';
import { useRoute, useRouter } from "vue-router";
import {onMounted, ref, watch} from "vue";


const route = useRoute();
const router = useRouter();

function handleRoute(slug) {
  router.push({ name: 'ShowGaleri', params: { slug } });
}

const slug = ref(route.params.slug);
const posts = ref([]);
const post = ref(null);
const loading = ref(false);

async function fetchData(slug) {
  loading.value = true;
  try {
    const postResponse = await axios.get(`https://api.annafilah.id/api/showPost/${slug}`);
    let imagePaths = postResponse.data.image_paths;
    imagePaths = JSON.parse(imagePaths);
    postResponse.data.image_urls = Array.isArray(imagePaths)
        ? imagePaths.map(path => `https://api.annafilah.id${path}`)
        : [`https://api.annafilah.id${imagePaths}`];
    post.value = postResponse.data;

    const postsResponse = await axios.get(`https://api.annafilah.id/api/getPosts`);
    postsResponse.data.forEach(item => {
      let imgPaths = item.image_paths;
      if (imgPaths) {
        imgPaths = JSON.parse(imgPaths);
        item.image_urls = Array.isArray(imgPaths)
            ? imgPaths.map(path => `https://api.annafilah.id${path}`)
            : [`https://api.annafilah.id${imgPaths}`];
      }
    });
    posts.value = postsResponse.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    loading.value = false;
  }
}

onMounted(() => fetchData(slug.value));

watch(() => route.params.slug, async (newSlug) => {
  slug.value = newSlug;
  await fetchData(newSlug); // Buat fungsi fetchData untuk ambil data berdasarkan slug
});
</script>

<template>
<!--  <div v-if="loading">-->
<!--    Loading...-->
<!--  </div>-->
  <div class="A1" v-if="post">
    <div class="A1-1">
      <h1 class="tit">{{ post.title }}</h1>
      <br />
      <div class="koper">
        <div class="scroll">
          <img v-for="i in post.image_urls" :key="i" :src="i" alt="" class="img gmbar" />
        </div>
      </div>
      <p style="margin-bottom: 1rem;">📷 {{ post.image_src }} </p>
      <h4>oleh: {{ post.author }}</h4>
      <p style="margin-top: 5px;">{{ new Date(post.created_at).toLocaleString('en-CA', { hour12: false }) }}</p>
      <p v-html="post.description" class="txt2"></p>
    </div>
    <div class="A1-2">
      <h1>Kegiatan Lain Kami</h1>
      <div class="scroll-side">
        <div v-for="p in posts.slice().reverse()" :key="p.slug" class="card">
          <img :src="p.image_urls[0]" alt="" class="img pic" @click="handleRoute(p.slug)" />
          <p>{{ p.title }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
