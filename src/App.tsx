import React, { useEffect, useState } from "react";
import "./App.scss";
import Card from "./Components/Card/Card";
import { Story, StoryWithAuthor, User } from "./types";

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [ids, setIds] = useState<string[]>([]);
  const [stories, setstories] = useState<Story[]>();
  const [users, setUsers] = useState<User[]>();
  const [storiesWithAuthor, setStoriesWithAuthor] =
    useState<StoryWithAuthor[]>();

  useEffect(() => {
    const fetchingIds = async () => {
      const response = await fetch(
        "https://hacker-news.firebaseio.com/v0/topstories.json"
      );
      const ids = await response.json();
      setIds(ids.sort(() => Math.random() - Math.random()).slice(0, 10));
    };

    fetchingIds();
  }, []);

  useEffect(() => {
    const fetchStories = async () => {
      const reqs = ids.map((id) => {
        return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
      });

      const response = await Promise.all(reqs);

      const detailsRaw = response.map((res) => res.json());

      const details = (await Promise.all(detailsRaw)) as Story[];

      details?.sort((a, b) => a.score - b.score);

      setstories(details);

      return details;
    };

    fetchStories();
  }, [ids]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (stories != undefined) {
        const reqs = stories.map((story) => {
          return fetch(
            `https://hacker-news.firebaseio.com/v0/user/${story.by}.json`
          );
        });

        const response = await Promise.all(reqs);

        const detailsRaw = response.map((res) => res.json());

        const details = (await Promise.all(detailsRaw)) as User[];

        const storiesWithFullAuthor: StoryWithAuthor[] = stories.map((a) => ({
          ...a,
          by: details.find((d) => d.id === a.by),
        }));

        console.log(storiesWithFullAuthor);

        setStoriesWithAuthor(storiesWithFullAuthor);

        return details;
      }
    };

    fetchUsers();
    setLoading(false);
  }, [stories]);

  return (
    <div>
      <main className="cards">
        {loading ? (
          <p>Loading...</p>
        ) : (
          storiesWithAuthor?.map((story, index) => (
            <Card
              author={story.by?.id}
              title={story.title}
              cardNumber={index + 1}
              url={story.url}
              timestamp={story.time}
              storyScore={story.score}
              karmaScore={story.by?.karma}
            />
          ))
        )}
      </main>
    </div>
  );
}

export default App;
