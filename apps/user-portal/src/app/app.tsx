import { Routes, Route } from 'react-router-dom';
import { AuthProvider, ThemeProvider, Header, Footer } from '@frontend/shared';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PageRenderer } from './components/PageRenderer';
import './styles/fontawesome.css';

export function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
          <Header />

          <main className="flex-1">
            <Routes>
              {/* Home page */}
              <Route path="/" element={<HomePage />} />

              {/* Dynamic page routes - this should be last to catch all other routes */}
              <Route path="/:slug" element={<PageRenderer />} />

              {/* 404 fallback */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
