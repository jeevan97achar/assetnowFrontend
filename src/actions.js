export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export function increment(count) {
    console.log("chcek", count);
  return { type: INCREMENT };
}

export const decrement = (count) => ({ type: DECREMENT });