import './assets/styles/main.css'
import App from './App';

console.log('🚀 Scientific Calculator - Starting...')

document.addEventListener('DOMContentLoaded', () => {
  try {
    const app = new App();
    app.init();
    console.log('✅ App initialized successfully');
  } catch (error) {
    console.error('❌ Failed to initialize app:', error);
  }
})
