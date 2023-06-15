import * as React from "react";
import Story from "./Story";
import { graphql } from "relay-runtime";
import { useLazyLoadQuery } from "react-relay";

const NewsfeedQuery = graphql`
  query NewsfeedQuery {
    topStory {
      title
      summary
      poster {
        name
        profilePicture {
          url
        }
      }
      thumbnail {
        url
      }
    }
  }
`;

export default function Newsfeed() {
  const data = useLazyLoadQuery(NewsfeedQuery, {});

  return (
    <div className="newsfeed">
      <Story story={data?.topStory} />
    </div>
  );
}
