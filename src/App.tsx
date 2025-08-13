import Header from './components/Header';
import Footer from './components/Footer';
import FormPanel from './components/FormPanel';
import ResultPanel from './components/ResultPanel';
import { useURLSync } from './hooks/useURLSync';

function App() {
  useURLSync();

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <main className="container mx-auto p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <FormPanel />
        </div>
        <div className="lg:col-span-2">
          <ResultPanel />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
