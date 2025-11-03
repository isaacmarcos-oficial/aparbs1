"use client";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Review {
  user: {
    name: string;
    link: string;
    thumbnail: string;
  };
  review: string;
  rating: number;
  date: string;
  snippet: string;
}

export default function Review() {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await fetch(
          "https://google.serper.dev/reviews?fid=0x752281b048ee24b%3A0x8ce9b567298b1724&gl=br&hl=pt-br&sortBy=highestRating&apiKey=3fd69a2015bc0b77e495017c6de530b648ff8c07"
        );
        const result = await response.json();
        setReviews(result.reviews || []);
      } catch (error) {
        console.error("Erro ao buscar reviews:", error);
      }
    }

    fetchReviews();
  }, []);

  return (
    <div className="flex flex-col items-center w-full mt-10 my-6">
      <h1 className="text-[#d90000] mb-8 text-center text-4xl font-extrabold">
        Depoimentos
      </h1>

      <Carousel className="w-full max-w-6xl space-y-6">
        <CarouselContent className="gap-4">
          {reviews.map((review, index) => (
            <CarouselItem key={index} className="p-6 basis-1/2 lg:basis-1/5 border borde-border rounded-xl shadow-lg hover:bg-muted transition-all">
              <Link href={review.user.link} target="_blank" rel="noopener noreferrer">
                <div className="flex items-center mb-4">
                  <Image
                    src={review.user.thumbnail}
                    width={48}
                    height={48}
                    alt={review.user.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <p className="text-yellow-500">{"⭐".repeat(review.rating)}</p>
                    <p className="font-semibold text-lg text-blue-600">
                      {review.user.name}
                    </p>
                  </div>
                </div>
                <p className="text-zinc-600">{review.snippet}</p>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}