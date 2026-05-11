"use client";

import SwissNav from "./SwissNav";
import SwissHero from "./SwissHero";
import SwissAbout from "./SwissAbout";
import SwissProjects from "./SwissProjects";
import SwissWriting from "./SwissWriting";
import SwissContact from "./SwissContact";
import SwissFooter from "./SwissFooter";

export default function SwissMode() {
  return (
    <div className="min-h-screen font-sans">
      <SwissNav />
      <main className="max-w-[1280px] mx-auto px-12 md:px-6 sm:px-5">
        <SwissHero />
        <SwissAbout />
        <SwissProjects />
        <SwissWriting />
        <SwissContact />
      </main>
      <footer className="max-w-[1280px] mx-auto px-12 md:px-6 sm:px-5">
        <SwissFooter />
      </footer>
    </div>
  );
}
