export enum Type {
    grass,
    poison,
    water,
    fire,
    fairy,
    electric,
    ground,
    rock,
    dragon,
    ghost,
    dark,
    psychic,
    ice,
    normal,
    fight,
    bug,
    steel,
    fly
}

export enum Generation {
    generation1 = 'generation-i',
    generation2 = 'generation-ii',
    generation3 = 'generation-iii',
    generation4 = 'generation-iv',
    generation5 = 'generation-v',
    generation6 = 'generation-vi',
    generation7 = 'generation-vii',
    generation8 = 'generation-viii',
    generation9 = 'generation-ix'    
}

export enum Game {
    'alpha-sapphire',
    'black',
    'black-2',
    'blue',
    'crystal',
    'diamond',
    'emerald',
    'firered',
    'gold',
    'heartgold',
    'leafgreen',
    'legends-arceus',
    'omega-ruby',
    'pearl',
    'platinum',
    'red',
    'ruby',
    'sapphire',
    'scarlet',
    'shield',
    'silver',
    'soulsilver',
    'sun',
    'sword',
    'ultra-moon',
    'ultra-sun',
    'violet',
    'white',
    'white-2',
    'x',
    'y',
    'yellow'
}

export enum VersionGroup {
    'red_blue',
    'yellow',
    'gold_silver',
    'crystal',
    'ruby_sapphire',
    'emerald',
    'firered_leafgreen',
    'diamond_pearl',
    'platinum',
    'heartgold_soulsilver',
    'black_white',
    'black-2_white-2',
    'x_y',
    'omega-ruby_alpha-sapphire',
    'sun_moon',
    'ultra-sun_ultra-moon',
    'sword_shield',
    'legends-arceus',
    'scarlet_violet'
}

export interface GameData {
    game: Game,
    versionGroup: VersionGroup,
    color: HexColor
}

export type GamesByGeneration = Record<Generation, GameData[]>

export interface TypeData {
    name: Type,
    color: HexColor
}

export interface GenerationData {
    name: Generation
}

export type HexColor = `#${string}`

export interface Colors {
    normal: HexColor
    lighter: HexColor
    darker: HexColor
    lightest: HexColor
    darkest: HexColor
}

export interface Pokemon {
    id: number,
    name: string,
    img: string,
    types: Type[],
    colors: Colors
}

export interface PokemonResponse {
    pokemons: Pokemon[],
    hasMore: boolean
}

export interface Ability {
    name: string,
    description: string,
    effect: string,
    depthEffect: string
}

export interface Abilities { 
    normal: Ability[]
    hidden: Ability[]
}

export enum StatNames {
    "hp",
    "attack",
    "special-attack",
    "speed",
    "defense",
    "special-defense"
}


export interface StatValues {
    stat: StatNames,
    minValue: number,
    maxValue: number,
    baseValue: number
}

export interface Stats {
    values: StatValues[],
    baseTotal: number
}

export interface EvolutionChain {
    from: Pokemon,
    to: Pokemon,
    method: string
}

export interface Location {
    id: number,
    name: string
}

export type HeightFormatted = `${number} lbs (${number} kg)`
export type WeightFormatted = `${number}'${number}'' (${number} meters)`

export interface PokemonByIdResponse {
  id: number,
  genus: string,
  name: string,
  img: string,
  cry: string,
  height: HeightFormatted,
  weight: WeightFormatted,
  colors: Colors,
  types: Type[]
}

export interface PokemonInfoResponseById {
    description: string,
    sprite: string,
    spriteShiny: string
}

export interface PokemonNavigationResponseById {
    previous: Pokemon | null,
    next: Pokemon | null
}

export enum LearnType {
    machine = 'MT/MO',
    tutor = 'tutor',
    'level-up' = 'level up',
    egg = 'egg'
}

export enum MoveCategory {
    physical = 'physical',
    special = 'special',
    status = 'status'
}

export interface Move {
    idMove: number,
    name: string,
    accuracy: number,
    pp: number,
    description: string,
    effect: string,
    category: MoveCategory,
    power: number,
    type: {
        name: Type,
        colors: {
            normal: HexColor,
            dark: HexColor
        },
    }
}

export type MT = `MT${number}`

export interface MoveResponse {
    move: Move,
    level?: number
    mt?: MT
}

export type TypesDamage = "resistances" | "debilities" | "normalDamage"

export interface DamageReceived {
    name: Type,
    colors: {
        normal: HexColor,
        dark: HexColor
    },
    totalMultiplier: number,
}

export interface Ev {
    ev: number,
    stat: StatNames
}

export enum GrowthRate {
    "fast",
    "fast-then-very-slow",
    "medium",
    "medium-slow",
    "slow",
    "slow-then-very-fast"
}

export interface CaptureRate {
    value: number,
    percentage: number
}

export interface GrowthRateTraining {
    rate: GrowthRate,
    experience: number
}

export interface Training {
    ev: Ev[],
    captureRate: CaptureRate
    growth: GrowthRateTraining
    baseHappiness: number,
    baseExperience: number
}

export enum EggGroup {
    "bug",
    "ditto",
    "dragon",
    "fairy",
    "flying",
    "ground",
    "humanshape",
    "indeterminate",
    "mineral",
    "monster",
    "no-eggs",
    "plant",
    "water1",
    "water2",
    "water3"
}

export interface HatchCounter {
    cicles: number,
    steps: number
}

export interface Breeding {
    maleRate: number,
    femaleRate: number,
    eggGroups: EggGroup[],
    hatchCounter: HatchCounter
}

export type PokemonDataDamageReceived = Record<TypesDamage, DamageReceived[]>

export interface PokemonDataByLocation {
    id: number,
    name: string,
    img: string,
    colors: Colors
    types: Type[],
    games: Game[],
    minLevel: number,
    maxLevel: number,
    chance: number
}

export type PokemonResponseByLocation = Record<string, Record<string, PokemonDataByLocation[]>>

export interface PokemonWhoAppearsOnLocationResponse {
    location: string,
    pokemonCount: number,
    pokemons: PokemonResponseByLocation
}

export interface Error {
  message: string,
  status: number
}

export interface PokemonWhoLearnMoveIdResponse {
    move: {
        id: number,
        name: string,
    },
    pokemons: Record<keyof typeof LearnType, Pokemon[]> 
}

export interface EvolutionNode {
  id: number,
  name: string,
  img: string,
  types: Type[],
  colors: Colors,
  evolvesTo?: {
    method: string,
    id: number,
    name: string,
    img: string,
    types: string[],
    colors: Colors,
    evolvesTo?: EvolutionNode[],
  }[]
}