import {deleteHost, insertRating, loadByCredentials, loadById, signHost} from "./repository.mjs";
import {createToken} from "../../lib/security.mjs";

export async function register(host) {
    if (!host.id) return signHost(host);
}

export async function login({email, password}) {
    const host = await loadByCredentials(email, password);
    if (host) return {
        token: createToken(host),
        ...host
    };
    return null;
}

export async function getHost(id) {
    return loadById(id);
}

export async function removeHost(id){
    return deleteHost(id);
}
export async function saveRating(host, rating) {
    return insertRating(host, rating);
}