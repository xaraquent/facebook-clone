<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { RouterLink } from 'vue-router';

const posts = ref([]);
const newPost = ref('');
const editingPostId = ref(null);
const editedContent = ref('');
const dropdownPostId = ref(null);
const now = ref(new Date());
const route = useRoute();

const userId = localStorage.getItem('user_ID');
const userName = localStorage.getItem('user_name');
const userGroup = localStorage.getItem('user_group_ID');

let timer = null;

// Håll tiden uppdaterad
onMounted(() => {
  fetchPosts();
  timer = setInterval(() => {
    now.value = new Date();
  }, 60000);
});

onUnmounted(() => {
  clearInterval(timer);
});

// Hämta alla inlägg
function fetchPosts() {
  fetch('http://localhost:3000/facebook/posts')
    .then((res) => res.json())
    .then((data) => {
      posts.value = (data.posts || data).map((p) => ({
        id: p.post_ID,
        user_id: p.post_user_ID,
        user: p.user_name || `Användare ${p.post_user_ID}`,
        content: p.post_content,
        date: p.post_date || new Date(),
      }));
    })
    .catch((err) => console.error('Fel vid hämtning:', err));
}

// Skapa nytt inlägg
function publishPost() {
  if (!newPost.value.trim()) return;

  fetch('http://localhost:3000/facebook/post', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      post_user_ID: userId,
      post_content: newPost.value,
      post_reaction: 'like',
    }),
  })
    .then((res) => res.json())
    .then((saved) => {
      posts.value.unshift({
        id: saved.post_ID,
        user_id: userId,
        user: userName,
        content: newPost.value,
        date: new Date(),
      });
      newPost.value = '';
    })
    .catch((err) => console.error('Fel vid post:', err));
}

// Starta redigering
function startEdit(post) {
  editingPostId.value = post.id;
  editedContent.value = post.content;
  dropdownPostId.value = null;
}

// Spara redigering
function saveEdit(postId) {
  fetch(`http://localhost:3000/facebook/post/${postId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      post_content: editedContent.value,
      post_reaction: 'like',
    }),
  })
    .then((res) => res.json())
    .then(() => {
      editingPostId.value = null;
      fetchPosts();
    })
    .catch((err) => console.error('Fel vid redigering:', err));
}

// Ta bort inlägg
function deletePost(postId) {
  fetch(`http://localhost:3000/facebook/post/${postId}`, {
    method: 'DELETE',
  })
    .then((res) => res.json())
    .then(() => fetchPosts())
    .catch((err) => console.error('Fel vid borttagning:', err));
}

//Visa tid sedan inlägget postades
function formatDate(date) {
  const d = new Date(date);
  const diff = now.value - d;

  const mins = Math.floor(diff / 60000);
  const h = Math.floor(mins / 60);
  const days = Math.floor(h / 24);

  if (mins < 1) return 'just nu';
  if (mins < 60) return `${mins} min sedan`;
  if (h < 24) return `${h} tim sedan`;
  return `${days} dagar sedan`;
}

// "..." för varje inlägg
function toggleDropdown(postId) {
  dropdownPostId.value = dropdownPostId.value === postId ? null : postId;
}

//Hämtar användarens grupper
const dataGroups = ref('');

fetch('http://localhost:3000/facebook/groups')
  .then((res) => res.json())
  .then((data) => {
    // console.log(data.groups);
    dataGroups.value = data.groups;
    matchUserAndGroups();
  });

const userGroups = ref([]);

fetch(`http://localhost:3000/facebook/users/${userId}`)
  .then((res) => res.json())
  .then((user) => {
    // console.log(user.user[0]);
    if (user.user[0].user_group_ID) {
      const groupsIDs = user.user[0].user_group_ID.toString().split('').map(Number);
      userGroups.value = groupsIDs;
      matchUserAndGroups();
    }
  });

function matchUserAndGroups() {
  if (userGroups.value.length && dataGroups.value.length) {
    dataGroups.value = dataGroups.value.filter((group) =>
      userGroups.value.includes(group.group_ID)
    );
  }
}
</script>

<template>
  <div id="app">
    <header>
      <h1>Facebook-klon</h1>
    </header>
    <router-link to="/" class="log-out-button">Logga ut</router-link>

    <router-link :to="`/messages/${userId}`" class="chat-button">Chatt</router-link>

    <aside class="groups-list">
      <ul>
        <li v-for="group in dataGroups" :key="group.group_ID">{{ group.group_name }}</li>
      </ul>
    </aside>
    <main class="feed">
      <!-- Skapa nytt inlägg -->
      <section class="new-post">
        <h2>Skapa ett inlägg</h2>
        <textarea v-model="newPost" placeholder="Vad gör du just nu?"></textarea>
        <button @click="publishPost">Publicera</button>
      </section>

      <!-- Visa inlägg -->
      <section v-for="post in posts" :key="post.id" class="post">
        <div class="post-header">
          <div>
            <strong class="post-user">{{ post.user }}</strong>
            <div class="post-date">{{ formatDate(post.date) }}</div>
          </div>

          <div v-if="post.user_id == userId" class="dropdown-wrapper">
            <button class="dots-btn" @click="toggleDropdown(post.id)">⋯</button>
            <div v-if="dropdownPostId === post.id" class="dropdown-menu">
              <button @click="startEdit(post)">Redigera</button>
              <button @click="deletePost(post.id)">Ta bort</button>
            </div>
          </div>
        </div>

        <div v-if="editingPostId === post.id">
          <textarea v-model="editedContent" class="edit-area"></textarea>
          <button @click="saveEdit(post.id)">Spara</button>
          <button @click="editingPostId = null">Avbryt</button>
        </div>
        <div v-else>
          <p class="post-content">{{ post.content }}</p>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
header {
  background-color: #1877f2;
  color: white;
  padding: 10px;
  text-align: center;
  font-size: 20px;
}

.feed {
  max-width: 600px;
  margin: 20px auto;
  background: white;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  height: 80vh;
  overflow-y: auto;
}

.new-post textarea {
  background-color: #fff;
  color: #333;
  width: 100%;
  height: 60px;
  padding: 5px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  border-radius: 6px;
  resize: none;
}

.new-post button {
  background-color: #1877f2;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 6px;
  cursor: pointer;
}

.post {
  border: 1px solid #ccc;
  padding: 10px;
  margin-top: 10px;
  border-radius: 6px;
  background-color: #f9f9f9;
  position: relative;
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
}

.post-user {
  color: #1877f2;
  display: block;
}

.post-date {
  font-size: 12px;
  color: #888;
}

.post-content {
  color: black;
  margin-top: 8px;
  font-size: 15px;
}

.edit-area {
  width: 100%;
  padding: 5px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.dropdown-wrapper {
  position: relative;
  display: inline-block;
}

.dots-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 0;
  margin-left: 10px;
  color: #666;
}

.dropdown-menu {
  position: absolute;
  right: 0;
  background: white;
  border: 1px solid #ccc;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  z-index: 10;
  border-radius: 5px;
  overflow: hidden;
  margin-top: 4px;
}

.dropdown-menu button {
  display: block;
  width: 100%;
  padding: 6px 12px;
  background: white;
  border: none;
  text-align: left;
  cursor: pointer;
}

.dropdown-menu button:hover {
  background-color: #f0f0f0;
}

.groups-list {
  position: relative;
  top: 8.5rem; /* justera beroende på header */
  left: 20px;
  width: 5rem;
  background-color: #4350df;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-height: 70vh;
  overflow-y: auto;
  font-size: 14px;
  color: #ffffff;
}

.groups-list ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.groups-list li:hover {
  background-color: #e4e6eb;
  color: #000200;
  cursor: pointer;
  font-weight: 500;
}
</style>
