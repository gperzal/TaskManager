"use client";

import { Box } from "@chakra-ui/react";
import HeroSection from "@home/HeroSection";
import FeaturesSection from "@home/FeaturesSection";
import TestimonialsSection from "@home/TestimonialsSection";
import CTASection from "@home/CTASection";

export default function HomePage() {
  return (
    <Box>
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
    </Box>
  );
}
