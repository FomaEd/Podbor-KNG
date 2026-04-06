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
const savedWindowsList = document.getElementById('savedWindowsList');

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

const angleWarningOverlay = document.getElementById('angleWarningOverlay');
const angleWarningOkBtn = document.getElementById('angleWarningOkBtn');

const accumulatedResults = [];

const tg = window.Telegram ? window.Telegram.WebApp : null;
if (tg) {
  tg.ready();
  tg.expand();
  tg.MainButton.hide();
}
