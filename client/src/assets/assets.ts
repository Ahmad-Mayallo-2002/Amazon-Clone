export const mainApiEndPoint: string = "http://localhost:3000/api/";

export const sortBy = [
  { label: "All", value: "", key: "" },
  { label: "Price Low to High", value: "ASC-price-low", key: "price" },
  { label: "Price High to Low", value: "DESC-price-heigh", key: "price" },
  { label: "Lowest Rating", value: "ASC-rating-low", key: "rating" },
  { label: "Highest Rating", value: "DESC-rating-height", key: "rating" },
  { label: "Newest", value: "ASC-created-new", key: "created_at" },
  { label: "Oldest", value: "DESC-created-old", key: "created_at" },
];
