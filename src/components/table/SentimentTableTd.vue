<template>
    <td class="text-center px-2 py-2 text-sm font-medium text-gray-900 w-16"
        :class="{'updated-cell-green': valueChanged && probability > 0, 'updated-cell-red': valueChanged && probability < 0, 'bg-green-400': probability > 0, 'bg-red-400': probability < 0, 'bg-gray-100': probability === 0}">
        {{ probabilityToText() }}
    </td>
</template>

<script lang="ts">
import {defineComponent, ref, watch} from "vue";
import type {EconomicEvent} from "@/components/model/EconomicEvent";

export default defineComponent({
    name: 'SentimentTableTd',
    components: {},
    props: {
        probability: {
            type: Number,
            default: 0
        }
    },
    setup(props) {
        const events = ref([] as EconomicEvent[]);
        const valueChanged = ref(false);

        watch(() => props.probability, (newValue, oldValue) => {
            if (newValue !== oldValue) {
                valueChanged.value = true;
                setTimeout(() => {
                    valueChanged.value = false;
                }, 1000)
            }
        });

        const probabilityToText = () => {
            if (props.probability > 0) {
                return "↑";
            }
            if (props.probability < 0) {
                return "↓";
            }
            return "-"
        };

        return {
            events,
            probabilityToText,
            valueChanged
        }
    }
})
</script>

<style scoped>

@keyframes flash-green {
    0% {
        background-color: #ffffff;
    }
    50% {
        --tw-bg-opacity: 1;
        background-color: rgb(187 247 208 / var(--tw-bg-opacity));
    }
    100% {
        --tw-bg-opacity: 1;
        background-color: rgb(74 222 128 / var(--tw-bg-opacity));
    }
}

@keyframes flash-red {
    0% {
        background-color: #ffffff;
    }
    50% {
        --tw-bg-opacity: 1;
        background-color: rgb(254 202 202 / var(--tw-bg-opacity));
    }
    100% {
        --tw-bg-opacity: 1;
        background-color: rgb(248 113 113 / var(--tw-bg-opacity));
    }
}

.updated-cell-green {
    animation: flash-green 1s linear forwards;
}

.updated-cell-red {
    animation: flash-red 1s linear forwards;
}

</style>
