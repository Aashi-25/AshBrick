import { UserPlus, Hammer, Users } from "lucide-react";

const ConnectSteps = () => {
  return (
    <section className="px-6 py-16 bg-white text-center">
      <div className="max-w-4xl mx-auto">
        <p className="uppercase text-sm font-medium text-gray-600 mb-2">Connect</p>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Seamless Connections <br /> Between Builders and Power Plants
        </h2>
        <p className="text-gray-600 mb-12">
          Our platform simplifies the connection process between brick builders and power plant
          owners. Follow our easy steps to get started and find the right match for your project.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <UserPlus className="mx-auto w-10 h-10 mb-4 text-black" />
          <h3 className="text-xl font-semibold mb-2">Step 1: Sign Up for Free</h3>
          <p className="text-gray-600 text-sm">Create your account in just a few minutes.</p>
        </div>

        <div>
          <Hammer className="mx-auto w-10 h-10 mb-4 text-black" />
          <h3 className="text-xl font-semibold mb-2">Step 2: Build Your Profile</h3>
          <p className="text-gray-600 text-sm">
            Provide details about your services and expertise.
          </p>
        </div>

        <div>
          <Users className="mx-auto w-10 h-10 mb-4 text-black" />
          <h3 className="text-xl font-semibold mb-2">Step 3: Connect with Potential Partners</h3>
          <p className="text-gray-600 text-sm">
            Browse listings and reach out to find matches.
          </p>
        </div>
      </div>

      <div className="mt-12 flex justify-center gap-4">
        <button className="px-6 py-2 border border-black rounded-full text-sm font-medium hover:bg-gray-100 transition">
          Learn More
        </button>
        <button className="px-6 py-2 border border-black rounded-full text-sm font-medium hover:bg-gray-100 transition flex items-center gap-1">
          Sign Up <span className="ml-1">→</span>
        </button>
      </div>
    </section>
  );
};

export default ConnectSteps; 