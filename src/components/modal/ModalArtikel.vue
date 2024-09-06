<script setup>
import {ref, watch} from "vue";
import {onClickOutside, useMagicKeys} from "@vueuse/core";
import router from "@/router/index.js";
const {escape} = useMagicKeys()

const isModal = ref(false);
const modal = ref(null);

const selectedFile = ref([]);
const token = localStorage.getItem('token');

const judul = ref('');
const kategori = ref('');
const deskripsi = ref('');
const potoDesc = ref('');
const potoSrc = ref('');
const author = ref('');
const handleFileChange = (event) => {
  selectedFile.value = event.target.files[0];
};

watch(escape, (v) =>{
  if (v){
    isModal.value = false;
  }
})

onClickOutside(modal, () => (isModal.value=false));

const submit = async () => {
  const formData = new FormData();

  // Adding each property individually to formData
  formData.append("title", judul.value);
  formData.append("category", kategori.value);
  formData.append("description", deskripsi.value);
  formData.append("image_desc", potoDesc.value);
  formData.append("image_src", potoSrc.value);
  formData.append("image", selectedFile.value);

  try {
    const response = await axios.post("https://api.annafilah.id/api/storeArticle", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`,
      },
    });
    console.log(response.data);
  } catch (error) {
    console.error("There was an error uploading the images!", error.response.data);
  } finally {

    judul.value = '';
    kategori.value = '';
    deskripsi.value = '';
    potoDesc.value = '';
    potoSrc.value = '';
    isModal.value = false;
    await router.push('/read')
  }
};

</script>

<template>
  <button @click="isModal = true">add</button>

  <Teleport to="#modal">
    <Transition name="modal">
      <div class="modal-bg" v-if="isModal">
        <div class="modal" ref="modal">
          <button @click="isModal = false" class="close-btn">X</button>
          <div class="col">
            <label for="">Judul Artikel</label>
            <input type="text" v-model="judul" class="txt" name="title" placeholder="judul artikel">
          </div>

          <div class="col">
            <label for="kategori">Kategori Artikel</label>
            <select id="kategori" class="sel" v-model="kategori">
              <option>Teknologi</option>
              <option>Agama</option>
              <option>Lifestyle</option>
            </select>
          </div>

          <div class="col">
            <label for="">Deskripsi</label>
            <textarea id="form1" v-model="deskripsi" placeholder="deskripsi artikel" class="txt-f"></textarea>
          </div>

          <div class="col">
            <label for="image">Foto max 2MB(tunggal)</label>
            <input type="file" @change="handleFileChange" />
          </div>

          <div class="col">
            <label for="">Deskripsi Foto</label>
            <input type="text" v-model="potoDesc" class="txt" placeholder="deskripsi foto">
          </div>

          <div class="col">
            <label for="">Sumber/Lokasi Foto</label>
            <input type="text" v-model="potoSrc" class="txt" placeholder="sumber foto">
          </div>
          <br>

          <button class="but" @click="submit">
            <h4>Submit</h4>
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-bg{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal{
  position: relative;
//margin-bottom: 10rem;
  background: #FFF;
  padding: 32px;
  border-radius: 1rem;
  box-shadow: 0 10px 5px 2px rgba(0,0,0,0.1);

  .close-btn{
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    cursor: pointer;
  }
}

.sel{
  width: 10rem;
}

.modal-enter-active,
.modal-leave-active{
  transition: all 0.25s ease;
}

.modal-enter-from,
.modal-leave-to{
  opacity: 0;
  transform: scale(1.1);
}

</style>