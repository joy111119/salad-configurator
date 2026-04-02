import Header from '../components/Header'
import Footer from '../components/Footer'

function Print() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-900 text-white">
      <Header />

      <main className="flex-1 p-10 mt-6">
        <h1 className="text-3xl font-bold">Print</h1>
        <p>Coming soon...</p>
      </main>

      <Footer />
    </div>
  )
}

export default Print
