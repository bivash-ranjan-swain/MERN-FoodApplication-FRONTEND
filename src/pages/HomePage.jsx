import BrowseMenu from "../components/BrowseMenu"
import FastestFood from "../components/FastestFood"
import HeroSection from "../components/HeroSection"
import Weoffer from "../components/Weoffer"
import WeProvide from "../components/WeProvide"
import WhatOurCustomer from "../components/WhatOurCustomer"
import Navbar from "../layout/Navbar"

function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <BrowseMenu />
      <WeProvide />
      <Weoffer />
      <FastestFood />
      <WhatOurCustomer />
    </>
  )
}

export default HomePage