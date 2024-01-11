// Componente Vue para un ítem de producto
Vue.component('product-item', {
  // Propiedades que se pueden pasar al componente desde el padre
  props: ['product', 'currency'],
  // Datos locales específicos del componente
  data() {
    return {
      quantity: 1,
    };
  },
  // Plantilla del componente
  template: `
    <div class="product-item">
      <!-- Imagen del producto -->
      <img :src="product.image" alt="Product Image">
      <!-- Nombre del producto -->
      <h3>{{ product.name }}</h3>
      <!-- Precio del producto con la moneda -->
      <p>{{ product.price }} {{ currency }}</p>
      <!-- Input para seleccionar la cantidad de productos -->
      <input v-model="quantity" type="number" min="1" />
      <!-- Botón para agregar al carrito -->
      <button @click="addToCart">Añadir al carrito</button>
    </div>
  `,
  // Métodos del componente
  methods: {
    // Método para emitir el evento de añadir al carrito
    addToCart() {
      this.$emit('add-to-cart', this.product, this.quantity);
      this.quantity = 1; // Restablecer la cantidad a 1 después de agregar al carrito
    },
  },
});

// Componente Vue para el carrito de compras
Vue.component('shopping-cart', {
  // Propiedades que se pueden pasar al componente desde el padre
  props: ['cart', 'currency'],
  // Cálculo computado para calcular el total del carrito
  computed: {
    total() {
      return this.cart.reduce((acc, item) => acc + item.subtotal, 0);
    },
  },
  // Plantilla del componente
  template: `
    <div class="shopping-cart">
      <!-- Mensaje si el carrito está vacío -->
      <div v-if="cart.length === 0">Carrito vacío</div>
      <!-- Contenido del carrito si no está vacío -->
      <div v-else>
        <!-- Iterar sobre los elementos del carrito -->
        <div v-for="(item, index) in cart" :key="item.product.id" class="cart-item">
          <!-- Imagen del producto en el carrito -->
          <img :src="item.product.image" alt="Product Image">
          <div>
            <!-- Nombre y precio del producto en el carrito -->
            <p>{{ item.product.name }}</p>
            <p>{{ item.product.price }} {{ currency }}</p>
            <!-- Cantidad y subtotal del producto en el carrito -->
            <p>Unidades: {{ item.quantity }}</p>
            <p>Subtotal: {{ item.subtotal }} {{ currency }}</p>
            <!-- Botón para eliminar el producto del carrito -->
            <button @click="removeItem(index)">Eliminar</button>
          </div>
        </div>
        <!-- Total general del carrito -->
        <p>Total: {{ total }} {{ currency }}</p>
      </div>
    </div>
  `,
  // Métodos del componente
  methods: {
    // Método para emitir el evento de eliminar un elemento del carrito
    removeItem(index) {
      this.$emit('remove-item', index);
    },
  },
});

// Instancia principal de Vue
new Vue({
  // Elemento HTML al que Vue está vinculado
  el: '#app',
  // Datos de la aplicación
  data() {
    return {
      // Lista de productos disponibles para la venta
      products: [
        { id: 1, name: "Tarjeta gráfica // Zotac Gaming GeForce RTX 4060 Twin Edge 8GB GDDR6 DLSS3", image: "imagenes/4060.jfif", price: 309 },
        { id: 2, name: "Procesador // Intel-I5-12400F ", image: "imagenes/Intel-I5-12400F.jfif", price: 147 },
        { id: 3, name: "Placa base // ASUS Prime B760M-K D4 ", image: "imagenes/PlacaBaseAsus.jfif", price: 105 },
        { id: 4, name: "Fuente de alimentacion //  MSI MAG A650BN 650W 80 Plus Bronze", image: "imagenes/FuenteAlimentacionMsi.jfif", price: 65 },
        { id: 5, name: "Disipador // Mars Gaming MCPUPRO Ventilador CPU 120mm ", image: "imagenes/DisipadorMars.jfif", price: 26 },
        { id: 6, name: "Memorias ram //Corsair Vengeance LPX DDR4 3200 PC4-25600 16GB 2X8GB CL16 Negro ", image: "imagenes/MemoriaRam2x8.jfif", price: 42 },
        { id: 7, name: "Discos duros //Kioxia Exceria G2 Unidad SSD 1TB NVMe M.2 2280 ", image: "imagenes/M2kioxia1Tb.jfif", price: 49 },
        // Agrega más productos según sea necesario
      ],
      // Lista de productos en el carrito de compras
      cart: [],
      // Estado para mostrar/ocultar el carrito
      showCart: false,
      // Moneda utilizada en la aplicación
      currency: "EUR",
    };
  },
  // Métodos de la aplicación
  methods: {
    // Método para agregar un producto al carrito
    addToCart(product, quantity) {
      const existingItemIndex = this.cart.findIndex((item) => item.product.id === product.id);

      // Verificar si el producto ya está en el carrito
      if (existingItemIndex !== -1) {
        // Actualizar la cantidad y el subtotal si el producto ya está en el carrito
        this.cart[existingItemIndex].quantity = quantity;
        this.cart[existingItemIndex].subtotal = product.price * quantity;
      } else {
        // Agregar un nuevo elemento al carrito si el producto no está en el carrito
        this.cart.push({
          product,
          quantity,
          subtotal: product.price * quantity,
        });
      }
    },
    // Método para alternar la visibilidad del carrito
    toggleCart() {
      this.showCart = !this.showCart;
    },
    // Método para eliminar un elemento del carrito
    removeItem(index) {
      this.cart.splice(index, 1);
    },
  },
});
