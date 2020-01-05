<template>

  <v-data-table  :headers="headers" :items="items"  :items-per-page="10" class="caption">
   
    <template v-slot:top>
            <v-toolbar flat>
              <div class="flex-grow-2"></div>
              <v-toolbar-title class="subtitle">{{titulo}}</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
          </template>
    
    <template v-slot:item.action="{ item }">
      <slot name="acoes" :item="item"></slot>
    </template>


    <template v-slot:item.categoria.descricao="{ item }">
           <v-chip  color="red" small="" >{{ item.categoria.descricao }}</v-chip>
    </template>


    
  </v-data-table>

</template>
<script>
export default {
  name: "TableComponent",
  props: ["headers", "items", "titulo"],
 
};
</script>
