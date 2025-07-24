import { FontStyles } from "./Styles/font";
import { GlobalStyles } from "./Styles/GlobalStyles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import AppLayout from "./AppLayout";
import Home from "./Pages/Home";
import Terms from "./Pages/Terms";
import Privacy from "./Pages/Privacy";
import Welcome from "./Pages/Welcome";
import SignUp from "./Pages/SignUp";
import LogIn from "./Pages/LogIn";
import ProtectedRoute from "./Components/ProtectedRoute";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import Contact from "./Pages/Contact";
import ScrollToTop from "./Components/ScrollToTop";
import { lazy, Suspense } from "react";
import FullPageLoader from "./Components/FullPageLoader";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 60 * 24,
    },
  },
});

const localStoragePersister = createSyncStoragePersister({
  storage: window.localStorage,
});

persistQueryClient({
  queryClient,
  persister: localStoragePersister,
  maxAge: 1000 * 60 * 60 * 24,
});

const Dashboard = lazy(() => import("./Pages/Dashboard"));
const Appointment = lazy(() => import("./Pages/Appointments"));
const HealthLogs = lazy(() => import("./Pages/HealthLogs"));
const Notes = lazy(() => import("./Pages/Notes"));
const MyPets = lazy(() => import("./Pages/MyPets"));
const Profile = lazy(() => import("./Pages/Profile"));
const LogDetailPage = lazy(() => import("./Pages/LogDetailPage"));
const NoteDetailPage = lazy(() => import("./Pages/NoteDetailPage"));
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FontStyles />
      <GlobalStyles />
      <ReactQueryDevtools initialIsOpen={false} />
      <ScrollToTop />
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/dashboard"
            element={
              <Suspense fallback={<FullPageLoader />}>
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            path="/appointments"
            element={
              <Suspense fallback={<FullPageLoader />}>
                <ProtectedRoute>
                  <Appointment />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            path="/healthlogs"
            element={
              <Suspense fallback={<FullPageLoader />}>
                <ProtectedRoute>
                  <HealthLogs />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            path="/notes"
            element={
              <Suspense fallback={<FullPageLoader />}>
                <ProtectedRoute>
                  <Notes />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            path="/mypets"
            element={
              <Suspense fallback={<FullPageLoader />}>
                <ProtectedRoute>
                  <MyPets />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            path="/profile"
            element={
              <Suspense fallback={<FullPageLoader />}>
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            path="/healthlogs/:logId"
            element={
              <Suspense fallback={<FullPageLoader />}>
                <ProtectedRoute>
                  <LogDetailPage />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            path="/notes/:noteId"
            element={
              <Suspense fallback={<FullPageLoader />}>
                <ProtectedRoute>
                  <NoteDetailPage />
                </ProtectedRoute>
              </Suspense>
            }
          />
        </Route>
      </Routes>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          error: {
            duration: 5000,
          },
          success: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#fffaf4",
            color: "#ed4a2f",
            textAlign: "center",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
