# models.py
from django.db import models
from decimal import Decimal

class Product(models.Model):
    name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='products/', blank=True)
    stock = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.name

# cart.py - Cart class using sessions
class Cart:
    def __init__(self, request):
        self.session = request.session
        cart = self.session.get('cart')
        if not cart:
            cart = self.session['cart'] = {}
        self.cart = cart

    def add(self, product, quantity=1):
        product_id = str(product.id)
        if product_id not in self.cart:
            self.cart[product_id] = {
                'id': product.id,
                'name': product.name,
                'price': str(product.price),
                'quantity': 0,
                'image': product.image.url if product.image else None
            }
        self.cart[product_id]['quantity'] += quantity
        self.save()

    def remove(self, product_id):
        product_id = str(product_id)
        if product_id in self.cart:
            del self.cart[product_id]
            self.save()

    def update_quantity(self, product_id, quantity):
        product_id = str(product_id)
        if product_id in self.cart:
            self.cart[product_id]['quantity'] = quantity
            if quantity <= 0:
                self.remove(product_id)
            else:
                self.save()

    def clear(self):
        self.session['cart'] = {}
        self.save()

    def save(self):
        self.session.modified = True

    @property
    def items(self):
        return list(self.cart.values())

    @property
    def total_items(self):
        return sum(item['quantity'] for item in self.cart.values())

    @property
    def subtotal(self):
        return sum(
            Decimal(item['price']) * item['quantity']
            for item in self.cart.values()
        )

    def get_total(self, tax_rate=0, discount=0):
        subtotal = self.subtotal - Decimal(discount)
        tax = subtotal * Decimal(tax_rate) / 100
        return subtotal + tax
