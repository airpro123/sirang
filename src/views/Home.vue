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
      <v-tab-item :key="Barang">
        <v-card flat>
          <Barang />
        </v-card>
      </v-tab-item>
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
import Barang from "./Data/Barang";
import Permintaan from "./Data/Permintaan";
import Peminjaman from "./Data/Peminjaman";
import Mobil from "./Data/Mobil";
export default {
  name: "Home",
  components: {
    Barang,
    Permintaan,
    Peminjaman,
    Mobil,
  },
  data() {
    return {
      tab: null,
      items: ["Barang", "Permintaan", "Peminjaman", "Mobil"],
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    };
  },
};
</script>

<style>
.v-slide-group__prev {
  display: none !important;
}
</style>
