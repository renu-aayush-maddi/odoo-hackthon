
// import { Routes  ,Route, Navigate} from "react-router-dom"

// import HomePage from "./pages/HomePage"
// import Contact from "./pages/Contact"
// import LoginPage from "./pages/LoginPage"
// import SignUpPage from "./pages/SignupPage"
// import AdminPage from "./pages/AdminPage"
// import CategoryPage from "./pages/CategoryPage"
// import CartPage from "./pages/CartPage"
// import Navbar from "./components/Navbar"
// import { Toaster } from "react-hot-toast"
// import { useUserStore } from "./stores/useUserStore"
// import {useCartStore} from "./stores/useCartStore"
// import { useEffect } from "react"
// import LoadingSpinner from "./components/LoadingSpinner"
// import PurchaseSuccessPage from "./pages/PurchaseSuccessPage"
// import PurchaseCancelPage from "./pages/PurchaseCancelPage"
// import Footer from "./components/Footer"
// import Chatbot from "./components/Chatbot";

// import ProductDetails from "./pages/ProductDetails";



// function App() {

//   const {user , checkAuth , checkingAuth} = useUserStore();

//   const {getCartItems} = useCartStore()

//   useEffect(()=>{
//     checkAuth()
//   },[checkAuth])

//   useEffect(()=>{
//     if(!user) return
//        getCartItems()
//   },[getCartItems , user])

//   if(checkingAuth) return <LoadingSpinner/>

//   return (
//     <div className='min-h-screen bg-gray-900 text-white relative overflow-hidden'>
//     {/* Background gradient */}
   



//     <div className='absolute inset-0 overflow-hidden'>
//       <div className='absolute inset-0'>
//         <div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(255,223,186,0.4)_0%,rgba(184,134,11,0.3)_45%,rgba(34,34,34,0.8)_100%)]' />
//       </div>
//     </div>

//       <div className='relative z-50 pt-20'>

     
//     <Navbar/>
//     <Routes>
//       <Route path="/" element={ <HomePage/>}/>
//       <Route path="/signup" element={!user ? <SignUpPage/> :<Navigate to='/'/>}/>
//       <Route path="/login" element={!user ?  <LoginPage/>:<Navigate to='/'/> }/>
//       <Route path="/secret-dashboard" element={user?.role ==="admin" ?  <AdminPage/> :<Navigate to='/'/> } />
//       <Route path="/category/:category" element={<CategoryPage/> } />
//       <Route path="/cart" element={user ? <CartPage/> : <Navigate to='/login'/> } />
//       <Route path="/purchase-success" element={user ? <PurchaseSuccessPage/> : <Navigate to="/login"/>}/>
//       <Route path="/purchase-cancel" element={user ? <PurchaseCancelPage/> : <Navigate to="/login"/>}/>
//       <Route path="/contact" element={<Contact/> } />
//       <Route path="/product/:id" element={<ProductDetails />} />
//     </Routes>
    
//             <Chatbot />
       
//     <Footer />
//   </div>
//   <Toaster/>
  
//   </div>
//   )
// }

// export default App



import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";

import { useUserStore } from "./stores/useUserStore";
import LoadingSpinner from "./components/LoadingSpinner"; // keep your old spinner

import AppLayout from "./components/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import StockPage from "./pages/StockPage";
import ReceiptsListPage from "./pages/ReceiptsListPage";
import ReceiptDetailPage from "./pages/ReceiptDetailPage";
import ProductsPage from "./pages/ProductsPage";
import ReceiptCreatePage from "./pages/ReceiptCreatePage";
import NewReceiptPage from "./pages/NewReceiptPage";
import DeliveriesListPage from "./pages/DeliveriesListPage";
import SettingsPage from "./pages/SettingsPage";

import NewDeliveryPage from "./pages/NewDeliveryPage";

import MoveHistoryPage from "./pages/MoveHistoryPage";

import InternalTransfersListPage from "./pages/InternalTransfersListPage";
import NewInternalTransferPage from "./pages/NewInternalTransferPage";
import InternalTransferDetailPage from "./pages/InternalTransferDetailPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";


// import AdjustmentsListPage from "./pages/AdjustmentsListPage";
// import NewAdjustmentPage from "./pages/NewAdjustmentPage";

// (later) Products, Warehouses, MoveHistory, Settings pages

function App() {
  const { user, checkAuth, checkingAuth } = useUserStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (checkingAuth) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Routes>
        {/* Auth */}
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to="/dashboard" />}
        />
        
                  <Route
          path="/forgot-password"
          element={!user ? <ForgotPasswordPage /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/signup"
          element={!user ? <SignupPage /> : <Navigate to="/dashboard" />}
        />

        {/* Unauthorized info */}
        <Route
          path="/unauthorized"
          element={
            <div className="flex justify-center items-center min-h-screen">
              <p className="text-sm text-red-300">
                You don&apos;t have access to this page.
              </p>
            </div>
          }
        />

        {/* App layout (protected) */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" />} />
          <Route path="dashboard" element={<DashboardPage />} />

          {/* Only admin + inventory_manager can manage operations & stock */}
          <Route
            path="operations/receipts"
            element={
              <ProtectedRoute
                allowedRoles={["admin", "inventory_manager", "warehouse_staff"]}
              >
                <ReceiptsListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="operations/receipts/:id"
            element={
              <ProtectedRoute
                allowedRoles={["admin", "inventory_manager", "warehouse_staff"]}
              >
                <ReceiptDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
  path="/settings"
  element={
    <ProtectedRoute>
      <SettingsPage />
    </ProtectedRoute>
  }
/>
{/* 
<Route
  path="/operations/adjustments"
  element={
    <ProtectedRoute>
      <AdjustmentsListPage />
    </ProtectedRoute>
  }
/>
<Route
  path="/operations/adjustments/new"
  element={
    <ProtectedRoute>
      <NewAdjustmentPage />
    </ProtectedRoute>
  }
/> */}

          <Route
            path="stock"
            element={
              <ProtectedRoute
                allowedRoles={["admin", "inventory_manager", "warehouse_staff"]}
              >
                <StockPage />
              </ProtectedRoute>
            }
          />



          <Route
  path="/products"
  element={
    <ProtectedRoute roles={["admin", "inventory_manager"]}>
      <ProductsPage />
    </ProtectedRoute>
  }
/>

<Route
  path="/operations/receipts/new"
  element={
    <ProtectedRoute allowedRoles={["admin", "inventory_manager"]}>
      <ReceiptCreatePage />
    </ProtectedRoute>
  }
/>

<Route
  path="/operations/receipts/new"
  element={
    <ProtectedRoute allowedRoles={["admin", "inventory_manager"]}>
      <ReceiptCreatePage />
    </ProtectedRoute>
  }
/>



<Route
  path="/operations/receipts/new"
  element={
    user && (user.role === "admin" || user.role === "inventory_manager")
      ? <NewReceiptPage />
      : <Navigate to="/" />
  }
/>

<Route
  path="/operations/deliveries"
  element={
    user ? <DeliveriesListPage /> : <Navigate to="/login" />
  }
/>

<Route path="/operations/deliveries/new" element={<NewDeliveryPage />} />
{/* <Route path="/operations/deliveries/:id" element={<DeliveryDetailPage />} /> */}


<Route
  path="/move-history"
  element={
    <ProtectedRoute allowedRoles={["admin", "inventory_manager", "warehouse_staff"]}>
      <MoveHistoryPage />
    </ProtectedRoute>
  }
/>



<Route
  path="/operations/internal"
  element={
    <ProtectedRoute>
      <InternalTransfersListPage />
    </ProtectedRoute>
  }
/>
<Route
  path="/operations/internal/new"
  element={
    <ProtectedRoute>
      <NewInternalTransferPage />
    </ProtectedRoute>
  }
/>
<Route
  path="/operations/internal/:id"
  element={
    <ProtectedRoute>
      <InternalTransferDetailPage />
    </ProtectedRoute>
  }
/>


          {/* TODO: products, move-history, settings pages */}
        </Route>

        {/* fallback */}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
