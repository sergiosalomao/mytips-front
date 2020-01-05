<template>
  <v-container fluid>
    <h2>{{tip.id ? 'Atualizar' : 'Cadastrar'}}</h2>
    <v-row>
      <v-col col="12" md="12">
        <v-card>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row>
                <v-col col="12" md="12">
                  <v-select
                    outlined
                    v-model="tip.categoria_id"
                    label="Categoria"
                    :items="categorias"
                  ></v-select>
                </v-col>
              </v-row>

              <v-row>
                <v-col col="12" md="12">
                  <v-text-field outlined v-model="tip.titulo" label="Titulo"></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col col="12" md="12">
                  <v-text-field outlined v-model="tip.descricao" label="Descricao"></v-text-field>
                </v-col>
              </v-row>
              <v-btn color="primary" class="mr-4" @click="$router.go(-1)">Voltar</v-btn>
              <v-btn color="success" class="mr-4" @click="atualizar">Gravar</v-btn>
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