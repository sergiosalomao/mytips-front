<template>
  <v-container fluid>
    <h2>Descrição</h2>
    <v-row>
      <v-col col="12" md="12">
        <v-card>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
            
              <v-row>
                <v-col col="12" md="12">
               <v-textarea
        v-model="tip.descricao"
        label="Descricao"
        counter
        height="450"
        full-width
        outlined
       
      ></v-textarea>
                </v-col>
              </v-row>
              <v-btn color="primary" class="mr-4" @click="$router.go(-1)">Voltar</v-btn>
           
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import CategoriaService from "@/service/categoria/CategoriaService";

import TipService from "@/service/tips/TipService";
export default {
  data() {
    return {
      CategoriaService: new CategoriaService(),

      TipService: new TipService(),

      tip: {},
      categorias: [],
      tips: [],
      valid: false
    };
  },
  methods: {
    async atualizar() {
      // eslint-disable-next-line no-console
      console.log("atualizar" + this.tip.id);
      await this.TipService.createOrUpdate(this.tip);
      this.$router.push({ path: `/lista/` });
    },
    async getDados(id) {
      // eslint-disable-next-line no-console
      console.log(data);
      const data = await this.TipService.show(id);
      // eslint-disable-next-line no-console
      console.log(data);
      this.tip = data;
    },

    async getCategoriaDados() {
      const data = await this.CategoriaService.list();
      this.categorias = data.map(item => {
        return { text: item.descricao, value: item.id };
      });
    }
  },
  mounted() {
    if (this.$route.params.id) {
      this.getDados(this.$route.params.id);
    }
    this.getCategoriaDados();
  }
};
</script>