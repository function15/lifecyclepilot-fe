<template>
    <div class="relative flex space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
        <p class="absolute bottom-1 right-2 mt-2 text-sm text-gray-700">Updated: {{moment(lastMinuteData.lastUpdated).format("DD/MM HH:mma")}} ({{moment(lastMinuteData.lastUpdated).fromNow()}})</p>
        <div class="py-6 sm:px-6 lg:px-8">
            <div class="px-4 sm:px-6 lg:px-8">
                <div class="sm:flex sm:items-center">
                    <div class="sm:flex-auto">
                        <h1 class="text-base font-semibold leading-6 text-gray-900">Market Snapshot</h1>
                    </div>
                </div>
                <div class="mt-2 flow-root">
                    <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <table class="min-w-full divide-y divide-gray-300">
                                <tbody class="divide-y divide-gray-200 bg-white">
                                <tr>
                                    <td class="py-2 pl-0 pr-3 text-sm text-gray-500 ">SPX: </td>
                                    <SentimentTableTd :probability="lastMinuteData.spxProbability" />
                                    <td class="py-2 pl-4 pr-3 text-sm text-gray-500 ">TICK: </td>
                                    <SentimentTableTd :probability="lastMinuteData.tickProbability" />
                                    <td class="py-2 pl-4 pr-3 text-sm text-gray-500 ">ADD: </td>
                                    <SentimentTableTd :probability="lastMinuteData.advMinusDeclProbability" />
                                </tr>
                                <tr>
                                    <td class="py-2 pl-0 pr-3 text-sm text-gray-500 ">VIX: </td>
                                    <SentimentTableTd :probability="lastMinuteData.vixProbability" />
                                    <td class="py-2 pl-4 pr-3 text-sm text-gray-500 ">DXY: </td>
                                    <SentimentTableTd :probability="lastMinuteData.dxyProbability" />
                                    <td class="py-2 pl-4 pr-3 text-sm text-gray-500 ">US10Y: </td>
                                    <SentimentTableTd :probability="lastMinuteData.tenYrProbability" />
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="sm:flex sm:items-center pt-6">
                    <table  class="min-w-full divide-y divide-gray-300">
                      <tbody>
                        <tr>
                            <td colspan="1" class="py-2 pl-0 pr-3 text-sm text-gray-700">Sentiment:</td>
                            <td colspan="4" class="text-center px-2 py-2 text-sm font-medium text-gray-900 w-16"
                                :class="sentimentCssClass()">
                                {{sentimentToText()}}
                            </td>
                        </tr>
                      </tbody>
                    </table>
                </div>
                <div class="sm:flex sm:items-center">
                    <div class="sm:flex-auto">
                        <p class="mt-2 text-sm text-gray-700">0DTE OTM P/C: <HighlightedValue :value="lastMinuteData.putsOi" /> / <HighlightedValue :value="lastMinuteData.callsOi" /></p>
                        <p class="mt-2 text-sm text-gray-700">0DTE OTM P/C Ratio: <HighlightedValue :value="lastMinuteDataPcRatio" /> <span class="text-sm capitalize">({{ pcRatioSentiment }})</span> </p>
                        <p class="mt-2 text-sm text-gray-700">SPX Price: <HighlightedValue :value="lastMinuteData.spxClosePrice" /></p>
                        <p class="mt-2 text-sm text-gray-700">SPX HVLs UP: <HighlightedValue :value="spxLevelUp" :formatValue="false"/></p>
                        <p class="mt-2 text-sm text-gray-700">SPX HVLs DOWN: <HighlightedValue :value="spxLevelDown" :formatValue="false"/></p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!--                        quickfix to import css classes -->
    <span style="display: none" class="bg-green-100 bg-green-200 bg-green-300 bg-green-400 bg-green-500 bg-green-600 bg-green-700"></span>
    <span style="display: none" class="bg-red-100 bg-red-200 bg-red-300 bg-red-400 bg-red-500 bg-red-600 bg-red-700"></span>
</template>


<script lang="ts">
import {computed, defineComponent, ref} from "vue";
import moment from 'moment-timezone';
import {marketSentimentFactory} from "@/components/model/MarketSentiment";
import type {MarketSentiment} from "@/components/model/MarketSentiment";
import SentimentTableTd from "@/components/table/SentimentTableTd.vue";
import HighlightedValue from "@/components/HighlightedValue.vue";
import {getTimeUntilNextMinute} from "@/services/ComponentUtils";
import {getLastMinuteData} from "@/services/MarketDataService";

export default defineComponent({
    name: 'MarketSentiment',
    components: {
        SentimentTableTd,
        HighlightedValue
    },
    methods: {
        async fetchData() {
            try {
                const response = await getLastMinuteData();
                this.lastMinuteData = response.data as MarketSentiment;
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
        // MarketSentiment
        const lastMinuteData = ref(marketSentimentFactory());
        const lastMinuteDataPcRatio = computed(() => {
            return (lastMinuteData.value.putsOi / lastMinuteData.value.callsOi) || 0;
        });
        const pcRatioSentiment = computed(() => {
            if (lastMinuteDataPcRatio.value > 1.5) {
                return "bullish";
            }
            if (lastMinuteDataPcRatio.value < 0.5) {
                return "bearish";
            }
            return "neutral";
        });
        const spxLevelUp = computed(() => {
            if (!lastMinuteData.value.levelsCalls || lastMinuteData.value.levelsCalls.length === 0) {
                return 0;
            }
            return lastMinuteData.value.levelsCalls[0] || 0;
        });
        const spxLevelDown = computed(() => {
            if (!lastMinuteData.value.levelsPuts || lastMinuteData.value.levelsPuts.length === 0) {
                return 0;
            }
            return lastMinuteData.value.levelsPuts[0] || 0;
        });

        const displayProbability = (probability:number) => {
            if(probability > 0) {
                return "UP"
            }
            if(probability < 0) {
                return "DOWN"
            }
            return "N/A"
        };

        const sentimentCssClass = () => {
            const marketSentiment = lastMinuteData.value.marketSentiment;
            if (marketSentiment > 0) {
                return ("bg-green-" + Math.abs(marketSentiment))
            }
            if (marketSentiment < 0) {
                return ("bg-red-" + Math.abs(marketSentiment))
            }

            return "bg-gray-100";
        };

        const sentimentToText = () => {
            var sentiment = "Neutral";
            if(lastMinuteData.value.marketSentiment > 0) {
                sentiment = "Bullish";
            }
            if(lastMinuteData.value.marketSentiment < 0) {
                sentiment = "Bearish";
            }
            return sentiment;
        };

        return {
            moment,
            lastMinuteData,
            displayProbability,
            sentimentToText,
            sentimentCssClass,
            lastMinuteDataPcRatio,
            pcRatioSentiment,
            spxLevelUp,
            spxLevelDown
        }
    }
})
</script>

<style scoped>

</style>
