<script setup>
import {ref, watch} from "vue";
import {onClickOutside, useMagicKeys} from "@vueuse/core";
const {escape} = useMagicKeys()


const isModal = ref(false);
const modal = ref(null);

const selectedFiles = ref([]);

  const judul = ref('');
  const deskripsi = ref('');
  const potoDesc = ref('');
  const potoSrc = ref('');
  const author = ref('');

const handleFileChange = (event) => {
  selectedFiles.value = event.target.files;
};

watch(escape, (v) =>{
  if (v){
    isModal.value = false;
  }
})

onClickOutside(modal, () => (isModal.value=false));

const submit = async () => {
  const formData = new FormData();
  const data = {title: judul.value, desc: deskripsi.value, potoDesc: potoDesc.value, potoSrc: potoSrc.value, author: author.value};

  for (let i = 0; i < selectedFiles.value.length; i++) {
    formData.append("images[]", selectedFiles.value[i]);
  }

  try {
    const response = await axios.post("/api/uploadPost", {
      pics: formData,
      data: data
    }, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response.data);
  } catch (error) {
    console.error("There was an error uploading the images!", error);
  }
}
</script>

<template>
  <button @click="isModal = true">add</button>

  <Teleport to="#modal">
    <Transition name="modal">
      <div class="modal-bg" v-if="isModal">
        <div class="modal" ref="modal">
          <button @click="isModal = false" class="close-btn">x</button>
          <div class="col">
            <label for="">Judul Kegiatan</label>
            <input type="text" v-model="judul" class="txt" name="title" placeholder="judul kegiatan">
          </div>

          <div class="col">
            <label for="">Deskripsi</label>
            <textarea id="form1" v-model="deskripsi" placeholder="deskripsi kegiatan" class="txt-f"></textarea>
          </div>

          <div class="col">
            <label for="image">Foto-foto (multiple)</label>
            <input type="file" multiple @change="handleFileChange" />
          </div>

          <div class="col">
            <label for="">Deskripsi Foto</label>
            <input type="text" v-model="potoDesc" class="txt" placeholder="deskripsi foto">
          </div>

          <div class="col">
            <label for="">Sumber/Lokasi Foto</label>
            <input type="text" v-model="potoSrc" class="txt" placeholder="sumber foto">
          </div>

          <div class="col">
            <label for="">Author</label>
            <input type="text" v-model="author" class="txt" placeholder="author">
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