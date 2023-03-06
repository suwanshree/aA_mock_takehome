import create from "zustand";
import { persist } from "zustand/middleware";

let coffeeStore = (set) => ({
  coffeeList: [],
  loadCoffees: async () => {
    try {
      const response = await fetch("http://localhost:5000/coffee");
      const coffees = await response.json();
      set(() => ({ coffeeList: coffees }));
    } catch (error) {
      console.error(error);
    }
  },
});

let postStore = (set) => ({
  postList: [],
  loadPosts: async () => {
    try {
      const response = await fetch("http://localhost:5000/post");
      const posts = await response.json();
      set(() => ({ postList: posts }));
    } catch (error) {
      console.error(error);
    }
  },
});

coffeeStore = persist(coffeeStore, { name: "coffee" });
postStore = persist(postStore, { name: "post" });

export const useCoffeeStore = create(coffeeStore);
export const usePostStore = create(postStore);

//   EXAMPLES --->
//   POST jsons:
//   {
//     name: "Coffee",
//     year: "1982",
//     caffineContent: "10.45",
//     caffinePercentage: "50.76"
//   }
//   {
//     title: "Amazing Coffee",
//     coffee: "1", // refer to coffee
//     text: "This was an amazing coffee!",
//     rating: "5.00"
//   }
