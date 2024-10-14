const Footer = () => {
  return (
    <footer className="mt-auto">
      <div className="bg-gray-100 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <span className="text-sm text-gray-500 dark:text-gray-300">
                © 2024 <a href="https://cryptoutils.xyz" className="hover:underline">CryptoUtils</a>. All Rights Reserved.
              </span>
              <div className="mt-2">
                <a href="/privacy-policy" className="text-sm text-gray-500 dark:text-gray-300 hover:underline">Privacy Policy</a>
                <a href="/terms-conditions" className="text-sm text-gray-500 dark:text-gray-300 hover:underline ml-4">Terms and Conditions</a>
              </div>
            </div>
            <div className="flex justify-center md:justify-end space-x-6">
              <a href="https://twitter.com/cryptoutils" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300">
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 17">
                  <path fillRule="evenodd" d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z" clipRule="evenodd"/>
                </svg>
                <span className="sr-only">Twitter page</span>
              </a>
              <a href="https://t.me/cryptoutils" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300">
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.654-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                </svg>
                <span className="sr-only">Telegram group</span>
              </a>
              <a href="https://www.linkedin.com/company/cryptoutils" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300">
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.58c-1.14 0-2.06-.92-2.06-2.06s.92-2.06 2.06-2.06 2.06.92 2.06 2.06-.92 2.06-2.06 2.06zm15.11 12.87h-3.56v-5.59c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.95v5.68h-3.56V9h3.42v1.56h.05c.48-.91 1.65-1.85 3.4-1.85 3.63 0 4.3 2.39 4.3 5.5v6.24z"/>
                </svg>
                <span className="sr-only">LinkedIn page</span>
              </a>
              <a href="https://youtube.com/@cryptoutils?si=XIx-Erm5u-9iz50d" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-youtube">
                <path d="M22.54 6.42c-.24-.94-.94-1.68-1.88-1.93C18.88 4 12 4 12 4s-6.88 0-8.66.49c-.94.25-1.64.99-1.88 1.93C1 8.2 1 12 1 12s0 3.8.46 5.58c.24.94.94 1.68 1.88 1.93 1.78.49 8.66.49 8.66.49s6.88 0 8.66-.49c.94-.25 1.64-.99 1.88-1.93.46-1.78.46-5.58.46-5.58s0-3.8-.46-5.58z"/>
                  <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
                </svg>
                <span className="sr-only">YouTube channel</span>
              </a>
              <a href="https://www.instagram.com/cryptoutils" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300">
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.2c3.2 0 3.6.01 4.85.07 1.17.05 1.8.24 2.22.4.55.21.95.47 1.37.89.42.42.68.82.89 1.37.16.42.35 1.05.4 2.22.06 1.25.07 1.65.07 4.85s-.01 3.6-.07 4.85c-.05 1.17-.24 1.8-.4 2.22-.21.55-.47.95-.89 1.37-.42.42-.82.68-1.37.89-.42.16-1.05.35-2.22.4-1.25.06-1.65.07-4.85.07s-3.6-.01-4.85-.07c-1.17-.05-1.8-.24-2.22-.4-.55-.21-.95-.47-1.37-.89-.42-.42-.68-.82-.89-1.37-.16-.42-.35-1.05-.4-2.22C2.21 15.6 2.2 15.2 2.2 12s.01-3.6.07-4.85c.05-1.17.24-1.8.4-2.22.21-.55.47-.95.89-1.37.42-.42.82-.68 1.37-.89.42-.16 1.05-.35 2.22-.4C8.4 2.21 8.8 2.2 12 2.2zm0-2.2C8.74 0 8.33.01 7.05.07 5.77.13 4.55.34 3.47 1.42 2.39 2.5 2.18 3.72 2.12 5.05.06 6.28.05 6.69.05 12s.01 5.72.07 6.95c.06 1.33.27 2.55 1.35 3.63 1.08 1.08 2.3 1.29 3.63 1.35 1.28.06 1.69.07 6.95.07s5.72-.01 6.95-.07c1.33-.06 2.55-.27 3.63-1.35 1.08-1.08 1.29-2.3 1.35-3.63.06-1.28.07-1.69.07-6.95s-.01-5.72-.07-6.95c-.06-1.33-.27-2.55-1.35-3.63C19.55.34 18.33.13 17.05.07 15.77.01 15.36 0 12 0zm0 5.8a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4zm0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.85a1.44 1.44 0 1 0 0-2.88 1.44 1.44 0 0 0 0 2.88z"/>
                </svg>
                <span className="sr-only">Instagram page</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;