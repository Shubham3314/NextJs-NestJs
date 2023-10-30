import LoginSignup from "./components/LoginSignup";



export default function Home() {
  
  return (
    <main className="flex flex-col justify-center items-center h-screen w-screen bg-gradient-to-b from-gray-900 to-secondary m-0">
      <LoginSignup />
    </main>
  );
}
