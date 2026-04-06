// ============================================
// УПРАВЛЕНИЕ СОСТОЯНИЕМ UI
// ============================================
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
        [...clampSideToggle.querySelectorAll('.toggle-chip')]
            .forEach(chip => chip.classList.remove('active'));

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
                    [...hardwareTypeToggle.querySelectorAll('.toggle-chip')]
                        .forEach(c => c.classList.remove('active'));
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
                [...profileTypeToggle.querySelectorAll('.toggle-chip')]
                    .forEach(c => c.classList.remove('active'));
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
            [...hingeColorToggle.querySelectorAll('.toggle-chip')]
                .forEach(c => c.classList.remove('active'));
            const firstHingeChip = hingeColorToggle.querySelector('[data-value="white"]');
            if (firstHingeChip) firstHingeChip.classList.add('active');
        }

        if (liftSlideHandleGroup) liftSlideHandleGroup.style.display = 'none';
        if (handleTypeGroup) handleTypeGroup.style.display = '';
        if (handleGroupTitle) handleGroupTitle.textContent = 'Форма и цвет ручки';
        if (handleColorLabel) handleColorLabel.style.display = '';
    }
});

// --- Тоггл типа фурнитуры ---
if (hardwareTypeToggle && hardwareTypeInput && clampSideGroup) {
    hardwareTypeToggle.addEventListener('click', (e) => {
        
        const chip = e.target.closest('.toggle-chip');
        
        if (!chip) return;

        [...hardwareTypeToggle.querySelectorAll('.toggle-chip')]
            .forEach(c => c.classList.remove('active'));
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

        // Показываем Цвет петель только при Штульповый + Видимая
        if (openingTypeSelect.value === 'stulp') {
          if (val === 'visible') {
            if (hingeColorGroup) hingeColorGroup.style.display = '';
          } else {
            if (hingeColorGroup) hingeColorGroup.style.display = 'none';
            hingeColorInput.value = 'white';
            [...hingeColorToggle.querySelectorAll('.toggle-chip')]
              .forEach(c => c.classList.remove('active'));
            const firstHingeChip = hingeColorToggle.querySelector('[data-value="white"]');
            if (firstHingeChip) firstHingeChip.classList.add('active');
          }
        }
    });
}

    // --- Тоггл типа профиля ---
if (profileTypeToggle && profileTypeInput) {
  profileTypeToggle.addEventListener('click', (e) => {
    const chip = e.target.closest('.toggle-chip');
    if (!chip) return;
    [...profileTypeToggle.querySelectorAll('.toggle-chip')]
      .forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    profileTypeInput.value = chip.dataset.value;
  });
}

    // --- Тоггл цвета петель ---
if (hingeColorToggle && hingeColorInput) {
  hingeColorToggle.addEventListener('click', (e) => {
    const chip = e.target.closest('.toggle-chip');
    if (!chip) return;
    [...hingeColorToggle.querySelectorAll('.toggle-chip')]
      .forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    hingeColorInput.value = chip.dataset.value;
  });
}

// --- Тоггл прижима ---
if (clampSideToggle && clampSideInput) {
    clampSideToggle.addEventListener('click', (e) => {
        const chip = e.target.closest('.toggle-chip');
        if (!chip) return;

        [...clampSideToggle.querySelectorAll('.toggle-chip')]
            .forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        clampSideInput.value = chip.dataset.value;
    });
}
