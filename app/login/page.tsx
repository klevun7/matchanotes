import { login, signup } from "@/app/login/actions"

export default function LoginPage() {
  return (
    <form
      className="max-w-[350px] mx-auto mt-12 p-8 border border-gray-200 rounded-lg bg-white shadow-md flex flex-col gap-4"
    >
      <label htmlFor="email" className="font-medium">
        Email:
      </label>
      <input
        id="email"
        name="email"
        type="email"
        required
        className="p-2 border border-gray-300 rounded text-base"
      />
      <label htmlFor="password" className="font-medium">
        Password:
      </label>
      <input
        id="password"
        name="password"
        type="password"
        required
        className="p-2 border border-gray-300 rounded text-base"
      />
      <div className="flex gap-2 mt-4">
        <button
          type="submit"
          formAction={login}
          className="flex-1 p-2 bg-matcha text-white border-none rounded font-semibold cursor-pointer hover:bg-green-700 transition"
        >
          Log in
        </button>
        <button
          type="submit"
          formAction={signup}
          className="flex-1 p-2 bg-gray-100 text-gray-900 border border-gray-300 rounded font-semibold cursor-pointer hover:bg-gray-200 transition"
        >
          Sign up
        </button>
      </div>
    </form>
  )
}
