import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

export function ScrollCards() {
  return (
    <div className=" rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        className=""
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>
  );
}

const testimonials = [
  {
    quote:
      "The insights and knowledge shared by my mentor were invaluable, and I feel more confident in my role now",
    name: "Charles Dickens",
    title: "A Tale of Two Cities",
  },
  {
    quote:
      "My mentor was always patient and took the time to explain things thoroughly. I truly appreciate their effort.",
    name: "William Shakespeare",
    title: "Hamlet",
  },
  {
    quote: "Thanks to my mentor, I was able to gain a clearer understanding of my career goals and how to achieve them",
    name: "Edgar Allan Poe",
    title: "A Dream Within a Dream",
  },
  {
    quote:
      "I really appreciated my mentor's constructive feedback, which helped me improve my skills and performance",
    name: "Jane Austen",
    title: "Pride and Prejudice",
  },
  {
    quote:
      "The mentorship experience has been incredibly rewarding, and I feel more prepared to face challenges at work",
    name: "Herman Melville",
    title: "Moby-Dick",
  },
];
