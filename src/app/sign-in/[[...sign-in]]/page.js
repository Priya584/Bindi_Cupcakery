import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div
      className="relative w-full h-screen bg-fixed bg-cover bg-center flex items-center"
      style={{
        backgroundImage: "url('/image.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>

      <div className="relative ml-28">
        <SignIn />
      </div>
    </div>
  );
}
