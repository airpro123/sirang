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
  name: "Peminjaman",
  data: () => ({
    data: [],
    search: "",
    headers: [
      {
        text: "Tanggal",
        align: "start",
        value: "tanggal",
      },
      { text: "NIP", value: "nip" },
      { text: "Nama", value: "nama" },
      { text: "Jabatan", value: "jabatan" },
      { text: "Kegiatan", value: "kegiatan" },
      { text: "Berangkat", value: "tgl_berangkat" },
      { text: "Kembali", value: "tgl_kembali" },
      { text: "Kendaraan", value: "tgl_kembali" },
      { text: "Personil", value: "personil" },
      { text: "Aksi", value: "aksi" },
    ],
  }),
  mounted() {
    axios
      .get("peminjamanmobil")
      .then((response) => (this.data = response.data));
  },
  methods: {
    downloadPDF: function (item) {
      window.open(
        "https://resolved-grooves.000webhostapp.com/laporanpeminjamanmobil" +
          item.id
      );
    },
  },
};
</script>
