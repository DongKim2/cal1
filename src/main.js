import './assets/styles/main.css'

console.log('🚀 Scientific Calculator - Starting...')

// DOM 로딩 확인
document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app')

    if (app) {
        app.innerHTML = `
      <div class="flex items-center justify-center h-screen">
        <div class="text-center">
          <h1 class="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Scientific Calculator
          </h1>
          <p class="text-lg text-slate-600 dark:text-slate-400">
            Development environment is ready! 🎉
          </p>
          <div class="mt-8 p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <p class="text-sm text-blue-800 dark:text-blue-200">
              Tailwind CSS is working!
            </p>
          </div>
        </div>
      </div>
    `
        console.log('✅ App initialized successfully')
    } else {
        console.error('❌ App container not found')
    }
})
