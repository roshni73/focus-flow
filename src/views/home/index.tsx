import { useNavigate } from "react-router-dom";
import AppPrimaryButton from "../../components/button/app-primary-button";
import AppSecondaryButton from "../../components/button/app-secondary-button";
import IconCloud from "../../assets/icons/IconCloud";
import IconConsole from "../../assets/icons/IconConsole";
import IconStartUp from "../../assets/icons/IconStartUp";
import IconWebApp from "../../assets/icons/IconWebApp";

const WhatWeDoCard = [
  {
    id: 1,
    title: "Web Application",
    description:
      "Platform independant business solutions for maximum availability",
    icon: <IconWebApp />,
    bgColor: "#FFF2F2",
  },
  {
    id: 2,
    title: "SEO",
    description: "Let the world find you on top of others",
    icon: <IconStartUp />,
    bgColor: "#E2F3FF",
  },
  {
    id: 3,
    title: "Game Development",
    description: "Interactive games with perfect graphics",
    icon: <IconConsole />,
    bgColor: "#FDFBDA",
  },
  {
    id: 4,
    title: "Iot/ AI/ Robotic",
    description: "Advanced autonomous technologies to make life simple",
    icon: <IconCloud />,
    bgColor: "#FFE7FB",
  },
];

const BlogCard = [
  {
    id: 1,
    title: "LaserNetUs Website Launch",
    description:
      "LaserNetUs has a new brand identity and website designed by eDesign Interactive. The homepage is dynamic and eye-catching. The website aims to highlight the innovative nature of high-intensity laser technology",
    date: "November 10, 2021",
    image: "./blog-tshirt.jpg",
  },
  {
    id: 2,
    title: "How we helped an Orthopedic Practice Increase their traffic",
    description:
      "We are honored and excited to be working with The Orthopedic Institute of New Jersey, the largest practice in northwest New Jersey.",
    date: "February 21, 2021",
    image: "./thumbnail-oinj.jpg",
  },
  {
    id: 3,
    title: "The Increasing importance of Web Accessibility",
    description: "Is your website accessible to visitors with impairments?",
    date: "July 03, 2021",
    image: "./thumbnail-accessibility.jpg",
  },
];

export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      <div className='px-4 sm:px-8 md:px-16 lg:px-32 py-16 space-y-16'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 items-center'>
          <div className='order-1 lg:order-2'>
            <img
              src='./hero-image.png'
              alt='Hero'
              className='w-full h-auto'
            />
          </div>
          <div className='order-2 lg:order-1 space-y-6 md:space-y-8 py-6 lg:py-12'>
            <p className='text-3xl sm:text-4xl font-bold text-shadow-lg max-w-full md:max-w-[450px]'>
              We do the work you stay focused on your customers.
            </p>
            <p className='text-text text-base sm:text-lg max-w-full md:max-w-[400px]'>
              Awwwsome. is a digital agency passionate about storytelling,
              visual design, and technology. We collaborate with companies small
              to large around the world to help them engage their audiences and
              build brand awareness.
            </p>
            <p className='text-text text-base sm:text-lg max-w-full md:max-w-[400px]'>
              Our team can create amazing web experiences, beginning with deep
              market research, practical strategies, and professional execution.
            </p>
            <div className='flex flex-row items-center gap-4'>
              <AppPrimaryButton>Explore Projects</AppPrimaryButton>
              <AppSecondaryButton onClick={() => navigate("/about-us")}>
                About Us
              </AppSecondaryButton>
            </div>
          </div>
        </div>

        {/* What We Do */}
        <div className='space-y-14'>
          <div className='text-center'>
            <p className='font-semibold text-2xl sm:text-3xl'>What we do</p>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {WhatWeDoCard.map((card) => (
              <div
                key={card.id}
                className='flex flex-col items-center gap-4 text-center w-full'
              >
                <div
                  className='h-24 w-24 rounded-2xl aspect-square flex items-center justify-center'
                  style={{ backgroundColor: card.bgColor }}
                >
                  {card?.icon}
                </div>
                <p className='font-medium text-xl sm:text-2xl'>{card.title}</p>
                <p className='text-text text-sm sm:text-base'>
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='px-4 sm:px-8 md:px-16 lg:px-32 py-16 bg-[#F8F8F8]'>
        <div className='flex flex-col text-center mx-auto space-y-2'>
          <p className='font-semibold text-2xl sm:text-3xl'>Blog</p>
          <p className='text-text text-sm sm:text-base max-w-full md:max-w-[500px] mx-auto'>
            Insights, thoughts, industry trends, marketing tips, eDesign news,
            nerdy stuff, it's all here.
          </p>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-12'>
          {BlogCard.map((card) => (
            <div
              key={card.id}
              className='flex flex-col mx-auto w-full max-w-md'
            >
              <div className='w-full aspect-auto rounded-sm'>
                <img
                  src={card.image}
                  alt={card.title}
                  className='w-full h-full object-cover rounded-sm'
                />
              </div>
              <div className='space-y-2 mt-2'>
                <p className='text-sm text-text'>{card.date}</p>
                <p className='text-lg font-semibold'>{card.title}</p>
                <p className='text-text text-sm'>{card.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className='text-center mt-8'>
          <AppPrimaryButton
            size='large'
            className='mx-auto block'
          >
            View All
          </AppPrimaryButton>
        </div>
      </div>
    </>
  );
}
