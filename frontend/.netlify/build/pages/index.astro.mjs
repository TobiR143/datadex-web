import { c as createComponent, j as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DjoNCGGn.mjs';
import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { useState, useEffect, useRef } from 'react';
import { B as BASE_API_URL, L as LIMIT } from '../chunks/config_DNmv_r6N.mjs';
/* empty css                                 */
import { P as PokemonCard } from '../chunks/PokemonCard_DA-ufatT.mjs';
import { L as Loader } from '../chunks/Loader_Cja5eXk5.mjs';
import { $ as $$Layout } from '../chunks/Layout_DIvdBwhG.mjs';
export { renderers } from '../renderers.mjs';

const useFilters = () => {
  const [types, setTypes] = useState([]);
  const [generations, setGenerations] = useState([]);
  useEffect(() => {
    fetch(`${BASE_API_URL}/type`).then((response) => response.json()).then((data) => setTypes([...data]));
    fetch(`${BASE_API_URL}/generation`).then((response) => response.json()).then((data) => setGenerations([...data]));
  }, []);
  return { types, generations };
};

const usePaginatedPokemons = (filters) => {
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef(null);
  const shouldLoadFirst = useRef(false);
  useEffect(() => {
    setOffset(0);
    setPokemons([]);
    setHasMore(true);
    shouldLoadFirst.current = true;
  }, [filters]);
  useEffect(() => {
    if (!shouldLoadFirst.current) return;
    const controller = new AbortController();
    const fetchPokemons = async () => {
      setIsLoading(true);
      const params = new URLSearchParams();
      if (filters.generation) params.append("generation", String(filters.generation));
      if (filters.type) params.append("type", String(filters.type));
      params.append("offset", "0");
      params.append("limit", LIMIT.toString());
      try {
        const res = await fetch(`${BASE_API_URL}/pokemon?${params.toString()}`, {
          signal: controller.signal
        });
        const data = await res.json();
        setPokemons(data.pokemons);
        setHasMore(data.pokemons.length === LIMIT);
      } catch (err) {
        if (err.name !== "AbortError") console.error(err);
      } finally {
        setIsLoading(false);
        shouldLoadFirst.current = false;
      }
    };
    fetchPokemons();
    return () => controller.abort();
  }, [filters]);
  useEffect(() => {
    if (!hasMore || isLoading || offset === 0) return;
    const controller = new AbortController();
    const fetchMorePokemons = async () => {
      setIsLoading(true);
      const params = new URLSearchParams();
      if (filters.generation) params.append("generation", String(filters.generation));
      if (filters.type) params.append("type", String(filters.type));
      params.append("offset", offset.toString());
      params.append("limit", LIMIT.toString());
      try {
        const res = await fetch(`${BASE_API_URL}/pokemon?${params.toString()}`, {
          signal: controller.signal
        });
        const data = await res.json();
        setPokemons((prev) => [...prev, ...data.pokemons]);
        setHasMore(data.pokemons.length === LIMIT);
      } catch (err) {
        if (err.name !== "AbortError") console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMorePokemons();
    return () => controller.abort();
  }, [offset]);
  useEffect(() => {
    const node = observerRef.current;
    if (!node || !hasMore || isLoading) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setOffset((prev) => prev + LIMIT);
        }
      },
      { threshold: 1 }
    );
    observer.observe(node);
    return () => {
      if (node) observer.unobserve(node);
    };
  }, [observerRef.current, hasMore, isLoading]);
  return { pokemons, observerRef, isLoading };
};

const useSelectors = ({
  types,
  generations,
  onChangeFilters
}) => {
  const [showMenu, setShowMenu] = useState(null);
  const [closing, setClosing] = useState(false);
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedGeneration, setSelectedGeneration] = useState("All Generations");
  const menuRef = useRef(null);
  const closeMenu = () => {
    setClosing(true);
    setTimeout(() => {
      setShowMenu(null);
      setClosing(false);
    }, 300);
  };
  const handleSelect = (value, category) => {
    if (category === "type") {
      if (value === "All Types" || types.some((t) => t.name === value)) {
        setSelectedType(value);
        onChangeFilters({
          type: value === "All Types" ? null : value,
          generation: selectedGeneration === "All Generations" ? null : selectedGeneration
        });
      }
    } else {
      if (value === "All Generations" || generations.some((g) => g.name === value)) {
        setSelectedGeneration(value);
        onChangeFilters({
          type: selectedType === "All Types" ? null : selectedType,
          generation: value === "All Generations" ? null : value
        });
      }
    }
    closeMenu();
  };
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        closeMenu();
      }
    };
    if (showMenu) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMenu]);
  return {
    showMenu,
    closing,
    selectedType,
    selectedGeneration,
    setShowMenu,
    handleSelect,
    closeMenu,
    menuRef
  };
};

const Selectors = ({ types, generations, onChangeFilters }) => {
  const {
    showMenu,
    closing,
    selectedType,
    selectedGeneration,
    setShowMenu,
    handleSelect,
    menuRef
  } = useSelectors({ types, generations, onChangeFilters });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "selectors-container", children: [
      /* @__PURE__ */ jsx("div", { style: selectedType !== "All Types" ? { backgroundColor: types.find((t) => t.name === selectedType)?.color, color: "#fff", textTransform: "uppercase" } : {}, className: "selector-button", onClick: () => setShowMenu("type"), children: selectedType }),
      /* @__PURE__ */ jsx("hr", {}),
      /* @__PURE__ */ jsx("div", { className: "selector-button", onClick: () => setShowMenu("generation"), children: selectedGeneration })
    ] }),
    showMenu && /* @__PURE__ */ jsxs("div", { ref: menuRef, className: `selector-menu ${closing ? "slide-down" : "slide-up"}`, children: [
      /* @__PURE__ */ jsxs("h3", { className: "selector-title", children: [
        "Select a ",
        showMenu === "type" ? "type" : "generation"
      ] }),
      /* @__PURE__ */ jsx("div", { className: "selector-options", children: (showMenu === "type" ? ["All Types", ...types.map((t) => t.name)] : ["All Generations", ...generations.map((g) => g.name)]).map((value) => {
        const typeColor = showMenu === "type" && value !== "All Types" ? types.find((t) => t.name === value)?.color : void 0;
        return /* @__PURE__ */ jsx(
          "div",
          {
            className: "selector-option",
            style: typeColor ? { backgroundColor: typeColor, color: "#fff" } : {},
            onClick: () => handleSelect(value, showMenu),
            children: value
          },
          value
        );
      }) })
    ] })
  ] });
};

const PokemonPage = () => {
  const [filters, setFilters] = useState({
    type: null,
    generation: null
  });
  const { types, generations } = useFilters();
  const { pokemons, observerRef, isLoading } = usePaginatedPokemons(filters);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    types.length > 0 && generations.length > 0 && /* @__PURE__ */ jsx(Selectors, { types, generations, onChangeFilters: setFilters }),
    /* @__PURE__ */ jsxs("section", { style: { display: "flex", flexDirection: "column", padding: "0 6px", marginTop: "20px", fontFamily: "system-ui" }, children: [
      pokemons.map((pokemon) => /* @__PURE__ */ jsx(PokemonCard, { pokemon }, pokemon.id)),
      /* @__PURE__ */ jsx("div", { ref: observerRef, style: { height: "1px" } }),
      isLoading && /* @__PURE__ */ jsx(Loader, {})
    ] })
  ] });
};

const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const res = await fetch(`http://localhost:3000/pokemon`);
  const result = await res.json();
  const { hasMore } = result;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Datadex Web" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "PokemonPage", PokemonPage, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Tobias/Desktop/Proyectos/datadex/frontend/src/components/index/PokemonPage.tsx", "client:component-export": "PokemonPage" })} ${!hasMore && renderTemplate`${maybeRenderHead()}<div>
No more Pokemon
</div>`}` })}`;
}, "C:/Users/Tobias/Desktop/Proyectos/datadex/frontend/src/pages/index.astro", void 0);

const $$file = "C:/Users/Tobias/Desktop/Proyectos/datadex/frontend/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
