<template>
  <div class="q-pa-md">
    <q-input
      bottom-slots
      v-model="store.searchTerm"
      label="Filtrar por título..."
      @keyup.enter="searchArticles"
    >
      <template v-slot:append>
        <q-icon
          v-if="store.searchTerm !== ''"
          name="close"
          @click="clearText"
          class="cursor-pointer"
        />
      </template>

      <template v-slot:after>
        <q-btn round flat icon="search" @click="searchArticles" />
      </template>
    </q-input>
    <div class="row">
      <div v-if="store.loading">Carregando...</div>

      <div v-if="!store.loading && store.currentArticles.length === 0">
        Ocorreu um erro ao carregar os artigos
      </div>

      <ArticleCard
        class="col-6"
        v-for="article in store.filteredArticles?.length > 0
          ? store.filteredArticles
          : store.currentArticles"
        :key="article.id"
        :article="article"
      />

      <div v-if="store.searchTerm && store.currentArticles.length === 0">
        Nenhum artigo encontrado.
      </div>
    </div>

    <div v-if="!store.loading" class="flex flex-center q-mt-xs">
      <q-btn
        class="bg-black"
        :disabled="store.currentPage === 1"
        @click="goToPage(store.currentPage - 1)"
        color="primary"
        icon="arrow_back"
        label="Anterior"
      />

      <span class="text-weight-bold text-h6 q-pa-md">Página {{ store.currentPage }}</span>

      <q-btn
        class="bg-black"
        :disabled="!store.hasMorePages"
        @click="goToPage(store.currentPage + 1)"
        color="primary"
        icon-right="arrow_forward"
        label="Próxima"
      />
    </div>
  </div>
</template>

<script>
import { useArticles } from '/src/stores/useArticles';
import ArticleCard from 'src/components/ArticleCard.vue';

export default {
  name: 'ArticlesPage',

  components: {
    ArticleCard,
  },

  data() {
    return {
      store: useArticles(),
    };
  },

  methods: {
    goToPage(page) {
      this.store.loadPage(page);
    },
    searchArticles() {
      this.store.findArticles();
    },
    clearText() {
      this.store.searchTerm = '';
      this.store.findArticles();
    },
  },

  mounted() {
    this.store.loadArticles();
  },
};
</script>
