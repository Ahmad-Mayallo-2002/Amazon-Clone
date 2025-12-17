import { Roles } from "@/enums/roles";
import type { ILogin } from "@/interfaces/login";
import { FiHeart, FiShoppingBag, FiShoppingCart, FiUser } from "react-icons/fi";
import type { NavItem } from "./data/navItems";
import type { IconType } from "react-icons";

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

export let payload: ILogin = {
  id: "",
  token: "",
  role: Roles.USER,
};

interface DashboardLinks extends NavItem {
  icon: IconType;
}

export const userDashboardLinks: DashboardLinks[] = [
  { label: "Profile", href: "/user-dashboard", icon: FiUser },
  { label: "Wish", href: "/user-dashboard/wish", icon: FiHeart },
  { label: "Cart", href: "/user-dashboard/cart", icon: FiShoppingCart },
  { label: "Orders", href: "/user-dashboard/orders", icon: FiShoppingBag },
];
