const tg = window.Telegram ? window.Telegram.WebApp : null;

if (tg) {
    tg.ready();
    tg.expand();
    tg.MainButton.hide();
}

// === КАСТОМНЫЙ ПОПАП ДЛЯ СКРЫТАЯ 180 / 131–160 КГ ===
const angleWarningOverlay = document.getElementById('angleWarningOverlay');
const angleWarningOkBtn = document.getElementById('angleWarningOkBtn');

saveBtn.addEventListener('click', () => {
    const hardwareResult = calculateHardware();
    if (!hardwareResult) return;

    // Предупреждение про ограничитель сразу при записи окна
    const oType = String(hardwareResult.openingType);
    const hType = String(hardwareResult.hardwareType);
    const wgt = Number(hardwareResult.weight);

    const isHidden180 = hType === 'hidden180';
    const inWeightRange = wgt >= 131 && wgt <= 210;
    const isTurnTilt = oType === 'turn-tilt';
    const isTurn = oType === 'turn';

    if (isHidden180 && inWeightRange && (isTurnTilt || isTurn)) {
        let angleWarningText;

        if (isTurnTilt) {
            angleWarningText =
                'Внимание! В поворотно-откидном или откидно-поворотном режиме, при типе фурнитуры Tilt First, а так же, при весе створки от 131 кг до 210 кг ' +
                'установка Ограничителя открывания створки обязательна!';
        } else {
            angleWarningText =
                'Внимание! В поворотном режиме, при типе фурнитуры Tilt First, а так же, при весе створки от 131 кг до 210 кг ' +
                'установка Ограничителя открывания створки обязательна!';
        }

        if (angleWarningOverlay && angleWarningOkBtn) {
            angleWarningOverlay.querySelector('.modal-text').textContent = angleWarningText;
            angleWarningOverlay.style.display = 'flex';

            angleWarningOkBtn.onclick = null;
            angleWarningOkBtn.onclick = () => {
                angleWarningOverlay.style.display = 'none';
                finalizeSave(hardwareResult);
            };

            return; // ждём нажатия ОК
        } else {
            // если по какой-то причине оверлей недоступен — хотя бы тост
            showMessage(angleWarningText, 'warning');
        }
    }

    // Если предупреждение не нужно — сразу сохраняем
    finalizeSave(hardwareResult);
});

function finalizeSave(hardwareResult) {
    const qtyWindows = Number(quantityInput.value) || 1;

    accumulatedResults.push({
        ...hardwareResult,
        quantityWindows: qtyWindows
    });

    accumulatedCounter.style.display = '';
    accumulatedCountElement.textContent = String(accumulatedResults.length);

    const n = accumulatedResults.length;
    showMessage(`Расчёт №${n} записан. Нажмите «Итого», когда соберёте все окна.`, 'success');
    accumulatedCounter.classList.remove('flash');
    void accumulatedCounter.offsetWidth;
    accumulatedCounter.classList.add('flash');

    if (tg && tg.HapticFeedback && tg.HapticFeedback.notificationOccurred) {
        tg.HapticFeedback.notificationOccurred('success');
    }
}

totalBtn.addEventListener('click', async () => {
    if (accumulatedResults.length === 0) {
        showMessage('Нет записанных расчётов. Сначала нажмите «Записать».', 'error');
        return;
    }

    const summaryMap = new Map();
    const texts = [];

    accumulatedResults.forEach((res, index) => {
        let openingTypeText = 'Поворотно-откидная';
        if (res.openingType === 'turn') {
            openingTypeText = 'Поворотная';
        } else if (res.openingType === 'tilt') {
            openingTypeText = 'Откидная';
        }

        const header = `Окно ${index + 1}: ${res.width}×${res.height} мм, ${res.weight} кг, ` +
            `Видимая, ${openingTypeText}, цвет ручки: ${res.handleColor}, кол-во: ${res.quantityWindows} шт.`;
        texts.push(header);

        const grouped = groupArticles(res.items, res.quantityWindows);
        grouped.forEach(item => {
            texts.push(`  • ${item.article} — ${item.name} — ${item.qty} шт.`);

            const key = item.article;
            if (!summaryMap.has(key)) {
                summaryMap.set(key, {
                    article: item.article,
                    name: item.name,
                    qty: 0
                });
            }
            const entry = summaryMap.get(key);
            entry.qty += item.qty;
        });

        texts.push('');
    });

    texts.push('ИТОГОВЫЙ СПИСОК ПО ВСЕМ ОКНАМ:');
    const finalGrouped = Array.from(summaryMap.values())
        .sort((a, b) => a.article.localeCompare(b.article));
    finalGrouped.forEach(item => {
        texts.push(`• ${item.article} — ${item.name} — ${item.qty} шт.`);
    });

    const finalText = texts.join('\n');

    const excelData = finalGrouped.map(item => ({
        article: item.article,
        name: item.name,
        qty: item.qty
    }));

    // Проверяем есть ли штульповые с Видимая + ALUTECH
    const hasStulpAlutech = accumulatedResults.some(res => res.isStulpAlutech);

    // Альтернативные артикулы (суммируем по кол-ву окон)
    let alternativeData = [];
    if (hasStulpAlutech) {
        const altMap = new Map();
        accumulatedResults.forEach(res => {
            if (!res.isStulpAlutech) return;
            stulpAlternativeArticles.forEach(item => {
                const key = item.article;
                if (!altMap.has(key)) {
                    altMap.set(key, { ...item, qty: 0 });
                }
                altMap.get(key).qty += item.qty * res.quantityWindows;
            });
        });
        alternativeData = Array.from(altMap.values());
    }

    if (tg) {
        tg.sendData(JSON.stringify({
            action: 'total',
            data: excelData,
            alternativeData: alternativeData,
            yellowArticles: ['KN100OH', 'KN208AH']
        }));
        tg.close();
    } else {
        const ok = await exportToExcel(excelData, alternativeData);
        if (ok) {
            showMessage('Excel файл сформирован и скачан.', 'success');
        }
    }
});
