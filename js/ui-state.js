// ============================================
// УПРАВЛЕНИЕ СОСТОЯНИЕМ UI
// ============================================

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

function isClampSideRequired(openingType, hardwareType) {
    return (
        (hardwareType === 'hidden90' || hardwareType === 'hidden180') &&
        (
            openingType === 'turn-tilt' ||
            openingType === 'turn' ||
            openingType === 'stulp'
        )
    );
}

function updateClampSideVisibility() {
    const openingType = openingTypeSelect.value;
    const hardwareType = hardwareTypeInput.value;
    const shouldShow = isClampSideRequired(openingType, hardwareType);

    if (!clampSideGroup || !clampSideToggle) return;

    const anyChip = clampSideToggle.querySelector('[data-value="any"]');

    if (shouldShow) {
        clampSideGroup.style.display = '';

        if (anyChip) {
            if (openingType === 'turn-tilt' || openingType === 'turn') {
                anyChip.style.display = 'none';

                if (clampSideInput.value === 'any') {
                    setClampSide('left');
                }
            } else {
                anyChip.style.display = '';
            }
        }
    } else {
        clampSideGroup.style.display = 'none';

        if (anyChip) {
            anyChip.style.display = '';
        }

        setClampSide('any');
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

        updateClampSideVisibility();
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

        updateClampSideVisibility();

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

updateClampSideVisibility();
