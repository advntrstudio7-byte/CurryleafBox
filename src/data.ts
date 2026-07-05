import { MenuItem, Review } from './types';
import appamImg from './assets/menu/appam.png';
import puttuImg from './assets/menu/puttu.png';
import keralaMealsImg from './assets/menu/kerala_meals.png';
import biriyaniImg from './assets/menu/biriyani.png';
import iddiyappamImg from './assets/menu/iddiyappam.png';
import thattuDosaImg from './assets/menu/thattu_dosa.png';
import miniIdliImg from './assets/menu/mini_idli.png';
import podiDosaImg from './assets/menu/podi_dosa.png';
import fishFryImg from './assets/menu/fish_fry.png';
import chickenFryImg from './assets/menu/chicken_fry.png';
import payasamImg from './assets/menu/payasam.png';
import sulaimaniImg from './assets/menu/sulaimani.png';
import vegStewImg from './assets/menu/veg_stew.png';
import kadalaCurryImg from './assets/menu/kadala_curry.png';
import eggCurryImg from './assets/menu/egg_curry.png';
import chickenCurryImg from './assets/menu/chicken_curry.png';
import chickenRoastImg from './assets/menu/chicken_roast.png';
import eggRoastImg from './assets/menu/egg_roast.png';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'appam-1',
    name: 'Appam (1 no.)',
    description: 'Thin fermented rice pancake with a soft spongy center and crispy edges.',
    price: 30,
    image: appamImg,
    category: 'breakfast',
    badge: 'Bestseller',
    isVeg: true,
  },
  {
    id: 'puttu-1',
    name: 'Puttu (cheratta size)',
    description: 'Steamed cylinders of ground rice and coconut, a Kerala breakfast staple.',
    price: 40,
    image: puttuImg,
    category: 'breakfast',
    isVeg: true,
  },
  {
    id: 'meals-1',
    name: 'Kerala Veg Meals',
    description: 'Traditional sadya feast with rice and various curries served on a banana leaf.',
    price: 350,
    image: keralaMealsImg,
    category: 'mains',
    isVeg: true,
  },
  {
    id: 'biriyani-1',
    name: 'Malabari Chicken Biriyani',
    description: 'Fragrant long-grain rice with succulent chicken and aromatic spices.',
    price: 180,
    image: biriyaniImg,
    category: 'mains',
    badge: "Chef's Special",
    isVeg: false,
  },
  {
    id: 'idiyappam-1',
    name: 'Iddiyappam (1 pc)',
    description: 'String hoppers made from steamed rice flour noodles, perfect with vegetable stew or curry.',
    price: 45,
    image: iddiyappamImg,
    category: 'breakfast',
    isVeg: true,
  },
  {
    id: 'thattu-dosa-1',
    name: 'Thattu Dosa (3 pc)',
    description: 'Soft, thick, and spongy local street-style dosas served with red chutney and sambar.',
    price: 110,
    image: thattuDosaImg,
    category: 'breakfast',
    isVeg: true,
  },
  {
    id: 'mini-idli-1',
    name: 'Ghee Podi Masala Mini idli (15 pcs)',
    description: 'Bite-sized mini idlis tossed in pure home-churned ghee and spicy gunpowder.',
    price: 150,
    image: miniIdliImg,
    category: 'breakfast',
    isVeg: true,
  },
  {
    id: 'podi-dosa-1',
    name: 'Ghee Podi Masala Dosa',
    description: 'Crispy rice crepe spiced with aromatic gunpowder, smeared with pure cow ghee.',
    price: 145,
    image: podiDosaImg,
    category: 'breakfast',
    isVeg: true,
  },
  {
    id: 'fish-fry-1',
    name: 'Fish fry (1 no.)',
    description: 'Spicy pan-fried fish marinated in traditional Kerala spices, curry leaves, and kokum.',
    price: 70,
    image: fishFryImg,
    category: 'sides',
    isVeg: false,
  },
  {
    id: 'chicken-fry-1',
    name: 'Chicken fry (3 pcs)',
    description: 'Deep-fried succulent chicken pieces marinated in local spices, garlic, and curry leaves.',
    price: 90,
    image: chickenFryImg,
    category: 'sides',
    isVeg: false,
  },
  {
    id: 'veg-stew',
    name: 'Vegetable Stew',
    description: '(Coconut Milk Based)',
    price: 140,
    image: vegStewImg,
    category: 'sides',
    isVeg: true,
  },
  {
    id: 'kadala-curry',
    name: 'Kadala Curry',
    description: '(Black chana with roasted coconut)',
    price: 180,
    image: kadalaCurryImg,
    category: 'sides',
    isVeg: true,
  },
  {
    id: 'egg-curry',
    name: 'Egg Curry (2 Eggs)',
    description: 'Classic egg curry with mild spices.',
    price: 150,
    image: eggCurryImg,
    category: 'sides',
    isVeg: false,
  },
  {
    id: 'chicken-curry',
    name: 'Chicken Curry',
    description: 'Traditional Kerala style chicken curry.',
    price: 210,
    image: chickenCurryImg,
    category: 'sides',
    isVeg: false,
  },
  {
    id: 'chicken-roast',
    name: 'Chicken Roast',
    description: 'Spicy and dry roasted chicken.',
    price: 220,
    image: chickenRoastImg,
    category: 'sides',
    isVeg: false,
  },
  {
    id: 'egg-roast',
    name: 'Egg Roast (2 Eggs)',
    description: 'Eggs roasted with onions and spices.',
    price: 160,
    image: eggRoastImg,
    category: 'sides',
    isVeg: false,
  },
  {
    id: 'payasam-1',
    name: 'Elaneer Payasam',
    description: 'A creamy, delicious chilled dessert made with tender coconut pulp, condensed milk, and cardamoms.',
    price: 120,
    image: payasamImg,
    category: 'drinks',
    badge: 'Seasonal',
    isVeg: true,
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Rohan Nair',
    rating: 5,
    comment: 'The Appams here are exactly like back home in Trivandrum! Golden crispy edges with a soft, perfectly sweet fluffy center. Absolute masterclass in South Indian cooking.',
    date: 'June 28, 2026',
    dishName: 'Appam (1 no.)',
    isVerified: true,
  },
  {
    id: 'rev-2',
    name: 'Aishwarya K.',
    rating: 5,
    comment: 'Kerala Veg Meals served on a banana leaf was a literal spiritual experience. The Avial, Thoran, and Sambar had such deep, clean coconut notes. Strongly recommended!',
    date: 'July 01, 2026',
    dishName: 'Kerala Veg Meals',
    isVerified: true,
  },
  {
    id: 'rev-3',
    name: 'Meera Krishnan',
    rating: 4,
    comment: 'The Ghee Podi Masala Dosa has the perfect crunch! The gun powder is incredibly flavorful and spicy. The delivery packaging was eco-friendly and kept it warm too.',
    date: 'July 03, 2026',
    dishName: 'Ghee Podi Masala Dosa',
    isVerified: true,
  }
];
