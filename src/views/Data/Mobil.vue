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
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Edit Peminjaman Barang</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Nip" v-model="nip" disabled></v-text-field>
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
                  label="Jabatan"
                  v-model="jabatan"
                  disabled
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  label="Kegiatan"
                  v-model="kegiatan"
                ></v-text-field>
              </v-col>

              <v-col cols="6">
                <v-text-field label="Hari" v-model="hari"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
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
                      v-model="tgl_berangkat"
                      label="Tanggal Berangkat"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="tgl_berangkat"
                    @input="menu = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="6">
                <v-menu
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="tgl_kembali"
                      label="Tanggal Kembali"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="tgl_kembali"
                    @input="menu2 = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  label="Kendaraan"
                  v-model="jenis_kendaraan"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  label="Personil"
                  v-model="personil"
                ></v-text-field>
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
      <v-data-table :headers="headers" :items="data" :search="search">
        <template v-slot:item.aksi="{ item }">
          <v-icon small color="orange" class="mr-2" @click="editData(item)">
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
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Mobil",
  components: {},
  data: () => ({
    data: [],
    dialog: false,
    dialog2: false,
    id: "",
    search: "",
    nip: null,
    nama: "",
    jabatan: "",
    kegiatan: "",
    hari: "",
    tgl_berangkat: "",
    tgl_kembali: "",
    jenis_kendaraan: "",
    tujuan: "",
    personil: "",
    menu: false,
    menu2: false,
    snackbar: false,
    text: "",
    timeout: 2000,
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
      { text: "Tujuan", value: "tujuan" },
      { text: "Berangkat", value: "tgl_berangkat" },
      { text: "Kembali", value: "tgl_kembali" },
      { text: "Kendaraan", value: "jenis_kendaraan" },
      { text: "Personil", value: "personil" },
      { text: "Aksi", value: "aksi" },
    ],
  }),
  mounted() {
    this.ambilData();
  },
  methods: {
    ambilData: async function () {
      let req = await axios.get("peminjamanmobil");
      this.data = req.data;
    },
    clearData: function () {
      this.dialog = false;
      this.dialog2 = false;
      this.nip = "";
      this.nama = "";
      this.jabatan = "";
      this.kegiatan = "";
      this.tgl_berangkat = "";
      this.tgl_kembali = "";
      this.jenis_kendaraan = "";
      this.tujuan = "";
      this.personil = "";
    },
    editData: function (item) {
      this.dialog = true;
      this.id = item.id;
      this.nip = item.nip;
      this.nama = item.nama;
      this.jabatan = item.jabatan;
      this.kegiatan = item.kegiatan;
      this.hari = item.hari;
      this.tgl_berangkat = item.tgl_berangkat;
      this.tgl_kembali = item.tgl_kembali;
      this.jenis_kendaraan = item.jenis_kendaraan;
      this.personil = item.personil;
      this.tujuan = item.tujuan;
    },
    updateFormulir: async function () {
      let req = await axios.put(`peminjamanmobil/${this.id}`, {
        nip: this.nip,
        nama: this.nama,
        jabatan: this.jabatan,
        kegiatan: this.kegiatan,
        hari: this.hari,
        tgl_berangkat: this.tgl_berangkat,
        tgl_kembali: this.tgl_kembali,
        jenis_kendaraan: this.jenis_kendaraan,
        personil: this.personil,
        tujuan: this.tujuan,
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
      await axios.delete(`peminjamanmobil/${this.id}`);
      this.ambilData();
      this.clearData();
    },
  },
};
</script>
