export const ARTICLES = [
  {
      id: "1",
      category: "Technology",
      title: "The Future of Campus Tech: How AI is Changing Student Life",
      author: {
          name: "Alex Rivera",
          avatar: "https://github.com/shadcn.png",
          date: "Feb 24, 2026",
          readTime: "5 min read"
      },
      coverImage: "https://images.unsplash.com/photo-1531297461136-82087565c5da?w=1200&q=80",
      content: `
          <p class="lead text-xl text-white/90">
              Artificial Intelligence isn't just a buzzword anymore—it's actively reshaping how we learn, connect, and organize our lives on campus. From personalized study plans to AI-driven social events, the landscape is shifting rapidly.
          </p>
          <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <h3>The Rise of Smart Campuses</h3>
          <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <blockquote>
              "The integration of AI in daily student activities is the biggest leap since the smartphone." - Dr. Emily Chen, BIT Mesra
          </blockquote>
          <p>
              Experience is key. When we look at how students interact with technology today, it's seamless. The barriers are dissolving.
          </p>
          <figure>
               <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80" alt="Students working" class="rounded-xl w-full" />
               <figcaption class="text-center text-sm text-muted-foreground mt-2">Students collaborating in a smart lab.</figcaption>
          </figure>
          <h3>What's Next?</h3>
          <p>
              As we move forward, the question isn't if AI will be part of our lives, but how we shape it.
          </p>
      `,
      stats: {
          likes: "1.2k",
          comments: "142"
      }
  }
];

export const ARTICLE_CONTENT = ARTICLES[0]; // Default article
