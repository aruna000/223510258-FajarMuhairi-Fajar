<template>
  <div class="albums-container">
    <h2>Albums</h2>
    <br />
    <select v-model="selectedAlbumId" @change="fetchPhotos">
      <option value="" disabled>Pilih Album</option>
      <option v-for="album in albums" :key="album.id" :value="album.id">
        {{ album.title }}
      </option>
    </select>
    <div v-if="loading">Loading...</div>
    <div v-else-if="selectedAlbumId">
      <h3>Foto Dalam Album</h3>
      <ul class="photo-list">
        <li
          v-for="photo in photos"
          :key="photo.id"
          class="photo-item"
          @click="showPhoto(photo)"
        >
          <img :src="photo.thumbnailUrl" :alt="photo.title" />
        </li>
      </ul>
    </div>
    <div v-else>
      <p>Pilih album untuk melihat foto.</p>
    </div>
    <div v-if="selectedPhoto" class="modal" @click="selectedPhoto = null">
      <img :src="selectedPhoto.url" :alt="selectedPhoto.title" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Albums",
  props: {
    albums: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selectedAlbumId: null,
      photos: [],
      loading: false,
      selectedPhoto: null,
    };
  },
  methods: {
    async fetchPhotos() {
      if (!this.selectedAlbumId) return;
      this.loading = true;
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/albums/${this.selectedAlbumId}/photos`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        this.photos = await response.json();
      } catch (error) {
        console.error("Error fetching photos:", error);
      } finally {
        this.loading = false;
      }
    },
    showPhoto(photo) {
      this.selectedPhoto = photo;
    },
  },
};
</script>

<style scoped>
.albums-container {
  padding: 20px;
  margin: 20px auto;
  max-width: 480px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 5px;
}

select {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.photo-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.photo-item {
  cursor: pointer;
  transition: transform 0.2s;
}

.photo-item:hover {
  transform: scale(1.05);
}

img {
  max-width: 150px;
  border-radius: 5px;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal img {
  max-width: 80%;
  max-height: 80%;
  border-radius: 10px;
}
</style>
