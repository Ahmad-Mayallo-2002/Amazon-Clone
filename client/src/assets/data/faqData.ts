export interface FAQItem {
  question: string;
  answer: string;
}

export const faqData: FAQItem[] = [
  {
    question: "How do I track my order?",
    answer: "You can track your order from your account under 'Your Orders'.",
  },
  {
    question: "What is your return policy?",
    answer: "You can return most items within 30 days of delivery.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Shipping usually takes 3–7 business days depending on your location.",
  },
  {
    question: "How do I cancel my order?",
    answer: "Go to 'Your Orders', select the order, and choose 'Cancel Order'.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept credit cards, debit cards, PayPal, and selected local payment methods.",
  },
  {
    question: "How do I change my shipping address?",
    answer:
      "You can update your shipping address in your account settings or during checkout.",
  },
  {
    question: "What is Prime membership?",
    answer:
      "Prime offers fast shipping, exclusive deals, movies, music, and more.",
  },
  {
    question: "How do I contact customer service?",
    answer: "You can contact support via live chat, phone call, or email.",
  },
];
