const footerLinks = {
    about: [
      { id: 1, label: "Work", route: "#" },
      { id: 2, label: "Strategy", route: "#" },
      { id: 3, label: "Releases", route: "#" },
      { id: 4, label: "Press", route: "#" },
      { id: 5, label: "Mission", route: "#" },
    ],
    customers: [
      { id: 1, label: "Trending", route: "#" },
      { id: 2, label: "Popular", route: "#" },
      { id: 3, label: "Customers", route: "#" },
      { id: 4, label: "Features", route: "#" },
    ],
    support: [
      { id: 1, label: "Developers", route: "#" },
      { id: 2, label: "Support", route: "#" },
      { id: 3, label: "Customer Service", route: "#" },
      { id: 4, label: "Guide", route: "#" },
    ],
  };

  const Footer = () => {
    return (
      <>
        <footer className='bg-dark text-white px-8 md:px-16 lg:px-32 py-16'>
          <div className='max-w-[1440px] mx-auto flex flex-col lg:flex-row justify-between gap-12'>
            <div className='space-y-4 max-w-md'>
              <p className='font-bold text-3xl'>Focusflow.</p>
              <p className='opacity-90'>
                Our team can create amazing web experiences, beginning with deep
                market research, practical strategies, and professional execution.
              </p>
            </div>

            <div className='flex flex-wrap justify-between gap-12 sm:gap-20 w-full lg:w-auto'>
              {Object.entries(footerLinks).map(([section, links]) => (
                <div
                  key={section}
                  className='space-y-4 min-w-[120px]'
                >
                  <p className='font-semibold text-lg capitalize'>{section}</p>
                  <div className='flex flex-col gap-3'>
                    {links.map((item) => (
                      <a
                        key={item.id}
                        href={item.route}
                        className='text-white! opacity-50 hover:opacity-100 transition'
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </footer>

        <div className='bg-[#23222F] min-h-14 flex justify-center items-center text-center px-4'>
            <p className='text-white font-medium text-sm sm:text-base'>
                {new Date().getFullYear()} © Focusflow Designers
            </p>
        </div>
      </>
    );
  };

  export default Footer;