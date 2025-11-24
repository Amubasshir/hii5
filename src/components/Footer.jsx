'use client'; // ✅ Make this a client component

import {
  FaDribbble,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaWhatsapp,
} from 'react-icons/fa';

const Footer = () => {
  const ACCENT_COLOR = '#E9206D';
  const BG_DARK_PURPLE = '#0E0B12';
  const INPUT_BG = '#2E283D';
  const BORDER_COLOR = '#3D344A';

  return (
    <footer
      className={`py-16 px-4 md:px-8 text-gray-300 border-t border-gray-700`}
      style={{ backgroundColor: BG_DARK_PURPLE }}
    >
      <div
        className={`max-w-6xl mx-auto flex flex-wrap justify-between border-b pb-10 gap-y-10`}
        style={{ borderColor: BORDER_COLOR }}
      >
        {/* Pages & Integrations */}
        <div className="flex flex-wrap gap-x-10 lg:gap-20">
          <div className="w-1/2 sm:w-auto min-w-[150px]">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-6">
              Pages
            </h4>
            <ul className="space-y-3">
              {[
                'Home',
                // 'Primary Home',
                'About',
                'Contact',
                'Blog',
                'Pricing',
              ].map((item, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="text-sm hover:text-white transition duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-1/2 sm:w-auto min-w-[150px]">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-6">
              Integrations
            </h4>
            {/* <ul className="space-y-3">
              {['Integrations', 'Careers', 'Features', 'Team'].map(
                (item, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="text-sm hover:text-white transition duration-200"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul> */}
          </div>
        </div>

        {/* Utility Pages */}
        <div className="w-1/2 sm:w-auto min-w-[150px] lg:mr-8">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-6">
            Utility Pages
          </h4>
          {/* <ul className="space-y-3">
            {[
              'Start Here',
              'Style Guide',
              'Password Protected',
              '404 Not Found',
              'Licenses',
              'Changelog',
            ].map((item, i) => (
              <li key={i}>
                <a
                  href="#"
                  className="text-sm hover:text-white transition duration-200"
                >
                  {item}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#"
                className="text-sm font-bold transition duration-200"
                style={{ color: ACCENT_COLOR }}
              >
                More Templates
              </a>
            </li>
          </ul> */}
        </div>

        {/* Newsletter & Social */}
        <div className="w-full lg:w-[320px]">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-6">
            Subscribe to our newsletter
          </h4>
          <p className="text-sm mb-4">
            Lorem ipsum dolor sit amet consectetur adipiscing elit non amet arcu
            auctor orci vitae
          </p>

          <form className="flex mt-4 mb-6">
            <input
              type="email"
              placeholder="Your email address"
              className={`flex-grow p-3 rounded-l-lg border border-r-0 text-white focus:outline-none focus:ring-2 focus:ring-pink-500`}
              style={{ backgroundColor: INPUT_BG, borderColor: INPUT_BG }}
            />
            <button
              type="submit"
              className={`p-3 text-white font-medium rounded-r-lg transition duration-200 hover:opacity-90`}
              style={{ backgroundColor: ACCENT_COLOR }}
            >
              Subscribe
            </button>
          </form>

          {/* Social Icons */}
          <div className="flex gap-2">
            {[
              FaFacebookF,
              FaTwitter,
              FaLinkedinIn,
              FaInstagram,
              FaDribbble,
              FaWhatsapp,
            ].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className={`w-9 h-9 flex items-center justify-center rounded-lg bg-[#2E283D] text-gray-300 hover:bg-pink-500 transition-colors duration-200`}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center pt-6 text-xs mt-4">
        <div className="flex items-center text-white font-bold text-lg mb-4 md:mb-0">
          <img src="/hii5logo.png" alt="Hii5 logo" className="w-[70px]" />
        </div>
        <div className="text-center md:text-right">
          Copyright &copy; Dark X | Designed by{' '}
          <a
            href="#"
            className="hover:underline transition duration-200"
            style={{ color: ACCENT_COLOR }}
          >
            BRIX Templates
          </a>{' '}
          | Powered by{' '}
          <a
            href="#"
            className="hover:underline transition duration-200"
            style={{ color: ACCENT_COLOR }}
          >
            Webflow
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
