import { c as createComponent, d as createAstro, j as renderComponent, r as renderTemplate } from '../../../chunks/astro/server_DjoNCGGn.mjs';
import { $ as $$Layout } from '../../../chunks/Layout_DIvdBwhG.mjs';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { L as Loader } from '../../../chunks/Loader_Cja5eXk5.mjs';
import { E as ErrorContainer } from '../../../chunks/ErrorContainer_DpBOuGjG.mjs';
import { useState, useEffect } from 'react';
import { B as BASE_API_URL } from '../../../chunks/config_DNmv_r6N.mjs';
/* empty css                                                */
export { renderers } from '../../../renderers.mjs';

function usePokemonsOnLocation(id, versionGroup) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function fetchLocation() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_API_URL}/location/${id}/${versionGroup}`);
        if (!res.ok) {
          const err = await res.json();
          setError({
            status: res.status,
            message: err.error || "Error loading location"
          });
        } else {
          const json = await res.json();
          setData(json);
        }
      } catch (e) {
        setError({
          status: 500,
          message: e.message
        });
      } finally {
        setIsLoading(false);
      }
    }
    fetchLocation();
  }, [id, versionGroup]);
  return { data, isLoading, error };
}

const PokemonCard = ({ pokemon }) => {
  return /* @__PURE__ */ jsxs(
    "a",
    {
      href: `/pokemon/${pokemon.id}`,
      style: {
        backgroundColor: pokemon.colors.lighter,
        border: `2px solid ${pokemon.colors.darkest}`
      },
      className: "pokemon-card",
      children: [
        /* @__PURE__ */ jsxs("header", { className: "pokemon-card-header", children: [
          /* @__PURE__ */ jsxs("div", { className: "pokemon-card-header-data", children: [
            /* @__PURE__ */ jsx(
              "h3",
              {
                style: { color: pokemon.colors.darkest },
                className: "pokemon-name",
                children: pokemon.name
              }
            ),
            /* @__PURE__ */ jsxs(
              "p",
              {
                style: { color: pokemon.colors.darkest },
                className: "pokemon-level-range",
                children: [
                  "Level ",
                  pokemon.minLevel === pokemon.maxLevel ? pokemon.minLevel : `${pokemon.minLevel} - ${pokemon.maxLevel}`
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "p",
              {
                className: `pokemon-chance ${pokemon.chance < 20 ? "pokemon-chance-very-low" : pokemon.chance < 40 ? "pokemon-chance-low" : pokemon.chance < 60 ? "pokemon-chance-medium" : pokemon.chance < 80 ? "pokemon-chance-high" : "pokemon-chance-very-high"}`,
                children: [
                  pokemon.chance,
                  "%"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "pokemon-games-container", children: pokemon.games.map((game) => /* @__PURE__ */ jsx(
            "div",
            {
              style: { color: pokemon.colors.darkest },
              className: "pokemon-game",
              children: game
            },
            game
          )) })
        ] }),
        /* @__PURE__ */ jsx("aside", { className: "pokemon-card-aside", children: /* @__PURE__ */ jsx("div", { className: "pokemon-card-img-container", children: /* @__PURE__ */ jsx(
          "img",
          {
            className: "pokemon-card-img",
            src: pokemon.img,
            alt: pokemon.name
          }
        ) }) })
      ]
    }
  );
};

const LocationPage = ({ id, versionGroup }) => {
  const { data, isLoading, error } = usePokemonsOnLocation(id, versionGroup);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    isLoading && /* @__PURE__ */ jsx(Loader, {}),
    error && /* @__PURE__ */ jsx(ErrorContainer, { error }),
    data && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("div", { className: "location-info-container", children: [
        /* @__PURE__ */ jsxs("h1", { className: "location-title", children: [
          data.location.replaceAll("-", " "),
          /* @__PURE__ */ jsx("span", { className: "version-group", children: versionGroup.replace("_", "&").replace("-", " ") })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "pokemon-quantity", children: [
          data.pokemonCount,
          " Pokemon"
        ] })
      ] }),
      Object.entries(data.pokemons).map(([method, groups]) => /* @__PURE__ */ jsxs("section", { className: "encounter-method-section", children: [
        /* @__PURE__ */ jsx("h2", { className: "encounter-method-name", children: method.replaceAll("-", " ") }),
        Object.entries(groups).map(([conditionValue, pokemons]) => /* @__PURE__ */ jsxs("main", { className: "encounter-condition-container", children: [
          conditionValue !== "none" && /* @__PURE__ */ jsx("h3", { className: "encounter-condition-name", children: conditionValue.replaceAll("-", " ") }),
          /* @__PURE__ */ jsx("div", { className: "pokemons-container", children: pokemons.map((pokemon) => /* @__PURE__ */ jsx(PokemonCard, { pokemon }, pokemon.id)) })
        ] }, conditionValue))
      ] }, method))
    ] })
  ] });
};

const $$Astro = createAstro();
const prerender = false;
const $$versionGroup = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$versionGroup;
  const { id, versionGroup } = Astro2.params;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `Location - ${versionGroup}` }, { "default": ($$result2) => renderTemplate`${id && versionGroup && renderTemplate`${renderComponent($$result2, "LocationPage", LocationPage, { "client:load": true, "id": id, "versionGroup": versionGroup, "client:component-hydration": "load", "client:component-path": "src/components/location/pokemons/LocationPage.tsx", "client:component-export": "LocationPage" })}`}` })}`;
}, "C:/Users/Tobias/Desktop/Proyectos/datadex/frontend/src/pages/location/[id]/[versionGroup].astro", void 0);

const $$file = "C:/Users/Tobias/Desktop/Proyectos/datadex/frontend/src/pages/location/[id]/[versionGroup].astro";
const $$url = "/location/[id]/[versionGroup]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$versionGroup,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
