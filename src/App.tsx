import Header from './components/Header'
import  BaseSelection  from './components/BaseSelection'
import BowlSelection from './components/BowlSelection'
import Footer from './components/Footer'

function App() {
  return (
    <div className="p-6 space-y-6">
      <Header />

      <div className="flex justify-end">
        <BaseSelection />
      </div>
      <main className="p-6">
        <BowlSelection />
      </main>

      <Footer />
    </div>
  )
}

export default App