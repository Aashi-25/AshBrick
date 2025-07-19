const BackgroundBlobs = () => (
  <div className="fixed inset-0 opacity-20 -z-10">
    <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-green-400 to-blue-500 rounded-full blur-3xl animate-pulse"></div>
    <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full blur-3xl animate-pulse delay-2000"></div>
  </div>
);

export default BackgroundBlobs;
