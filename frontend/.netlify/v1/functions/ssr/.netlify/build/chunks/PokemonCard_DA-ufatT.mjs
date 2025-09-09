import { jsx, jsxs } from 'react/jsx-runtime';
/* empty css                         */

const PokemonCard = ({ pokemon }) => {
  return /* @__PURE__ */ jsx("a", { href: `/pokemon/${pokemon.id}`, children: /* @__PURE__ */ jsxs(
    "article",
    {
      className: "pokemon",
      style: { backgroundColor: pokemon.colors.normal, color: pokemon.colors.darkest },
      children: [
        /* @__PURE__ */ jsxs("header", { className: "pokemon-data-container", children: [
          /* @__PURE__ */ jsxs("div", { className: "pokemon-data", children: [
            /* @__PURE__ */ jsxs("p", { className: "pokemon-data-id", children: [
              "#",
              pokemon.id
            ] }),
            /* @__PURE__ */ jsx("h2", { className: "pokemon-data-name", children: pokemon.name })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "pokemon-types-container", children: pokemon.types.map((type) => /* @__PURE__ */ jsx("div", { className: "pokemon-type", style: { borderColor: pokemon.colors.darkest }, children: type }, type)) })
        ] }),
        /* @__PURE__ */ jsx("aside", { className: "pokemon-img-container", style: { backgroundColor: pokemon.colors.lightest }, children: /* @__PURE__ */ jsx("img", { src: pokemon.img, alt: pokemon.name }) })
      ]
    }
  ) });
};

export { PokemonCard as P };
