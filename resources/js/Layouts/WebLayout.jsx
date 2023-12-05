import MainNavigation from '@/Components/Navigation/MainNavigation';

export default function Web({ children }) {
    return (
      <>
        <MainNavigation />
        <main>
          {children}
        </main>
        <footer>

        </footer>
      </>
    );
}
