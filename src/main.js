import './style.css'

const products = [
  { name: 'Linen market tote', category: 'Bags', price: '$58', image: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=800&q=85', tag: 'Best seller' },
  { name: 'Canyon stoneware set', category: 'Tabletop', price: '$86', image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=85', tag: 'New in' },
  { name: 'Sol woven pendant', category: 'Lighting', price: '$124', image: 'https://images.unsplash.com/photo-1543198126-a8ad8e47fb22?auto=format&fit=crop&w=800&q=85', tag: 'Editor pick' },
  { name: 'Palo santo candle', category: 'Scent', price: '$34', image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=85', tag: 'Low stock' },
]

document.querySelector('#app').innerHTML = `
  <div class="announcement">Test shipping on orders over $75 <span>↗</span></div>
  <header class="site-header">
    <a class="wordmark" href="#top" aria-label="Rex home">rex<span>co.</span></a>
    <nav class="main-nav" aria-label="Main navigation">
      <a href="#shop">Shop</a><a href="#story">Our story</a><a href="#journal">Journal</a>
    </nav>
    <div class="header-actions">
      <button class="icon-button" type="button" aria-label="Search">⌕</button>
      <button class="icon-button" type="button" aria-label="Account">♙</button>
      <button class="cart-button" type="button" aria-label="Shopping bag">Bag <span id="cart-count">0</span></button>
    </div>
  </header>

  <main id="top">
    <section class="hero-section">
      <div class="hero-copy">
        <p class="eyebrow">Objects for a softer everyday</p>
        <h1>Make room<br><em>for good things.</em></h1>
        <p class="hero-description">Thoughtful goods for slow mornings, long tables, and all the little rituals in between.</p>
        <a class="button button-dark" href="#shop">Explore the collection <span>↗</span></a>
      </div>
      <div class="hero-art">
        <div class="hero-note">Issue no. 04<br><strong>Made to last</strong></div>
        <img src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=90" alt="Warm, sunlit interior with a sculptural chair and natural textures" />
        <div class="hero-stamp">EST.<br><b>2018</b></div>
      </div>
    </section>

    <section class="ticker" aria-label="Rex values">
      <span>Free shipping over $75</span><i>✦</i><span>Small batch, always</span><i>✦</i><span>Designed in California</span><i>✦</i><span>Free shipping over $75</span>
    </section>

    <section class="shop-section" id="shop">
      <div class="section-heading"><div><p class="eyebrow">The edit</p><h2>Good things, <em>gathered.</em></h2></div><a class="text-link" href="#shop">View all <span>↗</span></a></div>
      <div class="filter-row" role="group" aria-label="Filter products"><button class="filter active" data-filter="All">All pieces</button><button class="filter" data-filter="Bags">Bags</button><button class="filter" data-filter="Tabletop">Tabletop</button><button class="filter" data-filter="Lighting">Lighting</button><button class="filter" data-filter="Scent">Scent</button></div>
      <div class="product-grid" id="product-grid"></div>
    </section>

    <section class="story-section" id="story">
      <div class="story-image"><img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85" alt="Calm neutral living room with handcrafted furniture" /></div>
      <div class="story-copy"><p class="eyebrow">Our point of view</p><h2>Less, but <em>better.</em></h2><p>We believe the things around you should earn their place. Rex is a considered collection of useful, beautiful objects made by people who care about the details.</p><a class="button button-outline" href="#story">Meet Rex <span>↗</span></a></div>
    </section>

    <section class="newsletter" id="journal"><div><p class="eyebrow">The Sunday edit</p><h2>A little good<br><em>in your inbox.</em></h2></div><form id="signup-form"><label for="email">Monthly notes, new arrivals, and things worth knowing.</label><div class="email-field"><input id="email" type="email" placeholder="Your email address" required><button type="submit" aria-label="Subscribe">↗</button></div><p class="form-message" id="form-message" role="status"></p></form></section>
  </main>
  <footer><a class="wordmark" href="#top">rex<span>co.</span></a><p>Good objects. Better days.</p><div><a href="#shop">Shop</a><a href="#story">About</a><a href="#journal">Contact</a></div></footer>
`

const grid = document.querySelector('#product-grid')
const renderProducts = (filter = 'All') => {
  grid.innerHTML = products.filter((product) => filter === 'All' || product.category === filter).map((product) => `
    <article class="product-card"><div class="product-image"><img src="${product.image}" alt="${product.name}"><span class="product-tag">${product.tag}</span><button class="favorite" type="button" aria-label="Add ${product.name} to wishlist">♡</button><button class="quick-add" type="button" data-product="${product.name}">Quick add <span>+</span></button></div><div class="product-meta"><div><h3>${product.name}</h3><p>${product.category}</p></div><strong>${product.price}</strong></div></article>`).join('')
}
renderProducts()

document.querySelectorAll('.filter').forEach((button) => button.addEventListener('click', () => {
  document.querySelector('.filter.active').classList.remove('active')
  button.classList.add('active')
  renderProducts(button.dataset.filter)
}))

document.addEventListener('click', (event) => {
  if (event.target.closest('.quick-add')) {
    const count = document.querySelector('#cart-count')
    count.textContent = Number(count.textContent) + 1
    event.target.closest('.quick-add').innerHTML = 'Added <span>✓</span>'
  }
  if (event.target.closest('.favorite')) event.target.closest('.favorite').classList.toggle('saved')
})

document.querySelector('#signup-form').addEventListener('submit', (event) => {
  event.preventDefault()
  document.querySelector('#form-message').textContent = 'You are on the list. See you Sunday.'
  event.target.reset()
})
