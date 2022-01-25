<template>
  <div>
    <v-row>
      <v-btn> asdasd </v-btn>
    </v-row>
    <v-carousel
      hide-delimiter-background
      v-model="model"
      height="90vh"
      delimiter-icon="mdi-minus"
      :show-arrows="false"
    >
      <v-carousel-item v-for="(item, i) in items" :key="i">
        <v-row class="fill-height primary" align="center" justify="center">
          <v-img contain src="../../assets/Images/Logo/greenmlinjo.png"></v-img>
        </v-row>
      </v-carousel-item>
      <!-- <v-btn>asdas</v-btn> -->
    </v-carousel>
    <v-sheet class="d-flex justify-space-between">
      <!-- <v-btn color="info">tesss</v-btn>
      <v-chip color="accent"></v-chip>
      <v-chip color="accent"></v-chip>
      <v-chip color="accent"></v-chip>
      <v-btn>tesss</v-btn> -->
    </v-sheet>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: 0,
      items: [
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
        },
      ],
    };
  },
};
</script>

<style></style>
