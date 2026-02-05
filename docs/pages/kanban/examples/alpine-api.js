// Configuracion
uxKanban({
  columns: [
    { id: 'todo', title: 'Por hacer', color: '#6b7280', cards: [] }
  ],
  cards: [
    { id: 1, columnId: 'todo', title: 'Tarea' }
  ],
  allowAddCards: true,       // Permitir agregar tarjetas
  allowAddColumns: false,    // Permitir agregar columnas
  emptyText: 'No hay tarjetas'
})

// Estructura de tarjeta
{
  id: 'card-1',
  columnId: 'todo',
  title: 'Titulo de la tarea',
  description: 'Descripcion opcional',
  labels: ['Bug', 'Frontend'],
  assignees: ['user1', 'user2'],
  dueDate: '2024-01-15',
  priority: 'high',       // high, medium, low
  completed: false
}

// Metodos
getColumnCards(columnId)              // Obtener tarjetas de columna
getColumnCount(columnId)              // Contar tarjetas
addCard(columnId, cardData)           // Agregar tarjeta
removeCard(cardId, columnId)          // Eliminar tarjeta
updateCard(cardId, columnId, updates) // Actualizar tarjeta
addColumn(columnData)                 // Agregar columna
removeColumn(columnId)                // Eliminar columna
moveCard(cardId, from, to, index)     // Mover tarjeta
getAllCards()                         // Todas las tarjetas
isColumnDragOver(columnId)            // Check drag over

// Eventos de drag
onDragStart(card, columnId, event)
onDragEnd(event)
onDragOver(columnId, event)
onDragLeave(columnId, event)
onDrop(columnId, index, event)
onCardClick(card, columnId, event)

// Eventos emitidos
@kanban:move          // { card, fromColumn, toColumn, toIndex }
@kanban:add           // { card, columnId }
@kanban:remove        // { card, columnId }
@kanban:update        // { card, columnId, updates }
@kanban:addcolumn     // { column }
@kanban:removecolumn  // { column }
@kanban:click         // { card, columnId, event }
@kanban:dragstart     // { card, columnId }
@kanban:dragend       // {}
