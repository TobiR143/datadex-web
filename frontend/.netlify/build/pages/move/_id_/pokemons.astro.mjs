import { c as createComponent, d as createAstro, j as renderComponent, r as renderTemplate } from '../../../chunks/astro/server_DjoNCGGn.mjs';
import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { P as PokemonCard } from '../../../chunks/PokemonCard_DA-ufatT.mjs';
import { L as LearnType } from '../../../chunks/types_DFBlDKFT.mjs';
/* empty css                                          */
import { useState, useEffect } from 'react';
import { B as BASE_API_URL } from '../../../chunks/config_DNmv_r6N.mjs';
import { L as Loader } from '../../../chunks/Loader_Cja5eXk5.mjs';
import { E as ErrorContainer } from '../../../chunks/ErrorContainer_DpBOuGjG.mjs';
import { $ as $$Layout } from '../../../chunks/Layout_DIvdBwhG.mjs';
export { renderers } from '../../../renderers.mjs';

const HeaderSelector = ({ onSelect, selectedLearnType }) => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "header-learn-type-selector", children: Object.entries(LearnType).map(([key, learnType]) => /* @__PURE__ */ jsx(
      "button",
      {
        style: key === selectedLearnType ? { color: "#641a1a", backgroundColor: "#a35252" } : { color: "#701c1c", backgroundColor: "#da7c7cff" },
        className: "header-learn-type",
        onClick: () => onSelect(key),
        children: learnType
      },
      key
    )) }),
    /* @__PURE__ */ jsx("hr", { style: { width: "100%" } })
  ] });
};

const useHeaderSelector = () => {
  const [selectedLearnType, setSelectedLearnType] = useState("level-up");
  const handleSelect = (key) => {
    setSelectedLearnType(key);
  };
  return {
    selectedLearnType,
    setSelectedLearnType,
    handleSelect
  };
};

function usePokemonsWhoLearnMove(idMove) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function fetchPokemons() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_API_URL}/move/${idMove}`);
        if (!res.ok) {
          const errJson = await res.json();
          setError({
            status: res.status,
            message: errJson.error || "Error loading pokemons"
          });
          setData(null);
          return;
        }
        const json = await res.json();
        setData(json);
        setError(null);
      } catch (e) {
        setError({
          status: 500,
          message: e.message || "Unknown error"
        });
        setData(null);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPokemons();
  }, [idMove]);
  return { data, isLoading, error };
}

const PokemonsPage = ({ idMove }) => {
  const { data, isLoading, error } = usePokemonsWhoLearnMove(idMove);
  const { selectedLearnType, handleSelect } = useHeaderSelector();
  return /* @__PURE__ */ jsx(Fragment, { children: isLoading ? /* @__PURE__ */ jsx(Loader, {}) : error ? /* @__PURE__ */ jsx(ErrorContainer, { error }) : data && /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("header", { className: "header-move-learn-type-selector", children: [
      /* @__PURE__ */ jsxs("h1", { className: "header-move-pokemons-title", children: [
        "Pokémon who learn",
        " ",
        /* @__PURE__ */ jsx("span", { className: "header-move-title-span", children: data.move.name.replaceAll("-", " ") }),
        " ",
        "by"
      ] }),
      /* @__PURE__ */ jsx(
        HeaderSelector,
        {
          onSelect: handleSelect,
          selectedLearnType
        }
      )
    ] }),
    /* @__PURE__ */ jsx("main", { className: "main-pokemons-learn-type", children: data.pokemons[selectedLearnType]?.length > 0 ? data.pokemons[selectedLearnType].map((pokemon) => /* @__PURE__ */ jsx(PokemonCard, { pokemon }, pokemon.id)) : /* @__PURE__ */ jsxs("p", { className: "pokemons-learn-type-no-results", children: [
      "There are no pokemons who learn",
      " ",
      data?.move.name.replaceAll("-", " "),
      " by this method"
    ] }) })
  ] }) });
};

const $$Astro = createAstro();
const prerender = false;
const $$Pokemons = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Pokemons;
  const { id } = Astro2.params;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${id} - Pokemons` }, { "default": ($$result2) => renderTemplate`${id && renderTemplate`${renderComponent($$result2, "PokemonsPage", PokemonsPage, { "client:load": true, "idMove": id, "client:component-hydration": "load", "client:component-path": "src/components/move/pokemons/PokemonsPage.tsx", "client:component-export": "PokemonsPage" })}`}` })}`;
}, "C:/Users/Tobias/Desktop/Proyectos/datadex/frontend/src/pages/move/[id]/pokemons.astro", void 0);

const $$file = "C:/Users/Tobias/Desktop/Proyectos/datadex/frontend/src/pages/move/[id]/pokemons.astro";
const $$url = "/move/[id]/pokemons";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Pokemons,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
