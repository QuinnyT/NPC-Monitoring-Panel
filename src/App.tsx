import { ThemeProvider } from "@/components/theme-provider"
import { BrowserRouter } from "react-router-dom";
import ViewRouter from "./routers";

function App() {
  return (<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <BrowserRouter>
      <ViewRouter />
    </BrowserRouter>
  </ThemeProvider>
  );
}

export default App;
