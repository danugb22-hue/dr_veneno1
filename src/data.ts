import { Product } from './types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Bane: Venom Overdose Edition',
    price: 89.99,
    category: 'figura',
    subcategory: 'dc',
    image: 'https://resources.sears.com.mx/medios-plazavip/t1/1723500320R69png?scale=500&qlty=75',
    description: 'Figura de acción de lujo con detalles de veneno fluorescente.',
    stock: 5
  },
  {
    id: '2',
    name: 'The Joker: The Man Who Laughs',
    price: 24.99,
    category: 'comic',
    image: 'https://images.cdn2.buscalibre.com/fit-in/360x360/15/53/155304778513630f7a28c851cd691167.jpg',
    description: 'Novela gráfica clásica que explora el origen del Príncipe Payaso del Crimen.',
    stock: 12
  },
  {
    id: '3',
    name: 'Scarecrow Fear Gas Replica',
    price: 120.00,
    category: 'figura',
    subcategory: 'dc',
    image: 'https://opcionashop.com/wp-content/uploads/2023/07/scarecrow-multiverse-dc-flash.png',
    description: 'Réplica a escala 1:1 del bote de gas del miedo del Espantapájaros.',
    stock: 3
  },
  {
    id: '4',
    name: 'Batman: Venom (TPB)',
    price: 19.99,
    category: 'comic',
    image: 'https://www.gamerpoint.com.mx/cdn/shop/products/POSTER-EXCLUSIVO-PIEZAS-LIMITADAS-PORTADA-DE-BATMAN-ACTION-COMICS-No-1.webp?v=1746913589&width=2048',
    description: 'Batman se vuelve adicto a una droga que aumenta su fuerza.',
    stock: 8
  },
  {
    id: '5',
    name: 'Poison Ivy: Nature\'s Wrath',
    price: 75.00,
    category: 'figura',
    subcategory: 'dc',
    image: 'https://http2.mlstatic.com/D_802290-MLM83337492913_032025-C.jpg',
    description: 'Estatua detallada de Hiedra Venenosa con base de plantas carnívoras.',
    stock: 4
  },
  {
    id: '6',
    name: 'Green Lantern: Blackest Night',
    price: 35.00,
    category: 'comic',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdBOdlXHThpDYpsKYhn3CZkjJ1pfh6D10A1g&s',
    description: 'Uno de los eventos más grandes de DC Comics.',
    stock: 15
  }
];
