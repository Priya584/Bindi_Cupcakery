import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div
      className="relative w-full h-screen bg-fixed bg-cover bg-center flex items-center"
      style={{
        backgroundImage: "url('/image.jpg')",
      }}
    >
      {/* Sign-In Box */}
      <div className="ml-28">
        <SignIn />
      </div>
    </div>
  );
}
