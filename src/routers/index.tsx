import { Route, Routes, Navigate } from "react-router";
import HomePage from "@/pages/home";
import MainPage from "@/pages/main";
import IntroPage from "@/pages/main/intro";
import RelationPage from "@/pages/main/relation";
import ModePage from "@/pages/main/mode";
import CityPage from "@/pages/main/city";
import UEPage from "@/pages/ue";
import CardPage from "@/pages/card";

export default function ViewRouter() {
  return (
    <Routes>
      <Route path="/main" element={<MainPage />} >
        <Route index element={<Navigate to="intro" />} />
        <Route path="intro" element={<IntroPage />} />
        <Route path="relation" element={<RelationPage />} />
        <Route path="mode" element={<ModePage />} />
        <Route path="city" element={<CityPage />} />
      </Route>
      <Route path="/*" element={<HomePage />} />
      <Route path="/ue" element={<UEPage />} />
      <Route path="/card" element={<CardPage />} />
    </Routes>
  )
}