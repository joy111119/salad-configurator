import Header from './components/Header'
import BowlSelection from './components/BowlSelection'
import Footer from './components/Footer'

function App() {
  return (
    <div>
      <Header />

      <main className="p-6">
        <BowlSelection />
      </main>

      <Footer />
    </div>
  )
}

export default App