<template>
    <span class="text-center px-2 py-2 text-sm w-16 text-gray-900"
        :class="{'updated-cell-green': valueChanged && valueDiff > 0, 'updated-cell-red': valueChanged && valueDiff < 0}">
        {{ formattedValue }}
    </span>
</template>

<script lang="ts">
import {computed, defineComponent, ref, watch} from "vue";

export default defineComponent({
    name: 'HighlightedValue',
    components: {},
    props: {
        value: {
            type: Number,
            default: 0
        },
        formatValue: {
            type: Boolean,
            default: true
        }
    },
    setup(props) {
        const valueDiff = ref(0)
        const valueChanged = ref(false);
        const formattedValue = computed(() => {
            if (props.formatValue) {
                return new Intl.NumberFormat().format(props.value);
            }
            return props.value;
        });

        watch(() => props.value, (newValue, oldValue) => {
            if (newValue !== oldValue && oldValue !== 0) {
                valueDiff.value = newValue - oldValue;
                valueChanged.value = true;
                setTimeout(() => {
                    valueChanged.value = false;
                }, 2 * 1000)
            }
        });

        return {
            valueChanged,
            valueDiff,
            formattedValue
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
    animation: flash-green 2s linear forwards;
}

.updated-cell-red {
    animation: flash-red 2s linear forwards;
}

</style>
