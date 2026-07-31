import { mount } from 'svelte';
import ButtonColorStatesFixture from './button-color-states-fixture.svelte';

const target = document.getElementById('app');

if (!target) throw new Error('Button color-state fixture target is missing.');

mount(ButtonColorStatesFixture, { target });
