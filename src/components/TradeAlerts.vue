<template>
    <div v-if="trades.length" class="relative flex space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
        <p class="absolute bottom-1 right-2 mt-2 text-sm text-gray-700">Updated: {{moment(lastUpdated).format("DD/MM HH:mma")}} ({{moment(lastUpdated).fromNow()}})</p>
        <div class="py-6 sm:px-6 lg:px-8">
            <div class="px-4 sm:px-6 lg:px-8">
                <div class="sm:flex sm:items-center">
                    <div class="sm:flex-auto">
                        <h1 class="text-base font-semibold leading-6 text-gray-900">Noteworthy Option Activity {{moment(lastUpdated).format("MMM DD, YYYY")}}</h1>
                        <p v-if="!notificationsEnabled" class="mt-2 text-sm">
                            Audio Alerts: <a class="cursor-pointer font-semibold text-indigo-600 hover:text-indigo-500"  @click.stop="notificationsEnabled = true; playSound();">OFF</a>
                        </p>
                        <p v-if="notificationsEnabled" class="mt-2 text-sm">
                            Audio Alerts: <a class="cursor-pointer font-semibold text-indigo-600 hover:text-indigo-500" @click.stop="notificationsEnabled = false">ON</a>
                        </p>
                    </div>
                </div>
                <div class="mt-2 flow-root">
                    <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <table class="min-w-full divide-y divide-gray-300">
                                <thead>
                                <tr>
                                    <th scope="col"
                                        class="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                        Time
                                    </th>
                                    <th scope="col"
                                        class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Option
                                    </th>
                                    <th scope="col"
                                        class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        P/C
                                    </th>
                                    <th scope="col"
                                        class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Premium
                                    </th>
                                    <th scope="col"
                                        class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        OI
                                    </th>
                                    <th scope="col"
                                        class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Vol
                                    </th>
                                </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-200 bg-white">
                                <tr v-for="trade in trades" :key="trade.id">
                                    <td class="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">
                                        {{ moment(trade.alertTime).format("HH:mma")  }}
                                    </td>
                                    <td class=" px-2 py-2 text-sm font-medium text-gray-500">
                                        {{ formatOptionSymbol(trade.symbol) }}
                                    </td>
                                    <td class="text-center px-2 py-2 text-sm font-medium text-gray-500" :class="calcCssClassForTrade(trade)">
                                        {{ trade.putCall }}
                                    </td>
                                    <td class="text-center px-2 py-2 text-sm font-medium text-gray-500">
                                        {{ trade.lastPrice }}
                                    </td>
                                    <td class=" px-2 py-2 text-sm font-medium text-gray-500">
                                        {{ trade.openInterest }}
                                    </td>
                                    <td class=" px-2 py-2 text-sm font-medium text-gray-500">
                                        {{ trade.totalVolume }}
                                    </td>
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
import type {OptionWatchAlert} from "@/components/model/OptionWatchAlert";
import {formatOptionSymbol, getTimeUntilNextMinute} from "@/services/ComponentUtils";
import {getOptionActivityData} from "@/services/MarketDataService";

import soundMp3 from '@/assets/bell.mp3';

export default defineComponent({
    name: 'TradeAlerts',
    components: {},
    methods: {
        playSound() {
            if (this.notificationsEnabled !== true) {
                return;
            }
            // play sound
            const audio = new Audio(soundMp3);
            audio.play();
        },
        async fetchData() {
            try {
                const response = await getOptionActivityData();

                // Play alert sound on new trades
                if (this.lastUpdated && response.data.trades.length > this.trades.length) {
                    this.playSound();
                }

                this.lastUpdated = response.data.lastUpdated;
                this.trades.length = 0;
                response.data.trades.forEach((alert: OptionWatchAlert) => {
                    this.trades.push(alert);
                });
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
        const trades = ref([] as OptionWatchAlert[]);
        const lastUpdated = ref();
        const notificationsEnabled = ref(false);

        const calcCssClassForTrade = (trade:OptionWatchAlert) => {
            return trade.putCall.toLowerCase() === "put" ? "bg-red-50" : "bg-green-50";
        }

        return {
            trades,
            lastUpdated,
            moment,
            calcCssClassForTrade,
            formatOptionSymbol,
            notificationsEnabled
        }
    }
})
</script>

<style scoped>


</style>
