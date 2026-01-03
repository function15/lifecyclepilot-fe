import axios from "axios";
import { getAuthCallbackUrl } from '@/services/ComponentUtils'

export function callAuthCallback(credential:string) {
    const url = getAuthCallbackUrl();
    return axios.post(url, {
        token: credential
    })
}


