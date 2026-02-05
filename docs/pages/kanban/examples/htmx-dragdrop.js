// Capturar el ID de la tarjeta arrastrada
document.addEventListener('dragstart', (e) => {
  if (e.target.classList.contains('ux-kanban__card')) {
    e.dataTransfer.setData('text/plain', e.target.id.replace('card-', ''));
    e.target.classList.add('ux-kanban__card--dragging');
  }
});

document.addEventListener('dragend', (e) => {
  if (e.target.classList.contains('ux-kanban__card')) {
    e.target.classList.remove('ux-kanban__card--dragging');
  }
});

// Manejar el drop con HTMX
document.addEventListener('drop', (e) => {
  const column = e.target.closest('.ux-kanban__column');
  if (!column) return;

  e.preventDefault();
  const cardId = e.dataTransfer.getData('text/plain');

  // Calcular posicion basada en donde se solto
  const cards = column.querySelectorAll('.ux-kanban__card');
  let position = cards.length;

  // Agregar card_id a los valores de HTMX
  const input = document.createElement('input');
  input.type = 'hidden';
  input.name = 'card_id';
  input.value = cardId;
  column.appendChild(input);

  const posInput = document.createElement('input');
  posInput.type = 'hidden';
  posInput.name = 'position';
  posInput.value = position;
  column.appendChild(posInput);

  // Trigger HTMX request
  htmx.trigger(column, 'drop');

  // Limpiar inputs temporales
  setTimeout(() => {
    input.remove();
    posInput.remove();
  }, 100);
});

// Indicador visual de drag over
document.addEventListener('dragover', (e) => {
  const column = e.target.closest('.ux-kanban__column');
  if (column) {
    e.preventDefault();
    column.classList.add('ux-kanban__column--drag-over');
  }
});

document.addEventListener('dragleave', (e) => {
  const column = e.target.closest('.ux-kanban__column');
  if (column && !column.contains(e.relatedTarget)) {
    column.classList.remove('ux-kanban__column--drag-over');
  }
});
