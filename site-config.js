/* Edit this file to add games, update statuses, and enable store/test links. */
window.GRADPIXEL = {
  contactEmail: "info@gradpixel.com",
  socialLinks: [
    // Example: { label: "YouTube", url: "https://www.youtube.com/@YOUR_CHANNEL" }
  ],
  games: [
    {
      id: "symath", title: "SyMath", genre: "Logic & puzzle", status: "available",
      description: "A world of logic puzzles, challenges, and discovery.",
      image: "assets/symath.jpg", theme: "symath",
      details: "Explore puzzles, solve challenges, and progress through a world built around logic.",
      storeUrl: "https://play.google.com/store/apps/details?id=com.GradPixel.SyMathLogicPuzzle",
      playtestUrl: "" // Use only when a real playtest is open.
    },
    {
      id: "fruit-pop", title: "Fruit Pop", genre: "Casual arcade", status: "available",
      description: "Colorful, quick-fire fun. Catch the moment and keep playing.",
      image: "assets/fruit-pop.jpg", theme: "fruitpop",
      details: "A bright, fast-paced casual game built for quick play sessions.",
      storeUrl: "https://play.google.com/store/apps/details?id=com.GradPixel.FruitPop",
      playtestUrl: ""
    }
    // New games go here, using the same fields. Status: available, testing, coming-soon.
  ]
};
