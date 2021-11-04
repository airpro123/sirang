<template>
  <div class="p-6">
    <v-dialog v-model="dialog2" persistent max-width="400">
      <v-card>
        <v-card-title class="text-h5">
          Apa anda yakin untuk menghapus data ini?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="hapusData"> Ya </v-btn>
          <v-btn color="green darken-1" text @click="clearData"> Tidak </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card>
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="text-h5">Edit Peminjaman Barang</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Nip"
                    v-model="nip"
                    disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Nama"
                    v-model="nama"
                    disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Divisi"
                    v-model="satuan_kerja"
                    disabled
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-menu
                    v-model="menu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="tanggal"
                        label="Tanggal"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="tanggal"
                      @input="menu = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Kegiatan"
                    v-model="kegiatan"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="HP" v-model="hp"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Barang"
                    v-model="nama_barang"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Jumlah" v-model="jumlah"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Satuan" v-model="satuan"></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">
              Close
            </v-btn>
            <v-btn color="blue darken-1" text @click="updateFormulir">
              Update
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="data" :search="search">
        <template v-slot:item.aksi="{ item }">
          <v-icon small color="orange" class="mr-2" @click="editFormulir(item)">
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
  name: "Peminjaman",
  data: () => ({
    data: [],
    id: "",
    kode: "",
    nip: null,
    nama: "",
    hp: "",
    kegiatan: "",
    satuan_kerja: "",
    nama_barang: "",
    jumlah: "",
    satuan: "",
    keperluan: "",
    keterangan: "",
    tempat_pelaksanaan: "",
    dialog: false,
    dialog2: false,
    snackbar: false,
    snackbarWarning: false,
    text: "",
    timeout: 2000,
    search: "",
    tanggal: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    menu: false,
    headers: [
      {
        text: "Tanggal",
        align: "start",
        value: "tanggal",
      },
      { text: "Kode", value: "kode" },
      { text: "NIP", value: "nip" },
      { text: "Nama", value: "pemohon" },
      { text: "Divisi", value: "pengusul" },
      { text: "Kegiatan", value: "nama_kegiatan" },
      { text: "HP", value: "hp" },
      { text: "Barang", value: "nama_barang" },
      { text: "Jumlah", value: "jumlah" },
      { text: "Satuan", value: "satuan" },
      { text: "Aksi", value: "aksi" },
    ],
  }),
  mounted() {
    this.ambilData();
  },
  methods: {
    ambilData: async function () {
      let req = await axios.get("peminjaman");
      this.data = req.data;
    },
    clearData: function () {
      this.dialog = false;
      this.dialog2 = false;
      this.id = "";
      this.kode = "";
      this.nip = "";
      this.nama = "";
      this.hp = "";
      this.kegiatan = "";
      this.satuan_kerja = "";
      this.nama_barang = "";
      this.jumlah = "";
      this.satuan = "";
      this.keperluan = "";
      this.keterangan = "";
      this.tempat_pelaksanaan = "";
    },
    editFormulir: function (item) {
      this.dialog = true;
      this.id = item.id;
      this.kode = item.kode;
      this.nip = item.nip;
      this.nama = item.pemohon;
      this.hp = item.hp;
      this.kegiatan = item.nama_kegiatan;
      this.tanggal = item.tanggal;
      this.satuan_kerja = item.pengusul;
      this.nama_barang = item.nama_barang;
      this.jumlah = item.jumlah;
      this.satuan = item.satuan;
      this.keperluan = item.keperluan;
      this.keterangan = item.keterangan;
      this.tempat_pelaksanaan = item.tempat_pelaksanaan;
    },
    updateFormulir: async function () {
      let req = await axios.put(`peminjaman/${this.id}`, {
        nama_kegiatan: this.kegiatan,
        pengusul: this.satuan_kerja,
        pemohon: this.nama,
        nip: this.nip,
        hp: this.hp,
        tempat_pelaksanaan: this.tempat_pelaksanaan,
        nama_barang: this.nama_barang,
        jumlah: this.jumlah,
        satuan: this.satuan,
        tanggal: this.tanggal,
      });
      this.text = "Data berhasil diupdate!";
      this.snackbar = true;
      this.dialog = false;
      this.clearData();
      this.ambilData();
    },
    dialogHapus: function (item) {
      this.dialog2 = true;
      this.id = item.id;
    },
    hapusData: async function () {
      await axios.delete(`peminjaman/${this.id}`);
      this.text = "Data berhasil dihapus!";
      this.snackbarWarning = true;
      this.ambilData();
      this.clearData();
    },
  },
};
</script>
