import { c as createComponent, d as createAstro, i as renderHead, j as renderComponent, r as renderTemplate } from '../../chunks/astro/server_DjoNCGGn.mjs';
import { P as PokemonCard } from '../../chunks/PokemonCard_DA-ufatT.mjs';
import { B as BASE_API_URL } from '../../chunks/config_DNmv_r6N.mjs';
/* empty css                                     */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$name = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$name;
  const { name } = Astro2.params;
  const res = await fetch(`${BASE_API_URL}/egg-group/${name}`);
  const pokemons = await res.json();
  return renderTemplate`<html lang="en" data-astro-cid-b6v6jm2h> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Egg Group - ${name}</title>${renderHead()}</head> <body data-astro-cid-b6v6jm2h> <h1 class="egg-group-page-title" data-astro-cid-b6v6jm2h>Pokemons who belongs to egg group
<span class="egg-group-page-title-span" data-astro-cid-b6v6jm2h>${name} </span> </h1> <hr data-astro-cid-b6v6jm2h> <section data-astro-cid-b6v6jm2h> ${pokemons?.length > 0 && pokemons.map((pokemon) => renderTemplate`${renderComponent($$result, "PokemonCard", PokemonCard, { "client:load": true, "pokemon": pokemon, "client:component-hydration": "load", "client:component-path": "@components/index/PokemonCard", "client:component-export": "PokemonCard", "data-astro-cid-b6v6jm2h": true })}`)} </section> </body></html>`;
}, "C:/Users/Tobias/Desktop/Proyectos/datadex/frontend/src/pages/egg-group/[name].astro", void 0);

const $$file = "C:/Users/Tobias/Desktop/Proyectos/datadex/frontend/src/pages/egg-group/[name].astro";
const $$url = "/egg-group/[name]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$name,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
