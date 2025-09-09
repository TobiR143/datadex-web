import { c as createComponent, d as createAstro, f as addAttribute, i as renderHead, j as renderComponent, r as renderTemplate } from '../../chunks/astro/server_DjoNCGGn.mjs';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import React, { createContext, useContext, useState, useRef, useEffect, useMemo } from 'react';
/* empty css                                   */
import { S as StopIcon, M as MusicNoteIcon, a as SettingsIcon, C as CloseIcon, V as VoiceIcon, I as InfoIcon, b as MaleIcon, F as FemaleIcon, R as RightArrowIcon, L as LeftArrowIcon, H as HomeIcon, c as SwordIcon, d as MoreIcon, e as MenuIcon, E as ErrorContainer } from '../../chunks/ErrorContainer_DpBOuGjG.mjs';
import { B as BASE_API_URL } from '../../chunks/config_DNmv_r6N.mjs';
import { L as Loader } from '../../chunks/Loader_Cja5eXk5.mjs';
import { L as LearnType } from '../../chunks/types_DFBlDKFT.mjs';
export { renderers } from '../../renderers.mjs';

const PokemonContext = createContext({});
const usePokemon = () => useContext(PokemonContext);
const PokemonProvider = ({ children, pokemon }) => {
  return /* @__PURE__ */ jsx(PokemonContext.Provider, { value: { pokemon }, children });
};

const PokemonCard$1 = () => {
  const { pokemon } = usePokemon();
  return /* @__PURE__ */ jsxs("section", { className: "pokemon-card", style: { backgroundColor: pokemon.colors.lighter }, children: [
    /* @__PURE__ */ jsxs("header", { className: "pokemon-header", children: [
      /* @__PURE__ */ jsxs("div", { className: "pokemon-header-data", children: [
        /* @__PURE__ */ jsx(
          "h1",
          {
            className: "pokemon-header-data-name",
            style: { color: pokemon.colors.darkest },
            children: pokemon.name
          }
        ),
        /* @__PURE__ */ jsxs(
          "p",
          {
            className: "pokemon-header-data-id",
            style: { color: pokemon.colors.darkest },
            children: [
              "#",
              pokemon.id
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
        "p",
        {
          className: "pokemon-header-genus",
          style: { color: pokemon.colors.darkest },
          children: pokemon.genus
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "pokemon-header-types", children: pokemon.types.map((type, index) => /* @__PURE__ */ jsx(
        "div",
        {
          className: "pokemon-header-type",
          style: {
            border: `2px solid ${pokemon.colors.darkest}`,
            color: pokemon.colors.darkest
          },
          children: type
        },
        index
      )) })
    ] }),
    /* @__PURE__ */ jsx("aside", { className: "pokemon-aside", children: /* @__PURE__ */ jsx(
      "div",
      {
        className: "pokemon-aside-img-container",
        style: { backgroundColor: pokemon.colors.lightest },
        children: /* @__PURE__ */ jsx(
          "img",
          {
            className: "pokemon-aside-img",
            src: pokemon.img,
            alt: pokemon.name
          }
        )
      }
    ) })
  ] });
};

const PokemonCry = ({ audio, color }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(audio);
    }
    const handleEnded = () => {
      setIsPlaying(false);
    };
    audioRef.current.addEventListener("ended", handleEnded);
    return () => {
      audioRef.current?.removeEventListener("ended", handleEnded);
    };
  }, [audio]);
  const handleClick = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };
  return /* @__PURE__ */ jsx("div", { onClick: handleClick, className: "info-section-icons-container", children: isPlaying ? /* @__PURE__ */ jsx(StopIcon, { color }) : /* @__PURE__ */ jsx(MusicNoteIcon, { color }) });
};

const useSettings = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [closing, setClosing] = useState(false);
  const [voiceValue, setVoiceValue] = useState(100);
  const [voiceRange, setVoiceRange] = useState(200);
  const menuRef = useRef(null);
  const closeMenu = () => {
    setClosing(true);
    setTimeout(() => {
      setShowMenu(false);
      setClosing(false);
    }, 300);
  };
  const handleChangeVoice = (e) => {
    const newValue = parseInt(e.target.value);
    setVoiceValue(newValue);
  };
  const handleChangeVoiceRange = (e) => {
    const newValue = parseInt(e.target.value);
    setVoiceRange(newValue);
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
    setShowMenu,
    closing,
    setClosing,
    voiceValue,
    setVoiceValue,
    voiceRange,
    setVoiceRange,
    menuRef,
    handleChangeVoice,
    handleChangeVoiceRange,
    closeMenu
  };
};

const SpeechVoiceMenu = ({ onChange }) => {
  const {
    menuRef,
    voiceValue,
    voiceRange,
    setShowMenu,
    showMenu,
    handleChangeVoice,
    handleChangeVoiceRange,
    closeMenu,
    closing
  } = useSettings();
  const handleClick = () => {
    onChange({ voice: voiceValue, voiceRange });
    closeMenu();
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "info-section-icons-setting", onClick: () => setShowMenu(true), children: /* @__PURE__ */ jsx(SettingsIcon, {}) }),
    showMenu && /* @__PURE__ */ jsxs("div", { ref: menuRef, className: `${closing ? "slide-down" : ""} show-menu`, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "show-menu-title", children: "dataDex voice" }),
        /* @__PURE__ */ jsx("div", { onClick: closeMenu, className: "show-menu-close-icon", children: /* @__PURE__ */ jsx(CloseIcon, {}) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "show-menu-input-values", children: [
        /* @__PURE__ */ jsxs("div", { className: "show-menu-input-container", children: [
          /* @__PURE__ */ jsx("label", { className: "show-menu-input-label", children: "Tone" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              style: {
                background: `linear-gradient(
                                        to right, 
                                        #384f61 0%,
                                        #384f61 ${voiceValue / 150 * 100}%, 
                                        #ccc ${voiceValue / 150 * 100}%, 
                                        #ccc 100%
                                    )`
              },
              value: voiceValue,
              onChange: handleChangeVoice,
              type: "range",
              min: "0",
              max: "150"
            }
          ),
          /* @__PURE__ */ jsxs("p", { className: "show-menu-input-value", children: [
            voiceValue,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "show-menu-input-container", children: [
          /* @__PURE__ */ jsx("label", { className: "show-menu-input-label", children: "Voice range" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              style: {
                background: `linear-gradient(
                                        to right, 
                                        #384f61 0%,
                                        #384f61 ${voiceRange / 300 * 100}%, 
                                        #ccc ${voiceRange / 300 * 100}%, 
                                        #ccc 100%
                                    )`
              },
              value: voiceRange,
              onChange: handleChangeVoiceRange,
              type: "range",
              min: "0",
              max: "300"
            }
          ),
          /* @__PURE__ */ jsxs("p", { className: "show-menu-input-value", children: [
            voiceRange,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("button", { onClick: handleClick, className: "show-menu-apply-button", children: [
          /* @__PURE__ */ jsx(
            VoiceIcon,
            {
              size: 22,
              color: "#ededed"
            }
          ),
          /* @__PURE__ */ jsx("p", { className: "show-menu-apply-button-text", children: "Apply" })
        ] })
      ] })
    ] })
  ] });
};

const useOptions = () => {
  const [options, setOptions] = useState({
    voice: 100,
    voiceRange: 200
  });
  const handleChangeOptions = (options2) => {
    setOptions({ ...options2 });
  };
  return {
    options,
    setOptions,
    handleChangeOptions
  };
};

const SpeechVoice = ({ text, color }) => {
  const [voices, setVoices] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const { options, handleChangeOptions } = useOptions();
  useEffect(() => {
    const loadVoices = () => {
      setVoices(window.speechSynthesis.getVoices());
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);
  const handleClick = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const englishVoice = voices.find((v) => v.lang.startsWith("en"));
    if (englishVoice) {
      utterance.voice = englishVoice;
    }
    utterance.rate = options.voiceRange / 200;
    utterance.pitch = options.voice / 100;
    utterance.volume = 1;
    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);
    window.speechSynthesis.speak(utterance);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { onClick: handleClick, className: "info-section-icons-voice", children: isPlaying ? /* @__PURE__ */ jsx(StopIcon, { color }) : /* @__PURE__ */ jsx(VoiceIcon, { size: 18, color }) }),
    /* @__PURE__ */ jsx(SpeechVoiceMenu, { onChange: handleChangeOptions })
  ] });
};

const GameContext = createContext({
  selectedGame: null,
  setSelectedGame: () => {
  },
  gamesByGeneration: {}
});
const useGameContext = () => useContext(GameContext);
const GameProvider = ({ children, gamesByGeneration, defaultGame }) => {
  const [selectedGame, setSelectedGame] = useState(defaultGame);
  useEffect(() => {
    if (gamesByGeneration) {
      const gens = Object.keys(gamesByGeneration);
      const lastGen = gens[gens.length - 1];
      setSelectedGame(gamesByGeneration[lastGen][0]);
    }
  }, [gamesByGeneration]);
  return /* @__PURE__ */ jsx(GameContext.Provider, { value: { selectedGame, setSelectedGame, gamesByGeneration }, children });
};

const useInfoData = (id, selectedGame) => {
  const [infoData, setInfoData] = useState(
    {
      description: "",
      sprite: "",
      spriteShiny: ""
    }
  );
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (!selectedGame) return;
    setIsLoading(true);
    fetch(`http://localhost:3000/pokemon/game/${id}/${selectedGame.game}`).then((res) => res.json()).then((data) => {
      setInfoData(data);
    }).finally(() => setIsLoading(false));
  }, [id, selectedGame]);
  return { infoData, setInfoData, isLoading };
};

const SectionLoading = ({ color }) => {
  return /* @__PURE__ */ jsx("section", { className: "section-loading", children: /* @__PURE__ */ jsx("div", { className: "loader-circle", style: { color } }) });
};

const SpecieData = () => {
  const { pokemon } = usePokemon();
  const { id, height, weight, colors, cry } = pokemon;
  const { selectedGame } = useGameContext();
  const { infoData, isLoading } = useInfoData(id, selectedGame);
  const { description } = infoData;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("h2", { className: "specie-section-title", style: { color: colors.darkest }, children: "Specie" }),
    isLoading ? /* @__PURE__ */ jsx(SectionLoading, { color: colors.normal }) : /* @__PURE__ */ jsxs("section", { className: "info-section-data", children: [
      /* @__PURE__ */ jsx("div", { className: "info-section-data-description-container", children: /* @__PURE__ */ jsx("p", { className: "info-section-data-description", children: description }) }),
      /* @__PURE__ */ jsxs("p", { className: "info-section-data-description-details", children: [
        "Description of Pokedex (from Pokemon ",
        /* @__PURE__ */ jsx("span", { children: String(selectedGame?.game).replace("-", " ") }),
        ")"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "info-section-data-values", children: [
        /* @__PURE__ */ jsxs("div", { className: "info-section-data-values-height-container", children: [
          /* @__PURE__ */ jsx("p", { className: "info-section-data-height", children: height }),
          /* @__PURE__ */ jsx("label", { className: "info-section-data-height-label", children: "Height" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "info-section-data-values-weight-container", children: [
          /* @__PURE__ */ jsx("p", { className: "info-section-data-weight", children: weight }),
          /* @__PURE__ */ jsx("label", { className: "info-section-data-weight-label", children: "Weight" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "info-section-data-sounds", children: [
        /* @__PURE__ */ jsxs("div", { className: "info-section-data-voice-container", children: [
          /* @__PURE__ */ jsx("div", { className: "info-section-icons-container", children: /* @__PURE__ */ jsx(SpeechVoice, { color: colors.normal, text: description }) }),
          /* @__PURE__ */ jsx("label", { className: "info-section-data-voice-label", children: "dataDex voice" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "info-section-data-cry-container", children: [
          /* @__PURE__ */ jsx(PokemonCry, { color: colors.normal, audio: cry }),
          /* @__PURE__ */ jsx("label", { className: "info-section-data-cry-label", children: "Cry" })
        ] })
      ] })
    ] })
  ] });
};

const usePokemonAbilities = (id) => {
  const [abilities, setAbilities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    fetch(`${BASE_API_URL}/pokemon/${id}/abilities`).then((res) => res.json()).then((data) => setAbilities(data)).finally(() => setIsLoading(false));
  }, [id]);
  return { abilities, isLoading };
};

const useAbilityModal = () => {
  const [open, setOpen] = useState(false);
  const [selectedAbility, setSelectedAbility] = useState({
    ability: "",
    type: ""
  });
  const handleClick = (ability, abilities) => {
    setOpen(true);
    setSelectedAbility({
      ability,
      type: abilities && !Array.isArray(abilities) && abilities.normal.some((a) => a.name === ability.name) ? "normal" : "hidden"
    });
  };
  return {
    open,
    setOpen,
    selectedAbility,
    handleClick
  };
};

const usePokemonByAbility = (abilityName) => {
  const [pokemons, setPokemons] = useState({
    normal: [],
    hidden: []
  });
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    fetch(`${BASE_API_URL}/ability/${abilityName}`).then((res) => res.json()).then((data) => {
      setPokemons(data);
    }).finally(() => setIsLoading(false));
  }, [abilityName]);
  return { pokemons, isLoading };
};

const PokemonCard = ({ pokemon }) => {
  return /* @__PURE__ */ jsxs("a", { href: `/pokemon/${pokemon.id}`, style: { backgroundColor: pokemon.colors.normal }, className: "pokemon-prevnext-card", children: [
    /* @__PURE__ */ jsxs("header", { className: "pokemon-prevnext-header", children: [
      /* @__PURE__ */ jsxs("div", { className: "pokemon-prevnext-header-data", children: [
        /* @__PURE__ */ jsxs(
          "p",
          {
            style: { color: pokemon.colors.darkest },
            className: "pokemon-prevnext-id",
            children: [
              "#",
              pokemon.id
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "h3",
          {
            style: { color: pokemon.colors.darkest },
            className: "pokemon-prevnext-name",
            children: pokemon.name
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "pokemon-prevnext-types-container",
          children: pokemon.types.map((type) => /* @__PURE__ */ jsx("div", { style: { borderColor: pokemon.colors.darkest, color: pokemon.colors.darkest }, className: "pokemon-prevnext-type", children: type }, type))
        }
      )
    ] }),
    /* @__PURE__ */ jsx("aside", { style: { backgroundColor: pokemon.colors.lightest }, className: "pokemon-prevnext-aside", children: /* @__PURE__ */ jsx("img", { className: "pokemon-prevnext-img", src: pokemon.img }) })
  ] });
};

const AbilityModal = ({ open, selectedAbility, pokemon, onClose }) => {
  const { pokemons, isLoading } = usePokemonByAbility(selectedAbility.ability.name);
  const [selectedType, setSelectedType] = useState("normal");
  const [closing, setClosing] = useState(false);
  useEffect(() => {
    if (open) setClosing(false);
  }, [open]);
  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      onClose?.();
    }, 300);
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `ability-modal ${closing ? "slide-out" : ""}`,
      onClick: handleClose,
      children: /* @__PURE__ */ jsxs("div", { className: "ability-modal-content", onClick: (e) => e.stopPropagation(), children: [
        /* @__PURE__ */ jsxs("div", { style: { backgroundColor: pokemon.colors.normal }, className: "ability-modal-header", children: [
          /* @__PURE__ */ jsx(
            "h3",
            {
              style: { color: pokemon.colors.darkest },
              className: "selected-ability-name",
              children: selectedAbility.ability.name.replace("-", " ")
            }
          ),
          /* @__PURE__ */ jsxs(
            "p",
            {
              style: { color: pokemon.colors.darkest },
              className: "selected-ability-description",
              children: [
                selectedAbility.type === "hidden" ? "Hidden ability" : "Abilities",
                " of",
                /* @__PURE__ */ jsx("span", { className: "selected-ability-description-pokemon", children: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1).toLowerCase() })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "am-section", children: [
          /* @__PURE__ */ jsx("h4", { style: { color: pokemon.colors.darkest }, className: "am-section-title", children: "GAME DESCRIPTION" }),
          /* @__PURE__ */ jsx("p", { className: "am-section-text", children: selectedAbility.ability.description })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "am-section", children: [
          /* @__PURE__ */ jsx("h4", { style: { color: pokemon.colors.darkest }, className: "am-section-title", children: "EFFECT" }),
          /* @__PURE__ */ jsx("p", { className: "am-section-text", children: selectedAbility.ability.effect })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "am-section", children: [
          /* @__PURE__ */ jsx("h4", { style: { color: pokemon.colors.darkest }, className: "am-section-title", children: "DEPTH EFFECT" }),
          /* @__PURE__ */ jsx("p", { className: "am-section-text", children: selectedAbility.ability.depthEffect })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "am-pokemon-container", children: [
          /* @__PURE__ */ jsxs("header", { className: "am-pokemon-header", children: [
            /* @__PURE__ */ jsx("h4", { style: { color: pokemon.colors.darkest }, className: "am-pokemon-header-title", children: "POKEMON WITH THIS ABILITY" }),
            /* @__PURE__ */ jsxs("div", { className: "am-pokemon-header-buttons-container", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  style: selectedType === "normal" ? { backgroundColor: pokemon.colors.normal, color: pokemon.colors.darkest, fontWeight: 600 } : { backgroundColor: pokemon.colors.lighter, color: pokemon.colors.darker },
                  onClick: () => setSelectedType("normal"),
                  className: `am-pokemon-header-button ${selectedType === "normal" ? "active" : ""}`,
                  children: "Normal"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  style: selectedType === "hidden" ? { backgroundColor: pokemon.colors.normal, color: pokemon.colors.darkest, fontWeight: 600 } : { backgroundColor: pokemon.colors.lighter, color: pokemon.colors.darker },
                  onClick: () => setSelectedType("hidden"),
                  className: `am-pokemon-header-button ${selectedType === "hidden" ? "active" : ""}`,
                  children: "Hidden"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx("hr", {}),
          /* @__PURE__ */ jsxs("main", { className: "am-pokemon-list", children: [
            isLoading && /* @__PURE__ */ jsx(SectionLoading, { color: pokemon.colors.normal }),
            pokemons?.[selectedType]?.map((poke) => /* @__PURE__ */ jsx(PokemonCard, { pokemon: poke }, poke.id))
          ] })
        ] })
      ] })
    }
  );
};

const AbilitiesData = () => {
  const { pokemon } = usePokemon();
  const { id, colors } = pokemon;
  const { abilities, isLoading } = usePokemonAbilities(id);
  const { open, setOpen, selectedAbility, handleClick } = useAbilityModal();
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("h2", { className: "abilities-section-title", style: { color: colors.darkest }, children: "Abilities" }),
    open && /* @__PURE__ */ jsx(
      AbilityModal,
      {
        open,
        selectedAbility,
        pokemon,
        onClose: () => setOpen(false)
      }
    ),
    isLoading ? /* @__PURE__ */ jsx(SectionLoading, { color: colors.normal }) : abilities && "normal" in abilities && "hidden" in abilities && /* @__PURE__ */ jsxs("section", { className: "abilities-section", children: [
      /* @__PURE__ */ jsx("div", { className: "normal-abilities-container", children: abilities.normal.map((ability, index) => /* @__PURE__ */ jsxs(React.Fragment, { children: [
        /* @__PURE__ */ jsxs(
          "article",
          {
            className: "normal-ability",
            style: { backgroundColor: colors.normal },
            onClick: () => handleClick(ability, abilities),
            children: [
              /* @__PURE__ */ jsx("header", { className: "normal-ability-header", children: /* @__PURE__ */ jsx("p", { className: "normal-ability-content", style: { color: colors.darkest }, children: String(ability.name).replace("-", " ") }) }),
              /* @__PURE__ */ jsx("aside", { className: "normal-ability-aside", children: /* @__PURE__ */ jsx(InfoIcon, { size: 18, color: colors.darkest }) })
            ]
          }
        ),
        index < abilities.normal.length - 1 && /* @__PURE__ */ jsx("span", { className: "ability-separator", children: " o " })
      ] }, ability.name)) }),
      /* @__PURE__ */ jsx("div", { className: "hidden-abilities-container", children: abilities.hidden.map((ability) => /* @__PURE__ */ jsxs(
        "article",
        {
          className: "hidden-ability",
          style: { backgroundColor: colors.lightest },
          onClick: () => handleClick(ability, abilities),
          children: [
            /* @__PURE__ */ jsx("aside", { className: "hidden-ability-aside", style: { backgroundColor: colors.normal }, children: /* @__PURE__ */ jsx("p", { className: "hidden-ability-hidden", style: { color: colors.darkest }, children: "Hidden" }) }),
            /* @__PURE__ */ jsxs("header", { className: "hidden-ability-header", style: { border: `1px solid ${colors.normal}` }, children: [
              /* @__PURE__ */ jsx("p", { className: "hidden-ability-content", style: { color: colors.darker }, children: String(ability.name).replace("-", " ") }),
              /* @__PURE__ */ jsx(InfoIcon, { size: 18, color: colors.darker })
            ] })
          ]
        },
        ability.name
      )) })
    ] })
  ] });
};

const usePokemonStats = (id) => {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    fetch(`${BASE_API_URL}/pokemon/${id}/stats`).then((res) => res.json()).then((data) => setStats(data)).finally(() => setIsLoading(false));
  }, [id]);
  return { stats, isLoading };
};

const StatsData = () => {
  const [statSelected, setStatSelected] = useState("baseValue");
  const [maxStat, setMaxStat] = useState(0);
  const { pokemon } = usePokemon();
  const { id, colors } = pokemon;
  const { stats, isLoading } = usePokemonStats(id);
  useEffect(() => {
    if (!stats) return;
    setMaxStat(
      Math.max(...stats.values.map((stat) => stat[statSelected]))
    );
  }, [statSelected, stats]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("h2", { className: "stats-section-title", style: { color: pokemon.colors.darkest }, children: "Stats" }),
    isLoading ? /* @__PURE__ */ jsx(SectionLoading, { color: colors.normal }) : stats && /* @__PURE__ */ jsxs("section", { className: "stats-section", children: [
      /* @__PURE__ */ jsxs("div", { className: "stats-selector", children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            onClick: () => setStatSelected("baseValue"),
            className: "stat-option",
            style: {
              backgroundColor: statSelected === "baseValue" ? colors.normal : colors.lighter,
              borderRadius: statSelected === "baseValue" ? "5px 5px 0 0" : "5px",
              color: colors.darkest
            },
            children: "Base stats"
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            onClick: () => setStatSelected("minValue"),
            className: "stat-option",
            style: {
              backgroundColor: statSelected === "minValue" ? colors.normal : colors.lighter,
              borderRadius: statSelected === "minValue" ? "5px 5px 0 0" : "5px",
              color: colors.darkest
            },
            children: "Min"
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            onClick: () => setStatSelected("maxValue"),
            className: "stat-option",
            style: {
              backgroundColor: statSelected === "maxValue" ? colors.normal : colors.lighter,
              borderRadius: statSelected === "maxValue" ? "5px 5px 0 0" : "5px",
              color: colors.darkest
            },
            children: "Max"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "stats-values", children: stats.values.map((stat) => /* @__PURE__ */ jsxs("article", { className: "stat", children: [
        /* @__PURE__ */ jsx(
          "header",
          {
            className: "stat-name",
            style: {
              backgroundColor: colors.normal,
              color: colors.darkest
            },
            children: stat.stat
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "stat-bar-container", children: /* @__PURE__ */ jsx(
          "div",
          {
            className: "stat-bar",
            style: {
              backgroundColor: colors.lighter,
              color: colors.darkest,
              width: `${stat[statSelected] / maxStat * 100}%`
            },
            children: stat[statSelected]
          }
        ) })
      ] }, stat.stat)) }),
      statSelected === "baseValue" ? /* @__PURE__ */ jsxs("p", { className: "base-total", children: [
        "Total ",
        /* @__PURE__ */ jsx("span", { style: { color: colors.darkest }, children: stats.baseTotal })
      ] }) : statSelected === "minValue" ? /* @__PURE__ */ jsx("p", { className: "stats-description", children: "Min: Pokémon level 100, unfavorable nature, 0 IVs, 0 EVs (Worst)" }) : /* @__PURE__ */ jsx("p", { className: "stats-description", children: "Max: Pokémon level 100, beneficial nature, 31 IVs, 252 EVs (Perfect)" })
    ] })
  ] });
};

const SpritesData = () => {
  const { pokemon } = usePokemon();
  const { id, colors } = pokemon;
  const { selectedGame } = useGameContext();
  const { infoData, isLoading } = useInfoData(id, selectedGame);
  const { sprite, spriteShiny } = infoData;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("h2", { className: "sprites-section-title", style: { color: colors.darkest }, children: "Sprites" }),
    isLoading ? /* @__PURE__ */ jsx(SectionLoading, { color: colors.normal }) : /* @__PURE__ */ jsxs("section", { className: "sprites-section", children: [
      sprite && /* @__PURE__ */ jsxs("div", { className: "normal-sprite-container", children: [
        /* @__PURE__ */ jsx("h2", { className: "normal-sprite-title", children: "Normal" }),
        /* @__PURE__ */ jsx("img", { className: "normal-sprite", src: sprite })
      ] }),
      spriteShiny && /* @__PURE__ */ jsxs("div", { className: "shiny-sprite-container", children: [
        /* @__PURE__ */ jsx("h2", { className: "shiny-sprite-title", children: "Shiny" }),
        /* @__PURE__ */ jsx("img", { className: "shiny-sprite", src: spriteShiny })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "sprites-description", children: [
        "Sprites from: Pokemon ",
        /* @__PURE__ */ jsx("span", { children: String(selectedGame?.game).replace("-", " ") })
      ] })
    ] })
  ] });
};

const useLocations = ({ id, game }) => {
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (!game) return;
    setIsLoading(true);
    fetch(`${BASE_API_URL}/pokemon/${id}/${game.game}/encounters`).then((res) => res.json()).then((data) => setLocations(data)).finally(() => setIsLoading(false));
  }, [id, game]);
  return { locations, isLoading };
};

const LocationsData = () => {
  const { pokemon } = usePokemon();
  const { id, colors } = pokemon;
  const { selectedGame } = useGameContext();
  const { locations, isLoading } = useLocations({ id, game: selectedGame });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("h2", { style: { color: colors.darkest }, className: "locations-section-title", children: "Locations" }),
    isLoading ? /* @__PURE__ */ jsx(SectionLoading, { color: colors.normal }) : locations && /* @__PURE__ */ jsx("section", { className: "locations-section", children: locations.length > 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("p", { className: "location-description", children: [
        "Locations on Pokemon",
        /* @__PURE__ */ jsx("span", { children: String(selectedGame?.game).replace("-", " ") }),
        "."
      ] }),
      /* @__PURE__ */ jsx("p", { className: "location-description", children: "Press one location to see more details." }),
      /* @__PURE__ */ jsx("div", { className: "locations-section-div", children: locations.map((location) => /* @__PURE__ */ jsxs("a", { href: `/location/${location.id}/${selectedGame?.versionGroup}`, style: { backgroundColor: colors.lightest }, className: "location", children: [
        /* @__PURE__ */ jsx("p", { style: { color: colors.darkest }, className: "location-name", children: location.name.replaceAll("-", " ") }),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(InfoIcon, { color: colors.darkest, size: 18 }) })
      ] }, location.id)) })
    ] }) : /* @__PURE__ */ jsx("p", { className: "location-description", children: "Didn't found locations for this edition." }) })
  ] });
};

function useEvolutionChain(pokemonId) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function fetchEvolutionChain() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_API_URL}/pokemon/${pokemonId}/evolution-chain`);
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Error loading evolution chain");
        }
        const json = await res.json();
        setData(json);
      } catch (e) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    }
    if (pokemonId) {
      fetchEvolutionChain();
    }
  }, [pokemonId]);
  return { data, isLoading, error };
}

const EvolutionNode = ({ node }) => {
  if (node.evolvesTo && node.evolvesTo.length > 1) {
    return /* @__PURE__ */ jsx("div", { className: "evolution-branches multi-branch", children: node.evolvesTo.map((evo) => /* @__PURE__ */ jsx("div", { className: "evolution-branch", children: /* @__PURE__ */ jsxs("div", { className: "evolution-node", children: [
      /* @__PURE__ */ jsxs(
        "a",
        {
          style: { backgroundColor: node.colors.normal },
          href: `/pokemon/${node.id}`,
          className: "pokemon-card-evolution",
          children: [
            /* @__PURE__ */ jsx("div", { style: { backgroundColor: node.colors.lightest }, className: "pokemon-card-evolution-img-container", children: /* @__PURE__ */ jsx("img", { src: node.img, alt: node.name }) }),
            /* @__PURE__ */ jsxs("p", { style: { color: node.colors.darkest }, children: [
              "#",
              node.id
            ] }),
            /* @__PURE__ */ jsx("p", { style: { color: node.colors.darkest }, children: node.name }),
            /* @__PURE__ */ jsx("div", { className: "types-badges", children: node.types.map((type) => /* @__PURE__ */ jsx(
              "span",
              {
                style: { borderColor: node.colors.darkest, color: node.colors.darkest },
                className: `type-badge type-${type}`,
                children: type
              },
              type
            )) })
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "evolution-method-container", children: [
        /* @__PURE__ */ jsx("div", { className: "arrow arrow--line" }),
        /* @__PURE__ */ jsx("p", { className: "method", children: evo.method })
      ] }),
      /* @__PURE__ */ jsx(EvolutionNode, { node: evo })
    ] }) }, evo.id)) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "evolution-node", children: [
    /* @__PURE__ */ jsxs(
      "a",
      {
        style: { backgroundColor: node.colors.normal },
        href: `/pokemon/${node.id}`,
        className: "pokemon-card-evolution",
        children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              style: { backgroundColor: node.colors.lightest },
              className: "pokemon-card-evolution-img-container",
              children: /* @__PURE__ */ jsx("img", { src: node.img, alt: node.name })
            }
          ),
          /* @__PURE__ */ jsxs("p", { style: { color: node.colors.darkest }, children: [
            "#",
            node.id
          ] }),
          /* @__PURE__ */ jsx("p", { style: { color: node.colors.darkest }, children: node.name }),
          /* @__PURE__ */ jsx("div", { className: "types-badges", children: node.types.map((type) => /* @__PURE__ */ jsx(
            "span",
            {
              style: { borderColor: node.colors.darkest, color: node.colors.darkest },
              className: `type-badge type-${type}`,
              children: type
            },
            type
          )) })
        ]
      }
    ),
    node.evolvesTo && node.evolvesTo.length === 1 && /* @__PURE__ */ jsx("div", { className: "evolution-branches single-branch", children: node.evolvesTo.map((evo) => /* @__PURE__ */ jsxs(React.Fragment, { children: [
      /* @__PURE__ */ jsxs("div", { className: "evolution-method-container", children: [
        /* @__PURE__ */ jsx("div", { className: "arrow arrow--line" }),
        /* @__PURE__ */ jsx("p", { className: "method", children: evo.method })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "evolution-branch", children: /* @__PURE__ */ jsx(EvolutionNode, { node: evo }) })
    ] }, evo.id)) })
  ] });
};

const EvolutionChain = () => {
  const { pokemon } = usePokemon();
  const { id, colors } = pokemon;
  const { data, isLoading, error } = useEvolutionChain(id);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    isLoading && /* @__PURE__ */ jsx(Loader, {}),
    error && /* @__PURE__ */ jsx("p", { children: error }),
    /* @__PURE__ */ jsx(
      "h2",
      {
        style: { color: colors.darkest },
        className: "evolution-chain-title",
        children: "Evolution Chain"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "evolution-chain", children: data && data.map((root) => /* @__PURE__ */ jsx(EvolutionNode, { node: root }, root.id)) })
  ] });
};

const InfoSection = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(SpecieData, {}),
    /* @__PURE__ */ jsx(AbilitiesData, {}),
    /* @__PURE__ */ jsx(StatsData, {}),
    /* @__PURE__ */ jsx(LocationsData, {}),
    /* @__PURE__ */ jsx(EvolutionChain, {}),
    /* @__PURE__ */ jsx(SpritesData, {})
  ] });
};

const useMoves = (id, game) => {
  const [moves, setMoves] = useState();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    fetch(`${BASE_API_URL}/pokemon/moves/${id}/${game.game}`).then((res) => res.json()).then((data) => {
      setMoves(data);
    }).finally(() => setIsLoading(false));
  }, [id, game]);
  return { moves, setMoves, isLoading };
};

const LearnTypeSelector = ({ onChange, selected }) => {
  const { pokemon } = usePokemon();
  const { colors } = pokemon;
  return /* @__PURE__ */ jsxs("div", { className: "learn-type-selector-container", children: [
    /* @__PURE__ */ jsx("div", { className: "learn-type-selector", children: Object.keys(LearnType).map((key) => /* @__PURE__ */ jsx(
      "button",
      {
        className: "learn-type",
        style: {
          backgroundColor: selected === key ? colors.normal : colors.lighter,
          color: colors.darkest,
          fontWeight: selected === key ? "bold" : 500
        },
        onClick: () => onChange(key),
        children: LearnType[key]
      },
      key
    )) }),
    /* @__PURE__ */ jsx("p", { className: "learn-type-selector-description", children: "Learning methods of moves" })
  ] });
};

const TableHeaderItem = ({ color, text }) => {
  return /* @__PURE__ */ jsx(
    "span",
    {
      style: { color },
      className: "table-moves-header-item",
      children: text
    }
  );
};

const MoveModal = ({ move, open, onClose }) => {
  const { pokemon } = usePokemon();
  const [closing, setClosing] = useState(false);
  useEffect(() => {
    if (open) setClosing(false);
  }, [open]);
  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      onClose?.();
    }, 300);
  };
  return /* @__PURE__ */ jsx(
    "section",
    {
      className: `move-modal ${closing ? "slide-out" : ""}`,
      onClick: handleClose,
      children: /* @__PURE__ */ jsxs("div", { className: "move-modal-content", children: [
        /* @__PURE__ */ jsxs("header", { style: { backgroundColor: pokemon.colors.normal }, className: "move-modal-header", children: [
          /* @__PURE__ */ jsx("h2", { style: { color: pokemon.colors.darkest }, className: "move-modal-title", children: move.move.name.replaceAll("-", " ") }),
          /* @__PURE__ */ jsxs("p", { style: { color: pokemon.colors.darkest }, className: "move-modal-description", children: [
            pokemon.name,
            " move"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("aside", { className: "move-modal-aside", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("article", { className: "move-modal-type-name", children: [
              /* @__PURE__ */ jsx(
                "p",
                {
                  className: "move-modal-type-name-content",
                  style: { backgroundColor: move.move.type.colors.normal },
                  children: move.move.type.name
                }
              ),
              /* @__PURE__ */ jsx("p", { className: "move-modal-article-description", children: "Type" })
            ] }),
            /* @__PURE__ */ jsxs("article", { className: "move-modal-category", children: [
              /* @__PURE__ */ jsx(
                "p",
                {
                  className: `move-modal-category-content move-modal-category-${move.move.category}`,
                  children: move.move.category
                }
              ),
              /* @__PURE__ */ jsx("p", { className: "move-modal-article-description", children: "Category" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("article", { className: "move-modal-article", children: [
              /* @__PURE__ */ jsx("p", { className: "move-modal-article-text", children: move.move.power ?? "-" }),
              /* @__PURE__ */ jsx("p", { className: "move-modal-article-description", children: "Power" })
            ] }),
            /* @__PURE__ */ jsxs("article", { className: "move-modal-article", children: [
              /* @__PURE__ */ jsx("p", { className: "move-modal-article-text", children: move.move.accuracy ?? "-" }),
              /* @__PURE__ */ jsx("p", { className: "move-modal-article-description", children: "Accuracy" })
            ] }),
            /* @__PURE__ */ jsxs("article", { className: "move-modal-article", children: [
              /* @__PURE__ */ jsx("p", { className: "move-modal-article-text", children: move.move.pp }),
              /* @__PURE__ */ jsx("p", { className: "move-modal-article-description", children: "PP" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("main", { className: "move-modal-main", children: [
          /* @__PURE__ */ jsxs("article", { className: "move-modal-section move-modal-game-description", children: [
            /* @__PURE__ */ jsx("h3", { style: { color: pokemon.colors.darkest }, className: "move-modal-section-title", children: "Game description" }),
            /* @__PURE__ */ jsx("p", { className: "move-modal-section-text", children: move.move.description })
          ] }),
          /* @__PURE__ */ jsxs("article", { className: "move-modal-section move-modal-effect", children: [
            /* @__PURE__ */ jsx("h3", { style: { color: pokemon.colors.darkest }, className: "move-modal-section-title", children: "Effect" }),
            /* @__PURE__ */ jsx("p", { className: "move-modal-section-text", children: move.move.effect })
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          "a",
          {
            style: { backgroundColor: pokemon.colors.darkest },
            className: "pokemon-who-learn-move-a",
            href: `/move/${move.move.idMove}/pokemons`,
            children: "Pokemons who learn this move"
          }
        )
      ] })
    }
  );
};

const useMoveModal = () => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  return {
    open,
    setOpen,
    handleClick
  };
};

const MoveDataItem = ({ move, colors, boolean, learnType }) => {
  const { open, setOpen, handleClick } = useMoveModal();
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    open && /* @__PURE__ */ jsx(MoveModal, { move, open, onClose: () => setOpen(false) }),
    /* @__PURE__ */ jsxs("div", { onClick: handleClick, className: "move-row", children: [
      /* @__PURE__ */ jsxs("div", { className: "move-info", children: [
        (learnType === "level-up" || learnType === "machine") && /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
          "span",
          {
            className: "move-info-item",
            style: { color: colors.darkest, fontWeight: 500 },
            children: learnType === "level-up" ? move?.level === 0 ? "-" : move?.level : learnType === "machine" ? move?.mt : ""
          }
        ) }),
        /* @__PURE__ */ jsx(
          "span",
          {
            className: "move-info-item",
            style: { color: colors.darkest, fontWeight: 500 },
            children: move.move.name.replace("-", " ")
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "move-info-item", children: move.move.power ?? "-" }),
        /* @__PURE__ */ jsx("span", { className: "move-info-item", children: move.move.accuracy ?? "-" }),
        /* @__PURE__ */ jsx("span", { className: "move-info-item", children: move.move.pp })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "badges", children: [
        /* @__PURE__ */ jsxs("span", { className: "badge-type", children: [
          /* @__PURE__ */ jsx(
            "span",
            {
              style: {
                backgroundColor: move.move.type.colors.dark
              },
              className: "badge-type-span",
              children: "Type"
            }
          ),
          /* @__PURE__ */ jsx(
            "span",
            {
              style: {
                backgroundColor: move.move.type.colors.normal
              },
              className: "badge-type-name",
              children: move.move.type.name
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          "span",
          {
            className: `badge-category badge-category-${move.move.category}`,
            children: move.move.category
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "badge-info", children: /* @__PURE__ */ jsx(InfoIcon, { size: 16, color: "#898989" }) })
      ] }),
      boolean ? /* @__PURE__ */ jsx("hr", {}) : ""
    ] }, move.move.idMove)
  ] });
};

const MovesSection = () => {
  const [learnType, setLearnType] = useState("level-up");
  const { selectedGame } = useContext(GameContext);
  const { pokemon } = usePokemon();
  const { colors } = pokemon;
  const { moves, isLoading } = useMoves(pokemon.id, selectedGame);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(LearnTypeSelector, { onChange: setLearnType, selected: learnType }),
    isLoading ? /* @__PURE__ */ jsx(SectionLoading, { color: colors.normal }) : moves && moves[learnType] && /* @__PURE__ */ jsx(Fragment, { children: moves[learnType].length === 0 ? /* @__PURE__ */ jsx("div", { className: "move-row no-moves", children: "No moves are learned using this method" }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: "table-moves-header",
          style: { backgroundColor: colors.lightest },
          children: [
            learnType === "level-up" ? /* @__PURE__ */ jsx(TableHeaderItem, { color: colors.darkest, text: "Level" }) : learnType === "machine" && /* @__PURE__ */ jsx(TableHeaderItem, { color: colors.darkest, text: "MT/MO" }),
            /* @__PURE__ */ jsx(TableHeaderItem, { color: colors.darkest, text: "Name" }),
            /* @__PURE__ */ jsx(TableHeaderItem, { color: colors.darkest, text: "Power" }),
            /* @__PURE__ */ jsx(TableHeaderItem, { color: colors.darkest, text: "Accuracy" }),
            /* @__PURE__ */ jsx(TableHeaderItem, { color: colors.darkest, text: "PP" })
          ]
        }
      ),
      moves[learnType].map((move, index) => /* @__PURE__ */ jsx(
        MoveDataItem,
        {
          move,
          colors,
          boolean: moves[learnType].length - 1 > index ? true : false,
          learnType
        },
        move.move.idMove
      ))
    ] }) })
  ] });
};

const DamageReceivedElementsContainer = ({ damageReceivedArray }) => {
  return /* @__PURE__ */ jsx("div", { className: "damage-received-elements-container", children: damageReceivedArray.map((damageReceived) => /* @__PURE__ */ jsxs("article", { style: { backgroundColor: damageReceived.colors.normal }, className: "damage-received-element", children: [
    /* @__PURE__ */ jsx("header", { className: "damage-received-element-header", children: damageReceived.name }),
    /* @__PURE__ */ jsxs("aside", { style: { backgroundColor: damageReceived.colors.dark }, className: "damage-received-element-aside", children: [
      "×",
      damageReceived?.totalMultiplier
    ] })
  ] }, damageReceived.name)) });
};

const usePokemonDamage = (id) => {
  const [damageReceived, setDamageReceived] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    fetch(`${BASE_API_URL}/pokemon/data/damage-received/${id}`).then((res) => res.json()).then((data) => setDamageReceived(data)).finally(() => setIsLoading(false));
  }, []);
  return { damageReceived, isLoading };
};

const DamageReceivedSection = () => {
  const { pokemon } = usePokemon();
  const { id, colors } = pokemon;
  const { damageReceived, isLoading } = usePokemonDamage(id);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "h2",
      {
        className: "damage-received-section-title",
        style: { color: colors.darkest },
        children: "Damage Received"
      }
    ),
    isLoading ? /* @__PURE__ */ jsx(SectionLoading, { color: colors.normal }) : /* @__PURE__ */ jsxs("section", { className: "damage-received-section", children: [
      damageReceived && damageReceived?.debilities?.length > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("p", { className: "damage-received-description", children: "Weak against..." }),
        /* @__PURE__ */ jsx(DamageReceivedElementsContainer, { damageReceivedArray: damageReceived.debilities })
      ] }),
      damageReceived && damageReceived?.resistances?.length > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("p", { className: "damage-received-description", children: "Resistant against..." }),
        /* @__PURE__ */ jsx(DamageReceivedElementsContainer, { damageReceivedArray: damageReceived.resistances })
      ] }),
      damageReceived && damageReceived?.normalDamage?.length > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("p", { className: "damage-received-description", children: "Normal in part of..." }),
        /* @__PURE__ */ jsx(DamageReceivedElementsContainer, { damageReceivedArray: damageReceived.normalDamage })
      ] })
    ] })
  ] });
};

const EvSection = ({ evArray, colors }) => {
  return /* @__PURE__ */ jsxs("article", { className: "training-ev-container", children: [
    /* @__PURE__ */ jsx("div", { className: "training-ev-container-div", children: evArray.map((ev, index) => /* @__PURE__ */ jsxs("div", { className: "training-ev", children: [
      /* @__PURE__ */ jsx("span", { style: { color: colors.darker }, className: "training-ev-value", children: ev.ev }),
      " ",
      /* @__PURE__ */ jsx("span", { className: "training-ev-stat", children: String(ev.stat).replace("-", " ").replace("special", "sp.") }),
      index < evArray.length - 1 && /* @__PURE__ */ jsx("span", { className: "training-separator", children: " - " })
    ] }, ev.stat)) }),
    /* @__PURE__ */ jsx("p", { className: "training-description ev-description", children: "EVs provided" })
  ] });
};

const CaptureRateSection = ({ captureRate, colors }) => {
  return /* @__PURE__ */ jsxs("article", { className: "capture-rate-container", children: [
    /* @__PURE__ */ jsx("div", { className: "capture-rate-container-div", children: captureRate && /* @__PURE__ */ jsxs("div", { className: "capture-rate", children: [
      /* @__PURE__ */ jsx(
        "span",
        {
          style: { color: colors.darker },
          className: "capture-rate-value",
          children: captureRate.value
        }
      ),
      /* @__PURE__ */ jsxs(
        "span",
        {
          className: "capture-rate-percentage",
          children: [
            "(",
            captureRate.percentage,
            "% - Pokeball - max HP)"
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx("p", { className: "training-description capture-rate-description", children: "Capture Rate" })
  ] });
};

const GrowthSection = ({ growth, colors }) => {
  return /* @__PURE__ */ jsxs("article", { className: "growth-curve-container", children: [
    /* @__PURE__ */ jsx("div", { className: "growth-curve-container-div", children: growth && /* @__PURE__ */ jsxs("div", { className: "growth-curve", children: [
      /* @__PURE__ */ jsx(
        "span",
        {
          style: { color: colors.darker },
          className: "growth-curve-rate",
          children: String(growth.rate).replace("-", " ")
        }
      ),
      /* @__PURE__ */ jsxs(
        "span",
        {
          className: "growth-curve-experience",
          children: [
            "(",
            growth.experience,
            " Experience)"
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx("p", { className: "training-description growth-curve-description", children: "Growth curve" })
  ] });
};

const BaseValuesSection = ({ baseExperience, baseHappiness, colors }) => {
  return /* @__PURE__ */ jsxs("article", { className: "base-values", children: [
    /* @__PURE__ */ jsxs("div", { className: "base-happiness", children: [
      /* @__PURE__ */ jsx("div", { className: "base-happiness-value", children: /* @__PURE__ */ jsx("span", { style: { color: colors.darker }, children: baseHappiness }) }),
      /* @__PURE__ */ jsx("p", { className: "training-description base-happiness-description", children: "Base Happiness" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "base-experience", children: [
      /* @__PURE__ */ jsx("div", { className: "base-experience-value", children: /* @__PURE__ */ jsx("span", { style: { color: colors.darker }, children: baseExperience }) }),
      /* @__PURE__ */ jsx("p", { className: "training-description base-experience-description", children: "Base Experience" })
    ] })
  ] });
};

const usePokemonTraining = (id) => {
  const [training, setTraining] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    fetch(`${BASE_API_URL}/pokemon/data/training/${id}`).then((res) => res.json()).then((data) => setTraining(data)).finally(() => setIsLoading(false));
  }, []);
  return { training, isLoading };
};

const TrainingSection = () => {
  const { pokemon } = usePokemon();
  const { colors, id } = pokemon;
  const { training, isLoading } = usePokemonTraining(id);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "h2",
      {
        className: "training-section-title",
        style: { color: colors.darkest },
        children: "Training"
      }
    ),
    isLoading ? /* @__PURE__ */ jsx(SectionLoading, { color: colors.normal }) : training && /* @__PURE__ */ jsxs("section", { className: "training-section", children: [
      /* @__PURE__ */ jsx(
        EvSection,
        {
          evArray: training.ev,
          colors
        }
      ),
      /* @__PURE__ */ jsx(
        CaptureRateSection,
        {
          captureRate: training.captureRate,
          colors
        }
      ),
      /* @__PURE__ */ jsx(
        GrowthSection,
        {
          growth: training.growth,
          colors
        }
      ),
      /* @__PURE__ */ jsx(
        BaseValuesSection,
        {
          baseExperience: training.baseExperience,
          baseHappiness: training.baseHappiness,
          colors
        }
      )
    ] })
  ] });
};

const GenderRateSection = ({ maleRate, femaleRate }) => {
  return /* @__PURE__ */ jsxs("article", { className: "gender-rate", children: [
    /* @__PURE__ */ jsxs("div", { className: "gender-rate-values", children: [
      /* @__PURE__ */ jsxs(
        "div",
        {
          style: { width: `${maleRate > 75 ? 75 : maleRate < 25 ? 25 : maleRate}%` },
          className: "gender-male",
          children: [
            /* @__PURE__ */ jsx(MaleIcon, {}),
            /* @__PURE__ */ jsxs("p", { children: [
              maleRate,
              "%"
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        "div",
        {
          style: { width: `${femaleRate > 75 ? 75 : femaleRate < 25 ? 25 : femaleRate}%` },
          className: "gender-female",
          children: [
            /* @__PURE__ */ jsx(FemaleIcon, {}),
            /* @__PURE__ */ jsxs("p", { children: [
              femaleRate,
              "%"
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("p", { className: "gender-rate-description", children: "Gender Rate" })
  ] });
};

const EggGroups = ({ eggGroups, colors }) => {
  return /* @__PURE__ */ jsxs("article", { className: "egg-groups-section", children: [
    /* @__PURE__ */ jsx("div", { className: "egg-groups-section-div", children: eggGroups.map((eggGroup) => /* @__PURE__ */ jsxs("a", { href: `/egg-group/${eggGroup}`, style: { backgroundColor: colors.normal, color: colors.darkest }, className: "egg-group", children: [
      /* @__PURE__ */ jsx("span", { className: "egg-group-name", children: eggGroup }),
      /* @__PURE__ */ jsx(
        InfoIcon,
        {
          color: colors.darkest,
          size: 24
        }
      )
    ] }, eggGroup)) }),
    /* @__PURE__ */ jsx("p", { className: "egg-groups-description", children: "Egg Groups" })
  ] });
};

const HatchCounterSection = ({ hatchCounter, colors }) => {
  return /* @__PURE__ */ jsxs("article", { className: "hatch-counter", children: [
    /* @__PURE__ */ jsxs("div", { className: "hatch-counter-div", children: [
      /* @__PURE__ */ jsx("span", { style: { color: colors.darkest }, className: "hatch-counter-cicles", children: hatchCounter.cicles }),
      /* @__PURE__ */ jsxs("span", { className: "hatch-counter-steps", children: [
        "(",
        hatchCounter.steps,
        " steps)"
      ] })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "hatch-counter-description", children: "Hatch Counter" })
  ] });
};

const usePokemonBreeding = (id) => {
  const [breeding, setBreeding] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    fetch(`${BASE_API_URL}/pokemon/data/breeding/${id}`).then((res) => res.json()).then((data) => setBreeding(data)).finally(() => setIsLoading(false));
  }, []);
  return { breeding, isLoading };
};

const BreedingSection = () => {
  const { pokemon } = usePokemon();
  const { colors, id } = pokemon;
  const { breeding, isLoading } = usePokemonBreeding(id);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "h2",
      {
        className: "breeding-section-title",
        style: { color: colors.darkest },
        children: "Breeding"
      }
    ),
    isLoading ? /* @__PURE__ */ jsx(SectionLoading, { color: colors.normal }) : breeding && /* @__PURE__ */ jsxs("section", { className: "breeding-section", children: [
      /* @__PURE__ */ jsx(
        GenderRateSection,
        {
          femaleRate: breeding.femaleRate,
          maleRate: breeding.maleRate
        }
      ),
      /* @__PURE__ */ jsx(
        EggGroups,
        {
          eggGroups: breeding.eggGroups,
          colors
        }
      ),
      /* @__PURE__ */ jsx(
        HatchCounterSection,
        {
          hatchCounter: breeding.hatchCounter,
          colors
        }
      )
    ] })
  ] });
};

const MoreSection = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(DamageReceivedSection, {}),
    /* @__PURE__ */ jsx(TrainingSection, {}),
    /* @__PURE__ */ jsx(BreedingSection, {})
  ] });
};

const PrevNextSection = ({ prev, next }) => {
  return /* @__PURE__ */ jsx(Fragment, { children: (prev || next) && /* @__PURE__ */ jsxs("section", { className: "prev-next", children: [
    next && /* @__PURE__ */ jsxs("article", { className: "next", children: [
      /* @__PURE__ */ jsxs("div", { className: "next-text-container", children: [
        /* @__PURE__ */ jsx("a", { href: `${next?.id}`, className: "pokemon-next", style: { color: next.colors.darkest }, children: "Next pokemon" }),
        /* @__PURE__ */ jsx(RightArrowIcon, { color: next.colors.darkest, size: 18 })
      ] }),
      /* @__PURE__ */ jsx(PokemonCard, { pokemon: next })
    ] }),
    prev && /* @__PURE__ */ jsxs("section", { className: "prev", children: [
      /* @__PURE__ */ jsxs("div", { className: "prev-text-container", children: [
        /* @__PURE__ */ jsx(LeftArrowIcon, { color: prev.colors.darkest, size: 18 }),
        /* @__PURE__ */ jsx("a", { href: `${prev?.id}`, className: "pokemon-prev", style: { color: prev.colors.darkest }, children: "Previous pokemon" })
      ] }),
      /* @__PURE__ */ jsx(PokemonCard, { pokemon: prev })
    ] })
  ] }) });
};

const NavigationHome = ({ colors }) => {
  return /* @__PURE__ */ jsxs("div", { className: "home-navigation-container", children: [
    /* @__PURE__ */ jsxs("a", { href: "/", className: "home-navigation", children: [
      /* @__PURE__ */ jsx(HomeIcon, { color: colors.darkest }),
      /* @__PURE__ */ jsx("p", { style: { color: colors.darkest }, className: "home-navigation-text", children: "Home" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "home-navigation-description-container", children: [
      /* @__PURE__ */ jsx("p", { className: "home-navigation-description", children: "Press home button to return to main screen" }),
      /* @__PURE__ */ jsx("p", { className: "home-navigation-description", children: "Alternatively, press below buttons to go to previous or next Pokemon in list" })
    ] })
  ] });
};

const usePrevNext = (id) => {
  const [prevNext, setPrevNext] = useState({
    prev: null,
    next: null
  });
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    fetch(`${BASE_API_URL}/pokemon/prevNext/${id}`).then((res) => res.json()).then((data) => {
      setPrevNext({
        prev: data.previous,
        next: data.next
      });
    }).finally(() => setIsLoading(false));
  }, [id]);
  return { prev: prevNext.prev, next: prevNext.next, isLoading };
};

const NavigationSection = ({ id, colors }) => {
  const { prev, next, isLoading } = usePrevNext(id);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("h2", { style: { color: colors.darkest }, className: "navigation-section-title", children: "Navigation" }),
    isLoading ? /* @__PURE__ */ jsx(SectionLoading, { color: colors.normal }) : /* @__PURE__ */ jsxs("section", { className: "navigation-section", children: [
      /* @__PURE__ */ jsx(NavigationHome, { colors }),
      /* @__PURE__ */ jsx(PrevNextSection, { prev, next })
    ] })
  ] });
};

function useGroupedGames(gamesByGeneration) {
  return useMemo(() => {
    if (!gamesByGeneration) return {};
    const res = {};
    Object.entries(gamesByGeneration).forEach(([gen, games]) => {
      if (!games) return;
      const byVG = {};
      games.forEach((g) => {
        (byVG[g.versionGroup] ||= []).push(g);
      });
      res[gen] = Object.entries(byVG).map(([vg, arr]) => ({
        versionGroup: vg,
        games: arr
      }));
    });
    return res;
  }, [gamesByGeneration]);
}

const SelectedGameHeader = ({ selectedGame, grouped, vgToGames, onClick }) => {
  if (!selectedGame) return null;
  return /* @__PURE__ */ jsxs("section", { className: "pgs-header", children: [
    /* @__PURE__ */ jsx("span", { onClick, className: "pgs-button-text", children: vgToGames.get(selectedGame.versionGroup)?.map((name, idx, arr) => /* @__PURE__ */ jsx(
      "span",
      {
        className: `pgs-pill ${arr.length > 1 ? "group-pill" : "single-pill"}`,
        style: {
          backgroundColor: Object.values(grouped).flatMap((vgList) => vgList.flatMap((vg) => vg.games)).find((g) => String(g.game) === name)?.color || "#7aa6ff",
          color: String(name).includes("white") ? "#454545" : "#ededed"
        },
        children: String(name).replace("-", " ")
      },
      name
    )) }),
    /* @__PURE__ */ jsx("p", { className: "pgs-header-description", children: "Select a version of a game to see relevant data like base stats, moves, locations and more" })
  ] });
};

const GameList = ({ grouped, onSelect }) => {
  return /* @__PURE__ */ jsx("div", { className: "pgs-list", children: Object.entries(grouped).map(([genKey, vgList]) => /* @__PURE__ */ jsxs("section", { className: "pgs-gen", children: [
    /* @__PURE__ */ jsx("h4", { className: "pgs-gen-title", children: genKey.replace("-", " ") }),
    vgList.map(({ versionGroup, games }) => /* @__PURE__ */ jsx("div", { className: "pgs-vg-block", children: /* @__PURE__ */ jsx("div", { className: "pgs-games-row", children: games.map((g) => /* @__PURE__ */ jsx(
      "button",
      {
        style: {
          color: String(g.game).includes("white") ? "#454545" : "#ededed",
          backgroundColor: g.color
        },
        className: String(versionGroup).includes("_") ? "pgs-pill group-pill" : "pgs-pill single-pill",
        onClick: () => onSelect(g),
        children: String(g.game).replace("-", " ")
      },
      g.game
    )) }) }, versionGroup))
  ] }, genKey)) });
};

const useVersionGroupMap = (grouped) => {
  return useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    Object.values(grouped).forEach((vgList) => {
      vgList?.forEach(({ versionGroup, games }) => {
        const list = map.get(versionGroup) ?? [];
        games.forEach((g) => {
          const gameId = typeof g.game === "string" && g.game;
          if (gameId && !list.includes(gameId)) list.push(gameId);
        });
        map.set(versionGroup, list);
      });
    });
    return map;
  }, [grouped]);
};

const PokemonGameSelector = () => {
  const { gamesByGeneration, selectedGame, setSelectedGame } = useGameContext();
  const [open, setOpen] = useState(false);
  const grouped = useGroupedGames(gamesByGeneration);
  const vgToGames = useVersionGroupMap(grouped);
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "pgs-root", children: [
    /* @__PURE__ */ jsx(
      SelectedGameHeader,
      {
        selectedGame,
        grouped,
        vgToGames,
        onClick: () => setOpen(true)
      }
    ),
    open && /* @__PURE__ */ jsx("div", { className: "pgs-overlay", onClick: () => setOpen(false), children: /* @__PURE__ */ jsxs("div", { className: "pgs-sheet", onClick: (e) => e.stopPropagation(), children: [
      /* @__PURE__ */ jsx("h3", { className: "pgs-title", children: "Select a game edition" }),
      /* @__PURE__ */ jsx(
        GameList,
        {
          grouped,
          onSelect: (g) => {
            setSelectedGame(g);
            setOpen(false);
          }
        }
      )
    ] }) })
  ] });
};

const MenuSection = () => {
  const { pokemon } = usePokemon();
  const { id, colors } = pokemon;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(PokemonGameSelector, {}),
    /* @__PURE__ */ jsx(NavigationSection, { id, colors })
  ] });
};

const useGames = ({ id }) => {
  const [gamesByGeneration, setGamesByGeneration] = useState({});
  const [defaultGame, setDefaultGame] = useState(null);
  useEffect(() => {
    if (!id) return;
    fetch(`${BASE_API_URL}/pokemongame/${id}`).then((res) => res.json()).then((data) => {
      setGamesByGeneration(data);
      const generations = Object.keys(data);
      if (generations.length > 0) {
        const lastGen = generations[generations.length - 1];
        const lastGenGames = data[lastGen];
        if (lastGenGames?.length > 0) {
          setDefaultGame(lastGenGames[0]);
        }
      }
    }).catch((err) => console.error("Error en fetch:", err));
  }, [id]);
  return { gamesByGeneration, defaultGame };
};

const PokemonDataPage = ({ pokemon }) => {
  const [activeSection, setActiveSection] = useState("info");
  const { gamesByGeneration, defaultGame } = useGames({ id: pokemon.id });
  return /* @__PURE__ */ jsx(PokemonProvider, { pokemon, children: defaultGame && /* @__PURE__ */ jsxs(GameProvider, { gamesByGeneration, defaultGame, children: [
    /* @__PURE__ */ jsx(PokemonCard$1, {}),
    /* @__PURE__ */ jsxs("main", { style: { paddingBottom: "100px" }, className: "section-container", children: [
      activeSection === "info" && /* @__PURE__ */ jsx(InfoSection, {}),
      activeSection === "moves" && /* @__PURE__ */ jsx(MovesSection, {}),
      activeSection === "more" && /* @__PURE__ */ jsx(MoreSection, {}),
      activeSection === "menu" && /* @__PURE__ */ jsx(MenuSection, {})
    ] }),
    /* @__PURE__ */ jsxs("footer", { style: { backgroundColor: pokemon.colors.normal }, className: "section-selector", children: [
      /* @__PURE__ */ jsxs("button", { style: { color: pokemon.colors.darkest }, className: "footer-button", onClick: () => setActiveSection("info"), children: [
        /* @__PURE__ */ jsx(InfoIcon, { size: 32, color: pokemon.colors.darkest }),
        activeSection === "info" && /* @__PURE__ */ jsx("label", { children: "Info" })
      ] }),
      /* @__PURE__ */ jsxs("button", { style: { color: pokemon.colors.darkest }, className: "footer-button", onClick: () => setActiveSection("moves"), children: [
        /* @__PURE__ */ jsx(SwordIcon, { color: pokemon.colors.darkest }),
        activeSection === "moves" && /* @__PURE__ */ jsx("label", { children: "Moves" })
      ] }),
      /* @__PURE__ */ jsxs("button", { style: { color: pokemon.colors.darkest }, className: "footer-button", onClick: () => setActiveSection("more"), children: [
        /* @__PURE__ */ jsx(MoreIcon, { color: pokemon.colors.darkest }),
        activeSection === "more" && /* @__PURE__ */ jsx("label", { children: "More" })
      ] }),
      /* @__PURE__ */ jsxs("button", { style: { color: pokemon.colors.darkest }, className: "footer-button", onClick: () => setActiveSection("menu"), children: [
        /* @__PURE__ */ jsx(MenuIcon, { color: pokemon.colors.darkest }),
        activeSection === "menu" && /* @__PURE__ */ jsx("label", { children: "Menu" })
      ] })
    ] })
  ] }) });
};

const $$Astro = createAstro();
const prerender = false;
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  const res = await fetch(`http://localhost:3000/pokemon/${id}/info`);
  let error = null;
  let pokemon = null;
  if (!res.ok) {
    error = {
      status: res.status,
      message: (await res.json()).error
    };
  } else {
    pokemon = await res.json();
  }
  return renderTemplate`<html lang="en" data-astro-cid-m443o6wr> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${pokemon?.name.charAt(0).toUpperCase()}${pokemon?.name.slice(1)}</title>${renderHead()}</head> <body${addAttribute(pokemon && `background:${pokemon.colors.normal}`, "style")} data-astro-cid-m443o6wr> ${error && renderTemplate`${renderComponent($$result, "ErrorContainer", ErrorContainer, { "error": error, "data-astro-cid-m443o6wr": true })}`} ${pokemon && renderTemplate`${renderComponent($$result, "PokemonDataPage", PokemonDataPage, { "pokemon": pokemon, "client:load": true, "client:component-hydration": "load", "client:component-path": "@components/pokemon/PokemonDataPage.tsx", "client:component-export": "PokemonDataPage", "data-astro-cid-m443o6wr": true })}`} </body></html>`;
}, "C:/Users/Tobias/Desktop/Proyectos/datadex/frontend/src/pages/pokemon/[id].astro", void 0);

const $$file = "C:/Users/Tobias/Desktop/Proyectos/datadex/frontend/src/pages/pokemon/[id].astro";
const $$url = "/pokemon/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
