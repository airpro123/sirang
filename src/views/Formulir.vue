<template>
  <v-card>
    <template>
      <v-tabs v-model="tab">
        <v-tabs-slider color="blue"></v-tabs-slider>

        <v-tab v-for="item in items" :key="item">
          {{ item }}
        </v-tab>
      </v-tabs>
    </template>
    <v-tabs-items v-model="tab">
      <v-tab-item :key="Permintaan">
        <v-card flat>
          <Permintaan />
        </v-card>
      </v-tab-item>
      <v-tab-item :key="Peminjaman">
        <v-card flat>
          <Peminjaman />
        </v-card>
      </v-tab-item>
      <v-tab-item :key="Mobil">
        <v-card flat>
          <Mobil />
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import Permintaan from "./Formulir/Permintaan.vue";
import Peminjaman from "./Formulir/Peminjaman.vue";
import Mobil from "./Formulir/Mobil.vue";
export default {
  name: "Formulir",
  components: {
    Permintaan,
    Peminjaman,
    Mobil,
  },
  data() {
    return {
      tab: null,
      items: ["Permintaan", "Peminjaman", "Mobil"],
    };
  },
};
</script>
