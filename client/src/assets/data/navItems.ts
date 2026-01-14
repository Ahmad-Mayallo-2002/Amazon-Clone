export interface NavItem {
  label: string;
  href: string;
}

export const userListLinks: NavItem[] = [
  { label: "Cart List", href: "/user-dashboard/cart" },
  { label: "Wish List", href: "/user-dashboard/wish" },
];

export const userAccountLinks: NavItem[] = [
  { label: "Account", href: "/user-dashboard" },
  { label: "Orders", href: "/user-dashboard/orders" },
];

export const navLinks: NavItem[] = [
  { label: "All", href: "/shop" },
  { label: "Customer Service", href: "/help" },
];
