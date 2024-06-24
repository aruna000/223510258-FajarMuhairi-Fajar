<template>
  <div>
    <h1>Album Photos</h1>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <ul class="photo-list">
        <li
          v-for="photo in photos"
          :key="photo.id"
          class="photo-item"
          @click="showPhoto(photo)"
        >
          <img :src="photo.thumbnailUrl" alt="Photo Thumbnail" />
        </li>
      </ul>
    </div>
    <div v-if="selectedPhoto" class="modal" @click="selectedPhoto = null">
      <img
        :src="selectedPhoto.url"
        :alt="selectedPhoto.title"
        :style="{
          width: `${selectedPhoto.width}px`,
          height: `${selectedPhoto.height}px`,
        }"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "AlbumPhotos",
  props: ["id"],
  data() {
    return {
      photos: [],
      loading: true,
      selectedPhoto: null,
    };
  },
  watch: {
    id: {
      immediate: true,
      handler(newId) {
        this.fetchPhotos(newId);
      },
    },
  },
  methods: {
    async fetchPhotos(id) {
      this.loading = true;
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/albums/${id}/photos`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const json = await response.json();
        this.photos = json;
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
  max-width: none;
  max-height: none;
  border-radius: 10px;
}
</style>
