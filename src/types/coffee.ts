export interface CoffeeType {
  id: number;
  name: string;
  description: string;
  image: string;
  bgColor: string;
  gradient: string;
  accentColor: string;
}

export const coffeeTypes: CoffeeType[] = [
  {
    id: 0,
    name: "Black Coffee",
    description: "Black coffee is simply coffee that is normally brewed without the addition of additives such as sugar, milk, cream, or added flavors.",
    image: "/images/black-coffee.png",
    bgColor: "bg-[#9ca3af]",
    gradient: "from-[#1a1a1a] to-[#2d2d2d]",
    accentColor: "#3d3d3d"
  },
  {
    id: 1,
    name: "Espresso",
    description: "Espresso is a coffee-brewing method of Italian origin, in which a small amount of nearly boiling water is forced under 9-10 bars of pressure through finely-ground coffee beans.",
    image: "/images/espresso.png",
    bgColor: "bg-[#d4c4b0]",
    gradient: "from-[#3c2f2f] to-[#be9b7b]",
    accentColor: "#be9b7b"
  },
  {
    id: 2,
    name: "Mocha",
    description: "A coffee mocha is a chocolate-flavored variant of a caffè latte. The name is derived from the city of Mocha, Yemen, which was one of the centers of early coffee trade.",
    image: "/images/mocha.png",
    bgColor: "bg-[#a08060]",
    gradient: "from-[#3e2723] to-[#5d4037]",
    accentColor: "#795548"
  },
  {
    id: 3,
    name: "Latte",
    description: "Latte is a coffee drink made with espresso and steamed milk. The term comes from the Italian caffè e latte, which means 'coffee & milk'.",
    image: "/images/latte.png",
    bgColor: "bg-[#e8e0d5]",
    gradient: "from-[#d7ccc8] to-[#f5f5f5]",
    accentColor: "#efebe9"
  },
  {
    id: 4,
    name: "Macchiato",
    description: "Caffè macchiato, sometimes called espresso macchiato, is an espresso coffee drink with a small amount of milk, usually foamed.",
    image: "/images/macchiato.png",
    bgColor: "bg-[#c9b896]",
    gradient: "from-[#8d6e63] to-[#d7ccc8]",
    accentColor: "#bcaaa4"
  },
];
