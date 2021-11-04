<template>
  <div class="p-6">
    <v-dialog v-model="dialog2" persistent max-width="400">
      <v-card>
        <v-card-title class="text-h5">
          Apa anda yakin untuk menghapus data barang ini?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="hapusBarang"> Ya </v-btn>
          <v-btn color="green darken-1" text @click="clearData"> Tidak </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Tambah Barang</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Kode Barang" v-model="kode"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Nama Barang" v-model="nama"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Merk" v-model="merk"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Tahun" v-model="tahun"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Jumlah" v-model="jumlah"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Satuan"
                  v-model="penguasaan"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-select
                  v-model="ruangan"
                  :items="dataRuangan"
                  item-text="nama_ruangan"
                  item-value="kode_ruangan"
                  label="Ruangan"
                ></v-select>
              </v-col>
              <v-col cols="6">
                <v-select
                  v-model="penguasaan"
                  :items="dataPenguasaan"
                  item-text="nama_penguasaan"
                  item-value="kode_penguasaan"
                  label="Penguasaan"
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Keterangan"
                  v-model="keterangan"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="clearData"> Close </v-btn>
          <v-btn color="blue darken-1" text @click="simpanBarang">
            {{ aksi }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card>
      <div class="text-right mr-6">
        <v-btn class="mx-2" fab dark color="indigo" small @click="dialogSimpan">
          <v-icon dark> mdi-plus </v-icon>
        </v-btn>
      </div>
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
          <v-icon small color="orange" class="mr-2" @click="editBarang(item)">
            mdi-pencil
          </v-icon>
          <v-icon small color="red" @click="dialogHapus(item)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
    <div class="text-center">
      <v-snackbar v-model="snackbar" color="success" :timeout="timeout">
        {{ text }}

        <template v-slot:action="{ attrs }">
          <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>
    <div class="text-center">
      <v-snackbar v-model="snackbarWarning" color="red" :timeout="timeout">
        {{ text }}

        <template v-slot:action="{ attrs }">
          <v-btn
            color="white"
            text
            v-bind="attrs"
            @click="snackbarWarning = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Barang",
  data: () => ({
    data: [],
    dataRuangan: [],
    dataPenguasaan: [],
    aksi: "",
    id: "",
    kode: "",
    nama: "",
    merk: "",
    tahun: "",
    jumlah: "",
    penguasaan: "",
    ruangan: "",
    keterangan: "",
    search: "",
    dialog: false,
    dialog2: false,
    snackbar: false,
    snackbarWarning: false,
    text: "",
    timeout: 2000,
    headers: [
      {
        text: "Kode Barang",
        align: "start",
        value: "kode",
      },
      { text: "Nama Barang", value: "nama" },
      { text: "Merk", value: "merk" },
      { text: "Tahun", value: "tahun" },
      { text: "Jumlah", value: "jumlah" },
      { text: "Keterangan", value: "keterangan" },
      { text: "Ruangan", value: "nama_ruangan" },
      { text: "Aksi", value: "aksi" },
    ],
  }),
  mounted() {
    this.ambilDataBarang();
    axios.get("ruangan").then((response) => (this.dataRuangan = response.data));
    axios
      .get("penguasaan")
      .then((response) => (this.dataPenguasaan = response.data));
  },
  methods: {
    ambilDataBarang: function () {
      axios
        .get("semuadatabarang")
        .then((response) => (this.data = response.data));
    },
    clearData: function () {
      this.aksi = "";
      this.id = "";
      this.kode = "";
      this.nama = "";
      this.merk = "";
      this.tahun = "";
      this.jumlah = "";
      this.penguasaan = "";
      this.ruangan = "";
      this.keterangan = "";
      this.dialog = false;
      this.dialog2 = false;
    },
    dialogSimpan: function () {
      this.aksi = "Simpan";
      this.dialog = true;
    },
    dialogKeluar: function () {
      this.clearData();
    },
    simpanBarang: async function (aksi) {
      if (this.aksi == "Simpan") {
        let req = await axios.post("barang", {
          kode: this.kode,
          nama: this.nama,
          merk: this.merk,
          tahun: this.tahun,
          jumlah: this.jumlah,
          penguasaan: this.penguasaan,
          ruangan: this.ruangan,
          keterangan: this.keterangan,
        });

        this.snackbar = true;
        this.text = "Data berhasil disimpan!";
        this.ambilDataBarang();
        this.clearData();
      } else if (this.aksi == "Update") {
        let req = await axios.put(`barang/${this.id}`, {
          kode: this.kode,
          nama: this.nama,
          merk: this.merk,
          tahun: this.tahun,
          jumlah: this.jumlah,
          penguasaan: this.penguasaan,
          ruangan: this.ruangan,
          keterangan: this.keterangan,
        });
        this.snackbar = true;
        this.text = "Data berhasil diupdate!";
        this.ambilDataBarang();
        this.clearData();
      }
    },
    editBarang: function (item) {
      this.dialog = true;
      this.aksi = "Update";
      this.id = item.id_barang;
      this.kode = item.kode;
      this.nama = item.nama;
      this.merk = item.merk;
      this.tahun = item.tahun;
      this.jumlah = item.jumlah;
      this.penguasaan = item.kode_penguasaan;
      this.ruangan = item.kode_ruangan;
      this.keterangan = item.keterangan;
    },
    dialogHapus: function (item) {
      this.dialog2 = true;
      this.id = item.id_barang;
    },
    hapusBarang: async function () {
      let req = await axios.delete(`barang/${this.id}`);
      this.snackbarWarning = true;
      this.text = "Data berhasil dihapus!";
      this.ambilDataBarang();
      this.dialog2 = false;
      this.clearData();
    },
  },
};
</script>
