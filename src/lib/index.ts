import { BsDash } from 'svelte-icons-pack/bs';
import {
	RiArrowsArrowDownSLine,
	RiArrowsArrowUpDoubleLine,
	RiArrowsArrowUpSLine
} from 'svelte-icons-pack/ri';

export const formatDate = (date: any) => {
	// Get the month, day, and year
	const month = date.toLocaleString('en-US', { month: 'short' });
	const day = date.getDate();
	const year = date.getFullYear();

	const formattedDate = `${day}-${month}-${year}`;

	return formattedDate;
};

export function dateFormatter(dateString: any) {
	const inputDate: any = new Date(dateString);

	if (isNaN(inputDate)) {
		return 'Invalid Date';
	}

	const year = inputDate.getFullYear();
	const month = String(inputDate.getMonth() + 1).padStart(2, '0');
	const day = String(inputDate.getDate()).padStart(2, '0');

	const formattedDate = `${year}-${month}-${day}`;
	return formattedDate;
}

export function getInitials(fullName: string) {
	const names = fullName.split(' ');

	const initials = names.slice(0, 2).map((name) => name[0].toUpperCase());

	const initialsStr = initials.join('');

	return initialsStr;
}

export const PRIOTITYSTYLES: any = {
	high: 'text-red-600',
	medium: 'text-yellow-600',
	low: 'text-blue-600'
};

export const TASK_TYPE: any = {
	todo: 'bg-blue-600',
	'in progress': 'bg-yellow-600',
	completed: 'bg-green-600'
};

export const BGS: any = ['bg-blue-600', 'bg-yellow-600', 'bg-red-600', 'bg-green-600'];

export const LISTS = ['TODO', 'IN PROGRESS', 'COMPLETED'];

export const PRIORITY = ['HIGH', 'MEDIUM', 'NORMAL', 'LOW'];

export const ICONS: any = {
	high: RiArrowsArrowUpDoubleLine,
	normal: BsDash,
	medium: RiArrowsArrowUpSLine,
	low: RiArrowsArrowDownSLine
};
