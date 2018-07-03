export const state = () => ({
  // SYSTEM
  IS_ADMIN: false,
  LOADING: false,
  ERR: null,
  ANCHOR: '',

  // DICTIONARIES
  dictionaries: {},

  // user
  user: { // Cart and orders IDs array in database. Full products objects array in client side
    cart: [],
    orders: []
  },
  allUsers: '',
  watchedUserId: '',

  // ORDERS
  orders: {},
  orderStatistics: {
    created: 0,
    pending: 0,
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

  // USER REQUESTS
  requests: '',
  requestsStatistics: {
    created: 0,
    handled: 0,
    total: 0
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
  productCounters: '',
  productStatistics: { // auto updated from cloud function
    maxPrice: 100000,
    avgPrice: 0,
    uniqueProductQty: 0,
    totalProductQty: 0,
    totalStoreCoast: 0
  },
  lastVisible: null, // value means load more button is available
  productCommonFilters: {
    minPrice: 0,
    maxPrice: 100000,
    group: '',
    category: '',
    sortByPrice: 'asc',
    limit: 4
  },
  selectedCatalogNode: '',
  dynamicFilteredProductsIds: [],
  productDynamicFilters: '',
  algoliaSQLFilter: '',
  algoliaSearchText: '',
  // CONSTANTS
  ADMINS: ['smelayapandagm@gmail.com'],
  SERVICE_TYPES: {
    evaluation: {
      value: 'evaluation',
      title: 'Замеры и оценка',
      description: 'Мы всегда готовы провести прдварительные профессиональные замеры и оценить Вашу будущую покупку.',
      icon: ''
    },
    installation: {
      value: 'installation',
      title: 'Установка оборудования',
      description: 'Мы готовы установить для Вас любой товар который есть в наличии нашего магазина и сэкономить Ваше время.',
      icon: ''
    },
    consultation: {
      value: 'consultation',
      title: 'Консультация',
      description: 'Консультация по любым вопросам связанным с установкой, покупкой, сравнительным характеристикам товаров магазина.',
      icon: ''
    },
    repair: {
      value: 'repair',
      title: 'Ремонт',
      description: 'Доверяйте ремонт профессионалам - это избавит Вас от доп. расходов на внеплановые ремонтные работы или переделку.',
      icon: ''
    }
  },
  PAYMENT_METHODS: {
    cash: {value: 'cash', label: 'Наличные'},
    bank_card: {value: 'bank_card', label: 'Банковская карта'}
  },
  PAYMENT_TYPES: {
    receipt: {value: 'receipt', label: 'При получении'},
    online: {value: 'online', label: 'Электронный перевод'}
  },
  PAYMENT_ENDING: { // used for handle order payment
    none: {value: 'none', label: 'Не оплачено'},
    partial: {value: 'partial', label: 'Частично оплачено'},
    full: {value: 'full', label: 'Полная оплата'}
  },
  PAYMENT_STATUSES: { // for yandex.kassa lost (but not used now)
    none: {value: 'none', label: 'Не оплачено'},
    pending: {value: 'pending', label: 'Платеж создан (ожидает вашего подтверждения)'},
    waiting_for_capture: {value: 'waiting_for_capture', label: 'Оплачено (ожидает подтверждения магазином)'},
    succeeded: {value: 'succeeded', label: 'Оплачено'},
    canceled: {value: 'canceled', label: 'Отменено'}
  },
  DELIVERY_METHODS: {
    kit: {value: 'kit', label: 'КИТ'},
    dellin: {value: 'dellin', label: 'Деловые Линии'},
    courier: {value: 'courier', label: 'Курьер'},
    yourself: {value: 'yourself', label: 'Самовывоз'}
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
  REQUESTS_STATUSES: {
    created: {value: 'created', label: 'Новые'},
    handled: {value: 'handled', label: 'Обработано'}
  },
  DISCOUNT_TYPES: {
    online: {
      value: 3,
      type: 'online',
      dim: 'percent'
    }
  },
  DYNAMIC_PROPS: {
    // 1. DON'T FORGET ADD NEW PROPERTIES TO ADD/EDIT PRODUCT OPERATION!
    // 2. DON'T FORGET UPDATE ALGOLIA FILTERING SETTINGS!
    // 3. DON'T FORGET CREATE NEW DICTIONARY IN DB FOR STRING TYPES

    series: {label: 'Серия', type: 'String'},
    drive: {label: 'Привод', type: 'String'},
    coating: {label: 'Покрытие', type: 'String'},
    material: {label: 'Материал', type: 'String'},
    control: {label: 'Управление', type: 'String'},
    brand: {label: 'Производитель', type: 'String'},
    locks: {label: 'Наличие замков', type: 'String'},
    pump_type: {label: 'Тип насоса', type: 'String'},
    thread_type: {label: 'Тип резьбы', type: 'String'},
    installation: {label: 'Установка', type: 'String'},
    handle_type: {label: 'Тип рукояти', type: 'String'},
    product_type: {label: 'Тип товара', type: 'String'},
    mixer_type: {label: 'Тип смесителя', type: 'String'},
    protection: {label: 'Степень защиты', type: 'String'},
    reinforcement: {label: 'Армирование', type: 'String'},
    country: {label: 'Страна-производитель', type: 'String'},
    connection_type: {label: 'Тип соединения', type: 'String'},
    corpus_material: {label: 'Материал корпуса', type: 'String'},
    seal_material: {label: 'Материал уплотнения', type: 'String'},
    symbol: {label: 'Усл. обозн. в табл. фигур', type: 'String'},
    thread_diameter: {label: 'Номин. диаметр резьбы', type: 'String'},

    // NUMBER PROPS HAVEN'T DB DICTIONARY!
    length: {label: 'Длина, м', type: 'Number'},
    volume: {label: 'Объем, л', type: 'Number'},
    weight: {label: 'Вес, кг', type: 'Number'},
    power: {label: 'Мощность, Вт.', type: 'Number'},
    thickness: {label: 'Толщина, мм', type: 'Number'},
    consumption: {label: 'Расход, л/мин.', type: 'Number'},
    service_live: {label: 'Срок службы, лет', type: 'Number'},
    accuracy_class: {label: 'Класс точности', type: 'Number'},
    angle_of_bending: {label: 'Угол изгиба,°', type: 'Number'},
    pressure: {label: 'Рабочее давление, МПа', type: 'Number'},
    section_depth: {label: 'Глубина секции, мм', type: 'Number'},
    section_number: {label: 'Количество секций', type: 'Number'},
    wall_thickness: {label: 'Толщина стенки, мм', type: 'Number'},
    outer_diameter: {label: 'Внешний диаметр, мм', type: 'Number'},
    avg_resource: {label: 'Средний ресурс, циклов', type: 'Number'},
    corpus_diameter: {label: 'Диаметр корпуса, мм', type: 'Number'},
    rated_load: {label: 'Номинальная нагрузка, кН', type: 'Number'},
    inner_diameter: {label: 'Внутренний диаметр, мм', type: 'Number'},
    center_spacing: {label: 'Межцентровое расстояние', type: 'Number'},
    connecting_size: {label: 'Присоединительный размер', type: 'Number'},
    nominal_diameter: {label: 'Номинальный диаметр DN, мм', type: 'Number'},
    conditional_diameter: {label: 'Диаметр условный DN, мм', type: 'Number'},
    nominal_pressure: {label: 'Номинальное давление PN, МПа', type: 'Number'},
    construction_length: {label: 'Строительная длина L, мм', type: 'Number'},
    heat_one_section: {label: 'Теплоотдача одной секции, Вт', type: 'Number'},
    max_temp_work_env: {label: 'Макс. темп. рабочей среды, С°', type: 'Number'},
    guarantee_period: {label: 'Срок гарантии произв., лет', type: 'Number'}
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
      {value: 'elevators', label: 'элеваторы', type: 'category', filters: ['service_live', 'construction_length', 'max_temp_work_env']},
      {value: 'filters', label: 'фильтры', type: 'category', filters: ['product_type', 'corpus_material', 'conditional_diameter', 'max_temp_work_env', 'weight', 'construction_length', 'guarantee_period', 'nominal_pressure', 'connection_type'],},
      {value: 'shut-off-valves', label: 'клапаны запорные', type: 'category', filters: ['symbol', 'corpus_material', 'conditional_diameter', 'country', 'max_temp_work_env', 'construction_length', 'nominal_pressure']},
      {value: 'inverse-valves', label: 'клапаны обратные', type: 'category', filters: ['corpus_material', 'conditional_diameter', 'construction_length', 'nominal_pressure', 'max_temp_work_env', 'seal_material']},
      {value: 'latches', label: 'задвижки', type: 'category', filters: ['drive', 'conditional_diameter', 'nominal_pressure', 'max_temp_work_env', 'avg_resource', 'guarantee_period', 'corpus_material', 'connection_type']},
      {value: 'shutters', label: 'затворы', type: 'category', filters: ['symbol', 'brand', 'corpus_material', 'conditional_diameter', 'nominal_pressure', 'max_temp_work_env', 'construction_length']},
      {value: 'cranes', label: 'краны', type: 'category', filters: ['product_type', 'corpus_material', 'pressure', 'connection_type', 'handle_type', 'conditional_diameter', 'country', 'thread_diameter', 'series', 'symbol']}
    ]
  }, {
    label: 'Измерительные приборы',
    value: 'measuring-instruments',
    type: 'group',
    children: [
      {value: 'water-meters', label: 'счетчики воды', type: 'category', filters: ['product_type', 'conditional_diameter', 'nominal_pressure', 'max_temp_work_env', 'construction_length', 'thread_diameter', 'service_live']},
      {value: 'gas-meters', label: 'счетчики газа', type: 'category', filters: ['service_live', 'conditional_diameter', 'connection_type']},
      {value: 'thermometers', label: 'термометры', type: 'category', filters: ['product_type', 'protection', 'accuracy_class', 'corpus_material', 'service_live', 'max_temp_work_env']},
      {value: 'manometers', label: 'манометры', type: 'category',  filters: ['product_type', 'protection', 'thread_type', 'max_temp_work_env', 'accuracy_class']}
    ]
  }, {
    label: 'Изоляция, расходники, инструмент',
    value: 'insulation-consumables-tools',
    type: 'group',
    children: [
      {value: 'isolation', label: 'изоляция', type: 'category', filters: ['product_type', 'inner_diameter', 'thickness', 'max_temp_work_env']},
      {value: 'hardware', label: 'метизы', type: 'category'},
      {value: 'yokes', label: 'хомуты', type: 'category', filters: ['product_type', 'max_temp_work_env', 'corpus_material', 'coating', 'construction_length']},
      {value: 'gaskets-and-repair-kits', label: 'прокладки и ремонтные комплекты', type: 'category'},
      {value: 'sealing-materials', label: 'уплотнительные материалы', type: 'category', filters: ['length', 'thickness', 'max_temp_work_env']},
      {value: 'tool', label: 'инструмент', type: 'category', filters: 'material'}
    ]
  }, {
    label: 'Канализационные системы',
    value: 'sewage-systems',
    type: 'group',
    children: [
      {value: 'internal-sewerage-polypropylene', label: 'внутр. канализация полипропилен', type: 'category', filters: ['product_type', 'angle_of_bending', 'outer_diameter', 'wall_thickness', 'length']},
      {value: 'external-sewerage-polypropylene', label: 'наруж. канализация полипропилен', type: 'category', filters: ['product_type', 'angle_of_bending', 'outer_diameter', 'wall_thickness', 'length']},
      {value: 'fire-clutches', label: 'чугунная канализация', type: 'category', filters: ['product_type', 'weight']},
      {value: 'fire-extinguishing-couplings', label: 'противопожарные муфты', type: 'category'}
    ]
  }, {
    label: 'Котлы и водонагреватели',
    value: 'boilers-and-water-heaters',
    type: 'group',
    children: [
      {value: 'boilers', label: 'котлы', type: 'category', filters: ['weight', 'volume', 'brand']},
      {value: 'water-heaters', label: 'водонагреватели', type: 'category', filters: ['product_type', 'brand', 'control', 'installation', 'series', 'weight', 'volume']},
      {value: 'bellows-for-gas-supply', label: 'подводка сильфонная для газа', type: 'category', filters: ['product_type', 'connection_type', 'length', 'connecting_size', 'nominal_pressure']}
    ]
  }, {
    label: 'Люки и дождеприемники',
    value: 'hatches-and-rainwater-receivers',
    type: 'group',
    children: [
      {value: 'polymer-hatches', label: 'Полимерные люки', type: 'category', filters: ['product_type', 'corpus_material', 'locks', 'rated_load', 'weight']},
      {value: 'cast-iron-manholes', label: 'Чугунные люки', type: 'category', filters: ['product_type', 'corpus_material', 'locks', 'rated_load']},
      {value: 'sprinklers', label: 'Дождеприемники', type: 'category', filters: ['product_type', 'corpus_material', 'locks', 'rated_load']}
    ]
  }, {
    label: 'Насосное оборудование',
    value: 'pumping-equipment',
    type: 'group',
    children: [
      {value: 'pumps', label: 'насосы', type: 'category', filters: ['pump_type', 'brand', 'weight', 'consumption', 'power', 'protection']},
      {value: 'wellheads', label: 'Оголовки скважинные', type: 'category', filters: ['product_type']},
      {value: 'accessories', label: 'Комплектующие', type: 'category', filters: ['product_type']}
    ]
  }, {
    label: 'Радиаторы и комплектующие',
    value: 'radiators-and-accessories',
    type: 'group',
    children: [
      {value: 'aluminum-radiators-sti', label: 'алюминиевые радиаторы STI', type: 'category', filters: ['product_type', 'brand', 'country', 'section_number', 'section_depth', 'center_spacing', 'heat_one_section']},
      {value: 'bimetallic-radiators-sti', label: 'биметаллические радиаторы STI', type: 'category', filters: ['product_type', 'brand', 'country', 'section_number', 'section_depth', 'center_spacing', 'heat_one_section']},
      {value: 'steel-panel-radiators-sti', label: 'стальные панельные радиаторы STI', type: 'category', filters: ['product_type', 'brand', 'country', 'section_number', 'section_depth', 'center_spacing', 'heat_one_section']},
      {value: 'cast-iron-radiators', label: 'чугунные радиаторы', type: 'category', filters: ['product_type', 'connection_type']},
      {value: 'thermoregulating-armature', label: 'терморегулирующая арматура', type: 'category'}
    ]
  }, {
    label: 'Расширительные баки',
    value: 'expansion-tanks',
    type: 'group',
    children: [
      {value: 'expansion-tanks-for-heating', label: 'расширительные баки для отопления', type: 'category', filters: ['volume', 'height', 'avg_resource', 'corpus_diameter', 'corpus_material']},
      {value: 'accumulators', label: 'гидроаккумуляторы', type: 'category', filters: ['volume', 'height', 'avg_resource', 'corpus_diameter', 'corpus_material']},
      {value: 'cast-iron-radiators', label: 'чугунные радиаторы', type: 'category', filters: ['volume', 'height', 'avg_resource', 'corpus_material']},
      {value: 'steel-panel-radiators-sti', label: 'стальные панельные радиаторы STI', type: 'category', filters: ['volume', 'height', 'avg_resource', 'corpus_material']},
      {value: 'thermoregulating-reinforcement', label: 'терморегулирующая арматура', type: 'category', filters: ['material']}
    ]
  }, {
    label: 'Сантехника',
    value: 'sanitary-engineering',
    type: 'group',
    children: [
      {value: 'armature', label: 'арматура', type: 'category', filters: ['material']},
      {value: 'siphons', label: 'сифоны', type: 'category'},
      {value: 'mixers-and-showers', label: 'смесители и душ', type: 'category', filters:['brand', 'mixer_type']},
      {value: 'heated-towel-rails', label: 'полотенцесушители', type: 'category'},
      {value: 'flexible-padding', label: 'гибкая подводка', type: 'category', filters: ['product_type', 'length', 'connection_type']},
      {value: 'sanitary-facilities', label: 'санфаянс', type: 'category', filters: ['material']}
    ]
  }, {
    label: 'Теплый пол',
    value: 'warm-floor',
    type: 'group',
    children: [
      {value: 'collector-groups', label: 'Коллекторные группы', type: 'category', filters: ['max_temp_work_env', 'thread_diameter', 'nominal_pressure']},
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
      {value: 'metal-plastic-systems', label: 'металлопластиковые системы', type: 'category', filters: ['product_type']},
      {value: 'polypropylene-system', label: 'полипропиленовые системы', type: 'category', filters: ['product_type', 'corpus_diameter', 'pressure', 'reinforcement']},
      {value: 'steel-systems', label: 'стальные системы', type: 'category', filters: ['product_type', 'country', 'conditional_diameter', 'pressure']},
      {value: 'pipes', label: 'трубы', type: 'category', filters: ['inner_diameter', 'outer_diameter']},
      {value: 'taps', label: 'отводы', type: 'category', filters: ['inner_diameter', 'outer_diameter']},
      {value: 'pipe-blank', label: 'трубная заготовка', type: 'category', filters: ['inner_diameter', 'outer_diameter']},
      {value: 'polyethylene-systems-pnd', label: 'полиэтиленовые системы (ПНД)', type: 'category'}
    ]
  }, {
    label: 'Фитинги',
    value: 'fittings',
    type: 'group',
    children: [
      {value: 'steel-fittings', label: 'фитинги стальные', type: 'category', filters: ['product_type', 'conditional_diameter', 'thread_diameter', 'coating']},
      {value: 'cast-iron-fittings', label: 'фитинги чугунные', type: 'category', filters: ['product_type', 'conditional_diameter', 'thread_diameter', 'coating']},
      {value: 'brass-fittings', label: 'фитинги латунные', type: 'category', filters: ['product_type', 'conditional_diameter', 'thread_diameter', 'coating']},
      {value: 'polypropylene-systems', label: 'полипропиленовые системы', type: 'category'},
      {value: 'taps-fittings', label: 'отводы', type: 'category'},
      {value: 'fitting-pipe-blank', label: 'трубная заготовка', type: 'category', filters: ['product_type', 'conditional_diameter', 'coating']},
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
      {value: 'repellers-and-traps-of-moles-mice', label: 'Отпугиватели/ловушки кротов, мышей', type: 'category'},
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
      {value: 'mesh-gravel-disk-filters', label: 'Фильтры сетчатые/гравийные/дисковые', type: 'category'},
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
