<template>
  <div class="q-pa-md col items-start q-gutter-md">
    <q-card class="my-card" flat bordered>
      <q-card-section horizontal class="section-card">
        <q-card-section class="col-4 flex flex-center">
          <q-img class="rounded-borders" :src="article.imageUrl" />
        </q-card-section>

        <q-card-section class="q-pt-xs">
          <div class="text-h7 q-mt-sm q-mb-xs">{{ article.title }}</div>
          <div class="text-caption text-grey summary">
            {{ article.summary.substring(0, 100) }}...
          </div>
        </q-card-section>
      </q-card-section>

      <q-separator />

      <q-card-actions class="q-pt-md">
        <router-link :to="`/${article.id}`" target="_blank" style="text-decoration: none">
          <q-btn text-color="bg-black" flat color="primary"> Ler mais </q-btn>
        </router-link>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'ArticleCard',

  components: {},

  props: {
    article: {
      type: Object,
      required: true,
      validator(value) {
        return 'title' in value && 'article' in value;
      },
    },
  },

  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.my-card {
  width: 100%;
  height: auto;
  // max-height: 60vh;
}

.q-card {
  > .section-card {
    height: 200px;
  }
}

.summary {
  overflow-y: auto;
  text-justify: auto;
}

.q-img {
  position: static;
  height: auto;
  max-height: 15vh;
}
</style>
