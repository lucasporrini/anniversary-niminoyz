import Image from "next/image";

const LoadingScreen = () => {
  return (
    <div className="flex justify-center items-center h-screen flex-col bg-gray-100">
      <Image
        src="/background.jpg"
        width={100}
        height={100}
        alt="Logo"
        className="w-screen h-screen"
      />
      <div className="w-16 h-16 border-4 border-gray-300 border-t-4 border-t-blue-500 rounded-full animate-spin"></div>
      <p className="mt-4 text-lg text-gray-700">Chargement en cours...</p>
    </div>
  );
};

export default LoadingScreen;
