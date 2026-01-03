<template>
  <div v-if="marketNews.length" class="bg-white px-3 py-8 sm:py-8 sm:px-6">
    <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Headlines</h2>
    <div class="space-y-20 lg:mt-8 lg:space-y-20">
            <div class="divide-y divide-gray-200 bg-white">
              <div v-for="news in marketNews" :key="news.link" :class="{'bg-gray-100': news.seen, 'bg-white': !news.seen}" class="flex items-center hover:cursor-pointer" v-on:click.stop="goToLink(news.link)">
                <div v-if="news.img" class="flex-none pl-2 py-2 pr-2 text-xs text-gray-500 whitespace-nowrap">
                  <img :alt="news.text" :src="news.img" class="w-10 rounded-full" />
                </div>
                <div class="flex-shrink px-2 py-2 text-xs text-gray-500">
                  {{ moment(news.timestamp).format('HH:mma') }}
                </div>
                <div class="flex-grow px-2 py-2 text-xs text-gray-500 content-start ">
                  {{ news.text }}
                </div>
              </div>
            </div>
          </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import moment from 'moment-timezone';
import {getTimeUntilNextMinute} from "@/services/ComponentUtils";
import {getMarketNewsData} from "@/services/MarketDataService";
import type {MarketNews} from "@/components/model/MarketNews";

export default defineComponent({
    name: 'Headlines',
    components: {},
    methods: {
        async fetchData() {
            try {
                const response = await getMarketNewsData();
                let list = response.data;

                // mark old items as seen
                list.forEach((item: MarketNews) => {
                    if (this.marketNews.some((news: MarketNews) => news.link === item.link)) {
                        item.seen = true;
                    }
                });

                this.marketNews.length = 0;
                this.marketNews.push(...list);
            } catch (error) {
                console.error(error);
            }
        }
    },
    mounted() {
        this.fetchData();
        setTimeout(() => {
            // Schedule the query to run every minute after the initial run
            setInterval(this.fetchData, 65 * 1000);
        }, getTimeUntilNextMinute());
    },
    setup() {
        moment.tz.setDefault('America/New_York');
        const marketNews = ref([] as MarketNews[]);

        return {
            marketNews,
            moment,
            goToLink: (link: string) => {
                window.open(link, '_blank');
            }
        }
    }
})
</script>

<style scoped>


</style>
