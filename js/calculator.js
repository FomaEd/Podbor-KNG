function pickVisibleTurnTiltSet(height, width) {
        return hardwareMatrixVisibleTurnTilt.find(row =>
            height >= row.minHeight && height <= row.maxHeight &&
            width >= row.minWidth && width <= row.maxWidth
        );
    }

function calculateHardware() {
        // Получаем элементы DOM
    const heightInput = document.getElementById('height');
    const widthInput = document.getElementById('width');
    const weightInput = document.getElementById('weight');
    const openingTypeSelect = document.getElementById('openingType');
    const hardwareTypeInput = document.getElementById('hardwareType');
    const handleTypeSelect = document.getElementById('handleType');
    const handleColorSelect = document.getElementById('handleColor');
    const clampSideInput = document.getElementById('clampSide');
    const profileTypeInput = document.getElementById('profileType');
    const hingeColorInput = document.getElementById('hingeColor');
    const liftSlideHandleTypeSelect = document.getElementById('liftSlideHandleType');
        
        const h = Number(heightInput.value);
        const w = Number(widthInput.value);
        const wt = Number(weightInput.value);
        const openingType = openingTypeSelect.value; // 'turn-tilt' | 'turn' | 'tilt' | 'stulp' | 'top-hung'
        const hardwareType = hardwareTypeInput.value;
        const handleType = handleTypeSelect.value;
        const handleColor = handleColorSelect.value || 'white';
        const clampSide = clampSideInput.value;

    if (!validateInputs()) {
        return null;
    }

    const resultArticles = [];

    // === Верхнеподвесной ===
if (openingType === 'top-hung') {

    if (wt > 80) {
        showMessage('Максимальный вес для Верхнеподвесной створки — 80 кг.', 'error');
        return null;
    }

    const baseSet = hardwareMatrixTopHung_0_80.find(row =>
        h >= row.minHeight && h <= row.maxHeight &&
        w >= row.minWidth && w <= row.maxWidth
    );

    if (!baseSet) {
        showMessage(
            'Под эти размеры нет зоны для Верхнеподвесной створки. Проверь диапазоны или обратись к менеджеру.',
            'error'
        );
        return null;
    }

    baseSet.articles.forEach(item => resultArticles.push({ ...item }));

    const handleItems = getHandleArticles(handleType, handleColor, openingType, hardwareType);
handleItems.forEach(item => resultArticles.push({ ...item }));

// === Вент. створка ===
} else if (openingType === 'vent-sash') {

    const baseSet = hardwareMatrixVentSash.find(row =>
        h >= row.minHeight && h <= row.maxHeight &&
        w >= row.minWidth && w <= row.maxWidth
    );

    if (!baseSet) {
        showMessage(
            'Под эти размеры нет зоны для Вентиляционной створки. Проверь диапазоны или обратись к менеджеру.',
            'error'
        );
        return null;
    }

    baseSet.articles.forEach(item => resultArticles.push({ ...item }));

    const handleItems = getHandleArticles(handleType, handleColor, openingType, hardwareType);
handleItems.forEach(item => resultArticles.push({ ...item }));

    // === Поворотно-откидной ===
    } else if (openingType === 'turn-tilt') {

        if (hardwareType === 'visible') {
            // Видимая + Поворотно-откидной
            const baseSet = pickVisibleTurnTiltSet(h, w);
            if (!baseSet) {
                showMessage(
                    'Под эти размеры нет настроенной зоны (Видимая П/О). Проверь диапазоны или обратись к менеджеру.',
                    'error'
                );
                return null;
            }

            baseSet.articles.forEach(item => resultArticles.push({ ...item }));

           const handleItems = getHandleArticles(handleType, handleColor, openingType, hardwareType);
handleItems.forEach(item => resultArticles.push({ ...item }));


            // Петли П/О Видимая
const hingSetTurnTilt = hingeArticlesTurnTiltVisible[handleColor] || hingeArticlesTurnTiltVisible['white'];
hingSetTurnTilt.forEach(item => resultArticles.push({ ...item }));

        } else if (hardwareType === 'visibleProvedal') {
            // Видимая Provedal + Поворотно-откидной
            const baseSet = hardwareMatrixVisibleProvedalTurnTilt.find(row =>
                h >= row.minHeight && h <= row.maxHeight &&
                w >= row.minWidth && w <= row.maxWidth
            );

            if (!baseSet) {
                showMessage(
                    'Под эти размеры нет зоны для Видимая Provedal П/О. Проверь диапазоны или обратись к менеджеру.',
                    'error'
                );
                return null;
            }

            baseSet.articles.forEach(item => resultArticles.push({ ...item }));

            const colorArticles =
                handleColorArticlesProvedalTurnTilt[handleColor] ||
                handleColorArticlesProvedalTurnTilt['white'];

            colorArticles.forEach(item => resultArticles.push({ ...item }));

            // Петли П/О Provedal
const hingSetProvedalTT = hingeArticlesProvedalTurnTilt[handleColor] || hingeArticlesProvedalTurnTilt['white'];
hingSetProvedalTT.forEach(item => resultArticles.push({ ...item }));

        } else if (hardwareType === 'hidden90') {
            // Скрытая 90 + Поворотно-откидной

            if (wt > 150) {
                showMessage(
                    'Максимальный вес для скрытой фурнитуры 90° не более 150 кг.',
                    'error'
                );
                return null;
            }

            const baseSet = hardwareMatrixHidden90TurnTilt.find(row =>
                h >= row.minHeight && h <= row.maxHeight &&
                w >= row.minWidth && w <= row.maxWidth
            );

            if (!baseSet) {
                showMessage(
                    'Под эти размеры нет зоны для Скрытая 90 П/О. Проверь диапазоны или обратись к менеджеру.',
                    'error'
                );
                return null;
            }

            if (baseSet.articlesCommon) {
                baseSet.articlesCommon.forEach(item =>
                    resultArticles.push({ ...item })
                );
            }

            const clampKey = clampSide === 'right' ? 'articlesRight' : 'articlesLeft';
            const clampArticles = baseSet[clampKey];

            if (clampArticles) {
                clampArticles.forEach(item =>
                    resultArticles.push({ ...item })
                );
            }

            if (wt > 100) {
                if (clampSide === 'right') {
                    resultArticles.push({
                        article: 'KN100UW-L',
                        name: 'Усилитель скрытых петель левый +50кг',
                        qty: 1,
                    });
                } else {
                    resultArticles.push({
                        article: 'KN100UW-R',
                        name: 'Усилитель скрытых петель правый +50кг',
                        qty: 1,
                    });
                }
            }

            const handleItems = getHandleArticles(handleType, handleColor, openingType, hardwareType);
handleItems.forEach(item => resultArticles.push({ ...item }));

        } else if (hardwareType === 'hidden180') {
            // Скрытая 180 + Поворотно-откидной (Tilt First)

            if (wt > 210) {
                showMessage('Максимальный вес для Скрытая 180 (Tilt First) П/О — 210 кг.', 'error');
                return null;
            }

            if (clampSide !== 'left' && clampSide !== 'right') {
                showMessage(
                    'Для этого типа фурнитуры необходимо выбрать сторону прижима: Левый или Правый.',
                    'error'
                );
                return null;
            }

            let matrix;
            if (wt <= 130) {
                matrix = hardwareMatrixHidden180TurnTilt;
            } else if (wt <= 160) {
                matrix = hardwareMatrixHidden180TurnTilt_130_160;
            } else {
                matrix = hardwareMatrixHidden180TurnTilt_160_210;
            }

            const baseSet = matrix.find(row =>
                h >= row.minHeight && h <= row.maxHeight &&
                w >= row.minWidth && w <= row.maxWidth
            );

            if (!baseSet) {
                showMessage(
                    'Под эти размеры нет зоны для Скрытая 180 (Tilt First) П/О. Проверь диапазоны или обратись к менеджеру.',
                    'error'
                );
                return null;
            }

            const clampKey = clampSide === 'right' ? 'articlesRight' : 'articlesLeft';
            baseSet[clampKey].forEach(item => resultArticles.push({ ...item }));

            const handleItems = getHandleArticles(handleType, handleColor, openingType, hardwareType);
handleItems.forEach(item => resultArticles.push({ ...item }));


        } else {
            showMessage(
                'Для этого типа фурнитуры с Поворотно-откидным ещё нет подбора.',
                'error'
            );
            return null;
        }

    // === Поворотный ===
    } else if (openingType === 'turn') {

        if (hardwareType === 'hidden180') {
            // Скрытая 180 + Поворотная

            if (wt > 210) {
                showMessage('Максимальный вес для Скрытая 180 Поворотная — 210 кг.', 'error');
                return null;
            }

            if (clampSide !== 'left' && clampSide !== 'right') {
                showMessage(
                    'Для этого типа фурнитуры необходимо выбрать сторону прижима: Левый или Правый.',
                    'error'
                );
                return null;
            }

            let matrix;

            if (wt <= 130) {
                matrix = hardwareMatrixHidden180Turn_0_130;
            } else if (wt <= 160) {
                matrix = hardwareMatrixHidden180Turn_130_160;
            } else if (wt <= 210) {
                matrix = hardwareMatrixHidden180Turn_160_210;
            } else {
                showMessage('Максимальный вес для Скрытая 180 Поворотная — 210 кг.', 'error');
                return null;
            }

            const baseSet = matrix.find(row =>
                h >= row.minHeight && h <= row.maxHeight &&
                w >= row.minWidth && w <= row.maxWidth
            );

            if (!baseSet) {
                showMessage(
                    'Под эти размеры нет зоны для Скрытая 180 Поворотная. Проверь диапазоны или обратись к менеджеру.',
                    'error'
                );
                return null;
            }

            const clampKey = clampSide === 'right' ? 'articlesRight' : 'articlesLeft';
            baseSet[clampKey].forEach(item => resultArticles.push({ ...item }));

            const handleItems = getHandleArticles(handleType, handleColor, openingType, hardwareType);
handleItems.forEach(item => resultArticles.push({ ...item }));


                        } else if (hardwareType === 'hidden90') {
            // Скрытая 90 + Поворотная

            if (wt > 150) {
                showMessage('Максимальный вес для скрытой фурнитуры 90° — 150 кг.', 'error');
                return null;
            }

            if (wt <= 100) {
                // До 100 кг — сторона прижима на UI видна, но в подборе не участвует
                const baseSet = hardwareMatrixHidden90Turn_0_100.find(row =>
                    h >= row.minHeight && h <= row.maxHeight &&
                    w >= row.minWidth && w <= row.maxWidth
                );

                if (!baseSet) {
                    showMessage(
                        'Под эти размеры нет зоны для Скрытая 90 Поворотная до 100 кг. ' +
                        'Проверь диапазоны или обратись к менеджеру.',
                        'error'
                    );
                    return null;
                }

                if (baseSet.articles) {
                    baseSet.articles.forEach(item => resultArticles.push({ ...item }));
                }

                const handleItems = getHandleArticles(handleType, handleColor, openingType, hardwareType);
                handleItems.forEach(item => resultArticles.push({ ...item }));

            } else {
                // 101–150 кг — нужна сторона прижима
                const baseSet = hardwareMatrixHidden90Turn_101_150.find(row =>
                    h >= row.minHeight && h <= row.maxHeight &&
                    w >= row.minWidth && w <= row.maxWidth
                );

                if (!baseSet) {
                    showMessage(
                        'Под эти размеры нет зоны для Скрытая 90 Поворотная 101–150 кг. ' +
                        'Проверь диапазоны или обратись к менеджеру.',
                        'error'
                    );
                    return null;
                }

                if (clampSide !== 'left' && clampSide !== 'right') {
                    showMessage(
                        'Для веса свыше 100 кг нужно выбрать сторону прижима: Левый или Правый.',
                        'error'
                    );
                    return null;
                }

                const clampKey = clampSide === 'right' ? 'articlesRight' : 'articlesLeft';
                const clampArticles = baseSet[clampKey];

                if (!clampArticles) {
                    showMessage(
                        'Не найден набор фурнитуры для выбранной стороны прижима.',
                        'error'
                    );
                    return null;
                }

                clampArticles.forEach(item => resultArticles.push({ ...item }));

                const handleItems = getHandleArticles(handleType, handleColor, openingType, hardwareType);
                handleItems.forEach(item => resultArticles.push({ ...item }));
            }
                
        } else if (hardwareType === 'visible') {
            // Видимая + Поворотный
            const baseSet = hardwareMatrixVisibleTurn.find(row =>
                h >= row.minHeight && h <= row.maxHeight &&
                w >= row.minWidth && w <= row.maxWidth
            );

            if (!baseSet) {
                showMessage(
                    'Под эти размеры нет настроенной зоны (Поворотный). Проверь диапазоны или обратись к менеджеру.',
                    'error'
                );
                return null;
            }

            baseSet.articles.forEach(item => resultArticles.push({ ...item }));

            const handleItems = getHandleArticles(handleType, handleColor, openingType, hardwareType);
handleItems.forEach(item => resultArticles.push({ ...item }));

            
            // Петли в зависимости от высоты
let hingeQtyTurn = 2;
if (h >= 1201 && h <= 1800) hingeQtyTurn = 3;
else if (h >= 1801 && h <= 2400) hingeQtyTurn = 4;

const hingeItemTurn = hingeArticlesTurnVisible[handleColor] || hingeArticlesTurnVisible['white'];
resultArticles.push({ ...hingeItemTurn, qty: hingeQtyTurn });

        } else if (hardwareType === 'visibleProvedal') {
            // Видимая Provedal + Поворотный
            const baseSet = hardwareMatrixVisibleProvedalTurn.find(row =>
                h >= row.minHeight && h <= row.maxHeight &&
                w >= row.minWidth && w <= row.maxWidth
            );

            if (!baseSet) {
                showMessage(
                    'Под эти размеры нет зоны для Видимая Provedal Поворотная. Проверь диапазоны или обратись к менеджеру.',
                    'error'
                );
                return null;
            }

            baseSet.articles.forEach(item => resultArticles.push({ ...item }));

            const handleItems = getHandleArticles(handleType, handleColor, openingType, hardwareType);
handleItems.forEach(item => resultArticles.push({ ...item }));

            // Петли Поворотный Provedal — кол-во от высоты
const hingeQtyProvedalTurn = (h >= 500 && h <= 1300) ? 2 : 3;
const hingeItemProvedalTurn = hingeArticlesProvedal[handleColor] || hingeArticlesProvedal['white'];
resultArticles.push({ ...hingeItemProvedalTurn, qty: hingeQtyProvedalTurn });

        } else {
            showMessage(
                'Для этого типа фурнитуры с Поворотным ещё нет подбора.',
                'error'
            );
            return null;
        }

    // === Откидной ===
    } else if (openingType === 'tilt') {

        if (hardwareType === 'visible') {
            // Видимая + Откидной
            const baseSet = hardwareMatrixVisibleTilt.find(row =>
                h >= row.minHeight && h <= row.maxHeight &&
                w >= row.minWidth && w <= row.maxWidth
            );

            if (!baseSet) {
                showMessage(
                    'Под эти размеры нет настроенной зоны (Откидной). Проверь диапазоны или обратись к менеджеру.',
                    'error'
                );
                return null;
            }

            baseSet.articles.forEach(item => resultArticles.push({ ...item }));

            const handleItems = getHandleArticles(handleType, handleColor, openingType, hardwareType);
handleItems.forEach(item => resultArticles.push({ ...item }));


            // Петли Откидной Видимая — кол-во от ширины
const hingeQtyTilt = (w >= 445 && w <= 1000) ? 2 : 3;
const hingeItemTilt = hingeArticlesTiltVisible[handleColor] || hingeArticlesTiltVisible['white'];
resultArticles.push({ ...hingeItemTilt, qty: hingeQtyTilt });

        } else if (hardwareType === 'visibleProvedal') {
            // Видимая Provedal + Откидной
            const baseSet = hardwareMatrixVisibleProvedalTilt.find(row =>
                h >= row.minHeight && h <= row.maxHeight &&
                w >= row.minWidth && w <= row.maxWidth
            );

            if (!baseSet) {
                showMessage(
                    'Под эти размеры нет зоны для Видимая Provedal Откидная. Проверь диапазоны или обратись к менеджеру.',
                    'error'
                );
                return null;
            }

            if (typeof baseSet.maxWeight === 'number' && wt > baseSet.maxWeight) {
                showMessage(baseSet.weightErrorMessage, 'error');
                return null;
            }
            if (typeof baseSet.minWeight === 'number' && wt <= baseSet.minWeight) {
                showMessage(baseSet.weightErrorMessage, 'error');
                return null;
            }

            baseSet.articles.forEach(item => resultArticles.push({ ...item }));

            const handleItems = getHandleArticles(handleType, handleColor, openingType, hardwareType);
handleItems.forEach(item => resultArticles.push({ ...item }));

            // Петли Откидной Provedal — кол-во от ширины
const hingeQtyProvedalTilt = (w >= 500 && w <= 1300) ? 2 : 3;
const hingeItemProvedalTilt = hingeArticlesProvedal[handleColor] || hingeArticlesProvedal['white'];
resultArticles.push({ ...hingeItemProvedalTilt, qty: hingeQtyProvedalTilt });

        } else if (hardwareType === 'hidden180') {
            // Скрытая 180 + Откидной, до 130 кг

            if (wt > 130) {
                showMessage('Максимальный вес для Скрытая 180 Откидная — 130 кг.', 'error');
                return null;
            }

            if (clampSide !== 'any') {
                showMessage(
                    'Для ваших параметров сторона прижима не имеет значения. ' +
                    'Выберите вариант «Не имеет значения».',
                    'error'
                );
                return null;
            }

            const baseSet = hardwareMatrixHidden180Tilt_0_130.find(row =>
                h >= row.minHeight && h <= row.maxHeight &&
                w >= row.minWidth && w <= row.maxWidth
            );

            if (!baseSet) {
                showMessage(
                    'Под эти размеры нет зоны для Скрытая 180 Откидная. Проверь диапазоны или обратись к менеджеру.',
                    'error'
                );
                return null;
            }

            baseSet.articles.forEach(item => resultArticles.push({ ...item }));

            const handleItems = getHandleArticles(handleType, handleColor, openingType, 'hidden90');
handleItems.forEach(item => resultArticles.push({ ...item }));


        } else if (hardwareType === 'hidden90') {
            // Скрытая 90 + Откидной
            if (wt > 80) {
                showMessage('Максимальный вес для Скрытая 90 Откидной — 80 кг.', 'error');
                return null;
            }

            if (clampSide !== 'any') {
                showMessage(
                    'Для ваших параметров сторона прижима не имеет значения. ' +
                    'Выберите вариант «Не имеет значения».',
                    'error'
                );
                return null;
            }

            const baseSet = hardwareMatrixHidden90Tilt.find(row =>
                h >= row.minHeight && h <= row.maxHeight &&
                w >= row.minWidth && w <= row.maxWidth
            );

            if (!baseSet) {
                showMessage(
                    'Под эти размеры нет зоны для Скрытая 90 Откидная. Проверь диапазоны или обратись к менеджеру.',
                    'error'
                );
                return null;
            }

            baseSet.articles.forEach(item => resultArticles.push({ ...item }));

            const handleItems = getHandleArticles(handleType, handleColor, openingType, hardwareType);
handleItems.forEach(item => resultArticles.push({ ...item }));

        } else {
            showMessage(
                'Для этого типа фурнитуры с Откидным ещё нет подбора.',
                'error'
            );
            return null;
        }

    } else if (openingType === 'stulp') {
  if (hardwareType === 'visible') {
    if (profileTypeInput.value === 'alutech') {
      if (wt > 60) {
        showMessage('Максимальный вес для Штульповый Видимая ALUTECH — 60 кг.', 'error');
        return null;
      }
      const baseSet = hardwareMatrixStulpVisibleAlutech.find(row =>
        h >= row.minHeight && h <= row.maxHeight &&
        w >= row.minWidth && w <= row.maxWidth
      );
      if (!baseSet) {
        showMessage(
          'Под эти размеры нет зоны для Штульповый Видимая ALUTECH. Проверь диапазоны или обратись к менеджеру.',
          'error'
        );
        return null;
      }
      // Базовые артикулы
      baseSet.variant1.forEach(item => resultArticles.push({ ...item }));
      // Петли в зависимости от цвета
      const hingeColor = hingeColorInput.value || 'white';
      const hingeArticle = hingeColorArticlesStulp[hingeColor];
      if (hingeArticle) {
        resultArticles.push({ ...hingeArticle, qty: baseSet.hingeQty });
      }
    } else if (profileTypeInput.value === 'other') {
  if (wt > 60) {
    showMessage('Максимальный вес для Штульповый Видимая Другие профили — 60 кг.', 'error');
    return null;
  }
  const baseSet = hardwareMatrixStulpVisibleOther.find(row =>
    h >= row.minHeight && h <= row.maxHeight &&
    w >= row.minWidth && w <= row.maxWidth
  );
  if (!baseSet) {
    showMessage(
      'Под эти размеры нет зоны для Штульповый Видимая Другие профили. Проверь диапазоны или обратись к менеджеру.',
      'error'
    );
    return null;
  }
  // Базовые артикулы
  baseSet.variant1.forEach(item => resultArticles.push({ ...item }));
  // Петли в зависимости от высоты и цвета
  const hingeColor = hingeColorInput.value || 'white';
  const hingeArticle = hingeColorArticlesStulp[hingeColor];
  let hingeQty = 2;
  if (h >= 1201 && h <= 1800) hingeQty = 3;
  else if (h >= 1801 && h <= 2400) hingeQty = 4;
  if (hingeArticle) {
    resultArticles.push({ ...hingeArticle, qty: hingeQty });
  }
}
    } else if (hardwareType === 'hidden90') {
       if (profileTypeInput.value === 'alutech') {
      if (wt > 150) {
        showMessage('Максимальный вес для Штульповый Скрытая 90 ALUTECH — 150 кг.', 'error');
        return null;
      }
      if (wt <= 100) {
        // До 100 кг — прижим не имеет значения
        if (clampSide !== 'any') {
          showMessage(
            'Для ваших параметров сторона прижима не имеет значения. ' +
            'Выберите вариант «Не имеет значения».',
            'error'
          );
          return null;
        }
        const baseSet = hardwareMatrixStulpHidden90Alutech.find(row =>
          h >= row.minHeight && h <= row.maxHeight &&
          w >= row.minWidth && w <= row.maxWidth
        );
        if (!baseSet) {
          showMessage(
            'Под эти размеры нет зоны для Штульповый Скрытая 90 ALUTECH. Проверь диапазоны или обратись к менеджеру.',
            'error'
          );
          return null;
        }
        baseSet.articles.forEach(item => resultArticles.push({ ...item }));
      } else {
        // 101–150 кг — нужна сторона прижима
        if (clampSide !== 'left' && clampSide !== 'right') {
          showMessage(
            'Для веса свыше 100 кг нужно выбрать сторону прижима: Левый или Правый.',
            'error'
          );
          return null;
        }
        const baseSet = hardwareMatrixStulpHidden90Alutech_101_150.find(row =>
          h >= row.minHeight && h <= row.maxHeight &&
          w >= row.minWidth && w <= row.maxWidth
        );
        if (!baseSet) {
          showMessage(
            'Под эти размеры нет зоны для Штульповый Скрытая 90 ALUTECH 101–150 кг. Проверь диапазоны или обратись к менеджеру.',
            'error'
          );
          return null;
        }
        const clampKey = clampSide === 'right' ? 'articlesRight' : 'articlesLeft';
        baseSet[clampKey].forEach(item => resultArticles.push({ ...item }));
      }
            } else if (profileTypeInput.value === 'other') {
      if (wt > 150) {
        showMessage('Максимальный вес для Штульповый Скрытая 90 Другие профили — 150 кг.', 'error');
        return null;
      }
      if (wt <= 100) {
        if (clampSide !== 'any') {
          showMessage(
            'Для ваших параметров сторона прижима не имеет значения. ' +
            'Выберите вариант «Не имеет значения».',
            'error'
          );
          return null;
        }
        const baseSet = hardwareMatrixStulpHidden90Other.find(row =>
          h >= row.minHeight && h <= row.maxHeight &&
          w >= row.minWidth && w <= row.maxWidth
        );
        if (!baseSet) {
          showMessage(
            'Под эти размеры нет зоны для Штульповый Скрытая 90 Другие профили. Проверь диапазоны или обратись к менеджеру.',
            'error'
          );
          return null;
        }
        baseSet.articles.forEach(item => resultArticles.push({ ...item }));
      } else {
        if (clampSide !== 'left' && clampSide !== 'right') {
          showMessage(
            'Для веса свыше 100 кг нужно выбрать сторону прижима: Левый или Правый.',
            'error'
          );
          return null;
        }
        const baseSet = hardwareMatrixStulpHidden90Other_101_150.find(row =>
          h >= row.minHeight && h <= row.maxHeight &&
          w >= row.minWidth && w <= row.maxWidth
        );
        if (!baseSet) {
          showMessage(
            'Под эти размеры нет зоны для Штульповый Скрытая 90 Другие профили 101–150 кг. Проверь диапазоны или обратись к менеджеру.',
            'error'
          );
          return null;
        }
        const clampKey = clampSide === 'right' ? 'articlesRight' : 'articlesLeft';
        baseSet[clampKey].forEach(item => resultArticles.push({ ...item }));
      }
    }
    } else if (hardwareType === 'hidden180') {
    if (profileTypeInput.value === 'alutech') {
            if (wt > 160) {
        showMessage('Максимальный вес для Штульповый Скрытая 180 ALUTECH — 160 кг.', 'error');
        return null;
      }
      let matrixHidden180Alutech;
      if (wt <= 130) {
        matrixHidden180Alutech = hardwareMatrixStulpHidden180Alutech_0_130;
      } else {
        matrixHidden180Alutech = hardwareMatrixStulpHidden180Alutech_131_160;
      }
      if (clampSide !== 'left' && clampSide !== 'right') {
        showMessage(
          'Для этого типа фурнитуры необходимо выбрать сторону прижима: Левый или Правый.',
          'error'
        );
        return null;
      }
            const baseSet = matrixHidden180Alutech.find(row =>
        h >= row.minHeight && h <= row.maxHeight &&
        w >= row.minWidth && w <= row.maxWidth
      );
      if (!baseSet) {
        showMessage(
          'Под эти размеры нет зоны для Штульповый Скрытая 180 ALUTECH. Проверь диапазоны или обратись к менеджеру.',
          'error'
        );
        return null;
      }
      const clampKey = clampSide === 'right' ? 'articlesRight' : 'articlesLeft';
      baseSet[clampKey].forEach(item => resultArticles.push({ ...item }));
            } else if (profileTypeInput.value === 'other') {
      if (wt > 160) {
        showMessage('Максимальный вес для Штульповый Скрытая 180 Другие профили — 160 кг.', 'error');
        return null;
      }
      if (clampSide !== 'left' && clampSide !== 'right') {
        showMessage(
          'Для этого типа фурнитуры необходимо выбрать сторону прижима: Левый или Правый.',
          'error'
        );
        return null;
      }
      const matrixHidden180Other = wt <= 130
        ? hardwareMatrixStulpHidden180Other_0_130
        : hardwareMatrixStulpHidden180Other_131_160;
      const baseSet = matrixHidden180Other.find(row =>
        h >= row.minHeight && h <= row.maxHeight &&
        w >= row.minWidth && w <= row.maxWidth
      );
      if (!baseSet) {
        showMessage(
          'Под эти размеры нет зоны для Штульповый Скрытая 180 Другие профили. Проверь диапазоны или обратись к менеджеру.',
          'error'
        );
        return null;
      }
      const clampKey = clampSide === 'right' ? 'articlesRight' : 'articlesLeft';
      baseSet[clampKey].forEach(item => resultArticles.push({ ...item }));
    } else {
      showMessage('Для Штульповый Скрытая 180 с другим профилем подбор ещё не реализован.', 'error');
      return null;
    }
    } else {
    showMessage('Для этого типа фурнитуры со Штульповым ещё нет подбора.', 'error');
    return null;
  }

  } else if (openingType === 'lift-slide') {
    if (wt > 400) {
      showMessage('Максимальный вес для Подъёмно-сдвижной — 400 кг.', 'error');
      return null;
    }

    const baseSet = hardwareMatrixLiftSlide.find(row =>
      h >= row.minHeight && h <= row.maxHeight &&
      w >= row.minWidth && w <= row.maxWidth
    );

    if (!baseSet) {
      showMessage(
        'Под эти размеры нет зоны для Подъёмно-сдвижной. Проверь диапазоны или обратись к менеджеру.',
        'error'
      );
      return null;
    }

    baseSet.articles.forEach(item => resultArticles.push({ ...item }));

    if (wt >= 301 && wt <= 400) {
      resultArticles.push(
        {
          article: 'KN1679',
          name: 'Комплект доп. кареток для створок >300 кг.',
          qty: 1
        },
        {
          article: 'KN100QV',
          name: 'Цапфа',
          qty: 2
        }
      );
    }

    const liftSlideHandleType = liftSlideHandleTypeSelect.value;
    const handleColorKey = handleColorSelect.value || 'white';
    const handleSet = liftSlideHandleCatalog[liftSlideHandleType];
    if (handleSet) {
      const colorArticles = handleSet[handleColorKey] || handleSet['white'];
      if (colorArticles) {
        colorArticles.forEach(item => resultArticles.push({ ...item }));
      }
    }

        } else {
        showMessage(
            'Для этого типа открывания подбор ещё не реализован.',
            'error'
        );
        return null;
    }

    // Фильтр KN100KR для конкретной конфигурации:
    // П/О + Скрытая 90 + стандартные ручки Classic / Concise
    const isHidden90TurnTilt =
    openingType === 'turn-tilt' &&
    hardwareType === 'hidden90';

const isStandardHandle =
    handleType === 'classic_standard' ||
    handleType === 'concise_standard';

const filteredArticles = (isHidden90TurnTilt && isStandardHandle)
    ? resultArticles.filter(item =>
        !(item.article === 'KN100KR')
      )
    : resultArticles;

        return {
                height: h,
                width: w,
                weight: wt,
                openingType,
                hardwareType,
                profileType: profileTypeInput.value,
                hingeColor: hingeColorInput.value,
                liftSlideHandleType: liftSlideHandleTypeSelect.value,
                isStulpAlutech:
                        openingType === 'stulp' &&
                        profileTypeInput.value === 'alutech' &&
                        (hardwareType === 'visible' ||
                         hardwareType === 'hidden90' ||
                         hardwareType === 'hidden180'),
                clampSide,
                handleType,
                handleColor,
                items: filteredArticles
        };
}

