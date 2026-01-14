import { goto } from '$app/navigation';
import { resolve } from '$app/paths';

const navigateTo = (href: string) => goto(resolve(href as any));

export default navigateTo;
