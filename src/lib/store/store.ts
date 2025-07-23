import { createDialog } from 'svelte-headlessui';
import { writable } from 'svelte/store';

const dialog = createDialog();

export const newDialog = writable(dialog);
export const openSidebar = writable(false);
export const isLoading = writable(false);
export const selected = writable(0);
export const selectAction = writable('Started');
export const selectedUsers = writable([]);
export const selectTeam = writable([]);
