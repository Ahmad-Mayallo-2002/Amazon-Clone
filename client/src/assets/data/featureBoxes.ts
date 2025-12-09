import primeBenefits from "@/assets/images/prime-benefits.jpg";
import giftCards from "@/assets/images/gift-card.jpg";
import customerServices from "@/assets/images/customer-service.jpg";

interface FeatureBox {
  title: string;
  description: string;
  buttonText: string;
  image: string;
}

export const featuresData: FeatureBox[] = [
  {
    title: "Prime Benefits",
    description:
      "Get fast, free delivery, exclusive deals, and more with Prime membership.",
    buttonText: "Try Prime Free",
    image: primeBenefits,
  },
  {
    title: "Gift Cards",
    description:
      "Give the gift of choice with our digital and physical gift cards.",
    buttonText: "Shop Gift Cards",
    image: giftCards,
  },
  {
    title: "Customer Service",
    description:
      "Need help? Our customer service team is here to assist you 24/7.",
    buttonText: "Get Help",
    image: customerServices,
  },
];
