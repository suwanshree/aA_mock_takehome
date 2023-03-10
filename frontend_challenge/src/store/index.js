import create from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

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
  createCoffee: async (newCoffee) => {
    const { name, year, caffine } = newCoffee;
    const caffineContent = caffine;
    const caffinePercentage = caffine / 8; // based on 8 oz serving size
    const formattedNewCoffee = {
      name: name,
      year: year,
      caffinePercentage: caffinePercentage,
      caffineContent: caffineContent,
    };
    try {
      const response = await axios.post(
        "http://localhost:5000/coffee/create",
        formattedNewCoffee
      );
      const data = response.data;
      set((state) => ({ coffeeList: [...state.coffeeList, data.data] }));
    } catch (error) {
      console.error(error);
    }
  },
  deleteCoffee: async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/coffee/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { status } = await response.json();
      if (status) {
        set((state) => ({
          coffeeList: state.coffeeList.filter((coffee) => coffee.id !== id),
        }));
      }
    } catch (error) {
      console.error(error);
    }
  },
});

let postStore = (set) => ({
  postList: [],
  coffeePostList: [],
  isCoffeeSelected: false,
  setIsCoffeeSelected: (isCoffeeSelected) =>
    set((state) => ({ ...state, isCoffeeSelected })),
  loadPosts: async (order = "ASC") => {
    try {
      const res = await axios.get(`http://localhost:5000/post?order=${order}`);
      set(() => ({ postList: res.data }));
    } catch (err) {
      console.error(err);
    }
  },
  loadCoffeePosts: async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/post/coffee?id=${id}`);
      set(() => ({ coffeePostList: res.data }));
    } catch (err) {
      console.error(err);
    }
  },
  createPost: async (newPost) => {
    try {
      const response = await axios.post("http://localhost:5000/post", newPost);
      const data = response.data;
      set((state) => ({ postList: [...state.postList, data.data] }));
    } catch (error) {
      console.error(error);
    }
  },
  deletePost: async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/post/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { status } = await response.json();
      if (status) {
        set((state) => ({
          postList: state.postList.filter((post) => post.id !== id),
        }));
      }
    } catch (error) {
      console.error(error);
    }
  },
});

coffeeStore = persist(coffeeStore, { name: "coffee" });
postStore = persist(postStore, { name: "post" });

export const useCoffeeStore = create(coffeeStore);
export const usePostStore = create(postStore);
