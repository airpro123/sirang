<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="400">
      <v-card>
        <v-card-title class="text-h6">
          Data barang diruangan yang anda pilih kosong.
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = !dialog">
            Keluar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div class="p-6">
      <v-card>
        <v-container fluid>
          <v-card-title> Download Laporan Data Barang </v-card-title>
          <v-row align="center">
            <v-col cols="12">
              <v-select
                v-model="select"
                :items="items"
                item-text="nama_ruangan"
                item-value="kode_ruangan"
                label="Ruangan"
                clearable
                small-chips
              ></v-select>
              <!-- <v-checkbox
                class="shrink mr-2 mt-0"
                v-model="checkbox"
                :label="text"
              ></v-checkbox> -->
            </v-col>
          </v-row>
          <v-row align="center">
            <v-col cols="12">
              <v-btn
                class="shrink m-0"
                depressed
                color="primary"
                @click="downloadData"
              >
                Download
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "LaporanBarang",
  data() {
    return {
      select: "",
      dialog: false,
      checkbox: false,
      text: "Pilih Semua",
      items: [],
    };
  },
  mounted() {
    this.dataRuangan();
  },
  methods: {
    dataRuangan: async function () {
      let res = await axios.get("ruangan");
      let data = res.data;
      this.items = data;
      // for (let i = 0; i < data.length; i++) {
      //   this.items.push({
      //     nama: data[i].nama_ruangan,
      //     kode: data[i].nama_ruangan,
      //   });
      // }
    },
    cekBarangRuangan: async function (kode) {
      let req = await axios.get(`databarang/${kode}`);
      return req.data.length;
    },
    downloadData: async function () {
      if (this.checkbox != true) {
        let req = await axios.get(`databarang/${this.select}`);
        if (req.data.length > 0) {
          window.open(
            "http://localhost/persediaan/backend/public/laporanbarangruangan/" +
              this.select
          );
        } else {
          this.dialog = true;
        }
      } else {
        window.open(
          "http://localhost/persediaan/backend/public/laporanbarangruangan/SEMUA"
        );
      }
    },
  },
  watch: {
    select: function (baru) {},
  },
};
</script>

<style>
</style>