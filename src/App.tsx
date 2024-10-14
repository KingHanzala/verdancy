import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import PollDetails from './components/PollDetails';
import CreatePoll from './pages/CreatePoll';
import Home from './components/Home';
import Footer from './components/Footer';
import { Web3ModalProvider } from './Web3ModalProvider';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsConditions from './components/TermsConditions';
import AllPolls from './components/AllPolls';

const App = () => {
  return (
    <Web3ModalProvider>
      <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
        <Router>
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/polls/:pollId" element={<PollDetails/>} />
              <Route path="/create-poll" element={<CreatePoll/>} />
              <Route path="/polls" element={<AllPolls/>} />
              <Route path="/privacy-policy" element={<PrivacyPolicy/>} />
              <Route path="/terms-conditions" element={<TermsConditions/>} />
            </Routes>
          </main>
        </Router>
        <Footer />
      </div>
    </Web3ModalProvider>
  );
};

export default App;
