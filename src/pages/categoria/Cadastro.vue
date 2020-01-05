<template>
  <v-container fluid>
    <h2>{{categoria.id ? 'Atualizar' : 'Cadastrar'}}</h2>
    <v-row>
      <v-col col="12" md="12">
        <v-card>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row>
                <v-col col="12" md="12">
                  <v-text-field outlined v-model="categoria.descricao" label="Categoria"></v-text-field>
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

export default {
  data() {
    return {
      CategoriaService: new CategoriaService(),

      categorias: [],
      categoria: {},
      valid: false
    };
  },
  methods: {
    async atualizar() {
      await this.CategoriaService.createOrUpdate(this.categoria);
      this.$router.push({ path: `/categorias/` });
    },
    async getDados(id) {
      const data = await this.CategoriaService.show(id);

      this.categoria = data;
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