import create from "zustand";
import { persist } from "zustand/middleware";
import coffees from "../constants/coffees.json";
import posts from "../constants/posts.json";

let coffeeStore = (set) => ({
  coffeeList: [],
  loadCoffees: () => {
    set(() => ({ coffeeList: coffees }));
  },
});

let postStore = (set) => ({
  postList: [],
  loadPosts: () => {
    set(() => ({ postList: posts }));
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
