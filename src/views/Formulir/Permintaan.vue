<template>
  <v-card>
    <v-card-text>
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <v-select
            v-model="nama"
            :items="pegawai"
            item-text="nama"
            item-value="nama"
            label="Nama"
            clearable
            small-chips
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-text-field label="NIP" v-model="nip" disabled></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            label="Subbag/ Seksi/ Unit Kerja"
            v-model="satuan_kerja"
            disabled
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark v-bind="attrs" v-on="on">
                Barang
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">Data Barang</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        label="Nama Barang"
                        v-model="nama_barang"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        label="Jumlah"
                        v-model="jumlah"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        label="Satuan"
                        v-model="satuan"
                      ></v-text-field>
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
                <v-btn color="blue darken-1" text @click="isiDataBarang">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
        <v-col cols="12">
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Barang</th>
                  <th class="text-left">Jumlah</th>
                  <th class="text-left">Satuan</th>
                  <th class="text-left">Keperluan</th>
                  <th class="text-left">Keterangan</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in barang" :key="item.nama_barang">
                  <td>{{ item.nama_barang }}</td>
                  <td>{{ item.jumlah }}</td>
                  <td>{{ item.satuan }}</td>
                  <td>{{ item.keperluan }}</td>
                  <td>{{ item.keterangan }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
        <v-col>
          <v-btn color="success" dark @click="simpanFormulir"> Save </v-btn>
        </v-col>
      </v-row>
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
  name: "Permintaan",
  data() {
    return {
      pegawai: [],
      barang: [],
      kode: "",
      nip: null,
      nama: "",
      satuan_kerja: "",
      nama_barang: "",
      jumlah: "",
      satuan: "",
      keperluan: "",
      keterangan: "",
      valid: false,
      firstname: "",
      lastname: "",
      dialog: false,
      snackbar: false,
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
    this.ambilKode();
  },
  methods: {
    clearData: function () {
      this.barang = [];
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
    validasi: function () {},
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
    isiDataBarang: function () {
      this.barang.push({
        nama_barang: this.nama_barang,
        jumlah: this.jumlah,
        satuan: this.satuan,
        keperluan: this.keperluan,
        keterangan: this.keterangan,
      });
      this.dialog = false;
      this.clearDataBarang();
    },
    simpanFormulir: async function () {
      try {
        if (this.nip != null && this.nama_barang != null) {
          let barang = this.barang;
          let save;
          for (let i = 0; i < barang.length; i++) {
            save = await axios.post("permintaan", {
              kode: this.kode,
              nip: this.nip,
              nama_pengusul: this.nama,
              dari: this.satuan_kerja,
              barang: barang[i].nama_barang,
              jumlah: barang[i].jumlah,
              satuan: barang[i].satuan,
              keperluan: barang[i].keperluan,
              keterangan: barang[i].keterangan,
              status: 0,
            });
          }
          if (save.status == 201) {
            this.clearData();
            this.snackbar = true;
            this.text = "Data berhasil tersimpan!";
            this.ambilKode();
          }
        }
      } catch (error) {}
    },
    clearDataBarang: function () {
      this.nama_barang = "";
      this.jumlah = "";
      this.satuan = "";
      this.keperluan = "";
      this.keterangan = "";
    },
    ambilKode: async function () {
      try {
        let res = await axios.get("kodepermintaan");
        let kodeRaw = res.data[0].kode;
        let pisah = kodeRaw.split("-");
        let urutan = parseInt(pisah[1]) + 1;
        let kode = "PRMTN-" + urutan;
        this.kode = kode;
      } catch (error) {
        this.kode = "PRMTN-1";
      }
    },
  },
  watch: {
    nama: function (baru, lama) {
      if (baru == null || baru == "") {
        this.nip = "";
        this.satuan_kerja = "";
      } else {
        let data = this.pegawai.filter((item) => {
          return item.nama.toLowerCase().includes(baru.toLowerCase());
        });
        this.nip = data[0].nip;
        this.satuan_kerja = data[0].satuan_kerja;
      }
    },
  },
};
</script>
<style>
</style>