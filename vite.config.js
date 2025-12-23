import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  // GitHub Pages 배포를 위한 base 경로 설정
  // 저장소 이름이 'cal1'인 경우: base: '/cal1/'
  // 사용자/조직 페이지인 경우: base: '/'
  base: process.env.NODE_ENV === 'production' ? '/cal1/' : '/',
  
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'terser',
    sourcemap: false,
    
    // 청크 최적화
    rollupOptions: {
      output: {
        manualChunks: {
          'mathjs': ['mathjs']
        },
        // 파일명 패턴
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      }
    },
    
    // 청크 크기 경고 제한
    chunkSizeWarningLimit: 1000,
  },
  
  server: {
    port: 3000,
    open: true,
    host: true
  },
  
  preview: {
    port: 4173,
    open: true
  }
})
