import { useEffect, useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../libs/services/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { showSuccessToast, showErrorToast } from "../libs/toastNotifications";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  

  const { user, loading, error } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  

  const schema = useMemo(() => {
    return yup.object().shape({
      name: yup.string().min(3, "الاسم يجب أن يكون على الأقل 3 أحرف").max(12, "الاسم لا يمكن أن يتجاوز 12 حرفًا").required("الاسم مطلوب"),
      email: yup.string().email("البريد الإلكتروني غير صالح").required("البريد الإلكتروني مطلوب"),
      password: yup.string().min(8, "كلمة المرور يجب أن تكون على الأقل 8 أحرف").max(32, "كلمة المرور لا يمكن أن تتجاوز 32 حرفًا").required("كلمة المرور مطلوبة"),
    });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });


const onSubmitHandler = useCallback(
    async (data) => {
      try {
        await dispatch(signupUser(data)).unwrap();
        showSuccessToast("تم انشاء الحساب بنجاح!")
        reset();
        navigate("/");
      } catch (err) {
        showErrorToast("حدث خطأ أثناء انشائ الحساب!");
      }
    },
    [dispatch, reset, navigate]
  );

  useEffect(() => {
    if (user) {
      navigation("/");
    }
  }, [user, navigation]);

  return (
    <div className="bg-white p-4 flex flex-col justify-center items-center">

      <h2 className="text-2xl font-bold mb-6">إنشاء حساب جديد</h2>
      <form className="w-[90%] md:w-[60%] mx-auto " onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            الاسم
          </label>
          <input
            {...register("name")}
            type="text"
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name?.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            البريد الإلكتروني
          </label>
          <input
            {...register("email")}
            type="email"
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email?.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            كلمة المرور
          </label>
          <input
            {...register("password")}
            type="password"
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password?.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded mt-4"
          disabled={loading}
        >
          {loading ? "جارٍ الإنشاء..." : "إنشاء حساب"}
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        لديك حساب؟{" "}
        <Link to={"/login"} className="text-blue-500 hover:underline">
          تسجيل الدخول
        </Link>
      </p>
    </div>
  );
}

