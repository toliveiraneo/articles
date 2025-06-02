<template>
  <div class="q-pa-lg items-start q-gutter-lg" v-if="article">
    <q-img class="rounded-borders float-right" :src="article.imageUrl" />

    <div class="text-h4 q-mt-lg">{{ article.title }}</div>
    <div class="text-body1 text-weight-regular summary">
      {{ article.summary }}
    </div>
  </div>
</template>

<script>
import { useArticles } from 'src/stores/useArticles';
import { getArticle } from 'src/api/articles';
import { useQuasar } from 'quasar';

export default {
  name: 'ArticleCard',

  components: {},

  data() {
    return {
      store: useArticles(),
      article: null,
    };
  },

  async created() {
    this.loadArticle();
  },

  methods: {
    async loadArticle() {
      const $q = useQuasar();

      try {
        this.article = await getArticle(this.$route.params.id);
      } catch (error) {
        $q.notify({
          color: 'negative',
          position: 'top',
          message: 'Falha ao carregar formulário',
          icon: 'report_problem',
        });
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.q-img {
  max-height: auto;
  max-width: 40vw;
  height: auto;
}
</style>
