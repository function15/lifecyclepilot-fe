<template>
  <div ref="scrollComponent" class="bg-white px-3 py-8 sm:py-8 sm:px-6">

          <h2 v-if="showTitle" class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Market News</h2>
          <hr v-else/>
          <div class="mt-8 space-y-6 lg:mt-16 lg:space-y-12">
            <ins class="adsbygoogle"
                 style="display:block"
                 data-ad-format="fluid"
                 data-ad-layout-key="-66+c9+1i-11+aq"
                 data-ad-client="ca-pub-2790083410445550"
                 data-ad-slot="3742429143"></ins>
          </div>
          <div class="mt-8 space-y-6 lg:mt-16 lg:space-y-12">
            <article v-for="post in posts" :key="post.slug" class="relative isolate flex flex-col sm:gap-8 lg:flex-row">
              <div @click="$router.push(`/news/${post.slug}`)" class="cursor-pointer relative lg:w-64 lg:shrink-0">
                <img v-if="post.imageUrl" :src="post.imageUrl" :alt="post.title" class="h-full w-full rounded-2xl bg-gray-50 object-cover" />
                <img v-else src="" :alt="post.title" class="h-full w-full rounded-2xl bg-gray-50 object-cover" />
                <div class="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
              </div>
              <div>
                <div class="flex items-center gap-x-4 text-xs">
                  <time :datetime="post.datePublished" class="text-gray-500">{{ formatDate(post.datePublished) }}</time>
                  <span class="hidden relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">{{ post.category }}</span>
                </div>
                <div class="group relative max-w-xl">
                  <h3 class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <a :href="'/news/' + post.slug">
                      <span class="absolute inset-0" />
                      {{ post.title }}
                    </a>
                  </h3>
                  <p class="mt-5 text-sm leading-6 text-gray-600">{{ post.blurb }}</p>
                </div>
              </div>
            </article>
          </div>

  </div>
</template>


<script lang="ts">
import {defineComponent, onMounted, ref} from "vue";
import moment from 'moment-timezone';
import {getDayData, getHomepageData} from "@/services/MarketDataService";
import type {Article} from "@/model/Article";
import { useHead } from '@unhead/vue';

export default defineComponent({
  name: 'Blog',
  components: {},
  props: {
    excludeSlug: {
      type: String,
      default: ''
    },
    showTitle: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    useHead({
      title: "Top 10 Best Stocks To Buy Now",
      meta: [
        { name: 'description', content: '' },
      ],
    })
    const posts = ref<Article[]>([]);
    const buffer = ref<Article[]>([]);

    const postsLoading = ref(false);
    const limitReached = ref(false);

    const displayNextPosts = function (count:number = 10): boolean {
      if (buffer.value.length > 0) {
        // add 10 posts from buffer to posts
        posts.value = posts.value.concat(buffer.value.splice(0, count));
        return true;
      }
      return false;
    }

    function filterArticles(data: Article[]):Article[] {
      // make sure 'excludeSlug' is not in the list
      return data.filter((article: Article) => {
        return article.slug !== props.excludeSlug;
      });
    }

    const fetchHomepageData = async function () {
      postsLoading.value = true;

      try {
        const response = await getHomepageData();
        buffer.value = filterArticles(response.data);
        displayNextPosts()
      } catch (error) {
        console.error('Error fetching homepage data');
        console.error(error);
      } finally {
        postsLoading.value = false;
      }
    }

    const fetchMorePosts = async function () {
      if (displayNextPosts()) {
        return;
      }
      postsLoading.value = true;

      try {
        const lastPost = posts.value[posts.value.length - 1];
        if (!lastPost) {
          limitReached.value = true;
          return;
        }
        // subtract 1 day from last post date
        var prevDateStr = moment.utc(lastPost.datePublished).subtract(1, 'days').format('YYYY-MM-DD');
        const response = await getDayData(prevDateStr);
        if(response.data.length === 0) {
          limitReached.value = true;
          return;
        }
        buffer.value = buffer.value.concat(response.data);
      } catch (error) {
        limitReached.value = true;
        console.error('Error fetching market news data');
        console.error(error);
      } finally {
        postsLoading.value = false;
      }
    }


    const scrollComponent = ref<null | HTMLElement>(null);
    const handleScroll = () => {
      if (postsLoading.value || limitReached.value) {
        return;
      }
      const element = scrollComponent.value;
      if (element && element.getBoundingClientRect().bottom < window.innerHeight) {
        console.log("bottom reached");
        fetchMorePosts();
      }
    };

    onMounted(async () => {
      window.addEventListener('scroll', handleScroll);
      await fetchHomepageData();
    })

    return {
      moment,
      posts,
      formatDate(date: string) {
        if(!date) {
          return '';
        }
        return moment(date)
            .tz(moment.tz.guess())
            .format('MMM D, YYYY h:mma z');
      },
      scrollComponent
    }
  }
})
</script>

<style scoped>

</style>
