<template>
    <div class="relative flex space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
        <p class="absolute bottom-1 right-2 mt-2 text-sm text-gray-700">Updated: {{moment(lastUpdated).format("DD/MM HH:mma")}} ({{moment(lastUpdated).fromNow()}})</p>
        <div class="mx-auto py-6 sm:px-6 lg:px-8">
            <div class="px-4 sm:px-6 lg:px-8">
                <div class="sm:flex sm:items-center">
                    <div class="sm:flex-auto">
                        <h1 class="text-base font-semibold leading-6 text-gray-900 capitalize">Unusual {{putCall?.toLowerCase()}}s</h1>
                    </div>
                </div>
                <div class="mt-2 flow-root">
                    <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <table class="min-w-full divide-y divide-gray-300">
                                <thead>
                                <tr>
                                    <th scope="col" class="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Symbol</th>
                                    <th scope="col" class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">DTE</th>
                                    <th scope="col" class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">Strike</th>
                                    <th scope="col" class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">OI</th>
                                    <th scope="col" class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">Vol</th>
                                </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-200 bg-white">
                                <tr v-for="option in options" :key="option.id">
                                    <td class=" py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">{{ formatOptionSymbol(option.symbol) }}</td>
                                    <td class=" px-2 py-2 text-sm font-medium text-gray-900">{{ option.daysToExpiration }}</td>
                                    <td class=" px-2 py-2 text-sm font-medium text-gray-900">{{ option.strikePrice }}</td>
                                    <td class=" px-2 py-2 text-sm font-medium text-gray-900">{{ option.openInterest }}</td>
                                    <td class=" px-2 py-2 text-sm font-medium text-gray-900">{{ option.totalVolume }}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script lang="ts">
import {defineComponent, ref} from "vue";
import moment from 'moment-timezone';
import type {OptionData} from "@/components/model/OptionData";
import {formatOptionSymbol, getTimeUntilNextMinute} from "@/services/ComponentUtils";
import {getUnusualCallsData, getUnusualPutsData} from "@/services/MarketDataService";

export default defineComponent({
    name: 'UnusualOptions',
    components: {},
    props: {
        putCall: {
            type: String
        }
    },
    methods: {
        async fetchData() {
            try {
                const response = this.putCall?.toLowerCase() === "put" ?
                    await getUnusualPutsData() :
                    await getUnusualCallsData();
                this.lastUpdated = response.data.lastUpdated;
                // remove old data
                this.options.length = 0;
                let expDateToOptionList = response.data.options;
                for (let key in expDateToOptionList) {
                    let array = expDateToOptionList[key];
                    array.forEach((data: OptionData) => {
                        data.id = (data.symbol + data.strikePrice);
                        const daysToExpStr = key.split(":")[1];
                        data.daysToExpiration = daysToExpStr ? Number.parseInt(daysToExpStr) : 0;
                        this.options.push(data);
                    });
                    // sort options by volume
                    this.options.sort((a: OptionData, b: OptionData) => {
                        return b.totalVolume - a.totalVolume;
                    });
                }
            } catch (error) {
                console.error(error);
            }
        },

    },
    mounted() {
        this.fetchData();
        setTimeout(() => {
            // Schedule the query to run every 10 minutes after the initial run
            setInterval(this.fetchData, 10 * 60 * 1000);
        }, getTimeUntilNextMinute());
    },
    setup() {
        moment.tz.setDefault('America/New_York');
        const options = ref([] as OptionData[]);
        const lastUpdated = ref();

        return {
            moment,
            options,
            lastUpdated,
            formatOptionSymbol
        }
    }
})
</script>

<style scoped>


</style>
