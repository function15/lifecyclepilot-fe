<template>

  <div class="flex min-h-full flex-col">
    <div class="mx-auto flex w-full max-w-7xl items-start gap-x-8 px-4 py-10 sm:px-6 lg:px-8">
      <main class="flex-1">
        <div class="article bg-white px-3 py-3 sm:px-6 sm:py-6 md:py-6">
          <div class="mx-auto max-w-3xl text-base text-gray-800">
            <p v-if="category" class="hidden text-base font-semibold leading-7 text-indigo-600">{{category}}</p>
            <h1 v-if="title" class="mt-2 mb-4 text-3xl sm:text-5xl font-semibold">{{title}}</h1>
            <figure class="pb-4">
              <figcaption v-if="author" class="hidden mt-4 flex gap-x-1 text-sm leading-6 text-gray-500">
                By <u>{{author}}</u> {{authorTitle}}
              </figcaption>
              <figcaption v-if="formattedDate" class="flex gap-x-2 text-sm leading-6 text-gray-500">
                Published {{ formattedDate }}
              </figcaption>
            </figure>

            <p v-if="blurb" class="pb-4 italic" v-html="blurb"></p>

            <figure v-if="image" class="pt-4 pb-8">
              <img class="aspect-video rounded-xl bg-gray-50 object-cover"
                   :src="image"
                   :alt="title"/>
              <figcaption class="mt-4 flex gap-x-2 text-sm leading-6 text-gray-500">
                Photo Credit: <u>CHARLES PLATIAU/REUTERS</u>
              </figcaption>
            </figure>

            <div v-if="contentHtml" v-html="contentHtml"></div>

          </div>
        </div>
        <Blog :showTitle="false" :excludeSlug="slug" />
      </main>
      <aside class="top-8 hidden w-96 shrink-0 xl:block">
        <EconomicEventsAndEarnings/>
        <Headlines />
      </aside>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, ref, watch} from "vue";
import moment from "moment-timezone";
import {getMarketNewsData2} from "@/services/MarketDataService";
import {useRoute, useRouter} from "vue-router";

import { useHead } from '@unhead/vue';
import EconomicEventsAndEarnings from "@/components/EconomicEventsAndEarnings.vue";
import Blog from "@/components/Blog.vue";
import Headlines from "@/components/Headlines.vue";

export default defineComponent({
  name: 'SingleNewsPage',
  components: {
    Headlines, Blog, EconomicEventsAndEarnings
  },
  setup() {
    const route = useRoute();
    const router = useRouter();

    const category = ref();
    const title = ref();
    const author = ref();
    const authorTitle = ref();
    const blurb = ref();
    const image = ref();
    const contentHtml = ref();
    const datePublished = ref();

    const formattedDate = computed(() => {
      if(!datePublished.value) {
        return '';
      }
      return moment(datePublished.value)
          .tz(moment.tz.guess())
          .format('MMM D, YYYY h:mma z');
    });

    const fetchData = async function (slug: string) {
      try {
        const response = await getMarketNewsData2(slug);
        datePublished.value = response.data.datePublished;
        category.value = response.data.category;
        title.value = response.data.title;
        author.value = response.data.author;
        authorTitle.value = response.data.authorTitle;
        blurb.value = response.data.blurb;
        image.value = response.data.imageUrl;
        contentHtml.value = response.data.content?.replace(/\n/g, '<br/>');

        console.log("Updating page title: " + title.value);
        useHead({
          title: title.value,
          meta: [
            { name: 'description', content: blurb.value },
          ],
        })
        console.log("Update page title is completed");

      } catch (error) {
        console.error('Error fetching market news data');
        console.error(error);
        // display 404 page but don't change the URL
        await router.replace({name: '404', params: {resource: 'news'}});
      }
    }

    onMounted(async () => {
      if (!route.params.slug) {
        return;
      }
      await fetchData(route.params.slug as string);
    })

    // watch route changes
    watch(() => route.params.slug, async (slug) => {
      if (!slug) {
        return;
      }
      // TODO: expand existing article instead of redirect
      console.log("Route changed to: " + slug);
      window.location.href = '/news/' + slug;
    })

    return {
      formattedDate,
      affLink: '',
      category,
      title,
      author,
      authorTitle,
      blurb,
      image,
      contentHtml,
      datePublished,
      slug: route.params.slug + "",
    }
  }
})
</script>
