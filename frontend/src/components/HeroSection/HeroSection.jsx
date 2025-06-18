import React from "react";
import image1 from '../../assets/data-stats-around-person-doing-physical-activity.jpg';
import image2 from '../../assets/front-view-man-tank-top-holding-weights-with-copy-space.jpg';
import image3 from '../../assets/young-sportswomen-resting-dark-studio.jpg';

// One-line, responsive overview
const overview = "HealthConnect lets you track your activity, water, and sleep in one place for a healthier you.";

const sections = [
  {
    title: "Fitness Tracker",
    description:
      "Monitor your daily activity, set fitness goals, and visualize your progress with HealthConnect's comprehensive fitness tracking. Stay motivated with detailed insights into your workouts, step counts, calories burned, and more, helping you achieve a healthier lifestyle.",
    image: image1,
    imageAlt: "Fitness Tracking Illustration",
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

const HeroSection = () => (
  <section className="pt-28 pb-16 bg-gradient-to-b from-blue-50 to-blue-100 min-h-screen">
    <div className="container mx-auto flex flex-col space-y-16 px-4 md:px-8">
      {/* Responsive one-line overview */}
      <div className="w-full flex justify-center mb-8">
        <p className="text-base md:text-lg lg:text-xl font-medium text-blue-800 text-center whitespace-nowrap overflow-x-auto">
          {overview}
        </p>
      </div>
      {sections.map((section, idx) => (
        <div
          key={section.title}
          className={`
            grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch
            ${idx % 2 === 1 ? "lg:flex-row-reverse" : ""}
          `}
        >
          {/* Text */}
          <div className="flex flex-col justify-center px-2 py-4">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-4">{section.title}</h2>
            <p className="text-base md:text-lg text-gray-700 mb-6">{section.description}</p>
            <a
              href="/"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Get Started
            </a>
          </div>
          {/* Image */}
          <div className="flex items-center justify-center px-2 py-4 h-full">
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
    </div>
  </section>
);

export default HeroSection;
