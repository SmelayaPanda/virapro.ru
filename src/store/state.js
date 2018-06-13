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


  // user
  user: { // Cart and orders IDs array in database. Full products objects array in client side
    cart: [],
    orders: []
  },

  // ORDERS
  orders: {},
  orderStatistics: {
    payPending: 0,
    sentPending: 0,
    sent: 0,
    delivered: 0,
    refused: 0,
    totalOrders: 0
  },
  confirmationObj: {orderId: '', url: ''},

  // REVIEWS
  reviews: {},
  reviewStatistics: {
    created: 0,
    published: 0,
    archived: 0,
    totalReviews: 0
  },

  // COMPANY INFO
  companyInfo: {
    contacts: {
      phone: '',
      mobilePhone: '',
      email: ''
    },
    address: {
      country: '',
      city: '',
      street: '',
      build: '',
      house: '',
      postCode: ''
    },
    main: {
      INN: '',
      name: ''
    }
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
  productCommonFilters: {
    minPrice: 0,
    maxPrice: 0,
    group: '',
    category: '',
    sortByPrice: 'desc',
    limit: 15
  },
  productDynamicFilters: {
    // adds as facets filters with algolia search
    // and as client side if firebase full category load
    originCountry: '',
    brand: '' // ...
  },
  algoliaSQLFilter: '',
  algoliaSearchText: '',
  // CONSTANTS
  ADMINS: ['smelayapandagm@gmail.com'],
  PAYMENT_METHODS: {
    cash: {value: 'cash', label: 'Наличные'},
    bank_card: {value: 'bank_card', label: 'Банковская карта'}
  },
  PAYMENT_TYPES: {
    receipt: {value: 'receipt', label: 'При получении'},
    online: {value: 'online', label: 'На сайте'}
  },
  DELIVERY_METHODS: {
    kit: {value: 'kit', label: 'КИТ'},
    dellin: {value: 'dellin', label: 'Деловые Линии'},
    courier: {value: 'courier', label: 'Курьер'},
    yourself: {value: 'yourself', label: 'Самовывоз'}
  },
  PAYMENT_STATUSES: {
    none: {value: 'none', label: 'Не оплачено'},
    pending: {value: 'pending', label: 'Платеж создан (ожидает вашего подтверждения)'},
    waiting_for_capture: {value: 'waiting_for_capture', label: 'Оплачено (ожидает подтверждения магазином)'},
    succeeded: {value: 'succeeded', label: 'Оплачено'},
    canceled: {value: 'canceled', label: 'Отменено'}
  },
  ORDER_STATUSES: {
    created: {value: 'created', label: 'Оформлено'},
    pending: {value: 'pending', label: 'Ожидает отправки'},
    sent: {value: 'sent', label: 'Отправлено'},
    delivered: {value: 'delivered', label: 'Доставлено'},
    refused: {value: 'refused', label: 'Отклонено'}
  },
  REVIEW_STATUSES: {
    created: {value: 'created', label: 'Новые'},
    published: {value: 'published', label: 'Опубликовано'},
    archived: {value: 'archived', label: 'Архив'}
  },
  DISCOUNT_TYPES: {
    online: {
      value: 3,
      type: 'online',
      dim: 'percent'
    }
  },
  DYNAMIC_PROPS: {
    // DON'T FORGET ADD NEW PROPERTIES TO ADD/EDIT PRODUCT OPERATION!
    // DON'T FORGET UPDATE ALGOLIA QUERY AND FACETING SETTINGS!
    corpus_material: {label: 'Материал корпуса', type: 'String'},
    corpus_diameter: {label: 'Диаметр корпуса, мм', type: 'Number'},
    product_type: {label: 'Тип товара', type: 'String'},
    conditional_diameter: {label: 'Диаметр условный DN, мм', type: 'Number'},
    inner_diameter: {label: 'Внутренний диаметр, мм', type: 'Number'},
    outer_diameter: {label: 'Внешний диаметр, мм', type: 'Number'},
    symbol: {label: 'Усл. обозн. в таблице фигур', type: 'String'},
    drive: {label: 'Привод', type: 'String'},
    pressure: {label: 'Рабочее давление, МПа', type: 'Number'},
    handle_type: {label: 'Тип рукояти', type: 'String'},
    thread_diameter: {label: 'Номин. диаметр резьбы', type: 'String'},
    thread_type: {label: 'Тип резьбы', type: 'String'},
    thickness: {label: 'Толщина, мм', type: 'Number'},
    wall_thickness: {label: 'Толщина стенки, мм', type: 'Number'},
    angle_of_bending: {label: 'Угол изгиба,°', type: 'Number'},
    length: {label: 'Длина, м', type: 'Number'},
    series: {label: 'Серия', type: 'String'},
    volume: {label: 'Объем, л', type: 'Number'},
    connecting_size: {label: 'Присоединительный размер', type: 'Number'},
    locks: {label: 'Наличие замков', type: 'Boolean'},
    rated_load: {label: 'Номинальная нагрузка, кН', type: 'Number'},
    pump_type: {label: 'Тип насоса', type: 'String'},
    section_number: {label: 'Количество секций', type: 'String'},
    section_depth: {label: 'Глубина секции, мм', type: 'Number'},
    center_spacing: {label: 'Межцентровое расстояние', type: 'String'},
    heat_one_section: {label: 'Теплоотдача одной секции, Вт', type: 'String'},
    coating: {label: 'Покрытие', type: 'String'},
  },
  PRODUCT_TREE: [{
    label: 'Вся продукция',
    value: 'all-products',
    disabled: true
  }, {
    label: 'Запорная и регулирующая арматура',
    value: 'shutoff-and-control-valves',
    type: 'group',
    children: [
      {
        value: 'elevators',
        label: 'элеваторы',
        type: 'category',
        filters: ['rated_load', 'pump_type', 'coating', 'heat_one_section'],
      },
      {
        value: 'filters', label: 'фильтры', type: 'category',
        filters: ['center_spacing', 'section_depth', 'thread_diameter', 'symbol'],
      },
      {value: 'shut-off-valves', label: 'клапаны запорные', type: 'category'},
      {value: 'inverse-valves', label: 'клапаны обратные', type: 'category'},
      {value: 'latches', label: 'задвижки', type: 'category'},
      {value: 'shutters', label: 'затворы', type: 'category'},
      {value: 'cranes', label: 'краны', type: 'category'}
    ]
  }, {
    label: 'Измерительные приборы',
    value: 'measuring-instruments',
    type: 'group',
    children: [
      {value: 'water-meters', label: 'счетчики воды', type: 'category'},
      {value: 'gas-meters', label: 'счетчики газа', type: 'category'},
      {value: 'thermometers', label: 'термометры', type: 'category'},
      {value: 'manometers', label: 'манометры', type: 'category'}
    ]
  }, {
    label: 'Изоляция, расходники, инструмент',
    value: 'insulation-consumables-tools',
    type: 'group',
    children: [
      {value: 'isolation', label: 'изоляция', type: 'category'},
      {value: 'hardware', label: 'метизы', type: 'category'},
      {value: 'yokes', label: 'хомуты', type: 'category'},
      {value: 'gaskets-and-repair-kits', label: 'прокладки и ремонтные комплекты', type: 'category'},
      {value: 'sealing-materials', label: 'уплотнительные материалы', type: 'category'},
      {value: 'tool', label: 'инструмент', type: 'category'}
    ]
  }, {
    label: 'Канализационные системы',
    value: 'sewage-systems',
    type: 'group',
    children: [
      {value: 'internal-sewerage-polypropylene', label: 'внутренняя канализация полипропилен', type: 'category'},
      {value: 'external-sewerage-polypropylene', label: 'наружная канализация полипропилен', type: 'category'},
      {value: 'fire-clutches', label: 'чугунная канализация', type: 'category'},
      {value: 'fire-extinguishing-couplings', label: 'противопожарные муфты', type: 'category'}
    ]
  }, {
    label: 'Котлы и водонагреватели',
    value: 'boilers-and-water-heaters',
    type: 'group',
    children: [
      {value: 'boilers', label: 'котлы', type: 'category'},
      {value: 'water-heaters', label: 'водонагреватели', type: 'category'},
      {value: 'bellows-for-gas-supply', label: 'подводка сильфонная для газа', type: 'category'}
    ]
  }, {
    label: 'Люки и дождеприемники',
    value: 'hatches-and-rainwater-receivers',
    type: 'group',
    children: [
      {value: 'polymer-hatches', label: 'Полимерные люки', type: 'category'},
      {value: 'cast-iron-manholes', label: 'Чугунные люки', type: 'category'},
      {value: 'sprinklers', label: 'Дождеприемники', type: 'category'}
    ]
  }, {
    label: 'Насосное оборудование',
    value: 'pumping-equipment',
    type: 'group',
    children: [
      {value: 'pumps', label: 'насосы', type: 'category'},
      {value: 'wellheads', label: 'Оголовки скважинные', type: 'category'},
      {value: 'accessories', label: 'Комплектующие', type: 'category'}
    ]
  }, {
    label: 'Радиаторы и комплектующие',
    value: 'radiators-and-accessories',
    type: 'group',
    children: [
      {value: 'aluminum-radiators-sti', label: 'алюминиевые радиаторы STI', type: 'category'},
      {value: 'bimetallic-radiators-sti', label: 'биметаллические радиаторы STI', type: 'category'},
      {value: 'steel-panel-radiators-sti', label: 'стальные панельные радиаторы STI', type: 'category'},
      {value: 'cast-iron-radiators', label: 'чугунные радиаторы', type: 'category'},
      {value: 'thermoregulating-armature', label: 'терморегулирующая арматура', type: 'category'}
    ]
  }, {
    label: 'Расширительные баки',
    value: 'expansion-tanks',
    type: 'group',
    children: [
      {value: 'expansion-tanks-for-heating', label: 'расширительные баки для отопления', type: 'category'},
      {value: 'accumulators', label: 'гидроаккумуляторы', type: 'category'},
      {value: 'cast-iron-radiators', label: 'чугунные радиаторы', type: 'category'},
      {value: 'steel-panel-radiators-sti', label: 'стальные панельные радиаторы STI', type: 'category'},
      {value: 'thermoregulating-reinforcement', label: 'терморегулирующая арматура', type: 'category'}
    ]
  }, {
    label: 'Сантехника',
    value: 'sanitary-engineering',
    type: 'group',
    children: [
      {value: 'armature', label: 'арматура', type: 'category'},
      {value: 'siphons', label: 'сифоны', type: 'category'},
      {value: 'mixers-and-showers', label: 'смесители и душ', type: 'category'},
      {value: 'heated-towel-rails', label: 'полотенцесушители', type: 'category'},
      {value: 'flexible-padding', label: 'гибкая подводка', type: 'category'}
    ]
  }, {
    label: 'Теплый пол',
    value: 'warm-floor',
    type: 'group',
    children: [
      {value: 'collector-groups', label: 'Коллекторные группы', type: 'category'},
      {value: 'pe-x-pipes', label: 'Трубы PE-X', type: 'category'},
      {value: 'pe-rt-pipes', label: 'Трубы PE-RT', type: 'category'},
      {value: 'substrate', label: 'Подложка', type: 'category'},
      {value: 'accessories', label: 'Комплектующие', type: 'category'}
    ]
  }, {
    label: 'Трубы и соединительные части',
    value: 'pipes-and-connecting-parts',
    type: 'group',
    children: [
      {value: 'metal-plastic-systems', label: 'металлопластиковые системы', type: 'category'},
      {value: 'polypropylene-system', label: 'полипропиленовые системы', type: 'category'},
      {value: 'steel-systems', label: 'стальные системы', type: 'category'},
      {value: 'pipes', label: 'трубы', type: 'category'},
      {value: 'taps', label: 'отводы', type: 'category'},
      {value: 'pipe-blank', label: 'трубная заготовка', type: 'category'},
      {value: 'polyethylene-systems-pnd', label: 'полиэтиленовые системы (ПНД)', type: 'category'}
    ]
  }, {
    label: 'Фитинги',
    value: 'fittings',
    type: 'group',
    children: [
      {value: 'steel-fittings', label: 'фитинги стальные', type: 'category'},
      {value: 'polypropylene-systems', label: 'полипропиленовые системы', type: 'category'},
      {value: 'cast-iron-fittings', label: 'фитинги чугунные', type: 'category'},
      {value: 'brass-fittings', label: 'фитинги латунные', type: 'category'},
      {value: 'taps-fittings', label: 'отводы', type: 'category'},
      {value: 'pipe-blank', label: 'трубная заготовка', type: 'category'},
      {value: 'polyethylene-systems-fitting-png', label: 'полиэтиленовые системы (пнд)', type: 'category'}
    ]
  }, {
    label: 'Светильники и комплектующие',
    value: 'fixtures-and-accessories',
    type: 'group',
    children: [
      {value: 'ceiling-lights-with-led-backlighting', label: 'потолочные светильники c LED подсв.', type: 'category'},
      {value: 'halogen-lights', label: 'галогенные светильники', type: 'category'},
      {value: '3-carob-chandeliers', label: 'люстры 3-х рожковые', type: 'category'},
      {value: '4-and-5-horn-chandeliers', label: 'люстры 4-х и 5-ти рожковые', type: 'category'},
      {value: 'chandeliers-6-or-more-carobs', label: 'люстры 6-ти и более рожковые', type: 'category'},
      {value: 'pendants-on-the-1-f-light-end', label: 'подвесы на 1-у светоточку', type: 'category'},
      {value: 'two-or-more-light-points', label: 'подвесы на 2-е и более светоточки', type: 'category'},
      {value: 'sconces-are-1-but-corrugated', label: 'бра 1-но рожковы', type: 'category'},
      {value: 'two-or-more-horns', label: 'бра 2-х и более рожковые', type: 'category'},
      {value: 'wall-and-ceiling-on-the-1st-light', label: 'настенные и потолочные 1 светоточка', type: 'category'},
      {
        value: 'wall-and-ceiling-on-the-2nd-and-more-lights',
        label: 'настенные и потолочные > 1 светоточки',
        type: 'category'
      },
      {value: 'wall-and-ceiling-irises', label: 'настенные и потолочные ирисы', type: 'category'},
      {value: 'table-lamps', label: 'настольные лампы', type: 'category'},
      {value: 'street-lamp', label: 'уличные светильник', type: 'category'},
      {value: 'led-lights', label: 'светодиодные светильники', type: 'category'},
      {value: 'recessed-light', label: 'встраиваемые светильники', type: 'category'}
    ]
  }, {
    label: 'Для дома и дачи',
    value: 'for-home-and-cottages',
    type: 'group',
    children: [
      {value: 'hives-ppu', label: 'Ульи ППУ', type: 'category'},
      {value: 'ir-dryers-for-vegetables', label: 'Сушилки ИК (для овощей)', type: 'category'},
      {value: 'repellers-and-traps-of-moles-mice', label: 'Отпугиватели и ловушки кротов, мышей', type: 'category'},
      {value: 'repellers-and-traps-of-mosquitoes-flies', label: 'От комаров и мух', type: 'category'},
      {value: 'goods-for-summer-residents-and-tourists', label: 'Товары для дачников и туристов', type: 'category'},
      {value: 'mosquito-lamps-and-traps', label: 'Антимоскитные лампы и ловушки', type: 'category'},
      {value: 'electric-fly-swatter', label: 'Электрические мухобойки', type: 'category'},
      {value: 'plant-lighting', label: 'Досветка растений', type: 'category'}
    ]
  }, {
    label: 'Капельный полив',
    value: 'drip-irrigation',
    type: 'group',
    children: [
      {value: 'drop-and-sprinkler-tape', label: 'Капельные и дождевальные лента', type: 'category'},
      {value: 'irrigated-sleeves', label: 'Поливные рукава', type: 'category'},
      {value: 'mesh-gravel-disk-filters', label: 'Фильтры сетчатые, гравийные, дисковые', type: 'category'},
      {value: 'containers-for-applying-fertilizers', label: 'Емкости для внесения удобрений', type: 'category'},
      {value: 'watering-timers', label: 'Таймеры полива', type: 'category'},
      {value: 'solenoid-valves', label: 'Электромагнитные клапана', type: 'category'},
      {value: 'quick-fit-fittings', label: 'Быстросъёмные фитинги', type: 'category'},
      {value: 'fittings-for-drip-tapes', label: 'Фитинги для капельной ленты', type: 'category'},
      {value: 'tube-fittings', label: 'Фитинги для трубок', type: 'category'},
      {value: 'air-valves', label: 'Воздушные клапана', type: 'category'},
      {value: 'tools', label: 'Инструменты', type: 'category'},
      {value: 'saddle-couplers', label: 'Седловые ответвители', type: 'category'},
      {value: 'cranes', label: 'Краны', type: 'category'},
      {value: 'filters', label: 'Фильтры', type: 'category'},
      {
        value: 'venturi-injectors-for-fertilizer-application',
        label: 'Инжекторы Вентури для удобрений',
        type: 'category'
      },
      {value: 'pressure-regulators', label: 'Регуляторы давления', type: 'category'},
      {value: 'droppers', label: 'Капельницы', type: 'category'},
      {value: 'sprinklers-accessories', label: 'Разбрызгиватели, аксессуары', type: 'category'},
      {value: 'mikrojets', label: 'Микроджеты', type: 'category'},
      {value: 'foggers', label: 'Туманообразователи', type: 'category'},
      {value: 'spraying-hoses-and-fittings', label: 'Разбрызгивающие шланги и фитинги', type: 'category'},
      {value: 'boxes-for-the-valve', label: 'Коробки для клапана', type: 'category'},
      {value: 'tubes', label: 'Трубки', type: 'category'}
    ]
  }]
})
