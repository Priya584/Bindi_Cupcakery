import { SignUp } from '@clerk/nextjs'

export default function SingUpPage() {
  return (
    <div
      className="relative w-full h-screen bg-fixed bg-cover bg-center flex items-center"
      style={{
        backgroundImage: "url('/image.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>

      <div className="relative ml-36">
        <SignUp />
      </div>
    </div>
  );
}