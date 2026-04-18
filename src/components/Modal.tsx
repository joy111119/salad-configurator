import type { ReactNode } from 'react'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

function Modal({ isOpen, onClose, children }: ModalProps) {
  
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose} 
    >
      <div
        className="bg-white rounded-2xl p-6 shadow-lg min-w-[300px]"
        onClick={(e) => e.stopPropagation()} 
      >
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-black"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  )
}

export default Modal