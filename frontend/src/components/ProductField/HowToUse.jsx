import img from "../../assets/images/howTo.png";
import video from "../../assets/images/videoPlaceholder.png";
import styles from "./ProductField.module.css"

const HowToUse = () => {
  return (
    <div className={` ${styles.descriptionBlock} ${styles.howtoCont}`}>
      <img src={img} alt="image" />
      <div className={`h5-light ${styles.textCont}`}>
        <p>
          The sun dipped below the horizon, painting the sky with hues of orange
          and pink. A gentle breeze rustled through the trees, carrying with it
          the scent of freshly cut grass. Birds chirped their evening songs as
          they settled in their nests for the night. In the distance, the sound
          of laughter and conversation could be heard as families gathered
          around crackling bonfires, roasting marshmallows and telling stories.
          It was a scene of tranquility and contentment, a moment frozen in time
          where worries melted away and only the present moment mattered.
        </p>

        <p>

          As the stars began to twinkle in the darkening sky, a sense of peace
          settled over the land. The world seemed to slow down, each breath
          drawn in deeply and savored. It was a reminder of the beauty that
          surrounded us, the simple joys that could be found in nature's
          embrace. In that moment, there was nowhere else anyone would rather be
          than right there, under the vast expanse of the night sky, surrounded
          by the ones they loved.
        </p>

        <p>
          And so the night stretched out before them, filled with promise and
          possibility. For in the darkness, there was also light - the light of
          hope, of dreams yet to be realized. It was a time for reflection, for
          letting go of the past and embracing the future with open arms. As the
          fire crackled and popped, sending sparks dancing into the night, they
          knew that anything was possible. And so they sat, together, under the
          watchful gaze of the moon, grateful for the gift of another day,
          another chance to experience the beauty of life.
        </p>
      </div>

      <img src={video} alt="video" />

      <div className={`h5-light ${styles.textCont}`}>
        <p>
          The city hummed with activity as people bustled about, each with their
          own purpose and destination in mind. Cars honked, pedestrians
          chattered, and the rhythm of life pulsed through the streets. Tall
          buildings reached up toward the sky, their glass facades reflecting
          the sunlight in dazzling patterns. Everywhere you looked, there was
          movement and energy, a sense of constant motion and change.
        </p>

        <p>

          Amidst the chaos, there were pockets of tranquility - quiet parks
          where trees whispered secrets to the wind, peaceful cafes where the
          aroma of freshly brewed coffee lingered in the air. Here, people found
          solace from the hustle and bustle of urban life, taking a moment to
          slow down and appreciate the beauty that surrounded them.
        </p>

        <p>

          As night fell, the city transformed into a spectacle of lights. Neon
          signs flickered to life, casting a colorful glow on the sidewalks
          below. The streets became alive with the sound of music and laughter,
          as people spilled out of bars and clubs, their voices rising above the
          city's constant hum.
        </p>

        <p>
          But even in the midst of all this activity, there was a sense of unity
          - a feeling that despite our differences, we were all part of
          something larger than ourselves. As the city slept, its heartbeat
          echoed through the streets, a reminder that we were all connected,
          each of us playing a small but significant role in the grand tapestry
          of life.
        </p>
      </div>
    </div>
  );
};

export default HowToUse;
