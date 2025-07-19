
import { useState } from 'react';
import { UserPlus, Hammer, Users } from 'lucide-react';
import { useForm } from 'react-hook-form';

const ConnectSteps = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [submitStatus, setSubmitStatus] = useState(null);

  const onSubmit = async (data) => {
    try {
      const response = await fetch('https://formspree.io/f/xdkdkyol', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus({ type: 'success', message: 'Form submitted successfully!' });
        reset();
      } else {
        setSubmitStatus({ type: 'error', message: 'Submission failed. Please try again.' });
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'An error occurred. Please try again.' });
    }
  };

  return (
    <section className="relative px-6 py-16 bg-gradient-to-br from-green-900/20 to-black/90 text-center">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-green-400/50 rounded-full animate-float-${i % 2 + 1} shadow-sm shadow-green-400/20`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${4 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto animate-fade-in-up">
        <p className="uppercase text-sm font-medium text-green-300/70 mb-2">Connect</p>
        <h2
          className="text-4xl font-bold mb-4"
          style={{
            background: 'linear-gradient(to right, #22c55e, #3b82f6)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            textShadow: '0 4px 16px rgba(0,0,0,0.8), 0 1px 4px rgba(34,197,94,0.3)',
          }}
        >
          Seamless Connections <br /> Between Builders and Power Plants
        </h2>
        <p className="text-green-300/70 mb-12">
          Our platform simplifies the connection process between brick builders and power plant
          owners. Follow our easy steps to get started and find the right match for your project.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 animate-fade-in-up">
        <div>
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center shadow-md shadow-green-400/20 mb-4">
            <UserPlus className="w-10 h-10 text-black" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-green-400">Step 1: Sign Up for Free</h3>
          <p className="text-green-300/70 text-sm">Create your account in just a few minutes.</p>
        </div>

        <div>
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center shadow-md shadow-green-400/20 mb-4">
            <Hammer className="w-10 h-10 text-black" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-green-400">Step 2: Build Your Profile</h3>
          <p className="text-green-300/70 text-sm">
            Provide details about your services and expertise.
          </p>
        </div>

        <div>
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center shadow-md shadow-green-400/20 mb-4">
            <Users className="w-10 h-10 text-black" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-green-400">Step 3: Connect with Potential Partners</h3>
          <p className="text-green-300/70 text-sm">
            Browse listings and reach out to find matches.
          </p>
        </div>
      </div>

      <div className="mt-12 max-w-2xl mx-auto animate-fade-in-up">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-3 rounded-lg bg-black/50 border border-green-400/20 text-green-300/70 placeholder-green-300/50 focus:outline-none focus:ring-2 focus:ring-green-400 backdrop-blur-sm"
                {...register('name', { required: 'Name is required' })}
              />
              {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full p-3 rounded-lg bg-black/50 border border-green-400/20 text-green-300/70 placeholder-green-300/50 focus:outline-none focus:ring-2 focus:ring-green-400 backdrop-blur-sm"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Invalid email address',
                  },
                })}
              />
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
            </div>
          </div>
          <div>
            <select
              className="w-full p-3 rounded-lg bg-black/50 border border-green-400/20 text-green-300/70 focus:outline-none focus:ring-2 focus:ring-green-400 backdrop-blur-sm"
              {...register('companyType', { required: 'Company type is required' })}
            >
              <option value="" disabled selected>
                Select Company Type
              </option>
              <option value="builder">Brick Builder</option>
              <option value="powerPlant">Power Plant Owner</option>
            </select>
            {errors.companyType && <p className="text-red-400 text-sm mt-1">{errors.companyType.message}</p>}
          </div>
          <button
            type="submit"
            className="w-full py-3 px-6 bg-gradient-to-br from-green-400 to-blue-500 text-black rounded-lg font-semibold hover:scale-105 transition-all duration-300 shadow-md shadow-green-400/20"
          >
            Sign Up Now
          </button>
          {submitStatus && (
            <p className={`text-sm ${submitStatus.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
              {submitStatus.message}
            </p>
          )}
        </form>
      </div>

      <div className="mt-8 flex justify-center gap-4">
        <button className="px-6 py-2 bg-black/50 border border-green-400/20 rounded-full text-sm font-medium text-green-300/70 hover:bg-green-400/10 transition">
          Learn More
        </button>
        <button className="px-6 py-2 bg-gradient-to-br from-green-400 to-blue-500 rounded-full text-sm font-medium text-black hover:scale-105 transition-all duration-300 flex items-center gap-1 shadow-md shadow-green-400/20">
          Sign Up <span className="ml-1">→</span>
        </button>
      </div>

      <style jsx>{`
        @keyframes float-1 {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
          50% { transform: translateY(-10px) translateX(5px); opacity: 0.6; }
        }
        @keyframes float-2 {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
          50% { transform: translateY(-8px) translateX(-4px); opacity: 0.5; }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes glow-pulse {
          0% { box-shadow: 0 0 8px rgba(34, 197, 94, 0.2); }
          50% { box-shadow: 0 0 16px rgba(34, 197, 94, 0.4); }
          100% { box-shadow: 0 0 8px rgba(34, 197, 94, 0.2); }
        }

        .animate-float-1 { animation: float-1 5s ease-in-out infinite; }
        .animate-float-2 { animation: float-2 6s ease-in-out infinite; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
      `}</style>
    </section>
  );
};

export default ConnectSteps;
