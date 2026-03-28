import Header from './components/Header'
import  BaseSelection  from './components/BaseSelection'

function App() {
  return (
    <div className="p-6 space-y-6">
      <Header />

      <div className="flex justify-end">
        <BaseSelection />
      </div>
    </div>
  )
}

export default App