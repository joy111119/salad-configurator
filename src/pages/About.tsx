import Header from '../components/Header'
import Footer from '../components/Footer'

function About() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-900 text-white">
      
      <Header />

      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-4">About</h1>
        <p>This is the Salad Configurator app.</p>
      </main>

      <Footer />
      
    </div>
  )
}

export default About