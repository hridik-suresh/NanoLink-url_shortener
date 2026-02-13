// import { useEffect } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { loginSuccess } from "../store/slices/authSlice";

// const SocialAuth = () => {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const token = searchParams.get("token");

//     if (token) {
//       // 1. Save to local storage
//       localStorage.setItem("token", token);

//       // 2. Update Redux (You might need to fetch user profile or decode token)
//       dispatch(loginSuccess({ token }));

//       // 3. Go to dashboard
//       navigate("/dashboard");
//     } else {
//       navigate("/login");
//     }
//   }, [searchParams, dispatch, navigate]);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-bg-main text-white">
//       <div className="animate-pulse text-xl">Authenticating with Google...</div>
//     </div>
//   );
// };

// export default SocialAuth;
