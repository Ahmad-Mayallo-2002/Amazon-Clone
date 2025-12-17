import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Roles } from "@/enums/roles";
import Loading from "./Loading";

const App = lazy(() => import("@/App"));
const Home = lazy(() => import("./Home"));
const About = lazy(() => import("./About"));
const Help = lazy(() => import("./Help"));
const ProtectedRoute = lazy(() => import("./ProtectedRoute"));
const Shop = lazy(() => import("./Shop"));
const SingleProduct = lazy(() => import("./SingleProduct"));

// Auth
const Login = lazy(() => import("./auth/Login"));
const SignUp = lazy(() => import("./auth/SignUp"));
const VerifyEmail = lazy(() => import("./auth/VerifyEmail"));
const ResetPassword = lazy(() => import("./auth/ResetPassword"));
const PasswordAssistance = lazy(() => import("./auth/PasswordAssistance"));
const NotFound = lazy(() => import("./NotFound"));
const AuthCenter = lazy(() => import("./auth/AuthCenter"));

// User Dashboard
const UserDashboard = lazy(() => import("./user/UserDashboard"));
const UserCart = lazy(() => import("./user/UserCart"));
const UserWish = lazy(() => import("./user/UserWish"));
const UserProfile = lazy(() => import("./user/UserProfile"));
const UserOrders = lazy(() => import("./user/UserOrders"));

export default function AppRouter() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Root layout */}
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="help" element={<Help />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute currentRole={Roles.USER} />}>
            {/* User Dashboard */}
            <Route path="user-dashboard" element={<UserDashboard />}>
              <Route index element={<UserProfile />} />
              <Route path="wish" element={<UserWish />} />
              <Route path="cart" element={<UserCart />} />
              <Route path="orders" element={<UserOrders />} />
            </Route>
          </Route>
        </Route>

        <Route path="shop" element={<Shop />} />
        <Route path="product/:id" element={<SingleProduct />} />

        {/* Auth center */}
        <Route path="/auth" element={<AuthCenter />}>
          <Route path="login" element={<Login />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="verify-email" element={<VerifyEmail />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="password-assistance" element={<PasswordAssistance />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
