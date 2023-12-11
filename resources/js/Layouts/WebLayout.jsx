import MainNavigation from '@/Components/Navigation/MainNavigation';
import Footer from '@/Components/Footer/Footer';

export default function Web({ children }) {
    return (
      <>
        <MainNavigation />
        <main>
          {children}
        </main>
        <Footer />
      </>
    );
}
