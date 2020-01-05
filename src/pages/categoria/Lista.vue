<template>
  <v-container fluid>
    <v-col>
      <title-component titulo="Categorias" />
    </v-col>
    <v-col>
      <v-btn color="success" class="mr-4" to="/categorias/cadastro">Adicionar</v-btn>
    </v-col>

    <table-component :headers="headers" :items="categorias">
      <template v-slot:acoes="{ item }">
        <v-icon class="mr-2" @click="atualizar(item.id)">mdi-table-edit</v-icon>
        <v-icon class="mr-2" @click="showModalDelete(item)">mdi-delete</v-icon>
      </template>
    </table-component>

    <modal-delete
      :dialog="show"
      @fechar="show = false"
      @deletar="deletar($event)"
      :item="categoria"
    />
  </v-container>
</template>
<script>
/* tslint:disable */
import ModalDelete from "@/components/modal/ModalDelete";
import TitleComponent from "@/components/title/TitleComponent";
import TableComponent from "@/components/table/TableComponent";
import CategoriaService from "@/service/categoria/CategoriaService";

export default {
  name: "Categorias",
  components: {
    ModalDelete,
    TitleComponent,
    TableComponent
  },
  data() {
    return {
       categorias: [],
      CategoriaService: new CategoriaService(),
      headers: [
        {
          text: "Id",
          value: "id",
           width: "03%"
        },

        {
          text: "Categoria",
          value: "descricao"
        },
        {
          text: "Ações",
          value: "action",
          width: "10%"
        }
      ],
     
      show: false,
      categoria: {}
    };
  },

  methods: {
    showModalDelete(item) {
      this.categoria = item;
      this.show = true;
    },
    atualizar(id) {
      this.$router.push({ path: `/categorias/editar/${id}` });
    },
    async deletar(item) {
      await this.CategoriaService.remove(item.id);
      this.$toasted.global.defaultSuccess();
      this.getCategoriasDados();
    },

    async getCategoriasDados() {
      const data = await this.CategoriaService.list();
      this.categorias = data
    }
  },

  created() {
    this.getCategoriasDados();
  }
};
</script>