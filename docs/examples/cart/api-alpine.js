// Configuracion uxCart
uxCart({
  // Items iniciales
  items: [
    {
      id: 1,
      name: 'Producto',
      price: 9.99,
      quantity: 1,
      image: 'https://...',     // Opcional
      maxQuantity: 10,          // Limite de cantidad
      options: { size: 'L' }    // Opciones/variantes
    }
  ],

  // Moneda y formato
  currency: '$',           // Simbolo
  locale: 'en-US',         // Locale para formato

  // Calculos
  taxRate: 0,              // % de impuesto
  discountAmount: 0,       // Descuento fijo
  discountPercent: 0,      // Descuento %
  shippingCost: 0,         // Costo de envio

  // Labels personalizables
  labels: { title: 'Cart', empty: 'Your cart is empty', ... }
})

// Propiedades reactivas:
items           // Array de items
itemCount       // Total de items (suma cantidades)
subtotal        // Subtotal antes de impuestos
discount        // Monto de descuento
tax             // Monto de impuestos
total           // Total final
isEmpty         // True si carrito vacio

// Metodos:
addItem(product, qty)       // Agregar item
removeItem(index)           // Eliminar item
updateQuantity(index, qty)  // Actualizar cantidad
incrementQuantity(index)    // +1 cantidad
decrementQuantity(index)    // -1 cantidad
clearCart()                 // Vaciar carrito
checkout()                  // Procesar pago
formatPrice(n)              // Formatear precio

// Eventos:
@cart-update          // { items, total }
@cart-item-removed    // { item, items }
@cart-cleared         // (sin datos)
@cart-checkout        // { items, subtotal, discount, tax, shipping, total }
