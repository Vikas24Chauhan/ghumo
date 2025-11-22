import React, { useEffect } from "react";
import "./ScrollRevealSections.css";

const ScrollRevealSections = () => {
  const headlines = [
    "Explore our world",
    "View all its beauty",
    "Take lots of photos",
    "Each one of them pretty",
  ];

  useEffect(() => {
    // Add any scroll animations or effects here if needed
  }, []);

  return (
    <div className="scroll-reveal-container">
      {headlines.map((headline, index) => (
        <section key={index} className="scroll-reveal-hero">
          <div className="scroll-reveal-hero-inner" id={`section-${index}`}>
            <figure
              className={`scroll-reveal-hero-figure scroll-reveal-hero-figure-${
                index + 1
              }`}
            ></figure>
            <h2 className="scroll-reveal-hero__title">{headline}</h2>
          </div>
        </section>
      ))}

      <section className="scroll-reveal-content">
        <article className="scroll-reveal-content__inner">
          <h1 className="scroll-reveal-content__title">
            Your Happy Little Journey
          </h1>
          <h3 className="scroll-reveal-content__author">
            By The India Explorer Team
          </h3>

          <p>
            A well-researched guide will stick to a traveler's plan. The ancient
            ruins are just like the modern cities, but we're going in the
            opposite direction through time. When you plan it your way using our
            resources, you can go anywhere you choose across the subcontinent.
          </p>

          <p>
            You have to make almighty decisions when you're the architect of
            your trip. When you start reading our guides, it gives you a
            traveler's license to explore. There we go. The little tiny travel
            anxieties will let you down. Let's just drop a little serenity into
            your itinerary right here.
          </p>

          <p>
            Stories unfold in all kinds of ways. They're not all perfectly
            straight tours. Not every landmark is the same. We truly believe
            that if you read and plan enough, you could navigate the 'Golden
            Triangle' with just our phone app. Just pretend you are a traveler
            floating across the vast mountain ranges. This is your world,
            whatever makes you happy you can put in it. Go explore!
          </p>

          <p>
            The first step to doing anything is to believe you can do it. See
            your finished journey in your mind before you ever start. We'll play
            with cultural immersion today. Every single place in India has its
            own personality - and it is up to you to make friends with the
            little rascals. Don't avoid all your unfamiliar areas - you need
            them to show the light of discovery. We don't want to rush these
            experiences. Every day you travel, you learn.
          </p>

          <blockquote>
            When you explore your way you can go anywhere you choose.
          </blockquote>

          <p>
            Let's get adventurous today. Once you learn the routes, ohhh! Turn
            you loose on the world; you become an explorer. This is probably the
            greatest thing to happen—to be able to share these incredible places
            and detailed knowledge with you.
          </p>

          <p>
            I'm a culture fanatic. I love local stories. This is gonna be a
            happy little cultural immersion. Put history against history—you
            have nothing. Put modernity against modernity—you have nothing. It's
            the contrast of ancient traditions and new life that each give the
            other one meaning. Let's put a touch more of the travel magic here.
            I'm going to mix up a little itinerary. We'll use Rajasthan's forts,
            Kerala's backwaters, and a little bit of Himalayan peace.
          </p>

          <p>
            And that's when it becomes fun—you don't have to spend your time
            thinking about what's happening—you just let the adventure happen.
            Let all these beautiful moments just sort of happen. Don't fight the
            chaos, embrace what happens. Let's put some happy little memories on
            the other side now.
          </p>

          <blockquote>Don't fight the chaos, embrace what happens.</blockquote>

          <p>
            If we're going to have magnificent places around, we all have to be
            concerned about them and take care of them. I'll go over the travel
            essentials one more time that we cover: visas, local etiquette,
            health tips, and sustainable travel. Anytime you learn something
            new, your time and energy are not wasted. This is your world. We
            want you to feel confident while using our guides. Just let go—and
            fall into the beauty of India.
          </p>

          <p>
            Let's build some happy little memories up here. Everyone is going to
            see things differently—and that's the way it should be. Let's do
            that again. A destination needs to be your friend if you're going to
            visit it. That's why we create these guides—because you can create
            the kind of journey you want—and you can make this world as happy as
            you want it.
          </p>
        </article>
      </section>
    </div>
  );
};

export default ScrollRevealSections;
