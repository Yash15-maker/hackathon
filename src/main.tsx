import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { HackathonProvider } from './context/GlobalData.tsx';

createRoot(document.getElementById('root')!).render(
  <HackathonProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </HackathonProvider>
)
