import { ArrowRight } from 'lucide-react';
import { Button } from '../../components/button';
import { Card } from '../../components/card';
import { Navbar } from '../../components/navbar';
import Footer  from '../../components/footer';
import { ImageWithFallback } from '../../components/ImageWithFallback';
import IconWebApp from '../../assets/icons/IconWebApp';
import IconStartUp from '../../assets/icons/IconStartUp';
import IconConsole from '../../assets/icons/IconConsole';
import IconCloud from '../../assets/icons/IconCloud';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const services = [
    {
      id: 1,
      title: "Web Application",
      description: "Platform independant business solutions for maximum availability",
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
      description: "LaserNetUs has a new brand identity and website designed by eDesign Interactive. The homepage is dynamic and eye-catching. The website aims to highlight the innovative nature of high-intensity laser technology",
      date: "November 10, 2021",
      image: "./blog-tshirt.jpg",
    },
    {
      id: 2,
      title: "How we helped an Orthopedic Practice Increase their traffic",
      description: "We are honored and excited to be working with The Orthopedic Institute of New Jersey, the largest practice in northwest New Jersey.",
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

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
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
            <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 max-w-full md:max-w-[450px] leading-tight'>
              We do the work you stay focused on your customers.
            </h1>
            <p className='text-gray-600 text-base sm:text-lg max-w-full md:max-w-[450px] leading-relaxed'>
              Focusflow is a digital agency passionate about storytelling,
              visual design, and technology. We collaborate with companies small
              to large around the world to help them engage their audiences and
              build brand awareness.
            </p>
            <p className='text-gray-600 text-base sm:text-lg max-w-full md:max-w-[400px] leading-relaxed'>
              Our team can create amazing web experiences, beginning with deep
              market research, practical strategies, and professional execution.
            </p>
            <div className='flex flex-col sm:flex-row items-center gap-4'>
              <Button variant="primary" size="lg">
                Explore Projects
              </Button>
              <Button variant="secondary-custom" size="lg" onClick={() => navigate("/about-us")}>
                About Us
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section className="py-20 bg-white" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className='space-y-14'>
            <div className='text-center'>
              <h2 className='font-semibold text-2xl sm:text-3xl text-gray-900'>What we do</h2>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
              {services.map((card) => (
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
                  <h3 className='font-medium text-xl sm:text-2xl text-gray-900'>{card.title}</h3>
                  <p className='text-gray-600 text-sm sm:text-base leading-relaxed'>
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 bg-gray-50" id="news">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Blog</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Thoughts, insights, building a really, marketing tips, sidepreneur, and Awesome new challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {BlogCard.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 group border border-gray-100">
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-xs">{post.date}</span>
                    <button className="text-blue-600 hover:text-blue-700 flex items-center gap-2 group font-medium">
                      Read More
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button variant="outline" size="default">
              View All Posts
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;