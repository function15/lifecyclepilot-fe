<template>
    <div v-if="earnings.length" class="pt-4">
        <div class="sm:flex sm:items-center">
            <div class="sm:flex-auto">
              <p class="mt-3 text-lg leading-8 text-gray-600">Noteworthy Earnings {{moment(lastUpdated).format("MMM DD, YYYY")}}</p>
            </div>
        </div>
        <div class="mt-2 flow-root">
            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <p class="mt-2 text-sm text-gray-700 font-bold">{{ printEarnings() }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import moment from 'moment-timezone';
import type {Earnings} from "@/components/model/Earnings";
import {getEarningsData} from "@/services/MarketDataService";

export default defineComponent({
    name: 'EarningReports',
    components: {},
    methods: {
        async fetchData() {
            try {
                const response = await getEarningsData();
                this.lastUpdated = response.data.lastUpdated;
                this.earnings.length = 0
                response.data.earnings.forEach((e: Earnings) => {
                    this.earnings.push(e);
                });
            } catch (error) {
                console.error(error);
            }
        }
    },
    mounted() {
        this.fetchData();
    },
    setup() {
        moment.tz.setDefault('America/New_York');
        const earnings = ref([] as Earnings[]);
        const lastUpdated = ref();

        const printEarnings = () => {
            const list = [] as string[];

            earnings.value.forEach((e: Earnings) => {
                // list.push("$" + e.ticker);
                list.push(e.ticker);
            });

            return list.join(', ');
        };

        return {
            earnings,
            lastUpdated,
            moment,
            printEarnings
        }
    }
})
</script>

<style scoped>


</style>
