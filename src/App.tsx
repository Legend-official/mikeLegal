import { Header, MoviesComp } from "./components/common";

function App() {
  return (
    <div className="max-w-2xl mx-auto w-full h-full flex flex-col  scroll-smooth">
      {/* app header component */}
      <Header />
      {/* the main app component */}
      <MoviesComp />
    </div>
  );
}

export default App;
