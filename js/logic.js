const tg = window.Telegram ? window.Telegram.WebApp : null;
if (tg) {
  tg.ready();
  tg.expand();
  tg.MainButton.hide();
}

const hardwareTypeGroup = document.getElementById('hardwareTypeGroup');
const hardwareTypeToggle = document.getElementById('hardwareTypeToggle');
const clampSideToggle = document.getElementById('clampSideToggle');
const hardwareTypeInput = document.getElementById('hardwareType');
const clampSideInput = document.getElementById('clampSide');
const clampSideGroup = document.getElementById('clampSideGroup');
const ventNoteGroup = document.getElementById('ventNoteGroup');
const profileTypeGroup = document.getElementById('profileTypeGroup');
const profileTypeToggle = document.getElementById('profileTypeToggle');
const profileTypeInput = document.getElementById('profileType');
const liftSlideHandleGroup = document.getElementById('liftSlideHandleGroup');
const liftSlideHandleTypeSelect = document.getElementById('liftSlideHandleType');
const hingeColorGroup = document.getElementById('hingeColorGroup');
const hingeColorToggle = document.getElementById('hingeColorToggle');
const hingeColorInput = document.getElementById('hingeColor');
const handleColorLabel = document.getElementById('handleColorLabel');
const handleGroup = document.getElementById('handleGroup');
const handleGroupTitle = document.getElementById('handleGroupTitle');
const handleTypeGroup = document.getElementById('handleTypeGroup');
const heightInput = document.getElementById('height');
const widthInput = document.getElementById('width');
const weightInput = document.getElementById('weight');
const openingTypeSelect = document.getElementById('openingType');
const handleTypeSelect = document.getElementById('handleType');
const handleColorSelect = document.getElementById('handleColor');
const quantityInput = document.getElementById('quantity');
const saveBtn = document.getElementById('saveBtn');
const totalBtn = document.getElementById('totalBtn');
const messageBox = document.getElementById('messageBox');
const accumulatedCounter = document.getElementById('accumulatedCounter');
const accumulatedCountElement = document.getElementById('accumulatedCount');

const accumulatedResults = [];

function setClampSide(value = 'any') {
  const allowed = ['left', 'right', 'any'];
  const nextValue = allowed.includes(value) ? value : 'any';
  clampSideInput.value = nextValue;
  if (clampSideToggle) {
    [...clampSideToggle.querySelectorAll('.toggle-chip')].forEach(chip => chip.classList.remove('active'));
    const activeChip = clampSideToggle.querySelector(`[data-value="${nextValue}"]`);
    if (activeChip) activeChip.classList.add('active');
  }
}

openingTypeSelect.addEventListener('change', () => {
  const openingType = openingTypeSelect.value;
  if (openingType === 'top-hung') {
    if (hardwareTypeGroup) hardwareTypeGroup.style.display = 'none';
    if (ventNoteGroup) ventNoteGroup.style.display = 'none';
    hardwareTypeInput.value = 'visible';
    clampSideGroup.style.display = 'none';
    setClampSide('any');
    if (profileTypeGroup) profileTypeGroup.style.display = 'none';
    if (handleGroup) handleGroup.style.display = '';
    if (handleTypeGroup) handleTypeGroup.style.display = '';
    if (handleGroupTitle) handleGroupTitle.textContent = 'Форма и цвет ручки';
    if (handleColorLabel) handleColorLabel.style.display = '';
    if (hingeColorGroup) hingeColorGroup.style.display = 'none';
    if (liftSlideHandleGroup) liftSlideHandleGroup.style.display = 'none';
  } else if (openingType === 'vent-sash') {
    if (hardwareTypeGroup) hardwareTypeGroup.style.display = 'none';
    if (ventNoteGroup) ventNoteGroup.style.display = '';
    hardwareTypeInput.value = 'hidden90';
    clampSideGroup.style.display = 'none';
    setClampSide('any');
    if (profileTypeGroup) profileTypeGroup.style.display = 'none';
    if (handleGroup) handleGroup.style.display = '';
    if (handleTypeGroup) handleTypeGroup.style.display = '';
    if (handleGroupTitle) handleGroupTitle.textContent = 'Форма и цвет ручки';
    if (handleColorLabel) handleColorLabel.style.display = '';
    if (hingeColorGroup) hingeColorGroup.style.display = 'none';
    if (liftSlideHandleGroup) liftSlideHandleGroup.style.display = 'none';
  } else if (openingType === 'lift-slide') {
    if (hardwareTypeGroup) hardwareTypeGroup.style.display = 'none';
    if (ventNoteGroup) ventNoteGroup.style.display = 'none';
    hardwareTypeInput.value = 'visible';
    clampSideGroup.style.display = 'none';
    setClampSide('any');
    if (profileTypeGroup) profileTypeGroup.style.display = 'none';
    if (hingeColorGroup) hingeColorGroup.style.display = 'none';
    if (handleGroup) handleGroup.style.display = '';
    if (handleTypeGroup) handleTypeGroup.style.display = 'none';
    if (handleGroupTitle) handleGroupTitle.textContent = 'Цвет ручки';
    if (handleColorLabel) handleColorLabel.style.display = 'none';
    if (liftSlideHandleGroup) liftSlideHandleGroup.style.display = '';
  } else {
    if (hardwareTypeGroup) hardwareTypeGroup.style.display = '';
    if (ventNoteGroup) ventNoteGroup.style.display = 'none';
    const provedalChip = hardwareTypeToggle.querySelector('[data-value="visibleProvedal"]');
    if (provedalChip) {
      if (openingType === 'stulp') {
        provedalChip.style.display = 'none';
        if (hardwareTypeInput.value === 'visibleProvedal') {
          hardwareTypeInput.value = 'visible';
          [...hardwareTypeToggle.querySelectorAll('.toggle-chip')].forEach(c => c.classList.remove('active'));
          const visibleChip = hardwareTypeToggle.querySelector('[data-value="visible"]');
          if (visibleChip) visibleChip.classList.add('active');
        }
      } else {
        provedalChip.style.display = '';
      }
    }
    if (profileTypeGroup) {
      if (openingType === 'stulp') {
        profileTypeGroup.style.display = '';
      } else {
        profileTypeGroup.style.display = 'none';
        profileTypeInput.value = 'alutech';
        [...profileTypeToggle.querySelectorAll('.toggle-chip')].forEach(c => c.classList.remove('active'));
        const firstChip = profileTypeToggle.querySelector('[data-value="alutech"]');
        if (firstChip) firstChip.classList.add('active');
      }
    }
    if (openingType === 'stulp') {
      if (handleGroup) handleGroup.style.display = 'none';
      if (hingeColorGroup) hingeColorGroup.style.display = '';
    } else {
      if (handleGroup) handleGroup.style.display = '';
      if (hingeColorGroup) hingeColorGroup.style.display = 'none';
      hingeColorInput.value = 'white';
      [...hingeColorToggle.querySelectorAll('.toggle-chip')].forEach(c => c.classList.remove('active'));
      const firstHingeChip = hingeColorToggle.querySelector('[data-value="white"]');
      if (firstHingeChip) firstHingeChip.classList.add('active');
    }
    if (liftSlideHandleGroup) liftSlideHandleGroup.style.display = 'none';
    if (handleTypeGroup) handleTypeGroup.style.display = '';
    if (handleGroupTitle) handleGroupTitle.textContent = 'Форма и цвет ручки';
    if (handleColorLabel) handleColorLabel.style.display = '';
  }
});

if (hardwareTypeToggle && hardwareTypeInput && clampSideGroup) {
  hardwareTypeToggle.addEventListener('click', (e) => {
    const chip = e.target.closest('.toggle-chip');
    if (!chip) return;
    [...hardwareTypeToggle.querySelectorAll('.toggle-chip')].forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    const val = chip.dataset.value;
    hardwareTypeInput.value = val;
    if (val === 'hidden90' || val === 'hidden180') {
      clampSideGroup.style.display = '';
      setClampSide('any');
    } else {
      clampSideGroup.style.display = 'none';
      setClampSide('any');
    }
    if (openingTypeSelect.value === 'stulp') {
      if (val === 'visible') {
        if (hingeColorGroup) hingeColorGroup.style.display = '';
      } else {
        if (hingeColorGroup) hingeColorGroup.style.display = 'none';
        hingeColorInput.value = 'white';
        [...hingeColorToggle.querySelectorAll('.toggle-chip')].forEach(c => c.classList.remove('active'));
        const firstHingeChip = hingeColorToggle.querySelector('[data-value="white"]');
        if (firstHingeChip) firstHingeChip.classList.add('active');
      }
    }
  });
}

if (profileTypeToggle && profileTypeInput) {
  profileTypeToggle.addEventListener('click', (e) => {
    const chip = e.target.closest('.toggle-chip');
    if (!chip) return;
    [...profileTypeToggle.querySelectorAll('.toggle-chip')].forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    profileTypeInput.value = chip.dataset.value;
  });
}

if (hingeColorToggle && hingeColorInput) {
  hingeColorToggle.addEventListener('click', (e) => {
    const chip = e.target.closest('.toggle-chip');
    if (!chip) return;
    [...hingeColorToggle.querySelectorAll('.toggle-chip')].forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    hingeColorInput.value = chip.dataset.value;
  });
}

if (clampSideToggle && clampSideInput) {
  clampSideToggle.addEventListener('click', (e) => {
    const chip = e.target.closest('.toggle-chip');
    if (!chip) return;
    [...clampSideToggle.querySelectorAll('.toggle-chip')].forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    clampSideInput.value = chip.dataset.value;
  });
}

function showMessage(text, type = 'error') {
  messageBox.textContent = text;
  messageBox.className = 'message-box ' + type;
}

function validateInputs() {
  const h = Number(heightInput.value);
  const w = Number(widthInput.value);
  const wt = Number(weightInput.value);
  const openingType = openingTypeSelect.value;
  const hardwareType = hardwareTypeInput.value;
  if (!h || !w || !wt) {
    showMessage('Заполни высоту, ширину и вес створки.', 'error');
    return false;
  }
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
  return true;
}

function getHandleArticles(handleType, handleColor, openingType, hardwareType) {
  const handle = handleCatalog[handleType];
  if (!handle) return [];
  const colorKey = handle.colors[handleColor] ? handleColor : 'white';
  const result = [];
  result.push({ ...handle.colors[colorKey] });
  const isSpecialForkCase = handle.category === 'fork' && openingType === 'turn-tilt' && hardwareType === 'hidden180';
  if (isSpecialForkCase && handle.extras.hidden180_turn_tilt) {
    handle.extras.hidden180_turn_tilt.forEach(item => result.push({ ...item }));
  } else if (handle.extras.default) {
    handle.extras.default.forEach(item => result.push({ ...item }));
  }
  return result;
}

function calculateHardware() {
  const h = Number(heightInput.value);
  const w = Number(widthInput.value);
  const wt = Number(weightInput.value);
  const openingType = openingTypeSelect.value;
  const hardwareType = hardwareTypeInput.value;
  const handleType = handleTypeSelect.value;
  const handleColor = handleColorSelect.value || 'white';
  const clampSide = clampSideInput.value;

  if (!validateInputs()) return null;

  const resultArticles = [];

  if (openingType === 'top-hung') {
    if (wt > 80) {
      showMessage('Максимальный вес для Верхнеподвесной створки — 80 кг.', 'error');
      return null;
    }
    const baseSet = hardwareMatrixTopHung_0_80.find(row => h >= row.minHeight && h <= row.maxHeight && w >= row.minWidth && w <= row.maxWidth);
    if (!baseSet) {
      showMessage('Под эти размеры нет зоны для Верхнеподвесной створки.', 'error');
      return null;
    }
    baseSet.articles.forEach(item => resultArticles.push({ ...item }));
    getHandleArticles(handleType, handleColor, openingType, hardwareType).forEach(item => resultArticles.push({ ...item }));
  } else if (openingType === 'vent-sash') {
    const baseSet = hardwareMatrixVentSash.find(row => h >= row.minHeight && h <= row.maxHeight && w >= row.minWidth && w <= row.maxWidth);
    if (!baseSet) {
      showMessage('Под эти размеры нет зоны для Вентиляционной створки.', 'error');
      return null;
    }
    baseSet.articles.forEach(item => resultArticles.push({ ...item }));
    getHandleArticles(handleType, handleColor, openingType, hardwareType).forEach(item => resultArticles.push({ ...item }));
  } else if (openingType === 'turn-tilt') {
    if (hardwareType === 'visible') {
      const baseSet = hardwareMatrixVisibleTurnTilt.find(row => h >= row.minHeight && h <= row.maxHeight && w >= row.minWidth && w <= row.maxWidth);
      if (!baseSet) {
        showMessage('Размеры не входят в диапазон Видимая П/О.', 'error');
        return null;
      }
      baseSet.articles.forEach(item => resultArticles.push({ ...item }));
      getHandleArticles(handleType, handleColor, openingType, hardwareType).forEach(item => resultArticles.push({ ...item }));
      (hingeArticlesTurnTiltVisible[handleColor] || hingeArticlesTurnTiltVisible['white']).forEach(item => resultArticles.push({ ...item }));
    } else if (hardwareType === 'visibleProvedal') {
      const baseSet = hardwareMatrixVisibleProvedalTurnTilt.find(row => h >= row.minHeight && h <= row.maxHeight && w >= row.minWidth && w <= row.maxWidth);
      if (!baseSet) {
        showMessage('Размеры не входят в диапазон Provedal П/О.', 'error');
        return null;
      }
      baseSet.articles.forEach(item => resultArticles.push({ ...item }));
      (handleColorArticlesProvedalTurnTilt[handleColor] || handleColorArticlesProvedalTurnTilt['white']).forEach(item => resultArticles.push({ ...item }));
      (hingeArticlesProvedalTurnTilt[handleColor] || hingeArticlesProvedalTurnTilt['white']).forEach(item => resultArticles.push({ ...item }));
    } else if (hardwareType === 'hidden90') {
      if (wt > 150) {
        showMessage('Максимальный вес для скрытой фурнитуры 90° не более 150 кг.', 'error');
        return null;
      }
      const baseSet = hardwareMatrixHidden90TurnTilt.find(row => h >= row.minHeight && h <= row.maxHeight && w >= row.minWidth && w <= row.maxWidth);
      if (!baseSet) {
        showMessage('Размеры не входят в диапазон Скрытая 90 П/О.', 'error');
        return null;
      }
      if (baseSet.articlesCommon) baseSet.articlesCommon.forEach(item => resultArticles.push({ ...item }));
      const clampKey = clampSide === 'right' ? 'articlesRight' : 'articlesLeft';
      if (baseSet[clampKey]) baseSet[clampKey].forEach(item => resultArticles.push({ ...item }));
      if (wt > 100) {
        resultArticles.push({
          article: clampSide === 'right' ? 'KN100UW-L' : 'KN100UW-R',
          name: `Усилитель скрытых петель ${clampSide === 'right' ? 'левый' : 'правый'} +50кг`,
          qty: 1
        });
      }
      getHandleArticles(handleType, handleColor, openingType, hardwareType).forEach(item => resultArticles.push({ ...item }));
    } else if (hardwareType === 'hidden180') {
      if (wt > 210) {
        showMessage('Максимальный вес для Скрытая 180 (Tilt First) П/О — 210 кг.', 'error');
        return null;
      }
      if (clampSide !== 'left' && clampSide !== 'right') {
        showMessage('Выберите сторону прижима: Левый или Правый.', 'error');
        return null;
      }
      let matrix = wt <= 130 ? hardwareMatrixHidden180TurnTilt : (wt <= 160 ? hardwareMatrixHidden180TurnTilt_130_160 : hardwareMatrixHidden180TurnTilt_160_210);
      const baseSet = matrix.find(row => h >= row.minHeight && h <= row.maxHeight && w >= row.minWidth && w <= row.maxWidth);
      if (!baseSet) {
        showMessage('Размеры не входят в диапазон Скрытая 180 П/О.', 'error');
        return null;
      }
      const clampKey = clampSide === 'right' ? 'articlesRight' : 'articlesLeft';
      baseSet[clampKey].forEach(item => resultArticles.push({ ...item }));
      getHandleArticles(handleType, handleColor, openingType, hardwareType).forEach(item => resultArticles.push({ ...item }));
    }
  } else if (openingType === 'turn') {
    if (hardwareType === 'visible') {
      const baseSet = hardwareMatrixVisibleTurn.find(row => h >= row.minHeight && h <= row.maxHeight && w >= row.minWidth && w <= row.maxWidth);
      if (!baseSet) {
        showMessage('Размеры не входят в диапазон Видимая Поворотная.', 'error');
        return null;
      }
      baseSet.articles.forEach(item => resultArticles.push({ ...item }));
      getHandleArticles(handleType, handleColor, openingType, hardwareType).forEach(item => resultArticles.push({ ...item }));
      let hingeQty = h >= 1801 ? 4 : (h >= 1201 ? 3 : 2);
      const hinge = hingeArticlesTurnVisible[handleColor] || hingeArticlesTurnVisible['white'];
      resultArticles.push({ ...hinge, qty: hingeQty });
    } else if (hardwareType === 'hidden90') {
      if (wt > 150) {
        showMessage('Максимальный вес для скрытой 90° — 150 кг.', 'error');
        return null;
      }
      let matrix = wt <= 100 ? hardwareMatrixHidden90Turn_0_100 : (wt <= 150 ? hardwareMatrixHidden90Turn_101_150 : null);
      if (!matrix) return null;
      const baseSet = matrix.find(row => h >= row.minHeight && h <= row.maxHeight && w >= row.minWidth && w <= row.maxWidth);
      if (!baseSet) {
        showMessage('Размеры не входят в диапазон Скрытая 90 Поворотная.', 'error');
        return null;
      }
      if (wt > 100) {
        if (clampSide !== 'left' && clampSide !== 'right') {
          showMessage('Выберите сторону прижима.', 'error');
          return null;
        }
        const clampKey = clampSide === 'right' ? 'articlesRight' : 'articlesLeft';
        baseSet[clampKey].forEach(item => resultArticles.push({ ...item }));
      } else {
        baseSet.articles.forEach(item => resultArticles.push({ ...item }));
      }
      getHandleArticles(handleType, handleColor, openingType, hardwareType).forEach(item => resultArticles.push({ ...item }));
    }
  } else if (openingType === 'stulp') {
    if (hardwareType === 'visible') {
      let matrix = profileTypeInput.value === 'alutech' ? hardwareMatrixStulpVisibleAlutech : hardwareMatrixStulpVisibleOther;
      const baseSet = matrix.find(row => h >= row.minHeight && h <= row.maxHeight && w >= row.minWidth && w <= row.maxWidth);
      if (!baseSet) {
        showMessage('Размеры не входят в диапазон Штульповый Видимая.', 'error');
        return null;
      }
      baseSet.variant1.forEach(item => resultArticles.push({ ...item }));
      const hingeColor = hingeColorInput.value || 'white';
      const hinge = hingeColorArticlesStulp[hingeColor];
      let hingeQty = baseSet.hingeQty || (h >= 1801 ? 4 : (h >= 1201 ? 3 : 2));
      resultArticles.push({ ...hinge, qty: hingeQty });
    }
  } else if (openingType === 'lift-slide') {
    const baseSet = hardwareMatrixLiftSlide.find(row => h >= row.minHeight && h <= row.maxHeight && w >= row.minWidth && w <= row.maxWidth);
    if (!baseSet) {
      showMessage('Размеры не входят в диапазон HS.', 'error');
      return null;
    }
    baseSet.articles.forEach(item => resultArticles.push({ ...item }));
    if (wt >= 301) {
      resultArticles.push({ article: 'KN1679', name: 'Комплект доп. кареток для створок >300 кг.', qty: 1 }, { article: 'KN100QV', name: 'Цапфа', qty: 2 });
    }
    const handleSet = liftSlideHandleCatalog[liftSlideHandleTypeSelect.value];
    if (handleSet) (handleSet[handleColor] || handleSet['white']).forEach(item => resultArticles.push({ ...item }));
  }

  return {
    height: h,
    width: w,
    weight: wt,
    openingType,
    hardwareType,
    handleColor,
    items: resultArticles
  };
}

function groupArticles(items, multiplier) {
  const map = new Map();
  items.forEach(item => {
    const key = item.article;
    if (!map.has(key)) map.set(key, { article: item.article, name: item.name, qty: 0 });
    map.get(key).qty += item.qty * multiplier;
  });
  return Array.from(map.values()).sort((a, b) => a.article.localeCompare(b.article));
}

async function exportToExcel(excelData, alternativeData) {
  try {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Фурнитура');
    sheet.columns = [{ key: 'A', width: 20 }, { key: 'B', width: 55 }, { key: 'C', width: 10 }];
    const headerRow = sheet.addRow(['Артикул', 'Наименование', 'Кол-во']);
    headerRow.font = { bold: true };
    
    excelData.forEach(item => sheet.addRow([item.article, item.name, item.qty]));

    if (alternativeData && alternativeData.length > 0) {
      sheet.addRow([]);
      sheet.addRow(['Альтернатива для штульповой створки']).font = { bold: true };
      alternativeData.forEach(item => sheet.addRow([item.article, item.name, item.qty]));
    }

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `KNG_furnitura_${new Date().toISOString().slice(0, 10)}.xlsx`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 0);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

saveBtn.addEventListener('click', () => {
  const hardwareResult = calculateHardware();
  if (!hardwareResult) return;

  if (hardwareResult.hardwareType === 'hidden180' && hardwareResult.weight >= 131) {
    const angleWarningOverlay = document.getElementById('angleWarningOverlay');
    const angleWarningOkBtn = document.getElementById('angleWarningOkBtn');
    if (angleWarningOverlay) {
      angleWarningOverlay.style.display = 'flex';
      angleWarningOkBtn.onclick = () => {
        angleWarningOverlay.style.display = 'none';
        finalizeSave(hardwareResult);
      };
      return;
    }
  }
  finalizeSave(hardwareResult);
});

function finalizeSave(hardwareResult) {
  const qtyWindows = Number(quantityInput.value) || 1;
  accumulatedResults.push({ ...hardwareResult, quantityWindows: qtyWindows });
  accumulatedCountElement.textContent = String(accumulatedResults.length);
  showMessage(`Расчёт №${accumulatedResults.length} записан.`, 'success');
}

totalBtn.addEventListener('click', async () => {
  if (accumulatedResults.length === 0) {
    showMessage('Нет записанных расчётов.', 'error');
    return;
  }
  const summaryMap = new Map();
  accumulatedResults.forEach(res => {
    groupArticles(res.items, res.quantityWindows).forEach(item => {
      const key = item.article;
      if (!summaryMap.has(key)) summaryMap.set(key, { article: item.article, name: item.name, qty: 0 });
      summaryMap.get(key).qty += item.qty;
    });
  });

  const finalGrouped = Array.from(summaryMap.values()).sort((a, b) => a.article.localeCompare(b.article));
  const excelData = finalGrouped.map(item => ({ article: item.article, name: item.name, qty: item.qty }));

  if (tg) {
    tg.sendData(JSON.stringify({ action: 'total', data: excelData }));
    tg.close();
  } else {
    const ok = await exportToExcel(excelData, []);
    if (ok) showMessage('Excel файл скачан.', 'success');
  }
});
