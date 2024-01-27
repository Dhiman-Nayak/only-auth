import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// // export default defineConfig({
// //   plugins: [react()],
// //   server:{
// //     proxy:{
// //       "/api":{
// //         target:"localhost:8000/",
// //         // changeOrigin:true,
// //         secure:false
// //       }
// //     }
// //   }
// // })
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       '/api': {
//         target: 'http://localhost:8000', // Specify the target URL of your API
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, ''), // Remove '/api' prefix before forwarding the request
//       },
//     },
//   },
// });
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        secure: false,
      },
    },
  },
  plugins: [react()],
});