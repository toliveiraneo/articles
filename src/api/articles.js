import { api } from 'src/boot/axios';

export async function getArticles() {
  try {
    const articles = await api.get('/?limit=50');

    const articlesFormated = articles.data.results.map((article) => ({
      id: article.id,
      title: article.title,
      summary: article.summary,
      imageUrl: article.image_url,
    }));

    return articlesFormated;
  } catch (error) {
    console.error('Erro ao consultar artigos:', error);

    throw error;
  }
}

export async function getArticle(id) {
  try {
    const articles = await api.get('/' + id);

    const articlesFormated = {
      id: articles.data.id,
      title: articles.data.title,
      summary: articles.data.summary,
      imageUrl: articles.data.image_url,
    };

    return articlesFormated;
  } catch (error) {
    console.error('Erro ao consultar artigos:', error);

    throw error;
  }
}
