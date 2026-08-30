export type MenuCategory = 'pizza' | 'calzone' | 'pide' | 'sendvic'

export type SizePrice = {
  label: string
  price: number
}

export type MenuItem = {
  id: string
  name: string
  description: string
  ingredients: string[]
  category: MenuCategory
  /** Lokalne cene iz cenovnika (Excel) */
  sizes: SizePrice[]
  image: string
}

export const categoryLabels: Record<MenuCategory, string> = {
  pizza: 'Pizze',
  calzone: 'Calzone',
  pide: 'Pide (Barka)',
  sendvic: 'Sendviči',
}

export const menuCategories: {
  id: MenuCategory
  description: string
}[] = [
  { id: 'pizza', description: 'Lokalne cene · 24, 32 i 50 cm' },
  { id: 'calzone', description: 'Punjena testa' },
  { id: 'pide', description: 'Barka — domaće testo' },
  { id: 'sendvic', description: 'Sendviči na ciabatti i focacci' },
]

export function itemsByCategory(category: MenuCategory) {
  return menuItems.filter((item) => item.category === category)
}

export const menuItems: MenuItem[] = [
  // —— PIZZE (lokal: 24 / 32 / 50 cm) ——
  {
    id: 'margharita',
    name: 'Margharita',
    description: 'Klasična pizza sa pelatom, sirom i bosiljkom.',
    ingredients: ['pelat', 'mozzarella', 'bosiljak', 'maslinovo ulje'],
    category: 'pizza',
    sizes: [
      { label: '24 cm', price: 470 },
      { label: '32 cm', price: 850 },
      { label: '50 cm', price: 1420 },
    ],
    image:
      'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'capricciosa',
    name: 'Capricciosa',
    description: 'Bogat italijanski klasik.',
    ingredients: ['pelat', 'mozzarella', 'šunka', 'pečurke', 'artičoke', 'masline'],
    category: 'pizza',
    sizes: [
      { label: '24 cm', price: 520 },
      { label: '32 cm', price: 900 },
      { label: '50 cm', price: 1540 },
    ],
    image:
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'pepperoni',
    name: 'Pepperoni',
    description: 'Za ljubitelje ljute salame.',
    ingredients: ['pelat', 'mozzarella', 'pepperoni', 'origano'],
    category: 'pizza',
    sizes: [
      { label: '24 cm', price: 550 },
      { label: '32 cm', price: 970 },
      { label: '50 cm', price: 1650 },
    ],
    image:
      'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'madjarica',
    name: 'Mađarica',
    description: 'Sočna pizza sa mađarskim pečenjem i začinima.',
    ingredients: ['pelat', 'mozzarella', 'mađarsko pečenje', 'luk', 'feferoni', 'origano'],
    category: 'pizza',
    sizes: [
      { label: '24 cm', price: 590 },
      { label: '32 cm', price: 990 },
      { label: '50 cm', price: 1760 },
    ],
    image:
      'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'vegetariana',
    name: 'Vegetariana',
    description: 'Sveže povrće na hrskavoj kori.',
    ingredients: ['pelat', 'mozzarella', 'paprika', 'pečurke', 'kukuruz', 'masline', 'luk'],
    category: 'pizza',
    sizes: [
      { label: '24 cm', price: 520 },
      { label: '32 cm', price: 910 },
      { label: '50 cm', price: 1540 },
    ],
    image:
      'https://images.unsplash.com/photo-1511689660979-10d2b1aada49?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'tuna',
    name: 'Tuna',
    description: 'Pizza sa tunjevinom i lukom.',
    ingredients: ['pelat', 'mozzarella', 'tunjevina', 'luk', 'kukuruz', 'masline'],
    category: 'pizza',
    sizes: [
      { label: '24 cm', price: 510 },
      { label: '32 cm', price: 890 },
      { label: '50 cm', price: 1520 },
    ],
    image:
      'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: '4-sira',
    name: '4 sira',
    description: 'Kremasta kombinacija četiri sira.',
    ingredients: ['beli sos', 'mozzarella', 'gauda', 'parmezan', 'gorgonzola'],
    category: 'pizza',
    sizes: [
      { label: '24 cm', price: 620 },
      { label: '32 cm', price: 1100 },
      { label: '50 cm', price: 1750 },
    ],
    image:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'pesto',
    name: 'Pesto',
    description: 'Aromatični pesto i sveži sastojci.',
    ingredients: ['pesto sos', 'mozzarella', 'čeri paradajz', 'parmezan', 'bosiljak'],
    category: 'pizza',
    sizes: [
      { label: '24 cm', price: 660 },
      { label: '32 cm', price: 1170 },
      { label: '50 cm', price: 1820 },
    ],
    image:
      'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'prsuta-pizza',
    name: 'Pršuta',
    description: 'Fine pršute na toploj pici.',
    ingredients: ['pelat', 'mozzarella', 'pršuta', 'rukola', 'parmezan'],
    category: 'pizza',
    sizes: [
      { label: '24 cm', price: 630 },
      { label: '32 cm', price: 1120 },
      { label: '50 cm', price: 1780 },
    ],
    image:
      'https://images.unsplash.com/photo-1595708684082-a0bfbcdcaa80?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'pancetta',
    name: 'Pancetta',
    description: 'Hrskava pancetta i bogat ukus.',
    ingredients: ['pelat', 'mozzarella', 'pancetta', 'luk', 'origano'],
    category: 'pizza',
    sizes: [
      { label: '24 cm', price: 590 },
      { label: '32 cm', price: 990 },
      { label: '50 cm', price: 1760 },
    ],
    image:
      'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'gurmanska',
    name: 'Gurmanska',
    description: 'Pun preliv za prave gurmane.',
    ingredients: ['pelat', 'mozzarella', 'šunka', 'slanina', 'pečurke', 'kukuruz', 'jaje'],
    category: 'pizza',
    sizes: [
      { label: '24 cm', price: 690 },
      { label: '32 cm', price: 1200 },
      { label: '50 cm', price: 1890 },
    ],
    image:
      'https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=900&q=80',
  },

  // —— CALZONE ——
  {
    id: 'coza',
    name: 'Ćoza',
    description: 'Punjeni calzone — klasika kuće.',
    ingredients: ['testo', 'mozzarella', 'šunka', 'pečurke', 'pelat'],
    category: 'calzone',
    sizes: [{ label: 'Lokal', price: 520 }],
    image:
      'https://images.unsplash.com/photo-1506354666786-959d6d497f1a?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'komsijska',
    name: 'Komšijska',
    description: 'Bogato punjen calzone po našem receptu.',
    ingredients: ['testo', 'mozzarella', 'kulen', 'pečurke', 'pavlaka', 'kukuruz'],
    category: 'calzone',
    sizes: [{ label: 'Lokal', price: 620 }],
    image:
      'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'nutela',
    name: 'Nutela',
    description: 'Slatki calzone sa Nutellom.',
    ingredients: ['testo', 'Nutella'],
    category: 'calzone',
    sizes: [{ label: 'Lokal', price: 520 }],
    image:
      'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'nutela-voce',
    name: 'Nutela sa voćem',
    description: 'Nutella i sveže voće u toplom testu.',
    ingredients: ['testo', 'Nutella', 'banana', 'jagode'],
    category: 'calzone',
    sizes: [{ label: 'Lokal', price: 620 }],
    image:
      'https://images.unsplash.com/photo-1481391319762-47dff72954d9?auto=format&fit=crop&w=900&q=80',
  },

  // —— PIDE (BARKA) ——
  {
    id: 'pide-pollo',
    name: 'Pollo',
    description: 'Pide sa piletinom.',
    ingredients: ['domaće testo', 'piletina', 'mozzarella', 'paprika', 'začini'],
    category: 'pide',
    sizes: [{ label: 'Lokal', price: 600 }],
    image:
      'https://images.unsplash.com/photo-1528137871618-79d2761e3fd5?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'pide-4-sira',
    name: '4 Sira',
    description: 'Pide sa mešavinom sireva.',
    ingredients: ['domaće testo', 'mozzarella', 'kašaval', 'gauda', 'parmezan'],
    category: 'pide',
    sizes: [{ label: 'Lokal', price: 630 }],
    image:
      'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'pide-fresh-mix',
    name: 'Fresh Mix',
    description: 'Lagana pide sa svežim prelivom.',
    ingredients: ['domaće testo', 'mozzarella', 'paradajz', 'krastavac', 'rukola', 'masline'],
    category: 'pide',
    sizes: [{ label: 'Lokal', price: 570 }],
    image:
      'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'pide-bolognese',
    name: 'Bolognese',
    description: 'Pide sa bolonjeze sosom.',
    ingredients: ['domaće testo', 'bolonjeze sos', 'mozzarella', 'parmezan'],
    category: 'pide',
    sizes: [{ label: 'Lokal', price: 650 }],
    image:
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'pide-bianco',
    name: 'Bianco',
    description: 'Bela pide bez pelata.',
    ingredients: ['domaće testo', 'pavlaka', 'mozzarella', 'pečurke', 'beli luk'],
    category: 'pide',
    sizes: [{ label: 'Lokal', price: 660 }],
    image:
      'https://images.unsplash.com/photo-1541745537411-b8046a56c70f?auto=format&fit=crop&w=900&q=80',
  },

  // —— SENDVIČI ——
  {
    id: 'sendvic-italijanski',
    name: 'Italijanski',
    description: 'Klasičan italijanski sendvič.',
    ingredients: ['ciabatta', 'šunka', 'sir', 'paradajz', 'zelena salata', 'majonez'],
    category: 'sendvic',
    sizes: [{ label: 'Lokal', price: 430 }],
    image:
      'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'sendvic-prsuta',
    name: 'Pršuta',
    description: 'Sendvič sa pršutom.',
    ingredients: ['ciabatta', 'pršuta', 'mozzarella', 'rukola', 'pesto'],
    category: 'sendvic',
    sizes: [{ label: 'Lokal', price: 540 }],
    image:
      'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'sendvic-chicken',
    name: 'Chicken',
    description: 'Sendvič sa piletinom.',
    ingredients: ['ciabatta', 'pileći file', 'sir', 'zelena salata', 'aioli'],
    category: 'sendvic',
    sizes: [{ label: 'Lokal', price: 590 }],
    image:
      'https://images.unsplash.com/photo-1550507992-eb63ffee0847?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'sendvic-cezar',
    name: 'Cezar',
    description: 'Cezar sendvič sa piletinom i dresingom.',
    ingredients: ['ciabatta', 'piletina', 'parmezan', 'zelena salata', 'cezar dresing'],
    category: 'sendvic',
    sizes: [{ label: 'Lokal', price: 620 }],
    image:
      'https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'sendvic-tzatziki',
    name: 'Tzatziki',
    description: 'Osvežavajući sendvič sa tzatziki sosom.',
    ingredients: ['ciabatta', 'pileći file', 'tzatziki', 'krastavac', 'zelena salata'],
    category: 'sendvic',
    sizes: [{ label: 'Lokal', price: 510 }],
    image:
      'https://images.unsplash.com/photo-1540914124281-8494778e998f?auto=format&fit=crop&w=900&q=80',
  },
]

export const carouselSlides = [
  {
    id: 1,
    title: 'Pizze 24 · 32 · 50 cm',
    subtitle: 'Iz peći — lokalne cene',
    image:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1400&q=80',
  },
  {
    id: 2,
    title: 'Pide & Calzone',
    subtitle: 'Barka, Ćoza, Komšijska…',
    image:
      'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&w=1400&q=80',
  },
  {
    id: 3,
    title: 'Sendviči',
    subtitle: 'Italijanski, Pršuta, Cezar…',
    image:
      'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=1400&q=80',
  },
]

export function formatPrice(n: number) {
  return `${Math.round(n).toLocaleString('sr-RS')} RSD`
}

export function basePrice(item: MenuItem) {
  return item.sizes[0]?.price ?? 0
}
