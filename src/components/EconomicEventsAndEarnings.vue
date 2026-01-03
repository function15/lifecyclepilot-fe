<template>
    <div class="bg-white px-3 py-8 sm:py-8 sm:px-6">
      <div class="sm:flex sm:items-center">
          <div class="sm:flex-auto">
              <h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Economic Events</h1>
              <p class="mt-3 text-lg leading-8 text-gray-600">Major U.S. Economic Events & Fed Speakers.</p>
          </div>
      </div>
      <div class="mt-8 flow-root">
          <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table class="min-w-full divide-y divide-gray-300">
                      <thead>
                      <tr>
                          <th scope="col" class="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Date</th>
                          <th scope="col" class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">Time</th>
                          <th scope="col" class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">Event</th>
                      </tr>
                      </thead>
                      <tbody class="divide-y divide-gray-200 bg-white">
                      <tr v-for="e in events" :key="e.id" :class="calcCssClassForEconomicEvent(e)">
                          <td class=" px-2 py-2 text-sm font-medium text-gray-900">{{ moment(e.time).format("MM/DD") }}</td>
                          <td class=" px-2 py-2 text-sm font-medium text-gray-900">{{ moment(e.time).format("HH:mma") }}</td>
                          <td class=" px-2 py-2 text-sm font-medium text-gray-900">{{ e.title }}<span v-if="e.description"> - </span>{{ e.description }}</td>
                      </tr>
                      </tbody>
                  </table>

                  <EarningReports />

              </div>
          </div>
      </div>
    </div>
</template>


<script lang="ts">
import {defineComponent, ref} from "vue";
import moment from 'moment-timezone';
import type {EconomicEvent} from "@/components/model/EconomicEvent";
import {getEconomicEventsData} from "@/services/MarketDataService";
import EarningReports from "@/components/EarningReports.vue";

export default defineComponent({
    name: 'EconomicEventsAndEarnings',
    components: {EarningReports},
    methods: {
        async fetchData() {
            try {
                const response = await getEconomicEventsData();
                this.lastUpdated = response.data.lastUpdated;
                this.events.length = 0
                response.data.economicEvents.filter((event:EconomicEvent) => {
                    // return today's and tomorrow's events
                    // return moment(event.time).isSameOrAfter(moment().startOf('day')) && moment(event.time).isSameOrBefore(moment().add(1, 'day').endOf('day'));

                    // return events for the next 3 days
                    return moment(event.time).isSameOrAfter(moment().startOf('day')) && moment(event.time).isSameOrBefore(moment().add(3, 'day').endOf('day'));
                }).forEach((event:EconomicEvent) => {
                    event.id = (event.time + event.title).replace(/\s/g, '');
                    this.events.push(event);
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
        const events = ref([] as EconomicEvent[]);
        const lastUpdated = ref();

        const calcCssClassForEconomicEvent = (e:EconomicEvent) => {
            const isInThePast = moment(e.time).isBefore(moment());
            return isInThePast ? "bg-gray-100" : "bg-white";
        }

        return {
            events,
            lastUpdated,
            moment,
            calcCssClassForEconomicEvent
        }
    }
})
</script>

<style scoped>


</style>
