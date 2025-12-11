interface NavItem {
  label: string;
  href: string;
}

export const userListLinks: NavItem[] = [
  { label: "Create a List", href: "/" },
  { label: "Wish List", href: "/wish-list" },
];

export const userAccountLinks: NavItem[] = [
  { label: "Account", href: "/account" },
  { label: "Orders", href: "/orders" },
];

export const navLinks: NavItem[] = [
  { label: "All", href: "/shop" },
  { label: "Customer Service", href: "/help" },
];
