// ============================================
// ВАЛИДАЦИЯ ВХОДНЫХ ДАННЫХ
// ============================================

function showMessage(text, type = 'error') {
    const messageBox = document.getElementById('messageBox');
    messageBox.textContent = text;
    messageBox.className = 'message-box ' + type;
}

function validateInputs() {
    const heightInput = document.getElementById('height');
    const widthInput = document.getElementById('width');
    const weightInput = document.getElementById('weight');
    const openingTypeSelect = document.getElementById('openingType');
    const hardwareTypeInput = document.getElementById('hardwareType');
    
    const h = Number(heightInput.value);
    const w = Number(widthInput.value);
    const wt = Number(weightInput.value);
    const openingType = openingTypeSelect.value;
    const hardwareType = hardwareTypeInput.value;

    if (!h || !w || !wt) {
        showMessage('Заполни высоту, ширину и вес створки.', 'error');
        return false;
    }

    // Общие габариты по проекту (зависят от типа открывания)
    if (openingType === 'vent-sash') {
        if (h < 550 || h > 3000) {
            showMessage('Высота должна быть в диапазоне 550-3000 мм.', 'error');
            return false;
        }
        if (w < 170 || w > 300) {
            showMessage('Ширина должна быть в диапазоне 170-300 мм.', 'error');
            return false;
        }
    } else if (openingType === 'lift-slide') {
        if (h < 2100 || h > 3200) {
            showMessage('Высота должна быть в диапазоне 2100-3200 мм.', 'error');
            return false;
        }
        if (w < 720 || w > 3300) {
            showMessage('Ширина должна быть в диапазоне 720-3300 мм.', 'error');
            return false;
        }
        if (wt < 10 || wt > 400) {
            showMessage('Вес створки должен быть в диапазоне 10-400 кг.', 'error');
            return false;
        }
    } else {
        if (h < 500 || h > 3000) {
            showMessage('Высота должна быть в диапазоне 500-3000 мм.', 'error');
            return false;
        }
        if (w < 390 || w > 1600) {
            showMessage('Ширина должна быть в диапазоне 390-1600 мм.', 'error');
            return false;
        }
    }

    if (
        openingType !== 'turn-tilt' &&
        openingType !== 'turn' &&
        openingType !== 'tilt' &&
        openingType !== 'stulp' &&
        openingType !== 'top-hung' &&
        openingType !== 'vent-sash' &&
        openingType !== 'lift-slide'
    ) {
        showMessage(
            'Сейчас доступны: П/О, Поворотный, Откидной, Штульповый, Верхнеподвесной и Вент. створка.',
            'error'
        );
        return false;
    }

    if (
        hardwareType !== 'visible' &&
        hardwareType !== 'visibleProvedal' &&
        hardwareType !== 'hidden90' &&
        hardwareType !== 'hidden180'
    ) {
        showMessage('Неизвестный тип фурнитуры.', 'error');
        return false;
    }

    // Видимая
    if (hardwareType === 'visible') {
        if (openingType === 'turn-tilt' && wt > 100) {
            showMessage('Максимальный вес для Видимая П/О — 100 кг.', 'error');
            return false;
        }
        if (openingType === 'turn' && wt > 60) {
            showMessage('Максимальный вес для Видимая Поворотный — 60 кг.', 'error');
            return false;
        }
        if (openingType === 'tilt' && wt > 50) {
            showMessage('Максимальный вес для Видимая Откидной — 50 кг.', 'error');
            return false;
        }
    }

    // Видимая Provedal
    if (hardwareType === 'visibleProvedal') {
        if (openingType === 'turn-tilt' && wt > 90) {
            showMessage('Максимальный вес для Видимая Provedal П/О — 90 кг.', 'error');
            return false;
        }
        if (openingType === 'turn' && wt > 60) {
            showMessage('Максимальный вес для Видимая Provedal Поворотный — 60 кг.', 'error');
            return false;
        }
        if (openingType === 'tilt' && wt > 50) {
            showMessage('Максимальный вес для Видимая Provedal Откидной — 50 кг.', 'error');
            return false;
        }
    }

    // Скрытая 90
    if (hardwareType === 'hidden90') {
        if (wt > 150) {
            showMessage('Максимальный вес для скрытой фурнитуры 90° — 150 кг.', 'error');
            return false;
        }
    }

    // Скрытая 180
    if (hardwareType === 'hidden180') {
        // Общий максимум для любой конфигурации
        if (wt > 210) {
            showMessage('Максимальный вес для скрытой фурнитуры 180° — 210 кг.', 'error');
            return false;
        }

        // Если уже выбран тип открывания "Откидной" — режем по 130 кг
        if (openingType === 'tilt' && wt > 130) {
            showMessage('Максимальный вес для Скрытая 180 Откидная — 130 кг.', 'error');
            return false;
        }
    }

    return true;
}
