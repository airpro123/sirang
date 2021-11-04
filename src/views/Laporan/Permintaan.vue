<template>
  <div class="p-6">
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="data" :search="search"
        ><template v-slot:item.aksi="{ item }">
          <v-btn small color="blue" dark @click="downloadPDF(item)">
            Download
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Permintaan",
  data: () => ({
    data: [],
    search: "",
    headers: [
      {
        text: "Tanggal",
        align: "start",
        value: "tanggal",
      },
      { text: "Kode", value: "kode" },
      { text: "NIP", value: "nip" },
      { text: "Nama", value: "nama_pengusul" },
      { text: "Divisi", value: "dari" },
      { text: "Aksi", value: "aksi" },
    ],
  }),
  mounted() {
    axios
      .get("permintaangroup")
      .then((response) => (this.data = response.data));
  },
  methods: {
    downloadPDF: function (item) {
      window.open(
        "https://resolved-grooves.000webhostapp.com/laporanpermintaan/" +
          item.kode
      );
    },
  },
};
</script>
