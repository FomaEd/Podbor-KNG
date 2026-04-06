// Ручки для стандартных окон (поворотные/откидные)
const handleCatalog = {
  classic_standard: {
    name: 'Ручка Classic стандартная',
    category: 'fork',
    colors: {
      white: { article: 'KN218HN_9016', name: 'Ручка Classic стандартная белая', qty: 1 },
      black: { article: 'KN218HN_9005M', name: 'Ручка Classic стандартная чёрная', qty: 1 },
      raw:   { article: 'KN218HN_C', name: 'Ручка Classic стандартная неокрашенная', qty: 1 }
    },
    extras: {
      default: [
        { article: 'KN100KR', name: 'Переходник под ручку Classic', qty: 1 }
      ],
      hidden180_turn_tilt: [
        { article: 'KN100ZC', name: 'Переходник под ручку Classic', qty: 2 }
      ]
    }
  },

  concise_standard: {
    name: 'Ручка Concise стандартная',
    category: 'fork',
    colors: {
      white: { article: 'KN218JZ_9016', name: 'Ручка Concise стандартная белая', qty: 1 },
      black: { article: 'KN218JZ_9005M', name: 'Ручка Concise стандартная чёрная', qty: 1 },
      raw:   { article: 'KN218JZ_C', name: 'Ручка Concise стандартная неокрашенная', qty: 1 }
    },
    extras: {
      default: [
        { article: 'KN100KR', name: 'Переходник под ручку Classic', qty: 1 }
      ],
      hidden180_turn_tilt: [
        { article: 'KN100ZC', name: 'Переходник под ручку Classic', qty: 2 }
      ]
    }
  },

  concise_torx: {
    name: 'Ручка Concise без платформы с Torx штифтом',
    category: 'torx',
    colors: {
      white: { article: 'KN218LR_9016', name: 'Ручка Concise без платформы с Torx штифтом белая', qty: 1 },
      black: { article: 'KN218LR_9005M', name: 'Ручка Concise без платформы с Torx штифтом чёрная', qty: 1 },
      raw:   { article: 'KN218LR_C', name: 'Ручка Concise без платформы с Torx штифтом неокрашенная', qty: 1 }
    },
    extras: {
      default: [
        { article: 'KN230BH', name: 'Редуктор для ручки с Torx штифтом', qty: 1 }
      ]
    }
  },

  concise_square4_no_plate: {
    name: 'Ручка Concise без платформы с 4-х гран. штифтом',
    category: 'square4',
    colors: {
      white: { article: 'KN218KL_9016', name: 'Ручка Concise без платформы с 4-х гран. штифтом белая', qty: 1 },
      black: { article: 'KN218KL_9005M', name: 'Ручка Concise без платформы с 4-х гран. штифтом чёрная', qty: 1 },
      raw:   { article: 'KN218KL_C', name: 'Ручка Concise без платформы с 4-х гран. штифтом неокрашенная', qty: 1 }
    },
    extras: {
      default: [
        { article: 'KN230AO', name: 'Редуктор для ручки с 4-гран. штифтом универсальный, дорн 12мм', qty: 1 }
      ]
    }
  },

  concise_square4_plate: {
    name: 'Ручка Concise с платформой с 4-х гран. штифтом',
    category: 'square4',
    colors: {
      white: { article: 'KN218KU_9016', name: 'Ручка Concise с платформой с 4-х гран. штифтом белая', qty: 1 },
      black: { article: 'KN218KU_9005M', name: 'Ручка Concise с платформой с 4-х гран. штифтом чёрная', qty: 1 },
      raw:   { article: 'KN218KU_C', name: 'Ручка Concise с платформой с 4-х гран. штифтом неокрашенная', qty: 1 }
    },
    extras: {
      default: [
        { article: 'KN230AO', name: 'Редуктор для ручки с 4-гран. штифтом универсальный, дорн 12мм', qty: 1 }
      ]
    }
  },

  master_square4_no_plate: {
    name: 'Ручка Master без платформы с 4-х гран. штифтом',
    category: 'square4',
    colors: {
      white: { article: 'KN218LV_9016', name: 'Ручка Master без платформы с 4-х гран. штифтом белая', qty: 1 },
      black: { article: 'KN218LV_9005M', name: 'Ручка Master без платформы с 4-х гран. штифтом чёрная', qty: 1 },
      raw:   { article: 'KN218LV_C', name: 'Ручка Master без платформы с 4-х гран. штифтом неокрашенная', qty: 1 }
    },
    extras: {
      default: [
        { article: 'KN230AO', name: 'Редуктор для ручки с 4-гран. штифтом универсальный, дорн 12мм', qty: 1 }
      ]
    }
  },

  master_square4_plate: {
    name: 'Ручка Master с платформой с 4-х гран. штифтом',
    category: 'square4',
    colors: {
      white: { article: 'KN218LS_9016', name: 'Ручка Master с платформой с 4-х гран. штифтом белая', qty: 1 },
      black: { article: 'KN218LS_9005M', name: 'Ручка Master с платформой с 4-х гран. штифтом чёрная', qty: 1 },
      raw:   { article: 'KN218LS_C', name: 'Ручка Master с платформой с 4-х гран. штифтом неокрашенная', qty: 1 }
    },
    extras: {
      default: [
        { article: 'KN230AO', name: 'Редуктор для ручки с 4-гран. штифтом универсальный, дорн 12мм', qty: 1 }
      ]
    }
  }
};

const handleColorArticlesHidden180TurnTilt = {
    white: [
        { article: 'KN100ZC', name: 'Переходник под ручку Classic', qty: 2 },
        { article: 'KN218HN_9016', name: 'Ручка оконная Classic_9016', qty: 1 },
    ],
    black: [
        { article: 'KN100ZC', name: 'Переходник под ручку Classic', qty: 2 },
        { article: 'KN218HN_9005M', name: 'Ручка оконная Classic черн. Matt', qty: 1 },
    ],
    raw: [
        { article: 'KN100ZC', name: 'Переходник под ручку Classic', qty: 2 },
        { article: 'KN218HN_C', name: 'Ручка оконная Classic неокр.', qty: 1 },
    ],
};

    const handleColorArticlesProvedalTilt = {
  zone1: {
    white: [
      { article: 'KN100KR', name: 'Переходник под ручку Classic', qty: 1 },
      { article: 'KN218HN_9016', name: 'Ручка оконная Classic_9016', qty: 1 },
    ],
    black: [
      { article: 'KN100KR', name: 'Переходник под ручку Classic', qty: 1 },
      { article: 'KN218HN_9005M', name: 'Ручка оконная Classic черн. Matt', qty: 1 },
    ],
    raw: [
      { article: 'KN100KR', name: 'Переходник под ручку Classic', qty: 1 },
      { article: 'KN218HN_C', name: 'Ручка оконная Classic неокр.', qty: 1 },
    ],
  },
  zone2: {
    white: [
      { article: 'KN100KR', name: 'Переходник под ручку Classic', qty: 1 },
      { article: 'KN218HN_9016', name: 'Ручка оконная Classic_9016', qty: 1 },
    ],
    black: [
      { article: 'KN100KR', name: 'Переходник под ручку Classic', qty: 1 },
      { article: 'KN218HN_9005M', name: 'Ручка оконная Classic черн. Matt', qty: 1 },
    ],
    raw: [
      { article: 'KN100KR', name: 'Переходник под ручку Classic', qty: 1 },
      { article: 'KN218HN_C', name: 'Ручка оконная Classic неокр.', qty: 1 },
    ],
  },
};
    const handleColorArticlesHidden90 = {
    white: [
        { article: 'KN218HN_9016', name: 'Ручка оконная Classic_9016', qty: 1 },
    ],
    black: [
        { article: 'KN218HN_9005M', name: 'Ручка оконная Classic черн. Matt', qty: 1 },
    ],
    raw: [
        { article: 'KN218HN_C', name: 'Ручка оконная Classic неокр.', qty: 1 },
    ],
};

    const handleColorArticlesProvedalTurn = {
  zone1: {
    white: [
      { article: 'KN100KR', name: 'Переходник под ручку Classic', qty: 1 },
      { article: 'KN218HN_9016', name: 'Ручка оконная Classic_9016', qty: 1 },
    ],
    black: [
      { article: 'KN100KR', name: 'Переходник под ручку Classic', qty: 1 },
      { article: 'KN218HN_9005M', name: 'Ручка оконная Classic черн. Matt', qty: 1 },
    ],
    raw: [
      { article: 'KN100KR', name: 'Переходник под ручку Classic', qty: 1 },
      { article: 'KN218HN_C', name: 'Ручка оконная Classic неокр.', qty: 1 },
    ],
  },
  zone2: {
    white: [
      { article: 'KN100KR', name: 'Переходник под ручку Classic', qty: 1 },
      { article: 'KN218HN_9016', name: 'Ручка оконная Classic_9016', qty: 1 },
    ],
    black: [
      { article: 'KN100KR', name: 'Переходник под ручку Classic', qty: 1 },
      { article: 'KN218HN_9005M', name: 'Ручка оконная Classic черн. Matt', qty: 1 },
    ],
    raw: [
      { article: 'KN100KR', name: 'Переходник под ручку Classic', qty: 1 },
      { article: 'KN218HN_C', name: 'Ручка оконная Classic неокр.', qty: 1 },
    ],
  },
};
    const handleColorArticlesHidden90Tilt = {
    white: [
        { article: 'KN100KR', name: 'Переходник под ручку Classic', qty: 1 },
        { article: 'KN218HN_9016', name: 'Ручка оконная Classic_9016', qty: 1 },
    ],
    black: [
        { article: 'KN100KR', name: 'Переходник под ручку Classic', qty: 1 },
        { article: 'KN218HN_9005M', name: 'Ручка оконная Classic черн. Matt', qty: 1 },
    ],
    raw: [
        { article: 'KN100KR', name: 'Переходник под ручку Classic', qty: 1 },
        { article: 'KN218HN_C', name: 'Ручка оконная Classic неокр.', qty: 1 },
    ],
};

    const handleColorArticlesProvedalTurnTilt = {
  white: [
    { article: 'KN100KR', name: 'Переходник под ручку Classic', qty: 1 },
    { article: 'KN218HN_9016', name: 'Ручка оконная Classic_9016', qty: 1 },
  ],
  black: [
    { article: 'KN100KR', name: 'Переходник под ручку Classic', qty: 1 },
    { article: 'KN218HN_9005M', name: 'Ручка оконная Classic черн. Matt', qty: 1 },
  ],
  raw: [
    { article: 'KN100KR', name: 'Переходник под ручку Classic', qty: 1 },
    { article: 'KN218HN_C', name: 'Ручка оконная Classic неокр.', qty: 1 },
  ],
};
    const handleColorArticles = {
  white: [
    { article: 'KN100KR', name: 'Переходник под ручку Classic', qty: 1 },
    { article: 'KN218HN_9016', name: 'Ручка Classic белая', qty: 1 },
  ],
  black: [
    { article: 'KN100KR', name: 'Переходник под ручку Classic', qty: 1 },
    { article: 'KN218HN_9005M', name: 'Ручка Classic чёрная', qty: 1 },
  ],
  raw: [
    { article: 'KN100KR', name: 'Переходник под ручку Classic', qty: 1 },
    { article: 'KN218HN_C', name: 'Ручка Classic неокрашенная', qty: 1 },
  ]
};

    const handleColorArticlesTurnVisible = {
  white: [
    { article: 'KN100KR', name: 'Переходник под ручку Classic', qty: 1 },
    { article: 'KN218HN_9016', name: 'Ручка оконная Classic_9016', qty: 1 },
  ],
  black: [
    { article: 'KN100KR', name: 'Переходник под ручку Classic', qty: 1 },
    { article: 'KN218HN_9005M', name: 'Ручка оконная Classic черн. Matt', qty: 1 },
  ],
  raw: [
    { article: 'KN100KR', name: 'Переходник под ручку Classic', qty: 1 },
    { article: 'KN218HN_C', name: 'Ручка оконная Classic неокр.', qty: 1 },
  ]
};

const handleColorArticlesTiltVisible = {
  zone1: {
    white: [
      { article: 'KN100KR', name: 'Переходник под ручку Classic', qty: 1 },
      { article: 'KN218HN_9016', name: 'Ручка оконная Classic_9016', qty: 1 },
    ],
    black: [
      { article: 'KN100KR', name: 'Переходник под ручку Classic', qty: 1 },
      { article: 'KN218HN_9005M', name: 'Ручка оконная Classic черн. Matt', qty: 1 },
    ],
    raw: [
      { article: 'KN100KR', name: 'Переходник под ручку Classic', qty: 1 },
      { article: 'KN218HN_C', name: 'Ручка оконная Classic неокр.', qty: 1 },
    ],
  },
  zone2: {
    white: [
      { article: 'KN100KR', name: 'Переходник под ручку Classic', qty: 1 },
      { article: 'KN218HN_9016', name: 'Ручка оконная Classic_9016', qty: 1 },
    ],
    black: [
      { article: 'KN100KR', name: 'Переходник под ручку Classic', qty: 1 },
      { article: 'KN218HN_9005M', name: 'Ручка оконная Classic черн. Matt', qty: 1 },
    ],
    raw: [
      { article: 'KN100KR', name: 'Переходник под ручку Classic', qty: 1 },
      { article: 'KN218HN_C', name: 'Ручка оконная Classic неокр.', qty: 1 },
    ],
  },
};

    const handleColorArticlesHidden90Turn = {
        white: [
            { article: 'KN100KR', name: 'Переходник под ручку Classic', qty: 1 },
            { article: 'KN218HN_9016', name: 'Ручка оконная Classic_9016', qty: 1 },
        ],
        black: [
            { article: 'KN100KR', name: 'Переходник под ручку Classic', qty: 1 },
            { article: 'KN218HN_9005M', name: 'Ручка оконная Classic черн. Matt', qty: 1 },
        ],
        raw: [
            { article: 'KN100KR', name: 'Переходник под ручку Classic', qty: 1 },
            { article: 'KN218HN_C', name: 'Ручка оконная Classic неокр.', qty: 1 },
        ],
    };

// Петли для стандартных окон
const hingeArticlesTurnVisible = {
  white: { article: 'KN219CC_9016', name: 'Петля поворотная 3-хсекц.бел.', qty: 1 },
  black: { article: 'KN219CC_9005M', name: 'Петля поворотная 3-хсекц черн. matt', qty: 1 },
  raw:   { article: 'KN219CC_C', name: 'Петля поворотная 3-хсекц неокр', qty: 1 },
};

    // Петли П/О Видимая
const hingeArticlesTurnTiltVisible = {
  white: [
    { article: 'KN219DL_9016', name: 'Петля ПО верхняя бел', qty: 1 },
    { article: 'KN219DK_9016', name: 'Петля ПО нижняя бел.', qty: 1 },
  ],
  black: [
    { article: 'KN219DL_9005M', name: 'Петля ПО верхняя черн. matt', qty: 1 },
    { article: 'KN219DK_9005M', name: 'Петля ПО нижняя черн. matt', qty: 1 },
  ],
  raw: [
    { article: 'KN219DL_C', name: 'Петля ПО верхняя неокр', qty: 1 },
    { article: 'KN219DK_C', name: 'Петля ПО нижняя неокр', qty: 1 },
  ],
};

// Петли Откидной Видимая
const hingeArticlesTiltVisible = {
  white: { article: 'KN219CC_9016', name: 'Петля поворотная 3-хсекц.бел.', qty: 1 },
  black: { article: 'KN219CC_9005M', name: 'Петля поворотная 3-хсекц черн. matt', qty: 1 },
  raw:   { article: 'KN219CC_C', name: 'Петля поворотная 3-хсекц неокр', qty: 1 },
};

// Петли П/О Provedal
const hingeArticlesProvedalTurnTilt = {
  white: [
    { article: 'KN219HT_9016', name: 'Петля ПО верхняя бел', qty: 1 },
    { article: 'KN219HS_9016', name: 'Петля ПО нижняя бел.', qty: 1 },
  ],
  black: [
    { article: 'KN219HT_9005M', name: 'Петля ПО верхняя черн. matt', qty: 1 },
    { article: 'KN219HS_9005M', name: 'Петля ПО нижняя черн. matt', qty: 1 },
  ],
  raw: [
    { article: 'KN219HT_C', name: 'Петля ПО верхняя неокр', qty: 1 },
    { article: 'KN219HS_C', name: 'Петля ПО нижняя неокр', qty: 1 },
  ],
};

// Петли Поворотный и Откидной Provedal
const hingeArticlesProvedal = {
  white: { article: 'KN219HX_9016', name: 'Петля поворотная бел.', qty: 1 },
  black: { article: 'KN219HX_9005M', name: 'Петля поворотная черн. matt', qty: 1 },
  raw:   { article: 'KN219HX_C', name: 'Петля поворотная неокр', qty: 1 },
};

// ============================================
// ФУНКЦИЯ ПОДБОРА РУЧЕК
// ============================================
function getHandleArticles(handleType, handleColor, openingType, hardwareType) {
    const result = [];

    // Получаем базовую конфигурацию ручки из каталога
    const handleConfig = handleCatalog[handleType];
    if (!handleConfig) {
        console.error(`Неизвестный тип ручки: ${handleType}`);
        return result;
    }

    // Добавляем саму ручку
    const handleArticle = handleConfig.colors[handleColor] || handleConfig.colors['white'];
    if (handleArticle) {
        result.push({ ...handleArticle });
    }

    // Добавляем дополнительные артикулы (переходники, редукторы)
    const extrasKey = (hardwareType === 'hidden180' && openingType === 'turn-tilt')
        ? 'hidden180_turn_tilt'
        : 'default';

    const extras = handleConfig.extras[extrasKey] || handleConfig.extras['default'] || [];
    extras.forEach(item => result.push({ ...item }));
  // Возвращаем итоговый массив артикулов
    return result;
}
