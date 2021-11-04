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
import Barang from "./Laporan/Barang";
import Permintaan from "./Laporan/Permintaan.vue";
import Peminjaman from "./Laporan/Peminjaman.vue";
import Mobil from "./Laporan/Mobil.vue";
export default {
  name: "Laporan",
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
    };
  },
};
</script>
