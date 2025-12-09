import type { IconType } from "react-icons";
import { BiHeadphone } from "react-icons/bi";
import { BsShieldCheck } from "react-icons/bs";
import { CgTrack } from "react-icons/cg";
import { FaBox } from "react-icons/fa6";
import { MdPayment } from "react-icons/md";
import { RiRefund2Fill } from "react-icons/ri";

export interface HelpTopic {
  title: string;
  description: string;
  icon: IconType;
}

export const helpTopicsData: HelpTopic[] = [
  {
    title: "Track Your Order",
    description: "Find and track your orders",
    icon: FaBox,
  },
  {
    title: "Returns & Refunds",
    description: "Return or exchange items",
    icon: RiRefund2Fill,
  },
  {
    title: "Payment Issues",
    description: "Manage payment methods",
    icon: MdPayment,
  },
  {
    title: "Account Security",
    description: "Secure your account",
    icon: BsShieldCheck,
  },
  {
    title: "Shipping Info",
    description: "Delivery options and rates",
    icon: CgTrack,
  },
  {
    title: "Contact Us",
    description: "Get help from our team",
    icon: BiHeadphone,
  },
];
