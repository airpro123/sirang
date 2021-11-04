<template>
  <div class="p-6">
    <v-card>
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="text-h5">Edit Permintaan Barang</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
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
                      :active-picker.sync="activePicker"
                      :max="
                        new Date(
                          Date.now() - new Date().getTimezoneOffset() * 60000
                        )
                          .toISOString()
                          .substr(0, 10)
                      "
                      min="1950-01-01"
                      @change="save"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Nip" v-model="nip"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Nama" v-model="nama"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Nama Barang"
                    v-model="nama_barang"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Jumlah" v-model="jumlah"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Satuan" v-model="satuan"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Keperluan"
                    v-model="keperluan"
                  ></v-text-field>
                </v-col>
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
            <v-btn color="blue darken-1" text @click="dialog = false">
              Close
            </v-btn>
            <v-btn color="blue darken-1" text @click="updatePermintaan">
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
          <v-icon
            small
            color="orange"
            class="mr-2"
            @click="editPermintaan(item)"
          >
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
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Permintaan",
  data: () => ({
    data: [],
    id: "",
    search: "",
    dialog: false,
    dialog2: false,
    kode: "",
    nip: null,
    nama: "",
    satuan_kerja: "",
    nama_barang: "",
    jumlah: "",
    satuan: "",
    keperluan: "",
    keterangan: "",
    snackbar: false,
    snackbarWarning: false,
    text: "",
    timeout: 2000,
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
      { text: "Barang", value: "barang" },
      { text: "Jumlah", value: "jumlah" },
      { text: "Satuan", value: "satuan" },
      { text: "Keperluan", value: "keperluan" },
      { text: "Keterangan", value: "keterangan" },
      { text: "Aksi", value: "aksi" },
    ],
    tanggal: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
  }),
  mounted() {
    this.ambilDataPermintaan();
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date);
    },
    ambilDataPermintaan: async function () {
      try {
        let res = await axios.get("permintaan");
        this.data = res.data;
      } catch (error) {
        this.data = [];
      }
    },
    clearData: function () {
      this.dialog = false;
      this.dialog2 = false;
      this.id = "";
      this.tanggal = "";
      this.kode = "";
      this.nip = "";
      this.nama = "";
      this.satuan_kerja = "";
      this.nama_barang = "";
      this.jumlah = "";
      this.satuan = "";
      this.keperluan = "";
      this.keterangan = "";
    },
    editPermintaan: function (item) {
      this.dialog = !this.dialog;
      this.id = item.id;
      this.tanggal = item.tanggal;
      this.kode = item.kode;
      this.nip = item.nip;
      this.nama = item.nama_pengusul;
      this.satuan_kerja = item.dari;
      this.nama_barang = item.barang;
      this.jumlah = item.jumlah;
      this.satuan = item.satuan;
      this.keperluan = item.keperluan;
      this.keterangan = item.keterangan;
    },
    updatePermintaan: async function () {
      let req = await axios.put(`permintaan/${this.id}`, {
        kode: this.kode,
        nip: this.nip,
        nama_pengusul: this.nama,
        dari: this.satuan_kerja,
        barang: this.nama_barang,
        jumlah: this.jumlah,
        satuan: this.satuan,
        keperluan: this.keperluan,
        keterangan: this.keterangan,
        status: 0,
        tanggal: this.tanggal,
        timestamp: "",
      });
      this.ambilDataPermintaan();
      this.text = "Data berhasil diupdate!";
      this.snackbar = true;
      this.dialog = false;
    },
    dialogHapus: function (item) {
      this.dialog2 = true;
      this.id = item.id;
    },
    hapusData: async function () {
      let req = await axios.delete(`permintaan/${this.id}`);
      this.text = "Data berhasil dihapus!";
      this.snackbarWarning = true;
      this.clearData();
      this.ambilDataPermintaan();
    },
    formatDate: function (date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}-${month}-${year}`;
    },
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
  },
};
</script>
