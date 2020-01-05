<template>
  <v-container fluid>
    <v-col>
      <title-component titulo="Tips" />
    </v-col>
    <v-col>
      <v-btn color="success" class="mr-4" to="/tips/cadastro">Adicionar</v-btn>
    </v-col>

    <v-expansion-panels>
      <v-expansion-panel v-for="(item,i) in 1" :key="i">
        <v-expansion-panel-header class="title">Pesquisar</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row>
            <v-col col="12" md="4">
              <v-text-field v-model="filtro.titulo" label="Titulo"></v-text-field>
            </v-col>

            <v-col col="12" md="4">
              <v-text-field v-model="filtro.descricao" label="Descricao"></v-text-field>
            </v-col>

            <v-col col="12" md="4">
              <v-autocomplete
                v-model="filtro.categoria"
                :items="categorias"
                outlined
                dense
                chips
                small-chips
                label="Tipo"
                multiple
              ></v-autocomplete>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <div class="flex-grow-1"></div>
          <v-btn color="primary" @click="getDados()">Filtrar</v-btn>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
<br>
    <table-component :headers="headers" :items="tips">
      <template v-slot:acoes="{ item }">
           <v-icon class="mr-2" @click="visualizar(item.id)">mdi-eye</v-icon>
        <v-icon class="mr-2" @click="atualizar(item.id)">mdi-table-edit</v-icon>
        <v-icon class="mr-2" @click="showModalDelete(item)">mdi-delete</v-icon>
      </template>
    </table-component>

    <modal-delete :dialog="show" @fechar="show = false" @deletar="deletar($event)" :item="tip" />
  </v-container>
</template>
<script>
/* tslint:disable */
import ModalDelete from "@/components/modal/ModalDelete";
import TitleComponent from "@/components/title/TitleComponent";
import TableComponent from "@/components/table/TableComponent";
import CategoriaService from "@/service/categoria/CategoriaService";
import TipService from "@/service/tips/TipService";

export default {
  name: "Tips",
  components: {
    ModalDelete,
    TitleComponent,
    TableComponent
  },
  data() {
    return {
      filtro: {},
      categorias: [],

      TipService: new TipService(),
      CategoriaService: new CategoriaService(),
      headers: [
        {
          text: "Categoria",
          value: "categoria.descricao"
        },
        {
          text: "Titulo",
          value: "titulo"
        },
        {
          text: "Descricao",
          value: "descricao",
          width: "60%"
        },
        {
          text: "Ações",
          value: "action",
          width: "15%"
        }
      ],
      tips: [],
      show: false,
      tip: {}
    };
  },

  methods: {
    showModalDelete(item) {
      this.tip = item;
      this.show = true;
    },
    atualizar(id) {
      this.$router.push({ path: `/tips/editar/${id}` });
    },
     visualizar(id) {
      this.$router.push({ path: `/tips/visualizar/${id}` });
    },
    async deletar(item) {
      await this.TipService.remove(item.id);
      this.$toasted.global.defaultSuccess();
      this.getDados();
    },
    async getDados() {
      // eslint-disable-next-line no-console
      console.log(this.filtro);

      const data = await this.TipService.search(this.filtro);

      this.tips = data;
    },
    async getCategoriasDados() {
      const data = await this.CategoriaService.list();
      this.categorias = data.map(item => {
        return { text: item.descricao, value: item.id };
      });
    }
  },

  created() {
    this.getDados();
    this.getCategoriasDados();
  }
};
</script>