<template>
  <v-card>
    <v-card-text>
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <!-- <v-select
            v-model="nama"
            :items="pegawai"
            item-text="nama"
            item-value="nama"
            label="Nama"
            clearable
            small-chips
          ></v-select> -->
          <v-autocomplete
            v-model="nama"
            :items="pegawai"
            item-text="nama"
            item-value="nama"
            small-chips
            label="Nama"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-text-field label="NIP" v-model="nip" disabled></v-text-field>
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
        <v-col cols="12" sm="6" md="4">
          <v-select
            v-model="hari"
            :items="dataHari"
            label="Nama"
            clearable
            small-chips
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-menu
            v-model="menu1"
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
              @input="menu1 = false"
            ></v-date-picker>
          </v-menu>
        </v-col>

        <v-col cols="12" sm="6" md="4">
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
          <v-text-field label="Tujuan" v-model="tujuan"></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            label="Jenis Kendaraan"
            v-model="jenis_kendaraan"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-text-field label="Personil" v-model="personil"></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field label="Kegiatan" v-model="kegiatan"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn color="success" dark @click="simpanFormulir"> Save </v-btn>
        </v-col></v-row
      >
    </v-card-text>
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
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  name: "Mobil",
  data() {
    return {
      pegawai: [],
      dataHari: [
        "Senin",
        "Selasa",
        "Rabu",
        "Kamis",
        "Jum'at",
        "Sabtu",
        "Minggu",
      ],
      valid: false,
      dialog: false,
      snackbar: false,
      kegiatan: "",
      nama: "",
      nip: "",
      jabatan: "",
      hari: "",
      tujuan: "",
      jenis_kendaraan: "",
      personil: "",
      tgl_berangkat: new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10),
      tgl_kembali: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu1: false,
      menu2: false,
      text: "",
      timeout: 2000,
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => v.length <= 10 || "Name must be less than 10 characters",
      ],
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
    };
  },
  mounted() {
    this.dataPegawai();
  },
  methods: {
    clearData: function () {
      this.kegiatan = "";
      this.nama = "";
      this.nip = "";
      this.jabatan = "";
      this.hari = "";
      this.tujuan = "";
      this.jenis_kendaraan = "";
      this.personil = "";
    },
    dataPegawai: async function () {
      let res = await axios.get("pegawai");
      let data = res.data;
      for (let i = 0; i < data.length; i++) {
        this.pegawai.push({
          nip: data[i].nip,
          nama: data[i].nama,
          jabatan: data[i].jabatan,
          pangkat: data[i].pangkat,
          satuan_kerja: data[i].satuan_kerja,
        });
      }
    },
    simpanFormulir: async function () {
      let req = await axios.post("peminjamanmobil", {
        kegiatan: this.kegiatan,
        nama: this.nama,
        nip: this.nip,
        jabatan: this.jabatan,
        hari: this.hari,
        tgl_berangkat: this.tgl_berangkat,
        tgl_kembali: this.tgl_kembali,
        tujuan: this.tujuan,
        jenis_kendaraan: this.jenis_kendaraan,
        personil: this.personil + ",",
      });
      this.snackbar = true;
      this.text = "Data peminjaman mobil berhasil disimpan!";
      this.clearData();
    },
  },
  watch: {
    nama: function (baru, lama) {
      if (baru == null) {
        this.nip = "";
        this.jabatan = "";
      } else {
        let data = this.pegawai.filter((item) => {
          return item.nama.toLowerCase().includes(baru.toLowerCase());
        });
        this.nip = data[0].nip;
        this.jabatan = data[0].jabatan;
      }
    },
  },
};
</script>