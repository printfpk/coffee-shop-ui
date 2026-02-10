export interface CoffeeType {
  id: number;
  name: string;
  description: string;
  image: string;
  bgColor: string;
}

export const coffeeTypes: CoffeeType[] = [
  {
    id: 0,
    name: "Black Coffee",
    description: "Black coffee is simply coffee that is normally brewed without the addition of additives such as sugar, milk, cream, or added flavors.",
    image: "/images/black-coffee.jpg",
    bgColor: "bg-[#9ca3af]",
  },
  {
    id: 1,
    name: "Espresso",
    description: "Espresso is a coffee-brewing method of Italian origin, in which a small amount of nearly boiling water is forced under 9-10 bars of pressure through finely-ground coffee beans.",
    image: "/images/espresso.jpg",
    bgColor: "bg-[#d4c4b0]",
  },
  {
    id: 2,
    name: "Mocha",
    description: "A coffee mocha is a chocolate-flavored variant of a caffè latte. The name is derived from the city of Mocha, Yemen, which was one of the centers of early coffee trade.",
    image: "/images/mocha.jpg",
    bgColor: "bg-[#a08060]",
  },
  {
    id: 3,
    name: "Latte",
    description: "Latte is a coffee drink made with espresso and steamed milk. The term comes from the Italian caffè e latte, which means 'coffee & milk'.",
    image: "/images/latte.jpg",
    bgColor: "bg-[#e8e0d5]",
  },
  {
    id: 4,
    name: "Macchiato",
    description: "Caffè macchiato, sometimes called espresso macchiato, is an espresso coffee drink with a small amount of milk, usually foamed.",
    image: "/images/macchiato.jpg",
    bgColor: "bg-[#c9b896]",
  },
];
