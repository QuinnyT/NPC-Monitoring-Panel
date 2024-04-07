import { ThemeProvider } from "@/components/theme-provider"
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster"
import ViewRouter from "./routers";

import { setRem } from "@/hooks/use-set-size"

function App() {
 setRem();
 window.onresize = () => {
   setRem();
 };
  return (<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <BrowserRouter>
      <ViewRouter />
      <Toaster />
    </BrowserRouter>
  </ThemeProvider>
  );
}

export default App;
