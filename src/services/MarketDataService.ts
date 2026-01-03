import axios from "axios";
import {
    SOURCE_URL_EARNINGS,
    SOURCE_URL_ECONOMIC_EVENTS, SOURCE_URL_HOMEPAGE_DATA,
    SOURCE_URL_LAST_MINUTE_DATA, SOURCE_URL_MARKET_NEWS_DATA, SOURCE_URL_DATA_NEWS_PREFIX,
    SOURCE_URL_NOTEWORTHY_OPTIONS_ACTIVITY, SOURCE_URL_UNUSUAL_OPTIONS_CALLS, SOURCE_URL_UNUSUAL_OPTIONS_PUTS
} from "@/Constants";
import {slugToPath} from "@/services/ComponentUtils";

export function getEarningsData() {
    const url = SOURCE_URL_EARNINGS + '?t=' + new Date().getTime();
    return axios.get(url, {
        headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
        }
    });
}

export function getEconomicEventsData() {
    const url = SOURCE_URL_ECONOMIC_EVENTS + '?t=' + new Date().getTime();
    return axios.get(url, {
        headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
        }
    });
}

export function getLastMinuteData() {
    const url = SOURCE_URL_LAST_MINUTE_DATA + '?t=' + new Date().getTime();
    return axios.get(url, {
        headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
        }
    });
}

export function getOptionActivityData() {
    const url = SOURCE_URL_NOTEWORTHY_OPTIONS_ACTIVITY + '?t=' + new Date().getTime();
    return axios.get(url, {
        headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
        }
    });
}

export function getUnusualPutsData() {
    const url = SOURCE_URL_UNUSUAL_OPTIONS_PUTS + '?t=' + new Date().getTime();
    return axios.get(url, {
        headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
        }
    });
}

export function getUnusualCallsData() {
    const url = SOURCE_URL_UNUSUAL_OPTIONS_CALLS + '?t=' + new Date().getTime();
    return axios.get(url, {
        headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
        }
    });
}

export function getMarketNewsData() {
    const url = SOURCE_URL_MARKET_NEWS_DATA + '?t=' + new Date().getTime();
    return axios.get(url, {
        headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
        }
    });
}

export function getMarketNewsData2(slug:string) {
    //
    const url = SOURCE_URL_DATA_NEWS_PREFIX + slugToPath(slug);
    return axios.get(url, {
        headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
        }
    });
}

export function getHomepageData() {
    return axios.get(SOURCE_URL_HOMEPAGE_DATA, {
        headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
        }
    });
}

/**
 * Should be called with a date in the format YYYY-MM-DD
 *
 * @param date
 */
export function getDayData(date:string) {
    const datePart = date.replace(/-/g, '/') + '/';
    return axios.get(SOURCE_URL_DATA_NEWS_PREFIX + datePart + 'index.json', {
        headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
        }
    });
}



