import React from "react";

function Article({ title, date = "January 1, 1970", preview, minutes, url }) {
  let emojiDisplay = "";
  if (minutes < 30) {
    const cups = Math.ceil(minutes / 5);
    emojiDisplay = "☕️".repeat(cups) + ` ${minutes} min read`;
  } else {
    const boxes = Math.ceil(minutes / 10);
    emojiDisplay = "🍱".repeat(boxes) + ` ${minutes} min read`;
  }

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
      <article>
        <h3>{title}</h3>
        <small>{date}</small>
        <p>{preview}</p>
        {minutes && <p>{emojiDisplay}</p>}
      </article>
    </a>
  );
}

export default Article;
