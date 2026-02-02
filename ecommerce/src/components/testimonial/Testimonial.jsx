const testimonials = [
  {
    name: "Kamal Nayan Upadhyay",
    role: "Senior Product Designer",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    message:
      "Edison bulb retro cloud bread echo park, helvetica stumptown taiyaki taxidermy 90's cronut +1 kinfolk. Single-origin coffee ennui shaman taiyaki vape DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware.",
  },
  {
    name: "S Mishra",
    role: "UI Developer",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    message:
      "Edison bulb retro cloud bread echo park, helvetica stumptown taiyaki taxidermy 90's cronut +1 kinfolk. Single-origin coffee ennui shaman taiyaki vape DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware.",
  },
  {
    name: "XYZ",
    role: "CTO",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    message:
      "Edison bulb retro cloud bread echo park, helvetica stumptown taiyaki taxidermy 90's cronut +1 kinfolk. Single-origin coffee ennui shaman taiyaki vape DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware.",
  },
];

const Testimonial = () => {
  return (
    <section className="py-16 bg-white">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900">
          Testimonial
        </h2>
        <p className="text-gray-500 mt-2 text-lg">
          What our <span className="text-pink-600 font-semibold">customers</span>{" "}
          are saying
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {testimonials.map((item, index) => (
          <div key={index} className="text-center">
            {/* Avatar */}
            <div className="flex justify-center mb-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 rounded-full object-cover"
              />
            </div>

            {/* Message */}
            <p className="text-gray-500 text-sm leading-relaxed px-4">
              {item.message}
            </p>

            {/* Divider */}
            <div className="w-10 h-1 bg-pink-600 mx-auto my-4 rounded"></div>

            {/* Name */}
            <h3 className="text-gray-900 font-semibold uppercase text-sm">
              {item.name}
            </h3>

            {/* Role */}
            <p className="text-gray-400 text-xs mt-1">
              {item.role}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;
