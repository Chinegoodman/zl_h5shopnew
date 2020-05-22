// export default {
//     // randomfn: (val) => {
//     //     return Math.random();
//     // },
//     setStorage: (key, val) => {
//         localStorage.setItem(key, val);
//     },
//     getStorage: (key) => {
//         return localStorage.getItem(key) || null;
//     }
// }
export function setlocalStorage(name, val) {
    if (!name) return;
    window.localStorage.setItem(name, JSON.stringify(val));
}
export function getlocalStorage(name) {
    if (!name) return;
    return JSON.parse(window.localStorage.getItem(name));
}
export function removelocalStorage(name) {
    if (!name) return;
    window.localStorage.removeItem(name);
}
export function setsessionStorage(name, val) {
    if (!name) return;
    window.sessionStorage.setItem(name, JSON.stringify(val));
}
export function getsessionStorage(name) {
    if (!name) return;
    return JSON.parse(window.sessionStorage.getItem(name));
}
export function removesessionStorage(name) {
    if (!name) return;
    window.sessionStorage.removeItem(name);
}