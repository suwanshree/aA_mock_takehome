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
    const caffinePercentage = caffine / 12;
    const formattedNewCoffee = {
      name: name,
      year: year,
      caffinePercentage: caffinePercentage,
      caffineContent: caffineContent,
    };
    console.log("NEW", newCoffee);
    console.log("NEW", formattedNewCoffee);
    try {
      const response = await axios.post(
        "http://localhost:5000/coffee/create",
        formattedNewCoffee
      );
      const data = response.data;
      console.log(data);
      set((state) => ({ coffeeList: [...state.coffeeList, data.data] }));
    } catch (error) {
      console.error(error);
    }
  },
  deleteCoffee: async (postId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/coffee/delete/${postId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { id } = await response.json();
      set((state) => ({
        postList: state.postList.filter((post) => post.id !== id),
      }));
    } catch (error) {
      console.error(error);
    }
  },
});

let postStore = (set) => ({
  postList: [],
  coffeePostList: [],
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
      const res = await axios.get(`http://localhost:5000/post?id=${id}`);
      set(() => ({ coffeePostList: res.data }));
    } catch (err) {
      console.error(err);
    }
  },
  createPost: async (newPost) => {
    try {
      const response = await fetch("http://localhost:5000/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });
      const data = await response.json();
      set((state) => ({ postList: [...state.postList, data.data] }));
    } catch (error) {
      console.error(error);
    }
  },
  deletePost: async (postId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/post/delete/${postId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { id } = await response.json();
      set((state) => ({
        postList: state.postList.filter((post) => post.id !== id),
      }));
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
