<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div id="app">
    <header>
      <h1>Facebook-clone</h1>
    </header>

    <main class="feed">
      <section class="new-post">
        <h2>Skapa ett inlägg</h2>
        <textarea placeholder="Vad gör du just nu?"></textarea>
        <button>Publicera</button>
      </section>
    </main>
  </div>
</template>

<style>
body {
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f0f2f5;
}

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
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

.new-post textarea {
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
</style>