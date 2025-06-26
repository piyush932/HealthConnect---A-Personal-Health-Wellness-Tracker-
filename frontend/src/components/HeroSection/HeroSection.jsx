import React from "react";
import { useNavigate } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import image1 from '../../assets/data-stats-around-person-doing-physical-activity.jpg';
import image2 from '../../assets/front-view-man-tank-top-holding-weights-with-copy-space.jpg';
import image3 from '../../assets/young-sportswomen-resting-dark-studio.jpg';
import image4 from '../../assets/physical-activity-stats-around-person.jpg'; 

const overviewLines = [
  "Transform your habits, boost your energy, and take control of your health—one log at a time.",
  "Track your fitness, hydration, and sleep with precision—because better health means better performance.",
  "Achieve balance and energy with daily insights into your activity, hydration, and rest.",
  "Everything your body needs to thrive—tracked simply, backed by science, powered by you."
];

const sections = [
  {
    title: "Fitness Tracker",
    description:
      "Monitor your daily activity, set fitness goals, and visualize your progress with HealthConnect's comprehensive fitness tracking. Stay motivated with detailed insights into your workouts, step counts, calories burned, and more, helping you achieve a healthier lifestyle.",
    image: image1,
    imageAlt: "Fitness Tracking Illustration",
  },
  {
    title: "Backed by Science",
    image: image4,
    imageAlt: "Scientific health insights",
    metrics: [
      { stat: "88%", text: "of users tracking workouts achieve goals 2× faster." },
      { stat: "67%", text: "boost in focus from proper hydration monitoring." },
      { stat: "72%", text: "report better mood with sleep pattern tracking." },
      { stat: "61%", text: "see reduced burnout risk when logging daily wellness." },
      { stat: "45%", text: "experience improved energy from regular water intake." },
      { stat: "52%", text: "lower anxiety with consistent health habit tracking." },
    ]
  },
  {
    title: "Water Intake",
    description:
      "Stay hydrated! Log your daily water intake and get reminders to help you maintain optimal hydration for better health. Understand your hydration patterns and receive personalized tips to improve your water consumption habits for enhanced energy and wellness.",
    image: image2,
    imageAlt: "Water Intake Illustration",
  },
  {
    title: "Sleep Tracking",
    description:
      "Track your sleep patterns, duration, and quality to improve your rest and overall well-being. Analyze your sleep cycles, identify disruptions, and get recommendations to enhance your sleep hygiene for a more restful and rejuvenating night.",
    image: image3,
    imageAlt: "Sleep Tracking Illustration",
  },
  
];

const HeroSection = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/login");
  };

  return (
    <section className="pt-10 pb-20 bg-gradient-to-b from-blue-50 to-blue-100 min-h-screen">
      <div className="container mx-auto flex flex-col space-y-16 px-4 md:px-8">

        {/* Typewriter Overview */}
        <div className="w-full flex justify-center mb-4">
          <p className="text-base md:text-lg lg:text-xl font-medium text-blue-800 text-center max-w-4xl mx-auto px-2">
            <Typewriter
              words={overviewLines}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={40}
              deleteSpeed={25}
              delaySpeed={2500}
            />
          </p>
        </div>

        {/* Sections */}
        {sections.map((section, idx) => (
          <div
            key={section.title}
            className={`flex flex-col gap-y-6 lg:gap-8 lg:flex-row items-center ${
              idx % 2 === 1 ? "lg:flex-row-reverse" : ""
            }`}
          >
            {/* Text */}
            <div className="flex flex-col justify-center px-2 py-4 lg:w-1/2">
              <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-4">
                {section.title}
              </h2>

              {section.description && (
                <p className="text-base md:text-lg text-gray-700 mb-6">
                  {section.description}
                </p>
              )}

              {/* Metrics Grid if available */}
              {section.metrics && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {section.metrics.map((item, i) => (
                    <div key={i} className="bg-white rounded-md shadow p-4 border border-gray-100">
                      <p className="text-3xl font-bold text-indigo-600 mb-1">{item.stat}</p>
                      <p className="text-gray-700 text-sm">{item.text}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* CTA for regular sections */}
              {!section.metrics && (
                <button
                  onClick={handleGetStarted}
                  className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Get Started
                </button>
              )}
            </div>

            {/* Image */}
            <div className="flex items-center justify-center px-2 py-4 lg:w-1/2">
              <div className="w-full h-full aspect-[4/3] max-h-[340px] md:max-h-[420px] lg:max-h-none flex items-center justify-center">
                <img
                  src={section.image}
                  alt={section.imageAlt}
                  className="object-cover w-full h-full rounded-xl shadow"
                  style={{ minHeight: '200px' }}
                />
              </div>
            </div>
          </div>
        ))}

        {/* Sources */}
        <div className="text-center text-sm text-gray-500 italic mt-4">
          Sources: WHO, Sleep Foundation, Mayo Clinic, Harvard Health, Journal of Behavioral Medicine
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
