import prisma from "./prisma";

const postTitles = [
  "Unconventional Productivity Hacks You Haven't Heard Of",
  "The Power of Saying No: Why Setting Boundaries is Essential",
  "Exploring the Intersection of Art and Technology",
  "Must-Have Travel Essentials for the Minimalist Adventurer",
  "Demystifying Cryptocurrency: A Beginner's Guide",
  "5 Books That Will Change Your Perspective on Life",
  "The Science of Happiness: Simple Habits for a More Joyful Life",
  "Conquering Your Fears: Tips for Building Confidence",
  "The Future of Work: What We Can Expect in the Coming Decades",
  "Sustainable Living Made Easy: Eco-Friendly Practices for Everyone",
  "The Art of Self-Care: Prioritizing Your Well-Being",
  "Embracing Minimalism: Decluttering Your Life for More Freedom",
  "The Power of Gratitude: How Appreciation Can Transform Your Life",
  "Mastering the Art of Conversation: Tips for Effective Communication",
  "Unlocking Your Creativity: Unleash Your Inner Artist",
  "The Importance of Sleep: How Rest Impacts Your Health and Success",
  "Financial Freedom: Taking Control of Your Money",
  "The Benefits of Travel: Expanding Your Horizons Through Exploration",
  "Building a Growth Mindset: Embracing Challenges for Success",
  "The Power of Visualization: How to Achieve Your Goals",
  "The Joys of Cooking: Simple Recipes for Delicious Meals",
  "The Importance of Play: Why Fun is Essential at Every Age",
  "Living with Intention: Creating a Life You Love",
  "The Magic of Mindfulness: Finding Peace in the Present Moment",
  "The Science of Learning: Effective Strategies for Retaining Information",
  "The Power of Music: How Melodies Can Uplift and Inspire",
  "Building Strong Relationships: Tips for Lasting Connections",
  "The Importance of Giving Back: How Volunteering Can Make a Difference",
  "The Benefits of Exercise: How Physical Activity Improves Your Life",
  "Embracing Diversity: Celebrating Differences in Our World",
  "The Art of Negotiation: Getting What You Want in Life",
  "The Power of Positive Thinking: How Optimism Can Lead to Success",
  "The Importance of Failure: How Mistakes Can Make You Stronger",
  "Decluttering Your Digital Life: Organizing Your Online Space",
  "The Power of Forgiveness: Letting Go of Resentment for Peace",
  "Building a Capsule Wardrobe: Creating Stylish Outfits with Less",
  "The Importance of Setting Goals: Defining Your Path to Success",
  "The Benefits of Meditation: Reducing Stress and Finding Inner Calm",
  "The Power of Habits: How Small Changes Can Make a Big Difference",
  "Embracing Change: Navigating Transitions in Life with Grace",
  "The Art of Public Speaking: Captivating Your Audience with Confidence",
  "The Importance of Time Management: Getting the Most Out of Your Day",
  "The Benefits of Reading: Expanding Your Knowledge and Imagination",
  "The Power of Connection: Building Meaningful Relationships",
  "Embracing Authenticity: Being True to Yourself in a World of Expectations",
  "The Art of Listening: Understanding Others for Stronger Relationships",
  "The Importance of Self-Love: Accepting Yourself for Who You Are",
  "The Benefits of Nature: Reconnecting with the World Around You",
  "The Power of Vulnerability: Building Stronger Connections Through Openness",
  "Embracing Curiosity: Asking Questions and Expanding Your Horizons",
];


const addPosts = async () => {
  const postsData = [];
  for (let i = 0; i < 50; i++) {
    postsData.push({
      content: "https://picsum.photos/400/400?random=" + i,
      title: postTitles[i],
      userId: "clwvud6ol000014j2qb58h27m",
    });
  }
  const data = await prisma.post.createMany({
    data: postsData,
  });

  if(!data) console.log("not created")
};

addPosts();