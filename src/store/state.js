export const state = () => ({
  // SYSTEM
  IS_ADMIN: false,
  LOADING: false,
  ERR: null,

  // DICTIONARIES
  dictionaries: {
    brands: [],
    colors: [],
    countries: [],
    materials: [],
    delivery: [],
    courier: []
  },


  // USER
  USER: { // Cart and orders IDs array in database. Full products objects array in client side
    cart: [],
    orders: []
  },


  // PRODUCTS
  products: {},
  singleProduct: {},
  productStatistics: { // auto updated from cloud function
    maxPrice: 1000000,
    avgPrice: 0,
    uniqueProductQty: 0,
    totalProductQty: 0,
    totalStoreCoast: 0
  },
  lastVisible: null, // value means load more button is available
  productFilters: {
    minPrice: 0,
    maxPrice: 0,
    group: '',
    category: '',
    country: '',
    brand: '',
    color: '',
    material: '',
    sortByPrice: 'desc',
    limit: 15
  },
  algoliaSearchText: '',
  // CONSTANTS
  ADMINS: ['smelayapandagm@gmail.com'],
  PRODUCT_TREE: [{
    label: 'Запорная и регулирующая арматура',
    value: 'shutoff-and-control-valves',
    children: [
      {value: 'elevators', label: 'элеваторы'},
      {value: 'filters', label: 'фильтры'},
      {value: 'shut-off-valves', label: 'клапаны запорные'},
      {value: 'inverse-valves', label: 'клапаны обратные'},
      {value: 'latches', label: 'задвижки'},
      {value: 'shutters', label: 'затворы'},
      {value: 'cranes', label: 'краны'}
    ]
  }, {
    label: 'Измерительные приборы',
    value: 'measuring-instruments',
    children: [
      {value: 'water-meters', label: 'счетчики воды'},
      {value: 'gas-meters', label: 'счетчики газа'},
      {value: 'thermometers', label: 'термометры'},
      {value: 'manometers', label: 'манометры'}
    ]
  }, {
    label: 'Изоляция, расходники, инструмент',
    value: 'insulation-consumables-tools',
    children: [
      {value: 'isolation', label: 'изоляция'},
      {value: 'hardware', label: 'метизы'},
      {value: 'yokes', label: 'хомуты'},
      {value: 'gaskets-and-repair-kits', label: 'прокладки и ремонтные комплекты'},
      {value: 'sealing-materials', label: 'уплотнительные материалы'},
      {value: 'tool', label: 'инструмент'}
    ]
  }, {
    label: 'Канализационные системы',
    value: 'sewage-systems',
    children: [
      {value: 'internal-sewerage-polypropylene', label: 'внутренняя канализация полипропилен'},
      {value: 'external-sewerage-polypropylene', label: 'наружная канализация полипропилен'},
      {value: 'fire-clutches', label: 'чугунная канализация'},
      {value: 'fire-extinguishing-couplings', label: 'противопожарные муфты'}
    ]
  }, {
    label: 'Котлы и водонагреватели',
    value: 'boilers-and-water-heaters',
    children: [
      {value: 'boilers', label: 'котлы'},
      {value: 'water-heaters', label: 'водонагреватели'},
      {value: 'bellows-for-gas-supply', label: 'подводка сильфонная для газа'}
    ]
  }, {
    label: 'Люки и дождеприемники',
    value: 'hatches-and-rainwater-receivers',
    children: [
      {value: 'polymer-hatches', label: 'Полимерные люки'},
      {value: 'cast-iron-manholes', label: 'Чугунные люки'},
      {value: 'sprinklers', label: 'Дождеприемники'}
    ]
  }, {
    label: 'Насосное оборудование',
    value: 'pumping-equipment',
    children: [
      {value: 'pumps', label: 'насосы'},
      {value: 'wellheads', label: 'Оголовки скважинные'},
      {value: 'accessories', label: 'Комплектующие'}
    ]
  }, {
    label: 'Радиаторы и комплектующие',
    value: 'radiators-and-accessories',
    children: [
      {value: 'aluminum-radiators-sti', label: 'алюминиевые радиаторы STI'},
      {value: 'bimetallic-radiators-sti', label: 'биметаллические радиаторы STI'},
      {value: 'steel-panel-radiators-sti', label: 'стальные панельные радиаторы STI'},
      {value: 'cast-iron-radiators', label: 'чугунные радиаторы'},
      {value: 'thermoregulating-armature', label: 'терморегулирующая арматура'}
    ]
  }, {
    label: 'Расширительные баки',
    value: 'expansion-tanks',
    children: [
      {value: 'expansion-tanks-for-heating', label: 'расширительные баки для отопления'},
      {value: 'accumulators', label: 'гидроаккумуляторы'},
      {value: 'cast-iron-radiators', label: 'чугунные радиаторы'},
      {value: 'steel-panel-radiators-sti', label: 'стальные панельные радиаторы STI'},
      {value: 'thermoregulating-reinforcement', label: 'терморегулирующая арматура'}
    ]
  }, {
    label: 'Сантехника',
    value: 'sanitary-engineering',
    children: [
      {value: 'armature', label: 'арматура'},
      {value: 'siphons', label: 'сифоны'},
      {value: 'mixers-and-showers', label: 'смесители и душ'},
      {value: 'heated-towel-rails', label: 'полотенцесушители'},
      {value: 'flexible-padding', label: 'гибкая подводка'}
    ]
  }, {
    label: 'Теплый пол',
    value: 'warm-floor',
    children: [
      {value: 'collector-groups', label: 'Коллекторные группы'},
      {value: 'pe-x-pipes', label: 'Трубы PE-X'},
      {value: 'pe-rt-pipes', label: 'Трубы PE-RT'},
      {value: 'substrate', label: 'Подложка'},
      {value: 'accessories', label: 'Комплектующие'}
    ]
  }, {
    label: 'Трубы и соединительные части',
    value: 'pipes-and-connecting-parts',
    children: [
      {value: 'metal-plastic-systems', label: 'металлопластиковые системы'},
      {value: 'polypropylene-system', label: 'полипропиленовые системы'},
      {value: 'steel-systems', label: 'стальные системы'},
      {value: 'pipes', label: 'трубы'},
      {value: 'taps', label: 'отводы'},
      {value: 'pipe-blank', label: 'трубная заготовка'},
      {value: 'polyethylene-systems-pnd', label: 'полиэтиленовые системы (ПНД)'}
    ]
  }, {
    label: 'Фитинги',
    value: 'fittings',
    children: [
      {value: 'steel-fittings', label: 'фитинги стальные'},
      {value: 'polypropylene-systems', label: 'полипропиленовые системы'},
      {value: 'cast-iron-fittings', label: 'фитинги чугунные'},
      {value: 'brass-fittings', label: 'фитинги латунные'},
      {value: 'taps-fittings', label: 'отводы'},
      {value: 'pipe-blank', label: 'трубная заготовка'},
      {value: 'polyethylene-systems-fitting-png', label: 'полиэтиленовые системы (пнд)'}
    ]
  }, {
    label: 'Светильники и комплектующиен',
    value: 'fixtures-and-accessories',
    children: [
      {value: 'ceiling-lights-with-led-backlighting', label: 'потолочные светильники c LED подсв.'},
      {value: 'halogen-lights', label: 'галогенные светильники'},
      {value: '3-carob-chandeliers', label: 'люстры 3-х рожковые'},
      {value: '4-and-5-horn-chandeliers', label: 'люстры 4-х и 5-ти рожковые'},
      {value: 'chandeliers-6-or-more-carobs', label: 'люстры 6-ти и более рожковые'},
      {value: 'pendants-on-the-1-f-light-end', label: 'подвесы на 1-у светоточку'},
      {value: 'two-or-more-light-points', label: 'подвесы на 2-е и более светоточки'},
      {value: 'sconces-are-1-but-corrugated', label: 'бра 1-но рожковы'},
      {value: 'two-or-more-horns', label: 'бра 2-х и более рожковые'},
      {value: 'wall-and-ceiling-on-the-1st-light', label: 'настенные и потолочные 1 светоточка'},
      {value: 'wall-and-ceiling-on-the-2nd-and-more-lights', label: 'настенные и потолочные > 1 светоточки'},
      {value: 'wall-and-ceiling-irises', label: 'настенные и потолочные ирисы'},
      {value: 'table-lamps', label: 'настольные лампы'},
      {value: 'street-lamp', label: 'уличные светильник'},
      {value: 'led-lights', label: 'светодиодные светильники'},
      {value: 'recessed-light', label: 'встраиваемые светильники'}
    ]
  }, {
    label: 'Для дома и дачи',
    value: 'for-home-and-cottages',
    children: [
      {value: 'hives-ppu', label: 'Ульи ППУ'},
      {value: 'ir-dryers-for-vegetables', label: 'Сушилки ИК (для овощей)'},
      {value: 'repellers-and-traps-of-moles-mice', label: 'Отпугиватели и ловушки кротов, мышей'},
      {value: 'repellers-and-traps-of-mosquitoes-flies', label: 'От комаров и мух'},
      {value: 'goods-for-summer-residents-and-tourists', label: 'Товары для дачников и туристов'},
      {value: 'mosquito-lamps-and-traps', label: 'Антимоскитные лампы и ловушки'},
      {value: 'electric-fly-swatter', label: 'Электрические мухобойки'},
      {value: 'plant-lighting', label: 'Досветка растений'},
    ]
  }, {
    label: 'Капельный полив',
    value: 'drip-irrigation',
    children: [
      {value: 'drop-and-sprinkler-tape', label: 'Капельные и дождевальные лента'},
      {value: 'irrigated-sleeves', label: 'Поливные рукава'},
      {value: 'mesh-gravel-disk-filters', label: 'Фильтры сетчатые, гравийные, дисковые'},
      {value: 'containers-for-applying-fertilizers', label: 'Емкости для внесения удобрений'},
      {value: 'watering-timers', label: 'Таймеры полива'},
      {value: 'solenoid-valves', label: 'Электромагнитные клапана'},
      {value: 'quick-fit-fittings', label: 'Быстросъёмные фитинги'},
      {value: 'fittings-for-drip-tapes', label: 'Фитинги для капельной ленты'},
      {value: 'tube-fittings', label: 'Фитинги для трубок'},
      {value: 'air-valves', label: 'Воздушные клапана'},
      {value: 'tools', label: 'Инструменты'},
      {value: 'saddle-couplers', label: 'Седловые ответвители'},
      {value: 'cranes', label: 'Краны'},
      {value: 'filters', label: 'Фильтры'},
      {value: 'venturi-injectors-for-fertilizer-application', label: 'Инжекторы Вентури для удобрений'},
      {value: 'pressure-regulators', label: 'Регуляторы давления'},
      {value: 'droppers', label: 'Капельницы'},
      {value: 'sprinklers-accessories', label: 'Разбрызгиватели, аксессуары'},
      {value: 'mikrojets', label: 'Микроджеты'},
      {value: 'foggers', label: 'Туманообразователи'},
      {value: 'spraying-hoses-and-fittings', label: 'Разбрызгивающие шланги и фитинги'},
      {value: 'boxes-for-the-valve', label: 'Коробки для клапана'},
      {value: 'tubes', label: 'Трубки'}
    ]
  }]
})
