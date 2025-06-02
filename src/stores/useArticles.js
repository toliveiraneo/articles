import { defineStore } from 'pinia';
import { getArticles } from 'src/api/articles';

export const useArticles = defineStore('article', {
  state: () => ({
    pages: {},
    pagesFiltered: {},
    currentPage: 1,
    loading: false,
    hasMorePages: true,
    searchTerm: '',
  }),

  getters: {
    currentArticles(state) {
      return state.pages[state.currentPage] || [];
    },

    filteredArticles(state) {
      return state.pagesFiltered[state.currentPage] || [];
    },
  },

  actions: {
    async loadArticles() {
      const sizePage = 10;

      this.loading = true;

      try {
        const response = await getArticles();

        for (let i = 0; i < response.length; i += sizePage) {
          const paginaIndex = Math.floor(i / sizePage) + 1;
          this.pages[`${paginaIndex}`] = response.slice(i, i + sizePage);
        }

        this.currentPage = 1;
      } catch (erro) {
        console.error('Erro ao carregar página:', erro);
      } finally {
        this.loading = false;
      }
    },

    async loadPage(page = 1) {
      this.currentPage = page;

      const articlesActual =
        Object.keys(this.pagesFiltered).length > 0 ? this.pagesFiltered : this.pages;

      if (!articlesActual[page + 1] || articlesActual[page + 1].length === 0) {
        this.hasMorePages = false;

        return;
      }

      this.hasMorePages = true;
    },

    async findArticles() {
      this.currentPage = 1;

      if (!this.searchTerm) {
        this.pagesFiltered = {};

        return;
      }

      const sizePage = 10;
      this.loading = true;

      const term = this.searchTerm.toLowerCase();

      let filteredArticles = [];

      for (const page in this.pages) {
        const articles = this.pages[page];
        const filtered = articles.filter((article) => article.title.toLowerCase().includes(term));

        filteredArticles = [...filteredArticles, ...filtered];
      }

      if (filteredArticles.length === 0) {
        this.loading = false;

        return;
      }

      for (let i = 0; i < filteredArticles.length; i += sizePage) {
        const paginaIndex = Math.floor(i / sizePage) + 1;
        this.pagesFiltered[`${paginaIndex}`] = filteredArticles.slice(i, i + sizePage);
      }

      this.loading = false;

      if (
        !this.pagesFiltered[this.currentPage + 1] ||
        this.pagesFiltered[this.currentPage + 1].length === 0
      ) {
        this.hasMorePages = false;

        return;
      }

      this.hasMorePages = true;
    },
  },

  reset() {
    this.pages = {};
    this.currentPage = 1;
    this.hasMorePages = true;
    this.searchTerm = '';
  },
});
