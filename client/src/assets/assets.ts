export const mainApiEndPoint: string = "http://localhost:3000/api/";

interface NavItem {
  label: string;
  href: string;
}

interface footerSection {
  title: string;
  links: string[];
}

export const userListLinks: NavItem[] = [
  { label: "Create a List", href: "/" },
  { label: "Wish List", href: "/wish-list" },
];

export const userAccountLinks: NavItem[] = [
  { label: "Account", href: "/account" },
  { label: "Orders", href: "/orders" },
];

export const footerSections: footerSection[] = [
  {
    title: "Get to Know Us",
    links: ["About Us", "Careers", "Press Releases", "Science"],
  },
  {
    title: "Make Money with Us",
    links: [
      "Sell on Our Platform",
      "Become an Affiliate",
      "Advertise Your Products",
      "Self-Publish with Us",
    ],
  },
  {
    title: "Payment Products",
    links: [
      "Business Card",
      "Shop with Points",
      "Reload Your Balance",
      "Currency Converter",
    ],
  },
  {
    title: "Let Us Help You",
    links: [
      "Your Account",
      "Your Orders",
      "Shipping Rates & Policies",
      "Help Center",
    ],
  },
];